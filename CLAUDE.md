# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Frank Body Image Studio — an internal, brand-controlled AI image generation +
editing tool. See `README.md` for product/setup details; this file covers the
architecture and conventions that aren't obvious from a single file.

## Commands

```bash
bun install          # install deps (Bun is the package manager; bun.lock)
bun dev              # dev server at http://localhost:3000
bun run build        # production build — also REGENERATES src/routeTree.gen.ts
bunx tsc --noEmit    # typecheck (no dedicated "typecheck" script)
bun lint             # eslint
bun run format       # prettier --write
```

No test framework is configured. Verification is `tsc` + `lint` + `build`, then
manual QA in Lovable Cloud (runtime needs Supabase connected + provider keys).
After adding/renaming a route file, run `bun run build` to regenerate
`src/routeTree.gen.ts` before `tsc` passes.

## Stack

TanStack Start (SSR on Vite + React 19), TypeScript, Tailwind v4, shadcn/ui (in
`src/components/ui/`, pre-installed — reuse, don't add a UI library), TanStack
Router (file-based) + React Query, Supabase (Postgres + Storage + Auth via
**Lovable Cloud**). Deploys to Cloudflare Workers.

## Auth & Supabase — Lovable-owned (critical)

Lovable Cloud owns auth + the Supabase clients under `src/integrations/**`
(auto-generated, **do not edit**; excluded from lint):

- **Client:** `src/integrations/supabase/client.ts` (`supabase`) + Lovable auth
  (`src/integrations/lovable`). `src/routes/login.tsx` + `__root.tsx` use these.
- **Server-fn auth:** a global client middleware (`attachSupabaseAuth`, wired in
  `src/start.ts`) attaches `Authorization: Bearer <token>` to every server-fn
  RPC; the server middleware **`requireSupabaseAuth`** validates it and provides
  `context.supabase` (RLS-scoped, token-bound) + `context.userId` + `context.claims`.
- **Admin:** `supabaseAdmin` (service role, bypasses RLS) for maintenance only.
- Env (Lovable injects on connect): `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`.

Our data server functions (`src/lib/api/*.functions.ts`) attach
`.middleware([requireSupabaseAuth])` and use `context.supabase`/`context.userId`.
Lovable's generated `Database` type is empty, so we keep the client loosely typed
(`context.supabase as unknown as SupabaseClient`) and cast rows to the interfaces
in `src/lib/supabase/types.ts`. The `@frankbody.com` restriction is enforced
app-side in `src/lib/auth/guard.ts` (`assertAllowedEmail(context.claims)`).

## Secret-safety model

Provider SDKs/secrets must never reach the client bundle:

- **`createServerFn(...).handler()`** bodies are server-only/tree-shaken.
- **`*.server.ts` suffix** (e.g. `gemini.server.ts`) = whole module server-only.
  Read provider secrets (`GEMINI_API_KEY`, `REPLICATE_API_TOKEN`, `OPENAI_API_KEY`)
  via `process.env` **inside** a handler — never at module scope (Cloudflare binds
  env per-request; isolates are shared).

## Provider engine (the central abstraction)

`src/lib/providers/capabilities.ts` → `MODEL_CAPABILITIES` is the **single source
of truth**. The UI reads it to render controls (model list, thinking toggle,
aspect ratios/resolutions, ref cap, `status`, `is4K`); the server reads it to
dispatch. The UI never imports a model SDK.

- `getProvider(providerId)` (`index.server.ts`) → an `ImageProvider` adapter:
  `gemini.server.ts` (only file importing `@google/genai`), `replicate.server.ts`
  (multi-model router; per-model `buildInput` + image-to-image edits via FLUX
  Kontext / Grok / FLUX Ultra), `openai.server.ts` (only file importing `openai`;
  GPT-Image generate + edit). `microsoft` is a placeholder that throws.
- **Routing rule:** Gemini official; Replicate for everything it hosts; OpenAI
  only where Replicate lacks it. `status: "coming-soon"` models (MAI) have no
  adapter and render disabled. `is4K` flags genuine 4K (others get a size cap).
- **Edit-model picker:** `EDIT_MODEL_ORDER` lists models offerable for editing.
  Edits dispatch to the chosen `editModelKey` (may be a different provider than
  the generation model); edit references are separate from generation references.
- **Adding a model** = add a `MODEL_CAPABILITIES` entry (+ `MODEL_ORDER` and/or
  `EDIT_MODEL_ORDER`); only add a new adapter for a new provider. Model IDs are
  _preview_ IDs — they live only here, so a rename is a one-line edit.

Generation invariants (`image.functions.ts`): N images = N parallel calls
(`Promise.allSettled`); the provider runs **before** any DB/Storage write so a
failure never leaves an orphaned turn; per-model reference caps enforced server-side.

## Frank Body Mode & presets

- **Frank Body Mode** (`src/lib/frank-body.ts`): a GLOBAL, off-by-default toggle.
  When ON, `composeFrankBodySystem()` (style descriptors + negative-prompt
  library) is applied server-side to every model (as `systemInstruction` for
  Gemini, prompt-prefix for Replicate/OpenAI). Layer-2 LoRA hook (`getLoraFor`,
  trigger `FRANKBODY`) is stubbed. Persisted in `sessions.settings_json`.
- **Presets** (`src/lib/presets.ts`): a SHARED, in-app-editable brand library
  backed by Supabase — `src/lib/api/preset.functions.ts` (CRUD) + `usePresets`
  (`['presets']` query). `presets.ts` is the seed/fallback list. In the control
  panel: click a preset → editor modal (edit / Use prompt / delete); the **+**
  creates one. "Use" pastes the prompt into the composer (`setPrompt`). Not a
  hidden system instruction; independent of Frank Body Mode. `0003` seeds the
  table, `0004` grants authenticated writes.

## Data model

`supabase/migrations/`: `0001` schema (`sessions → messages [ordered by seq] →
assets`, RLS `auth.uid()=user_id`, private `studio-images` bucket), `0002` seed,
`0003` presets v2, `0004` presets writable (shared). Assets carry `asset_type`
(`reference`|`generated`|`edited`)

- `parent_asset_id` (edit lineage). Bytes live in the bucket
  `userId/sessionId/{reference|generated}/<id>.png`, served via signed URLs.
  **Migrations must be run in Lovable's Supabase** (the generated `Database` type
  being empty means they haven't been applied yet).

## Client state

`src/lib/studio/store.tsx` (React context): React Query for server data
(`['sessions']`, `['session', id]`); local transient state for composer `prompt`,
`references`, `editParent` + `editModelKey` + `editReferences`, and per-session
controls (`modelKey`/`settings`/`frankBodyMode`, restored on switch via the
`lastSync` ref). `submit()` creates a session if none active; a `submitting` ref
blocks double-submits; an optimistic `pendingTurn`; a `didInit` ref keeps "New"
as a blank draft.

## Routing

File-based in `src/routes/` (`__root.tsx`, `index.tsx` [guarded], `login.tsx`).
`src/routeTree.gen.ts` is generated — don't hand-edit.
