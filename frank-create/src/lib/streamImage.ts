import { createParser } from "eventsource-parser";
import { flushSync } from "react-dom";
import { FUNCTIONS_BASE, supabase } from "./supabase";

export type ImageFrame = { dataUrl: string; isFinal: boolean };

export async function streamImage(
  payload: { prompt: string; model: string; reference_images?: string[] },
  onFrame: (frame: ImageFrame) => void,
  signal?: AbortSignal,
): Promise<void> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;

  const res = await fetch(`${FUNCTIONS_BASE}/generate-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Image generation failed (${res.status})`);
  }

  let sawCompleted = false;
  const parser = createParser({
    onEvent(event) {
      if (
        event.event !== "image_generation.partial_image" &&
        event.event !== "image_generation.completed"
      ) {
        return;
      }
      let payload: { b64_json?: string };
      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }
      if (!payload.b64_json) return;
      const isFinal = event.event === "image_generation.completed";
      flushSync(() => {
        onFrame({ dataUrl: `data:image/png;base64,${payload.b64_json}`, isFinal });
      });
      if (isFinal) sawCompleted = true;
    },
  });

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      parser.feed(value);
    }
  } finally {
    reader.cancel().catch(() => {});
  }

  if (!sawCompleted) {
    throw new Error("Image stream ended without completion");
  }
}
