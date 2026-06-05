// Provider-agnostic types for the Image Studio generation engine.
//
// This module is intentionally pure: no React, no SDK imports, no secrets at
// module scope. It is safe to import from BOTH the client (for the capability
// registry / UI) and the server (for the adapters).

export type ModelKey =
  // Google (official)
  | "nano-banana-pro"
  | "nano-banana-2"
  | "nano-banana" // legacy
  // OpenAI (official)
  | "gpt-image-2"
  | "gpt-image-1.5-hf"
  | "chatgpt-image-latest-hf" // edit-only
  // Replicate
  | "flux-1.1-pro-ultra"
  | "flux-kontext-max" // edit-only
  | "reve-2"
  | "grok-imagine"
  | "ideogram-v3-quality"
  | "flux-1.1-pro" // legacy
  | "seedream-4" // legacy
  // Coming soon (no adapter)
  | "mai-image-2.5";

export type ProviderId = "gemini" | "replicate" | "openai" | "microsoft";

export type ModelStatus = "live" | "coming-soon";

export type AspectRatio =
  | "1:1"
  | "2:3"
  | "3:2"
  | "3:4"
  | "4:3"
  | "4:5"
  | "5:4"
  | "9:16"
  | "16:9"
  | "21:9";

export type ImageSize = "1K" | "2K" | "4K";

/** UI-facing thinking selector. Mapped to provider enums inside the adapter. */
export type ThinkingLevel = "Low" | "High";

export interface GenerationSettings {
  aspectRatio: AspectRatio;
  imageSize: ImageSize;
  /** Number of images to produce this turn. Fanned out to N parallel calls. */
  numImages: number;
  thinkingLevel?: ThinkingLevel;
}

/** A raw image payload moving between client, server and provider. */
export interface RefImage {
  mimeType: string;
  /** Base64 WITHOUT the `data:` URL prefix. */
  dataBase64: string;
}

export interface GenerateInput {
  modelKey: ModelKey;
  /** This turn's user prompt (just the ask — brand rules go in systemInstruction). */
  prompt: string;
  /** Composed brand/system rules (built server-side: preset or Frank Body Mode). */
  systemInstruction?: string;
  settings: GenerationSettings;
  /** Reference images for initial generation and/or edits. */
  referenceImages?: RefImage[];
  /** The image being edited (multi-turn). Triggers edit/compose mode. */
  editParentImage?: RefImage;
  /** Inpainting mask (same dims as editParentImage; transparent = edit region). */
  maskImage?: RefImage;
}

export interface GeneratedImage {
  mimeType: string;
  /** Base64 WITHOUT the `data:` URL prefix. */
  dataBase64: string;
}

export interface GenerateResult {
  images: GeneratedImage[];
  /** Optional model "thoughts" text (thinking models). */
  thoughts?: string;
}

export interface ImageProvider {
  readonly id: ProviderId;
  generate(input: GenerateInput): Promise<GenerateResult>;
}
