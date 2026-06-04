// Frank Body Mode — Layer 1 (prompt & style system) + Layer 2 (LoRA) hooks.
// Shared client+server (no secrets). A global, OFF-by-default toggle: when ON,
// composeFrankBodySystem() is prepended to every prompt across all providers
// (as systemInstruction for Gemini, prompt-prefix for Replicate/OpenAI).
//
// PLACEHOLDER copy: replace with the validated Frank Body style system once the
// brand guidance is finalised.

import type { ModelKey } from "./providers/types";

/** Codified Frank Body visual language. */
export const FRANK_BODY_STYLE: string[] = [
  "Premium Frank Body beauty/skincare brand aesthetic.",
  "Warm, natural lighting with soft editorial shadows.",
  "Colour palette of warm cream, terracotta and golden tones with soft neutrals.",
  "Authentic, natural skin texture — never artificially smooth or plastic.",
  "Clean, considered composition with a tactile, high-end finish.",
  "True-to-life packaging: accurate product shape and colour, crisp legible labels.",
  "Vogue Beauty editorial feel.",
];

/** Common off-brand anomalies to avoid. */
export const FRANK_BODY_NEGATIVE: string[] = [
  "harsh or artificial lighting",
  "over-saturated or neon colours",
  "plastic or over-retouched skin",
  "distorted, warped or illegible labels and product names",
  "extra or unrelated props and clutter",
  "watermarks or text artifacts",
];

/** LoRA trigger word — prepended when a trained LoRA is active for the model. */
export const FRANK_BODY_TRIGGER = "FRANKBODY";

/** Compose the Layer-1 style system into a single instruction string. */
export function composeFrankBodySystem(): string {
  return [
    "Apply the Frank Body visual language to this image.",
    "ALWAYS:",
    ...FRANK_BODY_STYLE.map((s) => `- ${s}`),
    "AVOID:",
    ...FRANK_BODY_NEGATIVE.map((s) => `- ${s}`),
  ].join("\n");
}

// ---- Layer 2: optional fine-tuned LoRA (per model) ----
// Map a model to its trained Frank Body LoRA weights reference (e.g. a Replicate
// `hf_lora` URL/owner/version). Empty until a LoRA is trained + hosted; when
// present and Frank Body Mode is ON, the adapter activates it with the trigger.
export const FRANK_BODY_LORAS: Partial<Record<ModelKey, string>> = {};

export function getLoraFor(modelKey: ModelKey): string | undefined {
  return FRANK_BODY_LORAS[modelKey];
}
