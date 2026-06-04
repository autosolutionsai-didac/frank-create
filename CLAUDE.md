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

No test framework is configured — there are no unit/e2e tests or a `test`
script. Verification is `tsc` + `lint` + `build`, then manual QA against a live
Supabase project (runtime needs real Supabase + Google OAuth + API keys; see
`README.md` → Setup).

After adding/renaming a route file, run `bun run build` (or `bun dev`) to
regenerate `src/routeTree.gen.ts` before `tsc` will pass — typed `redirect`/
`Link` targets resolve against that generated file.

## Stack

TanStack Start (SSR meta-framework on Vite + React 19), TypeScript strict,
Tailwind v4, shadcn/ui (in `src/components/ui/`, pre-installed — reuse, don't add
a UI library), TanStack Router (file-based routes) + React Query, Supabase
(Postgres + Storage + Auth). Deploys to Cloudflare Workers (Nitro).

## Secret-safety model (critical convention)

Secrets and provider/Supabase SDKs must never reach the client bundle. Two
mechanisms enforce this:

- **`createServerFn(...).handler()`** (see `src/lib/api/*.functions.ts`): the
  handler body runs server-only and is tree-shaken from the client. Server-only
  imports used only inside the handler are stripped. This is the RPC boundary
  the client calls.
- **`*.server.ts` suffix** (e.g. `gemini.server.ts`, `supabase.server.ts`):
  whole module is server-only. Note `server.ts` (no dot) is NOT treated this
  way — the suffix must be `*.server.ts`.

Read secrets via `getServerConfig()` in `src/lib/config.server.ts` (or
`process.env` directly) **inside** a handler — never at module scope. On
Cloudflare Workers env binds per-request and module scope is shared across
requests in an isolate. Likewise, **create the Supabase client per-request
inside the handler**, never as a module singleton (it would leak one user's
session into another's request). `eslint.config.js` bans the Next.js
`server-only` package — use the `*.server.ts` convention instead.

## Provider engine (the central abstraction)

`src/lib/providers/capabilities.ts` → `MODEL_CAPABILITIES` is the **single
source of truth**. The UI reads it to decide which controls to render (model
list, thinking toggle, allowed aspect ratios/resolutions, reference-image cap)
and the server reads it to dispatch. The UI never imports a model SDK.

- `getProvider(providerId)` (`index.server.ts`) returns an `ImageProvider`
  adapter: `gemini.server.ts` (the ONLY file importing `@google/genai`) or
  `replicate.server.ts` (multi-model router).
- **Adding a model** = add a `MODEL_CAPABILITIES` entry (+ `MODEL_ORDER`); add a
  new adapter only for a new provider. Mirror it into `0002_seed.sql`.
- Model IDs are *preview* IDs that churn — they live only in `capabilities.ts`,
  so a rename is a one-line edit.

Generation invariants (in `gemini.server.ts` / `image.functions.ts`):
- Image models reject `candidateCount > 1`, so **N images = N parallel
  `generateContent` calls** (`Promise.allSettled`). Cost scales with count ×
  resolution.
- Reference-image caps are **6 (Pro) / 10 (NB2)**, enforced server-side from the
  registry. Not 14 (the original mockup was wrong).
- `image.functions.ts` calls the provider **before** any DB/Storage write, so a
  generation failure never leaves an orphaned turn or stray objects.

Presets (`src/lib/presets.ts`) are structured brand rules composed into the
system instruction **server-side** (`composeSystemInstruction`) so they can't be
tampered with from the client. Presets currently live in code; the `presets`
table (seeded by `0002_seed.sql`) is the future source of truth.

## Data model & auth

Supabase schema in `supabase/migrations/0001_init.sql`:
`sessions → messages (ordered by the `seq` identity column) → assets`. Assets
carry `asset_type` (`reference` | `generated` | `edited`) and
`parent_asset_id` — the edit **lineage** chain. Image bytes live in the private
`studio-images` bucket keyed `userId/sessionId/{reference|generated}/<id>.png`
and are served via short-lived signed URLs (never public).

**RLS is the enforcement** — every owned table has `auth.uid() = user_id`, and
the storage policy requires the path's first folder to equal `auth.uid()`. Pass
`user_id` on every insert. The cookie-bound server client carries the user's JWT
so RLS applies; the service-role admin client bypasses RLS and is for
maintenance only.

Auth (`src/lib/auth/auth.functions.ts`): Google OAuth, **restricted to
`@frankbody.com`** (domain check + allow-list — change it here). Root
`beforeLoad` (`__root.tsx`) calls `fetchUser` and puts the user on route
context; `/` (`index.tsx`) redirects to `/login` when absent; `/auth/callback`
exchanges the OAuth code (`exchangeOAuthCode`, which `throw`s a `redirect`). Use
`supabase.auth.getUser()` (verifies the JWT), never `getSession()`, for guards.

## Client state

`src/lib/studio/store.tsx` is a React context backing the whole UI:
- **Server data** via React Query: `['sessions']` and `['session', id]`
  (messages + assets resolved to signed URLs).
- **Transient/local**: composer `prompt`, pending `references`, `editParent`,
  and the per-session controls (`modelKey`/`settings`/`presetId`), restored from
  the session on switch (guarded by the `lastSync` ref so an in-flight edit
  isn't clobbered).
- `submit()` creates a session if none is active, then generates; a synchronous
  `submitting` ref blocks double-submits; an optimistic `pendingTurn` renders
  immediately and is cleared only after the refetch settles. A `didInit` ref
  makes the "New" button yield a blank draft instead of snapping back to the
  most-recent session.

## Routing

File-based in `src/routes/` (NOT `src/pages/`). A dot in the filename is a path
separator: `auth.callback.tsx` → `/auth/callback`. `src/routeTree.gen.ts` is
generated — don't hand-edit it.
