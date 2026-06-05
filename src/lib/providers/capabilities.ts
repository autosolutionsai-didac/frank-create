// Model capability registry — the SINGLE source of truth the UI reads to decide
// which controls to render (model picker, thinking toggle, aspect ratios,
// resolutions, reference-image cap) and the server reads to dispatch.
//
// Routing (stakeholder decision): Gemini official; Replicate for everything it
// hosts; OpenAI official only where Replicate doesn't host it; MAI = the only
// "coming-soon" placeholder. Model IDs are *preview* IDs that churn — they live
// only here, so a rename is a one-line edit. Verify against the live API.

import type { AspectRatio, ImageSize, ModelKey, ModelStatus, ProviderId } from "./types";

export interface ModelCapability {
  modelKey: ModelKey;
  provider: ProviderId;
  /** The real provider model ID / Replicate slug. */
  providerModelId: string;
  label: string;
  blurb: string;
  status: ModelStatus;
  supportsEditing: boolean;
  /** Can be offered as a manual edit model (appears in EDIT_MODEL_ORDER). */
  editCapable: boolean;
  /** 1 = full regen · 2 = instruction edit · 3 = masked inpainting. */
  editTier?: 1 | 2 | 3;
  /** Supports masked inpainting (a brush mask of the region to change). */
  supportsMask?: boolean;
  /** True only for genuine 4K/4MP models (others get a "max NK" badge). */
  is4K: boolean;
  supportsMultiReference: boolean;
  maxReferenceImages: number;
  supportedAspectRatios: AspectRatio[];
  supportedResolutions: ImageSize[];
  supportsThinking: boolean;
  supportsMultiTurn: boolean;
  /** Frank Body Mode Layer-2 LoRA hook (FLUX family on Replicate). */
  loraCapable?: boolean;
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
// OpenAI image sizes only cover square + 3:2 + 2:3.
const OPENAI_RATIOS: AspectRatio[] = ["1:1", "3:2", "2:3"];

export const MODEL_CAPABILITIES: Record<ModelKey, ModelCapability> = {
  "nano-banana-pro": {
    modelKey: "nano-banana-pro",
    provider: "gemini",
    providerModelId: "gemini-3-pro-image-preview",
    label: "Nano Banana Pro",
    blurb: "Gemini · 4K · Thinking",
    status: "live",
    supportsEditing: true,
    editCapable: true,
    editTier: 1,
    is4K: true,
    supportsMultiReference: true,
    maxReferenceImages: 6,
    supportedAspectRatios: ALL_RATIOS,
    supportedResolutions: ["1K", "2K", "4K"],
    supportsThinking: true,
    supportsMultiTurn: true,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 4 },
  },
  "gpt-image-2": {
    modelKey: "gpt-image-2",
    provider: "openai",
    providerModelId: "gpt-image-2",
    label: "GPT-Image-2",
    blurb: "OpenAI · 4K · #1",
    status: "live",
    supportsEditing: true,
    editCapable: true,
    editTier: 3,
    supportsMask: true,
    is4K: true,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: OPENAI_RATIOS,
    supportedResolutions: ["1K", "2K", "4K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 1 },
  },
  "flux-1.1-pro-ultra": {
    modelKey: "flux-1.1-pro-ultra",
    provider: "replicate",
    providerModelId: "black-forest-labs/flux-1.1-pro-ultra",
    label: "FLUX 1.1 Pro Ultra",
    blurb: "Replicate · 4MP",
    status: "live",
    supportsEditing: false,
    editCapable: false,
    is4K: true,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ALL_RATIOS,
    supportedResolutions: ["4K"], // native 4MP; size param is not used
    supportsThinking: false,
    supportsMultiTurn: false,
    loraCapable: true,
    defaultSettings: { aspectRatio: "1:1", imageSize: "4K", numImages: 1 },
  },
  "nano-banana-2": {
    modelKey: "nano-banana-2",
    provider: "gemini",
    providerModelId: "gemini-3.1-flash-image-preview",
    label: "Nano Banana 2",
    blurb: "Gemini · fast · max 2K",
    status: "live",
    supportsEditing: false,
    editCapable: false,
    // Brief calls NB2 4K, but js-genai #1461 (imageSize ignored) is unresolved.
    is4K: false,
    supportsMultiReference: true,
    maxReferenceImages: 10,
    supportedAspectRatios: ALL_RATIOS,
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: true,
    defaultSettings: { aspectRatio: "1:1", imageSize: "1K", numImages: 4 },
  },
  "reve-2": {
    modelKey: "reve-2",
    provider: "replicate",
    providerModelId: "reve/create-image",
    label: "Reve 2.0",
    blurb: "Replicate · #2",
    status: "live",
    supportsEditing: false,
    editCapable: false,
    is4K: false, // unverified 4K — badge until confirmed
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ["1:1", "3:4", "4:3", "16:9", "9:16"],
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 1 },
  },
  "grok-imagine": {
    modelKey: "grok-imagine",
    provider: "replicate",
    providerModelId: "xai/grok-imagine-image-quality",
    label: "Grok Imagine",
    blurb: "Replicate · #7",
    status: "live",
    supportsEditing: true,
    editCapable: true,
    editTier: 2,
    is4K: false, // unverified 4K — badge until confirmed
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ["1:1", "3:4", "4:3", "16:9", "9:16"],
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 1 },
  },
  "ideogram-v3-quality": {
    modelKey: "ideogram-v3-quality",
    provider: "replicate",
    providerModelId: "ideogram-ai/ideogram-v3-quality",
    label: "Ideogram v3",
    blurb: "Replicate · best text",
    status: "live",
    supportsEditing: false,
    editCapable: false,
    is4K: false,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ["1:1", "3:2", "2:3", "3:4", "4:3", "16:9", "9:16"],
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 1 },
  },
  "gpt-image-1.5-hf": {
    modelKey: "gpt-image-1.5-hf",
    provider: "openai",
    providerModelId: "gpt-image-1.5",
    label: "GPT-Image 1.5 HF",
    blurb: "OpenAI · max 1K",
    status: "live",
    supportsEditing: false,
    editCapable: false,
    is4K: false,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: OPENAI_RATIOS,
    supportedResolutions: ["1K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "1K", numImages: 1 },
  },
  "mai-image-2.5": {
    modelKey: "mai-image-2.5",
    provider: "microsoft",
    providerModelId: "mai-image-2.5",
    label: "MAI-Image-2.5",
    blurb: "Microsoft · soon",
    status: "coming-soon",
    supportsEditing: true,
    editCapable: true,
    editTier: 2,
    is4K: true,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ALL_RATIOS,
    supportedResolutions: ["1K", "2K", "4K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 1 },
  },

  // ---- Edit-only models (not in MODEL_ORDER; appear in EDIT_MODEL_ORDER) ----
  "chatgpt-image-latest-hf": {
    modelKey: "chatgpt-image-latest-hf",
    provider: "openai",
    providerModelId: "chatgpt-image-latest",
    label: "ChatGPT Image HF",
    blurb: "OpenAI · edit",
    status: "live",
    supportsEditing: true,
    editCapable: true,
    editTier: 3,
    supportsMask: true,
    is4K: true,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: OPENAI_RATIOS,
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 1 },
  },
  "flux-kontext-max": {
    modelKey: "flux-kontext-max",
    provider: "replicate",
    providerModelId: "black-forest-labs/flux-kontext-max",
    label: "FLUX Kontext Max",
    blurb: "Replicate · edit",
    status: "live",
    supportsEditing: true,
    editCapable: true,
    editTier: 2,
    is4K: true,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ALL_RATIOS,
    supportedResolutions: ["1K", "2K", "4K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K", numImages: 1 },
  },

  // ---- Legacy keys (kept so old sessions resolve; not shown in pickers) ----
  "nano-banana": {
    modelKey: "nano-banana",
    provider: "gemini",
    providerModelId: "gemini-2.5-flash-image",
    label: "Nano Banana",
    blurb: "Gemini · 1K",
    status: "live",
    supportsEditing: true,
    editCapable: false,
    is4K: false,
    supportsMultiReference: true,
    maxReferenceImages: 10,
    supportedAspectRatios: ALL_RATIOS,
    supportedResolutions: ["1K"],
    supportsThinking: false,
    supportsMultiTurn: true,
    defaultSettings: { aspectRatio: "1:1", imageSize: "1K", numImages: 4 },
  },
  "flux-1.1-pro": {
    modelKey: "flux-1.1-pro",
    provider: "replicate",
    providerModelId: "black-forest-labs/flux-1.1-pro",
    label: "FLUX 1.1 Pro",
    blurb: "Replicate",
    status: "live",
    supportsEditing: false,
    editCapable: false,
    is4K: false,
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
    blurb: "Replicate",
    status: "live",
    supportsEditing: false,
    editCapable: false,
    is4K: false,
    supportsMultiReference: false,
    maxReferenceImages: 0,
    supportedAspectRatios: ["1:1", "3:4", "4:3", "16:9", "9:16"],
    supportedResolutions: ["1K", "2K"],
    supportsThinking: false,
    supportsMultiTurn: false,
    defaultSettings: { aspectRatio: "1:1", imageSize: "1K", numImages: 1 },
  },
};

/** Generation models shown in the UI picker, in display order. */
export const MODEL_ORDER: ModelKey[] = [
  "nano-banana-pro",
  "gpt-image-2",
  "flux-1.1-pro-ultra",
  "nano-banana-2",
  "reve-2",
  "grok-imagine",
  "ideogram-v3-quality",
  "gpt-image-1.5-hf",
  "mai-image-2.5",
];

/** Edit models offered when the user clicks "Edit this", in ranked order. */
export const EDIT_MODEL_ORDER: ModelKey[] = [
  "gpt-image-2",
  "chatgpt-image-latest-hf",
  "flux-kontext-max",
  "grok-imagine",
  "nano-banana-pro",
  "mai-image-2.5",
];

export function getCapability(modelKey: string): ModelCapability {
  const cap = (MODEL_CAPABILITIES as Record<string, ModelCapability>)[modelKey];
  if (!cap) throw new Error(`Unknown model: ${modelKey}`);
  return cap;
}

export function isModelKey(value: string): value is ModelKey {
  return value in MODEL_CAPABILITIES;
}
