# Frank Create

Creative studio for frank body image generation. Brief an image in plain English, add optional reference shots, generate picks with hosted image models, then review, approve, and export the winners.

## Architecture

- **`frank-create/`** — the whole product. A Vite + React + TypeScript single-page app.
  - `src/App.tsx` — studio UI (sessions, briefs, rounds, review, exports).
  - `server/frankApi.ts` — in-process backend, mounted as a Vite middleware plugin. Serves every `/api/frank/*` route the SPA calls: model inference through the Lovable AI Gateway, persistence and image storage through Lovable Cloud (Supabase).
  - `src/lib/` — API client, studio helpers, model presets, shared types.
- **`supabase/functions/frank-generate/`** — Supabase Edge Function used as the offline/direct generation path.

There is no separate backend process: the Vite dev server *is* the backend.

## Running

Requires Node 22+. Environment variables are read from `.env` in the repo root (names only — get values from the team vault):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LOVABLE_API_KEY`

```bash
npm run dev      # installs frank-create deps and serves the studio on :8080
```

Or from `frank-create/` directly:

```bash
npm install
npm run dev      # http://127.0.0.1:5174
npm test         # vitest suite
npm run build    # production build to ../dist
```

## History

This repository began as a ComfyUI fork; the product has since fully migrated to the Lovable AI Gateway + Supabase backend, and the Python engine was removed. The pre-removal state is preserved in git history.
