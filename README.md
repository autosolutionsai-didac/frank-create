# Frank Body Image Studio

Internal, brand-controlled AI image generation + editing for the Frank Body
design team. Conversational, multi-turn editing with reference images, Frank
Body presets, per-user private sessions, and 4K output.

Built on **TanStack Start** (React 19 + Vite, SSR) · **Tailwind v4** ·
**shadcn/ui** · **Supabase** (Postgres + Storage + Auth) · provider adapters for
**Google Gemini** (Nano Banana Pro / 2) and **Replicate**. Deploys to Cloudflare
Workers.

## Architecture

```
src/lib/providers/        Provider engine (server-only adapters + capability registry)
  capabilities.ts         Model registry → drives which UI controls render per model
  gemini.server.ts        Nano Banana Pro/2 adapter (isolates @google/genai)
  replicate.server.ts     Replicate multi-model router adapter
  index.server.ts         getProvider() dispatch
src/lib/presets.ts        Frank Body brand presets + system-instruction composition
src/lib/supabase/         Server (cookie-bound + admin) & browser clients, storage, types
src/lib/auth/             fetchUser / OAuth exchange / signOut server functions
src/lib/api/              createServerFn endpoints: image (generate/edit), sessions
src/lib/studio/store.tsx  Client state: React Query (server data) + local composer state
src/components/studio/    3-pane UI (sessions · conversation · controls)
src/routes/               / (studio, guarded) · /login · /auth/callback
supabase/migrations/      0001 schema + RLS + bucket · 0002 seed presets/capabilities
```

Keys never reach the browser: every model call is proxied through a
`createServerFn` server function that reads secrets from `process.env`.
Per-user privacy is enforced by Postgres RLS; images live in a private Storage
bucket and are served via short-lived signed URLs.

## Setup

### 1. Install

```bash
bun install
```

### 2. Supabase project

1. Create a project at supabase.com.
2. Run the migrations (SQL editor, or `supabase db push` with the CLI):
   - `supabase/migrations/0001_init.sql` — tables, RLS, the private
     `studio-images` bucket + per-user folder policies.
   - `supabase/migrations/0002_seed.sql` — brand presets + model capabilities.
3. **Auth → Providers → Google**: enable Google, add your Google Cloud OAuth
   client ID/secret. In Google Cloud the authorized redirect URI is your
   Supabase `…/auth/v1/callback`.
4. **Auth → URL Configuration → Redirect URLs**: add
   `http://localhost:3000/auth/callback` (dev) and your production
   `…/auth/callback`.

Access is restricted to `@frankbody.com` accounts (plus an optional allow-list)
in `src/lib/auth/auth.functions.ts`.

### 3. Environment

Copy `.env.example` to `.env` and fill in:

```
GEMINI_API_KEY=            # server-only
REPLICATE_API_TOKEN=       # server-only (Replicate models)
VITE_SUPABASE_URL=         # public
VITE_SUPABASE_ANON_KEY=    # public
SUPABASE_SERVICE_ROLE_KEY= # server-only
```

In production set these as Cloudflare Worker secrets.

### 4. Run

```bash
bun dev        # http://localhost:3000
bun run build  # production build
bun lint       # eslint
```

### Deployment (Cloudflare Workers)

Secrets are read via `process.env` **inside** handlers, which on Workers
requires:

- `nodejs_compat` enabled and `compatibility_date >= 2024-09-23` (the Buffer/
  process polyfills the Gemini/Replicate/Supabase server code relies on).
- All env vars bound as **Worker secrets/vars** (not just baked into the client
  build): `GEMINI_API_KEY`, `REPLICATE_API_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`,
  and also `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (these need to exist at
  **both** build time for `import.meta.env` and runtime for `process.env`).

## Models

`src/lib/providers/capabilities.ts` is the single source of truth. Verified
facts (preview model IDs may change — they're isolated to that one file):

| Model                     | ID                               | Refs | Sizes    | Thinking |
| ------------------------- | -------------------------------- | ---- | -------- | -------- |
| Nano Banana Pro           | `gemini-3-pro-image-preview`     | 6    | 1K/2K/4K | yes      |
| Nano Banana 2             | `gemini-3.1-flash-image-preview` | 10   | 1K/2K    | no       |
| Nano Banana               | `gemini-2.5-flash-image`         | 10   | 1K       | no       |
| FLUX 1.1 Pro / Seedream 4 | Replicate slugs (placeholders)   | —    | —        | no       |

Notes: image models reject `candidateCount > 1`, so N images = N parallel calls
(cost scales with count × resolution). Reference caps are **6/10**, not 14.

## Open items before go-live

- Confirm the final **Replicate model list** + per-model input mappings
  (`replicate.server.ts` `buildInput`).
- Replace the **placeholder brand rules** in `src/lib/presets.ts` /
  `0002_seed.sql` with real guidance.
- Verify preview model IDs against the live API with a real key.
