-- Seed brand presets + model capabilities. Mirrors src/lib/presets.ts and
-- src/lib/providers/capabilities.ts. Re-runnable (upserts).
-- NOTE: the running app currently composes presets + capabilities from code;
-- these tables are the future source of truth for non-engineer editing.

insert into public.presets (id, name, category, system_prompt, positive_rules, negative_rules, default_settings_json)
values
  ('product-flat-lay', 'Product Flat Lay', 'Packaging · editorial',
   'Create a top-down flat-lay product photograph in the Frank Body style. Arrange one to three Frank Body products (coffee-scrub pouch or tub, pump bottle, or cylindrical vessel) on a warm cream or off-white textured surface such as linen, matte cotton, or plaster. Keep the palette strictly warm — cream, Hotel Pink coral, and coffee brown with black type — and light it softly and diffusely, as in gentle morning daylight. The mood is premium-artisanal and quietly cheeky, never clinical.',
   array['Use a warm cream, off-white, or soft blush surface as the background','Include a brand-signature hint of coffee: loose dark grounds scattered, or formula visible through the pack','Light softly and warmly with gentle shadows, like soft morning daylight','Keep it minimal — one to three products with deliberate negative space','Render packaging labels as crisp, legible bold sans-serif type'],
   array['No cold white, grey concrete, or black-marble surfaces','No clinical, pharmaceutical, or lab-style props (pipettes, beakers, scattered greenery)','No harsh overhead flash or hard cast shadows','No crystal, fine china, or props that read cold or aspirational'],
   '{"aspectRatio":"1:1","imageSize":"2K"}'::jsonb),
  ('pdp-product-hero', 'PDP Product Hero', 'E-commerce · studio',
   'Create a clean e-commerce product hero for a Frank Body product. Show a single product — scrub pouch, pump bottle, or tub — straight-on or at a slight three-quarter angle on a warm off-white cream background (not pure white). Use bright, professional, warm-cast lighting that renders the coral, cream, and black packaging colours accurately, with one soft shadow grounding the product. It should look like something you would want on your shelf: approachable and well-made, never clinical.',
   array['Use a warm off-white / cream background, not clinical pure white','Render the coral and cream packaging colours accurately with warm, true-to-life grading','Add a single soft, natural ground shadow to anchor the product','Light to reveal packaging surface (matte, soft-touch) and any visible formula texture'],
   array['No pure cold white, grey gradients, or lifestyle-environment backgrounds','No busy multi-prop styling — this is a clean hero, not a flat lay','No cool or desaturated colour grading'],
   '{"aspectRatio":"1:1","imageSize":"2K"}'::jsonb),
  ('campaign-hero', 'Campaign Hero', 'Model · lifestyle · beauty',
   'Create a Frank Body campaign lifestyle photograph. Feature a real-looking person of any body type and skin tone with visible, natural skin texture, using or having just used a Frank Body product — typically in a bathroom or shower with glowing, post-scrub skin. The mood is joyful, candid, and unselfconscious; warm peachy-pink tones unify the frame; light is warm and glowy, like soft window light. Body-positive, inclusive, cheeky, and fun — never cold or distancingly aspirational.',
   array['Use warm, glowy lighting with peachy-pink undertones','Keep real skin texture — natural pores, variation, and post-exfoliation glow','Capture candid, joyful, unselfconscious expressions and poses','Set the scene in a bathroom, shower, or with wet, freshly-scrubbed skin','Reflect genuine body diversity in shape, size, skin tone, and age'],
   array['No cold, blue-white high-fashion editorial lighting','No heavy retouching that erases pores or real skin texture','No stiff, aloof, or aspirational posing','No sterile white-studio or unrelated outdoor settings unless explicitly requested'],
   '{"aspectRatio":"4:5","imageSize":"4K"}'::jsonb),
  ('texture-ingredient', 'Texture / Ingredient', 'Macro · formula · skin',
   'Create a macro texture or ingredient photograph in the Frank Body style. Show either coarse, dark-brown coffee grounds with rich natural variation, a formula swatch smeared across warm-toned skin or a cream surface to reveal its consistency, or a single raw ingredient (ground coffee, sea salt, pooled coconut oil). Keep the palette warm — coffee brown, cream, and warm skin — and light it close and directional to bring out the grain of granules and the sheen of oils. The feel is sensorial and almost appetising, never clinical.',
   array['Use only warm cream or warm skin as the surface or background','Render coffee grounds with true, rich dark-brown depth','Light for three-dimensional texture — let micro-shadows and oil sheen show','Keep the composition simple and sensorial; the texture is the subject'],
   array['No cold or clinical surfaces (black slate, grey concrete, white glass)','No flat, even lighting that flattens the texture','No non-brand ingredients such as florals, crystals, or synthetic shimmer','No cool blue or green colour casts'],
   '{"aspectRatio":"1:1","imageSize":"4K"}'::jsonb)
on conflict (id) do update set
  name = excluded.name, category = excluded.category, system_prompt = excluded.system_prompt,
  positive_rules = excluded.positive_rules, negative_rules = excluded.negative_rules,
  default_settings_json = excluded.default_settings_json;

insert into public.model_capabilities (
  model_key, provider, provider_model_id, label, blurb,
  supports_editing, supports_multi_reference, max_reference_images,
  supported_aspect_ratios, supported_resolutions,
  supports_thinking, supports_multi_turn, default_settings_json)
values
  ('nano-banana-pro', 'gemini', 'gemini-3-pro-image-preview', 'Nano Banana Pro', '4K · Thinking',
   true, true, 6,
   array['1:1','2:3','3:2','3:4','4:3','4:5','5:4','9:16','16:9','21:9'], array['1K','2K','4K'],
   true, true, '{"aspectRatio":"1:1","imageSize":"2K","numImages":4}'::jsonb),
  ('nano-banana-2', 'gemini', 'gemini-3.1-flash-image-preview', 'Nano Banana 2', 'Fast · up to 2K',
   true, true, 10,
   array['1:1','2:3','3:2','3:4','4:3','4:5','5:4','9:16','16:9','21:9'], array['1K','2K'],
   false, true, '{"aspectRatio":"1:1","imageSize":"1K","numImages":4}'::jsonb),
  ('nano-banana', 'gemini', 'gemini-2.5-flash-image', 'Nano Banana', 'Original · 1K',
   true, true, 10,
   array['1:1','2:3','3:2','3:4','4:3','4:5','5:4','9:16','16:9','21:9'], array['1K'],
   false, true, '{"aspectRatio":"1:1","imageSize":"1K","numImages":4}'::jsonb),
  ('flux-1.1-pro', 'replicate', 'black-forest-labs/flux-1.1-pro', 'FLUX 1.1 Pro', 'Replicate · photoreal T2I',
   false, false, 0,
   array['1:1','2:3','3:2','3:4','4:3','4:5','5:4','9:16','16:9','21:9'], array['1K'],
   false, false, '{"aspectRatio":"1:1","imageSize":"1K","numImages":1}'::jsonb),
  ('flux-kontext-max', 'replicate', 'black-forest-labs/flux-kontext-max', 'FLUX Kontext Max', 'Replicate · prompt-based editing',
   true, false, 1,
   array['1:1','2:3','3:2','3:4','4:3','4:5','5:4','9:16','16:9','21:9'], array['1K'],
   false, true, '{"aspectRatio":"1:1","imageSize":"1K","numImages":1}'::jsonb),
  ('seedream-4', 'replicate', 'bytedance/seedream-4', 'Seedream 4', 'Replicate · up to 4K · multi-ref',
   true, true, 10,
   array['1:1','2:3','3:2','3:4','4:3','9:16','16:9','21:9'], array['1K','2K','4K'],
   false, true, '{"aspectRatio":"1:1","imageSize":"2K","numImages":1}'::jsonb),
  ('recraft-v3', 'replicate', 'recraft-ai/recraft-v3', 'Recraft V3', 'Replicate · brand & in-image text',
   false, false, 0,
   array['1:1','2:3','3:2','3:4','4:3','4:5','5:4','9:16','16:9'], array['1K'],
   false, false, '{"aspectRatio":"1:1","imageSize":"1K","numImages":1}'::jsonb),
  ('imagen-4', 'replicate', 'google/imagen-4', 'Imagen 4', 'Replicate · photoreal T2I',
   false, false, 0,
   array['1:1','3:4','4:3','9:16','16:9'], array['1K'],
   false, false, '{"aspectRatio":"1:1","imageSize":"1K","numImages":1}'::jsonb)
on conflict (model_key) do update set
  provider = excluded.provider, provider_model_id = excluded.provider_model_id,
  label = excluded.label, blurb = excluded.blurb,
  supports_editing = excluded.supports_editing, supports_multi_reference = excluded.supports_multi_reference,
  max_reference_images = excluded.max_reference_images,
  supported_aspect_ratios = excluded.supported_aspect_ratios, supported_resolutions = excluded.supported_resolutions,
  supports_thinking = excluded.supports_thinking, supports_multi_turn = excluded.supports_multi_turn,
  default_settings_json = excluded.default_settings_json;
