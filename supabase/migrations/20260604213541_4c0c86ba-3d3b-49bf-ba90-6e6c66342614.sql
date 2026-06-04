
insert into public.presets (id, name, category, system_prompt, positive_rules, negative_rules, default_settings_json)
values
  ('product-flat-lay', 'Product Flat Lay', 'Packaging · editorial',
   'Create a Frank Body product flat-lay: top-down packaging shot with an editorial, premium skincare-brand aesthetic.',
   array['True-to-life packaging detail and crisp, readable labels','Natural soft shadows and believable materials','Clean, considered composition with intentional negative space'],
   array['Do not distort the product name or packaging shape','Do not add unrelated props or clutter'],
   '{"aspectRatio":"1:1","imageSize":"2K"}'::jsonb),
  ('pdp-product-hero', 'PDP Product Hero', 'E-commerce · studio',
   'Create a Frank Body e-commerce PDP hero image: clean studio product shot optimised for a product detail page.',
   array['Product centred and sharply in focus with accurate colour','Even, flattering studio lighting on a clean background','Realistic scale and crisp label readability'],
   array['Do not blur or warp the product name','Do not introduce busy or distracting backgrounds'],
   '{"aspectRatio":"1:1","imageSize":"2K"}'::jsonb),
  ('campaign-hero', 'Campaign Hero', 'Model · lifestyle · beauty',
   'Create a Frank Body campaign hero: lifestyle/beauty imagery with a warm, confident, premium brand mood.',
   array['Photorealistic, editorial lighting and natural skin texture','Cohesive integration of the product into the scene','Believable reflections and natural shadows'],
   array['Do not make the product too small or barely visible','Do not produce an artificial or over-retouched look'],
   '{"aspectRatio":"4:5","imageSize":"4K"}'::jsonb),
  ('texture-ingredient', 'Texture / Ingredient', 'Macro · formula · skin',
   'Create a Frank Body texture/ingredient macro: close-up of formula or key ingredients with a tactile, premium feel.',
   array['Rich macro detail showing texture, sheen and consistency','Accurate materials and natural lighting','Appetising, clean, brand-aligned colour palette'],
   array['Do not produce unrealistic or plastic-looking textures','Do not add unrelated objects'],
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
  ('flux-1.1-pro', 'replicate', 'black-forest-labs/flux-1.1-pro', 'FLUX 1.1 Pro', 'Replicate · text-to-image',
   false, false, 0,
   array['1:1','2:3','3:2','3:4','4:3','16:9','9:16'], array['1K','2K'],
   false, false, '{"aspectRatio":"1:1","imageSize":"1K","numImages":1}'::jsonb),
  ('seedream-4', 'replicate', 'bytedance/seedream-4', 'Seedream 4', 'Replicate · text-to-image',
   false, false, 0,
   array['1:1','3:4','4:3','16:9','9:16'], array['1K','2K'],
   false, false, '{"aspectRatio":"1:1","imageSize":"1K","numImages":1}'::jsonb)
on conflict (model_key) do update set
  provider = excluded.provider, provider_model_id = excluded.provider_model_id,
  label = excluded.label, blurb = excluded.blurb,
  supports_editing = excluded.supports_editing, supports_multi_reference = excluded.supports_multi_reference,
  max_reference_images = excluded.max_reference_images,
  supported_aspect_ratios = excluded.supported_aspect_ratios, supported_resolutions = excluded.supported_resolutions,
  supports_thinking = excluded.supports_thinking, supports_multi_turn = excluded.supports_multi_turn,
  default_settings_json = excluded.default_settings_json;
