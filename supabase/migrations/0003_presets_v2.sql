-- Presets v2 (brief §5): presets now paste a full editable prompt into the
-- composer (not a server-side system instruction). Reshape the table to a
-- pasteable prompt and re-seed the 5 Frank Body presets. The running app uses
-- the code copy in src/lib/presets.ts; this keeps the DB in sync for future
-- non-engineer editing. Frank Body Mode (style/negative system) is separate.

alter table public.presets add column if not exists emoji text;
alter table public.presets add column if not exists prompt text;
alter table public.presets alter column system_prompt drop not null;

delete from public.presets;

insert into public.presets (id, name, emoji, category, prompt) values
  ('clean-ecom', 'Clean Ecom', '🛒', 'PDP hero for DTC and retailer portals',
   'Frank Body product hero for an e-commerce PDP. Single product centred in frame on a clean white / off-white seamless studio background. Soft, even softbox lighting with no harsh shadows. The label and product name are fully legible and undistorted. No props, no clutter. Photorealistic, true-to-life packaging colour and shape, crisp detail.'),
  ('fb-lifestyle', 'FB Lifestyle', '📸', 'Warm editorial — homepage, email, social (also flat lay)',
   'Warm Frank Body lifestyle editorial. Product styled on a marble or bathroom surface in soft, warm natural window light, with dried botanicals and minimal props. Cream and terracotta tones, shallow depth of field, Vogue Beauty editorial feel. (For a flat lay, compose this as a top-down arrangement.)'),
  ('fb-model-image', 'FB Model Image', '👤', 'Model-led campaign hero — product in use',
   'Frank Body campaign hero with a model. Diverse, real skin tones and authentic natural skin texture (not AI-smooth). The product is being applied or held, with minimal styling. Warm golden-hour light, candid, confident editorial mood.'),
  ('product-texture', 'Product Texture', '🧴', 'Macro ingredient and formula shots',
   'Ultra-close macro of the Frank Body formula / key ingredient in its natural form. Rich tactile detail showing texture, sheen and consistency, warm cream-to-golden colour, editorial macro lighting. No props.'),
  ('retail-mock', 'Retail Mock', '🏪', 'Shelf and branded display concepts for ranging',
   'Realistic Frank Body retail concept: a pharmacy / beauty retailer shelf or branded gondola display with correct product facings and accurate brand blocking, adjacent competitor brands, and natural in-store lighting at an eye-level planogram view.')
on conflict (id) do update set
  name = excluded.name, emoji = excluded.emoji, category = excluded.category, prompt = excluded.prompt;
