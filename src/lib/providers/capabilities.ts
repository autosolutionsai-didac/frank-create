// Model capability registry — the SINGLE source of truth the UI reads to decide
// which controls to render (model picker, thinking toggle, aspect ratios,
// resolutions, reference-image cap, etc.). Mirrors the future
// `model_capabilities` Supabase table so non-engineers can tune it later.
//
// NOTE: model IDs below are *preview* IDs verified against current Google docs
// (Jan–Jun 2026). They can be renamed by Google — keeping them isolated here
// means an ID change is a one-line edit, not a refactor. Verify in Phase 0.

import type { AspectRatio, ImageSize, ModelKey, ProviderId } from "./types";

export interface ModelCapability {
  modelKey: ModelKey;
  provider: ProviderId;
  /** The real provider model ID / Replicate slug. */
  providerModelId: string;
  label: string;
  blurb: string;
  supportsEditing: boolean;
  supportsMultiReference: boolean;
  /** Per-model reference cap. Google docs: Pro 6 / NB2 10 (NOT 14). */
  maxReferenceImages: number;
  supportedAspectRatios: AspectRatio[];
  supportedResolutions: ImageSize[];
  supportsThinking: boolean;
  supportsMultiTurn: boolean;
  defaultSettings: {
    aspectRatio: AspectRatio;
    imageSize: ImageSize;
    numImages: number;
  };
}

const ALL_RATIOS: AspectRatio[] = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9",
];

export const MODEL_CAPABILITIES: Record<ModelKey, ModelCapability> = {
  "nano-banana-pro": {
    modelKey: "nano-banana-pro",
    provider: "gemini",
    providerModelId: "gemini-3-pro-image-preview",
    label: "Nano Banana Pro",
    blurb: "4K · Thinking",
    supportsEditing: true,
    supportsMultiReference: true,
    maxReferenceImages: 6,
    supportedAspectRatios: ALL_RATIOS,
    supportedResolutions: ["1K", "2K", "4K"],
    supportsThinking: true,
    supportsMultiTurn: true,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 4 },
  },
  "nano-banana-2": {
    modelKey: "nano-banana-2",
    provider: "gemini",
    providerModelId: "gemini-3.1-flash-image-preview",
    label: "Nano Banana 2",
    blurb: "Fast · up to 2K",
    supportsEditing: true,
    supportsMultiReference: true,
    maxReferenceImages: 10,
    supportedAspectRatios: ALL_RATIOS,
    // NB2 has an open imageSize bug (js-genai #1461) — treat >1K as unverified.
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: true,
    defaultSettings: { aspectRatio: "1:1", imageSize: "1K", numImages: 4 },
  },
  "nano-banana": {
    modelKey: "nano-banana",
    provider: "gemini",
    providerModelId: "gemini-2.5-flash-image",
    label: "Nano Banana",
    blurb: "Original · 1K",
    supportsEditing: true,
    supportsMultiReference: true,
    maxReferenceImages: 10,
    supportedAspectRatios: ALL_RATIOS,
    supportedResolutions: ["1K"],
    supportsThinking: false,
    supportsMultiTurn: true,
    defaultSettings: { aspectRatio: "1:1", imageSize: "1K", numImages: 4 },
  },

  // ---- Replicate placeholders (confirm final list + input schemas w/ Cliff) ----
  "flux-1.1-pro": {
    modelKey: "flux-1.1-pro",
    provider: "replicate",
    providerModelId: "black-forest-labs/flux-1.1-pro",
    label: "FLUX 1.1 Pro",
    blurb: "Replicate · text-to-image",
    supportsEditing: false,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ["1:1", "2:3", "3:2", "3:4", "4:3", "16:9", "9:16"],
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "1K", numImages: 1 },
  },
  "seedream-4": {
    modelKey: "seedream-4",
    provider: "replicate",
    providerModelId: "bytedance/seedream-4",
    label: "Seedream 4",
    blurb: "Replicate · text-to-image",
    supportsEditing: false,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ["1:1", "3:4", "4:3", "16:9", "9:16"],
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "1K", numImages: 1 },
  },
};

/** Models shown in the UI picker, in display order. */
export const MODEL_ORDER: ModelKey[] = [
  "nano-banana-pro",
  "nano-banana-2",
  "nano-banana",
  "flux-1.1-pro",
  "seedream-4",
];

export function getCapability(modelKey: string): ModelCapability {
  const cap = (MODEL_CAPABILITIES as Record<string, ModelCapability>)[modelKey];
  if (!cap) throw new Error(`Unknown model: ${modelKey}`);
  return cap;
}

export function isModelKey(value: string): value is ModelKey {
  return value in MODEL_CAPABILITIES;
}
