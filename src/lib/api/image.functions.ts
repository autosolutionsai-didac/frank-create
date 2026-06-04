// Image generation server functions. These hold the secret API keys and proxy
// every provider call — keys never reach the browser.
//
// Phase 0: returns base64 images directly (no DB). Phase 1 will additionally
// upload bytes to Supabase Storage and write messages/assets rows.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getCapability } from "../providers/capabilities";
import { composeSystemInstruction, getPreset } from "../presets";
import type { GenerateInput } from "../providers/types";

const refImageSchema = z.object({
  mimeType: z.string(),
  dataBase64: z.string(),
});

const settingsSchema = z.object({
  aspectRatio: z.string(),
  imageSize: z.enum(["1K", "2K", "4K"]),
  numImages: z.number().int().min(1).max(8),
  thinkingLevel: z.enum(["Low", "High"]).optional(),
});

const generateSchema = z.object({
  modelKey: z.string(),
  prompt: z.string().min(1, "A prompt is required"),
  presetId: z.string().optional(),
  settings: settingsSchema,
  referenceImages: z.array(refImageSchema).optional(),
  editParentImage: refImageSchema.optional(),
});

export const generateImage = createServerFn({ method: "POST" })
  .inputValidator(generateSchema)
  .handler(async ({ data }) => {
    // Server-only modules imported here are tree-shaken from the client bundle.
    const { getProvider } = await import("../providers/index.server");

    const cap = getCapability(data.modelKey);

    // Enforce per-model reference cap server-side (do not trust the client).
    const refCount = data.referenceImages?.length ?? 0;
    if (refCount > cap.maxReferenceImages) {
      throw new Error(`${cap.label} supports at most ${cap.maxReferenceImages} reference images`);
    }
    if (data.editParentImage && !cap.supportsEditing) {
      throw new Error(`${cap.label} does not support editing`);
    }

    // Compose brand rules into the system instruction (server-side).
    const preset = getPreset(data.presetId);
    const systemInstruction = preset ? composeSystemInstruction(preset) : undefined;

    const input: GenerateInput = {
      modelKey: cap.modelKey,
      prompt: data.prompt,
      systemInstruction,
      settings: {
        aspectRatio: data.settings.aspectRatio as GenerateInput["settings"]["aspectRatio"],
        imageSize: data.settings.imageSize,
        numImages: data.settings.numImages,
        thinkingLevel: data.settings.thinkingLevel,
      },
      referenceImages: data.referenceImages,
      editParentImage: data.editParentImage,
    };

    const provider = getProvider(cap.provider);
    const result = await provider.generate(input);
    return { images: result.images, thoughts: result.thoughts };
  });
