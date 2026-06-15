## Goal

Replace the legacy ComfyUI-backed `frank-create/` app with a fresh TanStack Start app served from the repo root (`src/`). It uses Lovable Cloud (Supabase) for auth/data and Lovable AI Gateway for image generation. Default model: **Nano Banana Pro**, with **Nano Banana 2** and **GPT-Image-2** selectable.

## What ships

A single Studio app with:
- **Auth** — email/password + Google sign-in (Lovable broker), gated by `_authenticated/` layout.
- **Sessions sidebar** — list/create/rename/delete chat-style sessions (one row per session in `public.sessions`).
- **Studio canvas** — prompt input, model picker (3 models), preset picker (from `public.presets`), reference image upload (for edits), aspect ratio. Streams partial previews from Lovable AI with blur-to-sharp.
- **Asset gallery** — generated images per session, stored in `studio-images` bucket, metadata in `public.assets` and `public.messages`.
- **Prompt history** — each turn writes a user `message` + assistant `message` and one asset row.

## Backend boundaries (TanStack)

- `src/routes/api/generate-image.ts` — server route, streams `/v1/images/generations` SSE through to client. Body shape branches per model (OpenAI vs Gemini `messages`+`modalities`). Uses `LOVABLE_API_KEY`.
- `src/lib/sessions.functions.ts`, `messages.functions.ts`, `assets.functions.ts` — `createServerFn` + `requireSupabaseAuth` for CRUD scoped by `auth.uid()`.
- Image upload to Supabase Storage happens server-side after the stream completes (decoded base64 → `studio-images/{user_id}/{asset_id}.png`).

## Frontend

- `src/routes/__root.tsx` — providers (QueryClient, Toaster), `<Outlet/>`, auth state listener.
- `src/routes/index.tsx` — public landing, redirects signed-in users to `/studio`.
- `src/routes/auth.tsx` — login/signup with Google + email.
- `src/routes/_authenticated/route.tsx` — managed gate (`ssr:false`).
- `src/routes/_authenticated/studio.tsx` — main studio (active session from `?session=` query or auto-create).
- `src/components/studio/*` — `SessionList`, `PromptComposer`, `ModelPicker`, `PresetPicker`, `ImageStream` (blur-on-partial), `AssetGallery`.
- `src/lib/streamImage.ts` — `eventsource-parser` + `flushSync` per the image-gen contract.

## Design

Dark editorial studio look — near-black canvas, single warm accent (amber/peach), serif display font for headings (`Fraunces`) paired with `Inter` body. Generous negative space around the live image; sidebar and composer feel like physical panels. No purple gradients.

## Build steps (this turn + next)

1. **This turn**:
   - Scaffold TanStack Start at repo root (move legacy `frank-create/` to `legacy/frank-create/`, point `lovable.toml` to root `vite`/`tsc`).
   - Add deps: `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/react-query`, `eventsource-parser`, `zod`, `tailwindcss v4`, `framer-motion`, `lucide-react`, shadcn primitives, `@radix-ui/*`.
   - Create `src/router.tsx`, `__root.tsx`, `index.tsx`, `auth.tsx`, `_authenticated/route.tsx`, `_authenticated/studio.tsx` (minimal stub).
   - Create `src/lib/streamImage.ts` + `src/routes/api/generate-image.ts` wired to all 3 models.
   - Create `src/lib/sessions.functions.ts`, `messages.functions.ts`, `assets.functions.ts` (+ storage upload server fn).
   - Create the Studio UI (composer, model picker, image stream, gallery).
   - Configure Google OAuth via `configure_social_auth`.
2. **Follow-up turn (if needed)**: presets UI polish, edit-with-reference flow for Gemini models, session rename/delete, export.

## Schema changes

None required up front — existing tables cover sessions/messages/assets/presets/model_capabilities. `studio-images` bucket already exists.

## Out of scope

Video generation, brand-kit editor, multi-project hierarchy, exports/handoffs, ComfyUI workflow blueprints. All can be added later on top of this foundation.

## What I'm NOT doing

- Not keeping `/api/frank/*` ComfyUI endpoints — they're dead without a Python backend.
- Not migrating the legacy `frank-create/` UI; archiving it under `legacy/` so nothing is lost.
- Not adding Replicate/FLUX models — only Lovable AI Gateway models per your request.

Reply "go" to start, or tweak any of the above first.
