// Frank Body presets — a structured brand prompt library (NOT just saved text).
// Shared client+server (no secrets): the client shows names/categories; the
// server composes the system instruction so brand rules can't be tampered with.
//
// Rules below encode Frank Body's actual visual identity — warm cream + Hotel
// Pink coral + coffee brown, real skin, bathroom/shower lifestyle, coffee-ground
// texture motif, "cheeky-but-premium" Australian tone. The `presets` table in
// supabase/migrations/0002_seed.sql mirrors these so non-engineers can tune them
// later; keep the two in sync until the DB becomes the live source of truth.

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
      "Create a top-down flat-lay product photograph in the Frank Body style. Arrange one to three Frank Body products (coffee-scrub pouch or tub, pump bottle, or cylindrical vessel) on a warm cream or off-white textured surface such as linen, matte cotton, or plaster. Keep the palette strictly warm — cream, Hotel Pink coral, and coffee brown with black type — and light it softly and diffusely, as in gentle morning daylight. The mood is premium-artisanal and quietly cheeky, never clinical.",
    positiveRules: [
      "Use a warm cream, off-white, or soft blush surface as the background",
      "Include a brand-signature hint of coffee: loose dark grounds scattered, or formula visible through the pack",
      "Light softly and warmly with gentle shadows, like soft morning daylight",
      "Keep it minimal — one to three products with deliberate negative space",
      "Render packaging labels as crisp, legible bold sans-serif type",
    ],
    negativeRules: [
      "No cold white, grey concrete, or black-marble surfaces",
      "No clinical, pharmaceutical, or lab-style props (pipettes, beakers, scattered greenery)",
      "No harsh overhead flash or hard cast shadows",
      "No crystal, fine china, or props that read cold or aspirational",
    ],
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K" },
  },
  {
    id: "pdp-product-hero",
    name: "PDP Product Hero",
    category: "E-commerce · studio",
    systemPrompt:
      "Create a clean e-commerce product hero for a Frank Body product. Show a single product — scrub pouch, pump bottle, or tub — straight-on or at a slight three-quarter angle on a warm off-white cream background (not pure white). Use bright, professional, warm-cast lighting that renders the coral, cream, and black packaging colours accurately, with one soft shadow grounding the product. It should look like something you would want on your shelf: approachable and well-made, never clinical.",
    positiveRules: [
      "Use a warm off-white / cream background, not clinical pure white",
      "Render the coral and cream packaging colours accurately with warm, true-to-life grading",
      "Add a single soft, natural ground shadow to anchor the product",
      "Light to reveal packaging surface (matte, soft-touch) and any visible formula texture",
    ],
    negativeRules: [
      "No pure cold white, grey gradients, or lifestyle-environment backgrounds",
      "No busy multi-prop styling — this is a clean hero, not a flat lay",
      "No cool or desaturated colour grading",
    ],
    defaultSettings: { aspectRatio: "1:1", imageSize: "2K" },
  },
  {
    id: "campaign-hero",
    name: "Campaign Hero",
    category: "Model · lifestyle · beauty",
    systemPrompt:
      "Create a Frank Body campaign lifestyle photograph. Feature a real-looking person of any body type and skin tone with visible, natural skin texture, using or having just used a Frank Body product — typically in a bathroom or shower with glowing, post-scrub skin. The mood is joyful, candid, and unselfconscious; warm peachy-pink tones unify the frame; light is warm and glowy, like soft window light. Body-positive, inclusive, cheeky, and fun — never cold or distancingly aspirational.",
    positiveRules: [
      "Use warm, glowy lighting with peachy-pink undertones",
      "Keep real skin texture — natural pores, variation, and post-exfoliation glow",
      "Capture candid, joyful, unselfconscious expressions and poses",
      "Set the scene in a bathroom, shower, or with wet, freshly-scrubbed skin",
      "Reflect genuine body diversity in shape, size, skin tone, and age",
    ],
    negativeRules: [
      "No cold, blue-white high-fashion editorial lighting",
      "No heavy retouching that erases pores or real skin texture",
      "No stiff, aloof, or aspirational posing",
      "No sterile white-studio or unrelated outdoor settings unless explicitly requested",
    ],
    defaultSettings: { aspectRatio: "4:5", imageSize: "4K" },
  },
  {
    id: "texture-ingredient",
    name: "Texture / Ingredient",
    category: "Macro · formula · skin",
    systemPrompt:
      "Create a macro texture or ingredient photograph in the Frank Body style. Show either coarse, dark-brown coffee grounds with rich natural variation, a formula swatch smeared across warm-toned skin or a cream surface to reveal its consistency, or a single raw ingredient (ground coffee, sea salt, pooled coconut oil). Keep the palette warm — coffee brown, cream, and warm skin — and light it close and directional to bring out the grain of granules and the sheen of oils. The feel is sensorial and almost appetising, never clinical.",
    positiveRules: [
      "Use only warm cream or warm skin as the surface or background",
      "Render coffee grounds with true, rich dark-brown depth",
      "Light for three-dimensional texture — let micro-shadows and oil sheen show",
      "Keep the composition simple and sensorial; the texture is the subject",
    ],
    negativeRules: [
      "No cold or clinical surfaces (black slate, grey concrete, white glass)",
      "No flat, even lighting that flattens the texture",
      "No non-brand ingredients such as florals, crystals, or synthetic shimmer",
      "No cool blue or green colour casts",
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
