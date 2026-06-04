# Frank Body Image Studio

Internal, brand-controlled AI image generation + editing for the Frank Body
design team. Multi-model, conversational, multi-turn editing with a manual
edit-model picker, an opt-in Frank Body Mode style system, paste-editable brand
presets, per-user private sessions, and 4K output.

Built on **TanStack Start** (React 19 + Vite, SSR) · **Tailwind v4** ·
**shadcn/ui** · **Supabase via Lovable Cloud** (Postgres + Storage + Auth) ·
provider adapters for **Google Gemini**, **Replicate**, and **OpenAI**. Deploys
to Cloudflare Workers.

## Architecture

```
src/lib/providers/        Provider engine (server-only adapters + capability registry)
  capabilities.ts         MODEL_CAPABILITIES + EDIT_MODEL_ORDER → drives the UI & dispatch
  gemini.server.ts        Nano Banana Pro/2 (only file importing @google/genai)
  replicate.server.ts     FLUX Ultra/Kontext, Reve, Grok, Ideogram, SD3.5 (per-model input + edits)
  openai.server.ts        GPT-Image-2 / 1.5 / ChatGPT-image edit (only file importing openai)
  index.server.ts         getProvider() dispatch
src/lib/frank-body.ts     Frank Body Mode: style + negative-prompt system (+ LoRA hook)
src/lib/presets.ts        The 5 brand presets (paste an editable prompt)
src/lib/api/              createServerFn endpoints: image (generate/edit), sessions
src/lib/auth/guard.ts     @frankbody.com app-side restriction (claims-based)
src/lib/supabase/         Row types + Storage helpers (client passed in)
src/integrations/         Lovable-generated auth + Supabase clients (do not edit)
src/lib/studio/store.tsx  Client state: React Query (server data) + composer/controls
src/components/studio/    3-pane UI (sessions · conversation · controls)
supabase/migrations/      0001 schema+RLS+bucket · 0002 seed · 0003 presets v2
```

Auth + Supabase are owned by **Lovable Cloud**: a Bearer-token middleware
(`requireSupabaseAuth`) authenticates server functions and hands them an
RLS-scoped client; keys never reach the browser (provider calls go through
`createServerFn`). Per-user privacy is enforced by Postgres RLS; images live in
a private bucket and are served via short-lived signed URLs.

## Models

`src/lib/providers/capabilities.ts` is the single source of truth (preview model
IDs may change — they're isolated to that file). Routing: Gemini official ·
Replicate for everything it hosts · OpenAI where Replicate lacks it.

| Model                                 | Provider           | 4K      | Edit                        |
| ------------------------------------- | ------------------ | ------- | --------------------------- |
| Nano Banana Pro                       | Gemini             | ✓       | ✓ (T1 full regen)           |
| GPT-Image-2                           | OpenAI             | ✓       | ✓ (T2)                      |
| FLUX 1.1 Pro Ultra                    | Replicate          | ✓ (4MP) | —                           |
| Nano Banana 2                         | Gemini             | max 2K  | —                           |
| Reve 2.0 / Grok Imagine / Ideogram v3 | Replicate          | badge   | Grok ✓                      |
| GPT-Image 1.5 HF                      | OpenAI             | max 1K  | —                           |
| FLUX Kontext Max / ChatGPT Image HF   | Replicate / OpenAI | —       | edit-only                   |
| MAI-Image-2.5                         | Microsoft          | ✓       | — (coming soon, no adapter) |

Notes: image models reject `candidateCount > 1`, so N images = N parallel calls
(cost scales with count × resolution). 4K-only is enforced per model via
`supportedResolutions`; non-4K models (NB2, GPT-Image 1.5) are kept but capped.

## Frank Body Mode & presets

- **Frank Body Mode** — a global, **off-by-default** toggle that layers the Frank
  Body style + negative-prompt system onto any prompt, on any model (opt-in).
  Optional LoRA (trigger `FRANKBODY`) is a future Layer-2 enhancement.
- **Presets** — a **shared, in-app-editable** brand library (Supabase-backed).
  The 5 defaults (Clean Ecom, FB Lifestyle, FB Model Image, Product Texture,
  Retail Mock) each hold a full prompt. Click a preset to **edit** it (or Use /
  delete) and the **+** to **create** new ones; "Use" pastes the prompt into the
  composer. They work with or without Frank Body Mode.

## Setup (Lovable Cloud)

1. **Connect Supabase** in Lovable Cloud — it injects `SUPABASE_URL`,
   `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. **Run the migrations** in the Supabase SQL editor: `0001_init.sql`,
   `0002_seed.sql`, `0003_presets_v2.sql`, `0004_presets_writable.sql` (tables +
   RLS + private `studio-images` bucket + preset/capability seed + editable
   presets). _Required_ — until then there are no tables.
3. **Set provider secrets**: `GEMINI_API_KEY`, `REPLICATE_API_TOKEN`,
   `OPENAI_API_KEY` (see `.env.example`).
4. Auth/login is handled by Lovable; access is restricted to `@frankbody.com`
   (`src/lib/auth/guard.ts`).

## Commands

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # production build (regenerates routeTree.gen.ts)
bun lint
bunx tsc --noEmit
```

## Roadmap (remaining from the V2 brief)

- **LoRA training** (`ostris/flux-dev-lora-trainer` → `lucataco/flux-dev-lora`,
  trigger `FRANKBODY`) — needs a curated 100–300 image dataset; wires into the
  Frank Body Mode Layer-2 hook.
- **Masked inpainting** — canvas brush → OpenAI `images.edit` with a mask (T3).
- **Batch generation** — multiple prompt variations per session.

## Open items

- Verify preview model IDs + 4K support (Reve/Grok/Ideogram) against the live API.
- Replace placeholder copy in `src/lib/frank-body.ts` and `src/lib/presets.ts`
  with Cliff's validated brand prompts.
