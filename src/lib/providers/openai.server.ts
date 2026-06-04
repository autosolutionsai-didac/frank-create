// OpenAI image adapter (GPT-Image-2 / 1.5 / ChatGPT-image edit). The ONLY file
// importing `openai`. Server-only (.server.ts → tree-shaken from the client).

import OpenAI, { toFile } from "openai";
import process from "node:process";

import { getCapability } from "./capabilities";
import type { AspectRatio, GenerateInput, GenerateResult, ImageProvider, ImageSize } from "./types";

// OpenAI accepts explicit WIDTHxHEIGHT (÷16, max dim 3840, aspect 1:3–3:1).
// Only square / 3:2 / 2:3 are offered for OpenAI models (see OPENAI_RATIOS).
const SIZE_MAP: Record<string, Record<ImageSize, string>> = {
  "1:1": { "1K": "1024x1024", "2K": "2048x2048", "4K": "2048x2048" },
  "3:2": { "1K": "1536x1024", "2K": "2048x1360", "4K": "3072x2048" },
  "2:3": { "1K": "1024x1536", "2K": "1360x2048", "4K": "2048x3072" },
};

function toOpenAISize(aspectRatio: AspectRatio, imageSize: ImageSize): string {
  return SIZE_MAP[aspectRatio]?.[imageSize] ?? SIZE_MAP["1:1"][imageSize];
}

async function refToFile(
  img: { mimeType: string; dataBase64: string },
  name: string,
): Promise<Awaited<ReturnType<typeof toFile>>> {
  return toFile(Buffer.from(img.dataBase64, "base64"), name, { type: img.mimeType });
}

export function getOpenAIProvider(): ImageProvider {
  return {
    id: "openai",
    async generate(input: GenerateInput): Promise<GenerateResult> {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

      const client = new OpenAI({ apiKey });
      const cap = getCapability(input.modelKey);
      const model = cap.providerModelId;
      const size = toOpenAISize(input.settings.aspectRatio, input.settings.imageSize);
      // Brief specifies GPT-Image-2 at "medium"; HF variants at high fidelity.
      const quality = model === "gpt-image-2" ? "medium" : "high";

      const n = Math.max(1, input.settings.numImages);

      const runOne = async () => {
        if (input.editParentImage) {
          const images = [await refToFile(input.editParentImage, "source.png")];
          for (const r of input.referenceImages ?? []) {
            images.push(await refToFile(r, `ref-${images.length}.png`));
          }
          return client.images.edit({
            model,
            image: images,
            prompt: input.prompt,
            size,
            n: 1,
            quality,
          } as Parameters<typeof client.images.edit>[0]);
        }
        return client.images.generate({
          model,
          prompt: input.prompt,
          size,
          n: 1,
          quality,
        } as Parameters<typeof client.images.generate>[0]);
      };

      const settled = await Promise.allSettled(Array.from({ length: n }, runOne));

      const images: GenerateResult["images"] = [];
      let firstError: unknown;
      for (const res of settled) {
        if (res.status === "rejected") {
          firstError ??= res.reason;
          continue;
        }
        const data = (res.value as { data?: Array<{ b64_json?: string }> }).data ?? [];
        for (const item of data) {
          if (item.b64_json) images.push({ dataBase64: item.b64_json, mimeType: "image/png" });
        }
      }
      if (images.length === 0) {
        throw new Error(`OpenAI returned no images${firstError ? `: ${String(firstError)}` : ""}`);
      }
      return { images };
    },
  };
}
