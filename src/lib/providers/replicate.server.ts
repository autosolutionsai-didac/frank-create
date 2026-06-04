// Replicate adapter — the multi-model router for FLUX (Pro Ultra / Kontext),
// Ideogram, Grok, Reve, SD3.5, etc. Server-only (.server.ts).
//
// Each Replicate model has a DIFFERENT input schema (the per-provider JSON pain
// from the kickoff call). `buildInput` dispatches per model slug; extend it as
// the model list grows.

import Replicate from "replicate";
import process from "node:process";

import { getCapability, type ModelCapability } from "./capabilities";
import type { GenerateInput, GenerateResult, ImageProvider, RefImage } from "./types";

function dataUri(img: RefImage): string {
  return `data:${img.mimeType};base64,${img.dataBase64}`;
}

function buildInput(cap: ModelCapability, input: GenerateInput): Record<string, unknown> {
  const slug = cap.providerModelId;
  const prompt = input.systemInstruction
    ? `${input.systemInstruction}\n\n${input.prompt}`
    : input.prompt;
  const aspect_ratio = input.settings.aspectRatio;

  // ---- Edit / image-to-image ----
  if (input.editParentImage) {
    const image = dataUri(input.editParentImage);
    if (slug.includes("flux-kontext")) {
      return {
        prompt,
        input_image: image,
        aspect_ratio: "match_input_image",
        output_format: "png",
      };
    }
    if (slug.includes("grok-imagine")) {
      return { prompt, image }; // Grok edit ignores aspect_ratio
    }
    // FLUX Ultra image-to-image
    return { prompt, image_prompt: image, aspect_ratio, output_format: "png" };
  }

  // ---- Text-to-image ----
  if (slug.includes("flux-1.1-pro-ultra")) {
    const base: Record<string, unknown> = {
      prompt,
      aspect_ratio,
      output_format: "png",
      raw: false,
    };
    if (input.referenceImages?.[0]) base.image_prompt = dataUri(input.referenceImages[0]);
    return base;
  }
  if (slug.includes("ideogram")) {
    return { prompt, aspect_ratio };
  }
  if (slug.includes("grok-imagine")) {
    return { prompt, aspect_ratio };
  }
  // SD3.5 / Reve / generic text-to-image
  return { prompt, aspect_ratio, num_outputs: 1, output_format: "png" };
}

function toUrl(item: unknown): string | null {
  if (typeof item === "string") return item;
  if (item instanceof URL) return item.href;
  if (item && typeof (item as { url?: unknown }).url === "function") {
    const u = (item as { url: () => unknown }).url();
    return u instanceof URL ? u.href : typeof u === "string" ? u : null;
  }
  return null;
}

function collectUrls(output: unknown): string[] {
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

      const replicate = new Replicate({ auth });
      const cap = getCapability(input.modelKey);
      const reqInput = buildInput(cap, input);

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
