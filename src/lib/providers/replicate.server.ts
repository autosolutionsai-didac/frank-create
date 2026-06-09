// Replicate adapter — the multi-model router for everything that isn't an
// official Google model. Server-only (.server.ts).
//
// Each Replicate model has a DIFFERENT input schema, so `buildInput` dispatches
// per model. Adding/removing a model is a registry entry in capabilities.ts plus
// (if its schema differs) one branch here. We fan out N parallel single-image
// calls for a consistent grid, mirroring the Gemini adapter.

import Replicate from "replicate";
import process from "node:process";

import { getCapability } from "./capabilities";
import type { GenerateInput, ModelKey, RefImage, GenerateResult, ImageProvider } from "./types";

function dataUri(img: RefImage): string {
  return `data:${img.mimeType};base64,${img.dataBase64}`;
}

/** Edit-parent first, then any reference images, as Replicate-friendly data URIs. */
function inputImages(input: GenerateInput): string[] {
  const out: string[] = [];
  if (input.editParentImage) out.push(dataUri(input.editParentImage));
  for (const ref of input.referenceImages ?? []) out.push(dataUri(ref));
  return out;
}

function composedPrompt(input: GenerateInput): string {
  // Replicate models have no separate system field — fold brand rules into the prompt.
  return input.systemInstruction ? `${input.systemInstruction}\n\n${input.prompt}` : input.prompt;
}

// Recraft v3 takes a fixed WxH `size` string rather than an aspect ratio.
const RECRAFT_SIZE: Record<string, string> = {
  "1:1": "1024x1024",
  "4:3": "1365x1024",
  "3:4": "1024x1365",
  "16:9": "1820x1024",
  "9:16": "1024x1820",
  "3:2": "1536x1024",
  "2:3": "1024x1536",
  "4:5": "1024x1280",
  "5:4": "1280x1024",
};

function buildInput(modelKey: ModelKey, input: GenerateInput): Record<string, unknown> {
  const prompt = composedPrompt(input);
  const images = inputImages(input);
  const isEdit = !!input.editParentImage;

  switch (modelKey) {
    case "flux-1.1-pro":
      return {
        prompt,
        aspect_ratio: input.settings.aspectRatio,
        num_outputs: 1,
        output_format: "png",
        output_quality: 90,
        prompt_upsampling: true,
      };

    case "flux-kontext-max":
      return {
        prompt,
        // Single input image: the edit parent, else the first reference.
        ...(images[0] ? { input_image: images[0] } : {}),
        aspect_ratio: isEdit ? "match_input_image" : input.settings.aspectRatio,
        output_format: "png",
        safety_tolerance: 2,
      };

    case "seedream-4":
      return {
        prompt,
        ...(images.length ? { image_input: images } : {}),
        // Seedream's `size` accepts our "1K"/"2K"/"4K" values directly.
        size: input.settings.imageSize,
        aspect_ratio: isEdit ? "match_input_image" : input.settings.aspectRatio,
      };

    case "recraft-v3":
      return {
        prompt,
        size: RECRAFT_SIZE[input.settings.aspectRatio] ?? "1024x1024",
        style: "realistic_image",
      };

    case "imagen-4":
      return { prompt, aspect_ratio: input.settings.aspectRatio };

    default:
      return { prompt, aspect_ratio: input.settings.aspectRatio, num_outputs: 1 };
  }
}

function collectUrls(output: unknown): string[] {
  // With useFileOutput:false, output is a URL string or string[]. Keep the
  // FileOutput fallbacks in case a model returns objects.
  const toUrl = (item: unknown): string | null => {
    if (typeof item === "string") return item;
    if (item instanceof URL) return item.href;
    if (item && typeof (item as { url?: unknown }).url === "function") {
      const u = (item as { url: () => unknown }).url();
      return u instanceof URL ? u.href : typeof u === "string" ? u : null;
    }
    return null;
  };
  if (Array.isArray(output)) return output.map(toUrl).filter((u): u is string => !!u);
  const single = toUrl(output);
  return single ? [single] : [];
}

async function urlToBase64(url: string): Promise<{ mimeType: string; dataBase64: string }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch Replicate output (${res.status})`);
  const mimeType = res.headers.get("content-type") ?? "image/png";
  const buf = Buffer.from(await res.arrayBuffer());
  return { mimeType, dataBase64: buf.toString("base64") };
}

export function getReplicateProvider(): ImageProvider {
  return {
    id: "replicate",
    async generate(input: GenerateInput): Promise<GenerateResult> {
      const auth = process.env.REPLICATE_API_TOKEN;
      if (!auth) throw new Error("REPLICATE_API_TOKEN is not configured");

      // useFileOutput:false → plain URL strings instead of FileOutput objects.
      const replicate = new Replicate({ auth, useFileOutput: false });
      const cap = getCapability(input.modelKey);
      const reqInput = buildInput(cap.modelKey, input);

      const n = Math.max(1, input.settings.numImages);
      const settled = await Promise.allSettled(
        Array.from({ length: n }, () =>
          replicate.run(cap.providerModelId as `${string}/${string}`, { input: reqInput }),
        ),
      );

      const urls: string[] = [];
      let firstError: unknown;
      for (const res of settled) {
        if (res.status === "rejected") {
          firstError ??= res.reason;
          continue;
        }
        urls.push(...collectUrls(res.value));
      }

      const images = await Promise.all(urls.map(urlToBase64));
      if (images.length === 0) {
        throw new Error(
          `Replicate returned no images${firstError ? `: ${String(firstError)}` : ""}`,
        );
      }
      return { images };
    },
  };
}
