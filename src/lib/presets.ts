// Frank Body presets (brief §5). Each preset pastes a full, EDITABLE prompt into
// the composer — the user edits it freely before generating. Presets are
// independent of Frank Body Mode (they work with or without it).
//
// PLACEHOLDER prompt copy: refine with Cliff's validated brand prompts.

export interface Preset {
  id: string;
  name: string;
  emoji: string;
  purpose: string;
  prompt: string;
}

export const FRANK_BODY_PRESETS: Preset[] = [
  {
    id: "clean-ecom",
    name: "Clean Ecom",
    emoji: "🛒",
    purpose: "PDP hero for DTC and retailer portals",
    prompt:
      "Frank Body product hero for an e-commerce PDP. Single product centred in frame on a clean white / off-white seamless studio background. Soft, even softbox lighting with no harsh shadows. The label and product name are fully legible and undistorted. No props, no clutter. Photorealistic, true-to-life packaging colour and shape, crisp detail.",
  },
  {
    id: "fb-lifestyle",
    name: "FB Lifestyle",
    emoji: "📸",
    purpose: "Warm editorial — homepage, email, social (also flat lay)",
    prompt:
      "Warm Frank Body lifestyle editorial. Product styled on a marble or bathroom surface in soft, warm natural window light, with dried botanicals and minimal props. Cream and terracotta tones, shallow depth of field, Vogue Beauty editorial feel. (For a flat lay, compose this as a top-down arrangement.)",
  },
  {
    id: "fb-model-image",
    name: "FB Model Image",
    emoji: "👤",
    purpose: "Model-led campaign hero — product in use",
    prompt:
      "Frank Body campaign hero with a model. Diverse, real skin tones and authentic natural skin texture (not AI-smooth). The product is being applied or held, with minimal styling. Warm golden-hour light, candid, confident editorial mood.",
  },
  {
    id: "product-texture",
    name: "Product Texture",
    emoji: "🧴",
    purpose: "Macro ingredient and formula shots",
    prompt:
      "Ultra-close macro of the Frank Body formula / key ingredient in its natural form. Rich tactile detail showing texture, sheen and consistency, warm cream-to-golden colour, editorial macro lighting. No props.",
  },
  {
    id: "retail-mock",
    name: "Retail Mock",
    emoji: "🏪",
    purpose: "Shelf and branded display concepts for ranging",
    prompt:
      "Realistic Frank Body retail concept: a pharmacy / beauty retailer shelf or branded gondola display with correct product facings and accurate brand blocking, adjacent competitor brands, and natural in-store lighting at an eye-level planogram view.",
  },
];

export function getPreset(id: string | null | undefined): Preset | undefined {
  if (!id) return undefined;
  return FRANK_BODY_PRESETS.find((p) => p.id === id);
}
