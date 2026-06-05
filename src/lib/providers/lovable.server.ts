// Lovable AI gateway adapter — routes the Gemini ("Nano Banana") image models
// through Lovable Cloud's built-in AI (no direct Gemini key needed). Server-only.
//
// The gateway is OpenAI/OpenRouter-compatible: image generation goes through
// chat/completions with `modalities: ["image","text"]`; generated images come
// back as base64 data URIs in `choices[0].message.images[]`. Edits/refs are
// passed as `image_url` content parts. The auto-injected LOVABLE_API_KEY
// authenticates it. NOTE: this OpenAI-compatible surface doesn't expose Gemini's
// imageConfig (explicit 4K) or thinkingConfig — aspect ratio is sent as a hint.

import process from "node:process";

import { getCapability } from "./capabilities";
import type { GenerateInput, GenerateResult, ImageProvider, RefImage } from "./types";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

function dataUri(img: RefImage): string {
  return `data:${img.mimeType};base64,${img.dataBase64}`;
}

interface GatewayImage {
  image_url?: { url?: string };
  url?: string;
}
interface GatewayResponse {
  choices?: Array<{ message?: { images?: GatewayImage[] } }>;
}

function parseDataUri(url: string): { mimeType: string; dataBase64: string } | null {
  if (!url.startsWith("data:")) return null;
  const comma = url.indexOf(",");
  if (comma < 0) return null;
  const mimeType = url.slice(5, comma).split(";")[0] || "image/png";
  const dataBase64 = url.slice(comma + 1);
  return dataBase64 ? { mimeType, dataBase64 } : null;
}

export function getLovableProvider(): ImageProvider {
  return {
    id: "lovable",
    async generate(input: GenerateInput): Promise<GenerateResult> {
      const apiKey = process.env.LOVABLE_API_KEY;
      if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured (connect Lovable AI)");

      const cap = getCapability(input.modelKey);

      let text = input.systemInstruction
        ? `${input.systemInstruction}\n\n${input.prompt}`
        : input.prompt;
      if (!input.editParentImage) text += `\n\nAspect ratio: ${input.settings.aspectRatio}.`;

      const content: Array<Record<string, unknown>> = [{ type: "text", text }];
      for (const r of input.referenceImages ?? []) {
        content.push({ type: "image_url", image_url: { url: dataUri(r) } });
      }
      if (input.editParentImage) {
        content.push({ type: "image_url", image_url: { url: dataUri(input.editParentImage) } });
      }

      const body = JSON.stringify({
        model: cap.providerModelId,
        messages: [{ role: "user", content }],
        modalities: ["image", "text"],
      });

      const n = Math.max(1, input.settings.numImages);
      const settled = await Promise.allSettled(
        Array.from({ length: n }, () =>
          fetch(GATEWAY_URL, {
            method: "POST",
            headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
            body,
          }).then(async (res) => {
            if (!res.ok) throw new Error(`Lovable AI ${res.status}: ${await res.text()}`);
            return (await res.json()) as GatewayResponse;
          }),
        ),
      );

      const images: GenerateResult["images"] = [];
      let firstError: unknown;
      for (const res of settled) {
        if (res.status === "rejected") {
          firstError ??= res.reason;
          continue;
        }
        for (const im of res.value.choices?.[0]?.message?.images ?? []) {
          const parsed = parseDataUri(im.image_url?.url ?? im.url ?? "");
          if (parsed) images.push(parsed);
        }
      }
      if (images.length === 0) {
        throw new Error(
          `Lovable AI returned no images${firstError ? `: ${firstError instanceof Error ? firstError.message : String(firstError)}` : ""}`,
        );
      }
      return { images };
    },
  };
}
