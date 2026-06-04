// Replicate adapter — the multi-model router for everything that isn't an
// official Google/OpenAI model. Server-only (.server.ts).
//
// Each Replicate model has a DIFFERENT input schema (the per-provider JSON pain
// flagged in the kickoff call). That mapping lives in `buildInput` below; extend
// it per-model as the real model list is confirmed with Cliff.

import Replicate from "replicate";
import process from "node:process";

import { getCapability } from "./capabilities";
import type { GenerateInput, GenerateResult, ImageProvider } from "./types";

function buildInput(input: GenerateInput): Record<string, unknown> {
  // Generic mapping that works for most text-to-image Replicate models.
  // Override per-model here when a model needs different field names.
  return {
    prompt: input.systemInstruction
      ? `${input.systemInstruction}\n\n${input.prompt}`
      : input.prompt,
    aspect_ratio: input.settings.aspectRatio,
    num_outputs: 1, // we fan out N calls ourselves for a consistent grid
    output_format: "png",
  };
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
      const reqInput = buildInput(input);

      const n = Math.max(1, input.settings.numImages);
      const settled = await Promise.allSettled(
        Array.from({ length: n }, () =>
          replicate.run(cap.providerModelId as `${string}/${string}`, {
            input: reqInput,
          }),
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
