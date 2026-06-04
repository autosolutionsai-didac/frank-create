// Frank Body presets — a structured brand prompt library (NOT just saved text).
// Shared client+server (no secrets): the client shows names/categories; the
// server composes the system instruction so brand rules can't be tampered with.
//
// PLACEHOLDER RULES: replace the system_prompt / positive / negative rules with
// the real brand guidance from Cliff before going live.

import type { GenerationSettings } from "./providers/types";

export interface Preset {
  id: string;
  name: string;
  category: string;
  systemPrompt: string;
  positiveRules: string[];
  negativeRules: string[];
  defaultSettings: Partial<GenerationSettings>;
}

export const FRANK_BODY_PRESETS: Preset[] = [
  {
    id: "product-flat-lay",
    name: "Product Flat Lay",
    category: "Packaging · editorial",
    systemPrompt:
      "Create a Frank Body product flat-lay: top-down packaging shot with an editorial, premium skincare-brand aesthetic.",
    positiveRules: [
      "True-to-life packaging detail and crisp, readable labels",
      "Natural soft shadows and believable materials",
      "Clean, considered composition with intentional negative space",
    ],
    negativeRules: [
      "Do not distort the product name or packaging shape",
      "Do not add unrelated props or clutter",
    ],
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K" },
  },
  {
    id: "pdp-product-hero",
    name: "PDP Product Hero",
    category: "E-commerce · studio",
    systemPrompt:
      "Create a Frank Body e-commerce PDP hero image: clean studio product shot optimised for a product detail page.",
    positiveRules: [
      "Product centred and sharply in focus with accurate colour",
      "Even, flattering studio lighting on a clean background",
      "Realistic scale and crisp label readability",
    ],
    negativeRules: [
      "Do not blur or warp the product name",
      "Do not introduce busy or distracting backgrounds",
    ],
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K" },
  },
  {
    id: "campaign-hero",
    name: "Campaign Hero",
    category: "Model · lifestyle · beauty",
    systemPrompt:
      "Create a Frank Body campaign hero: lifestyle/beauty imagery with a warm, confident, premium brand mood.",
    positiveRules: [
      "Photorealistic, editorial lighting and natural skin texture",
      "Cohesive integration of the product into the scene",
      "Believable reflections and natural shadows",
    ],
    negativeRules: [
      "Do not make the product too small or barely visible",
      "Do not produce an artificial or over-retouched look",
    ],
    defaultSettings: { aspectRatio: "4:5", imageSize: "4K" },
  },
  {
    id: "texture-ingredient",
    name: "Texture / Ingredient",
    category: "Macro · formula · skin",
    systemPrompt:
      "Create a Frank Body texture/ingredient macro: close-up of formula or key ingredients with a tactile, premium feel.",
    positiveRules: [
      "Rich macro detail showing texture, sheen and consistency",
      "Accurate materials and natural lighting",
      "Appetising, clean, brand-aligned colour palette",
    ],
    negativeRules: [
      "Do not produce unrealistic or plastic-looking textures",
      "Do not add unrelated objects",
    ],
    defaultSettings: { aspectRatio: "1:1", imageSize: "4K" },
  },
];

export function getPreset(id: string | null | undefined): Preset | undefined {
  if (!id) return undefined;
  return FRANK_BODY_PRESETS.find((p) => p.id === id);
}

/** Compose a preset into a single system-instruction string. */
export function composeSystemInstruction(preset: Preset): string {
  const lines = [preset.systemPrompt];
  if (preset.positiveRules.length) {
    lines.push("ALWAYS:");
    for (const r of preset.positiveRules) lines.push(`- ${r}`);
  }
  if (preset.negativeRules.length) {
    lines.push("NEVER:");
    for (const r of preset.negativeRules) lines.push(`- ${r}`);
  }
  return lines.join("\n");
}
