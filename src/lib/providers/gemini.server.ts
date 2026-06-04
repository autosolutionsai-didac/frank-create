// Google Gemini ("Nano Banana") adapter. The ONLY file that imports
// @google/genai — all SDK-shape risk (config field names, enum values, model
// IDs) is isolated here. Server-only (.server.ts → tree-shaken from client).

import { GoogleGenAI, ThinkingLevel, type GenerateContentConfig, type Part } from "@google/genai";
import process from "node:process";

import { getCapability } from "./capabilities";
import type { GenerateInput, GenerateResult, ImageProvider } from "./types";

const THINKING_MAP: Record<
  NonNullable<GenerateInput["settings"]["thinkingLevel"]>,
  ThinkingLevel
> = {
  Low: ThinkingLevel.LOW,
  High: ThinkingLevel.HIGH,
};

function buildParts(input: GenerateInput): Part[] {
  const parts: Part[] = [{ text: input.prompt }];
  for (const ref of input.referenceImages ?? []) {
    parts.push({ inlineData: { mimeType: ref.mimeType, data: ref.dataBase64 } });
  }
  if (input.editParentImage) {
    parts.push({
      inlineData: {
        mimeType: input.editParentImage.mimeType,
        data: input.editParentImage.dataBase64,
      },
    });
  }
  return parts;
}

export function getGeminiProvider(): ImageProvider {
  return {
    id: "gemini",
    async generate(input: GenerateInput): Promise<GenerateResult> {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

      const ai = new GoogleGenAI({ apiKey });
      const cap = getCapability(input.modelKey);
      const parts = buildParts(input);

      const config: GenerateContentConfig = {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: input.settings.aspectRatio,
          imageSize: input.settings.imageSize,
        },
        ...(input.systemInstruction ? { systemInstruction: input.systemInstruction } : {}),
        ...(cap.supportsThinking && input.settings.thinkingLevel
          ? { thinkingConfig: { thinkingLevel: THINKING_MAP[input.settings.thinkingLevel] } }
          : {}),
      };

      // Image models reject candidateCount > 1, so N images = N parallel calls.
      const n = Math.max(1, input.settings.numImages);
      const settled = await Promise.allSettled(
        Array.from({ length: n }, () =>
          ai.models.generateContent({
            model: cap.providerModelId,
            contents: parts,
            config,
          }),
        ),
      );

      const images: GenerateResult["images"] = [];
      let thoughts: string | undefined;
      let firstError: unknown;

      for (const res of settled) {
        if (res.status === "rejected") {
          firstError ??= res.reason;
          continue;
        }
        for (const part of res.value.candidates?.[0]?.content?.parts ?? []) {
          if (part.inlineData?.data) {
            images.push({
              dataBase64: part.inlineData.data,
              mimeType: part.inlineData.mimeType ?? "image/png",
            });
          } else if (part.thought && part.text) {
            thoughts = (thoughts ? thoughts + "\n" : "") + part.text;
          }
        }
      }

      if (images.length === 0) {
        throw new Error(`Gemini returned no images${firstError ? `: ${String(firstError)}` : ""}`);
      }
      return { images, thoughts };
    },
  };
}
