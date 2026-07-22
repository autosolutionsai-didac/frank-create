# Frank Create

**Frank Create** is an AI image-generation studio for product photography and
creative direction. You brief a product, generate image rounds with an AI model,
edit and approve picks, then export channel-ready files — all in a guided,
on-brand studio UI.

It is built for and styled after [Frank Body](https://www.frankbody.com/)'s brand
(soft pink, off-black ink, cheeky second-person voice — see [`DESIGN.md`](./DESIGN.md)),
and it runs on [Lovable](https://lovable.dev/) Cloud.

> **History:** this repository began as a fork of [ComfyUI](https://github.com/comfyanonymous/ComfyUI).
> The product has since moved entirely to a React + Lovable Cloud stack, and the
> ComfyUI Python engine has been removed. The full pre-cleanup fork is preserved
> on the `archive/comfyui-fork` branch.

## What it does

- **Studio** — a guided session: add references, write a brief, pick a model, generate rounds.
- **Product Shot Lab** — task presets for product work (background sweep, glow-up, polish, remix, crop, high-res prep).
- **Edit** — masked/inpaint edits, remix a prompt, reuse an output as a reference for the next round.
- **Review & approve** — favorite, approve/reject, and annotate picks.
- **Export** — package approved images per channel preset (square, original, etc.).
- **Brand Kit** — save style guidance, negative guardrails, and reference notes.

## Architecture

```
frank-create/            React + Vite single-page app (TypeScript)
  src/                   UI (App.tsx), lib/ (api, types, helpers), components/
  server/frankApi.ts     In-process backend: a Vite middleware that serves every
                         /api/frank/* route, delegating image generation to the
                         Lovable AI Gateway and persistence to Supabase.
supabase/                Supabase config + the frank-generate edge function
docs/                    Design system + archived demo/runbook material
```

- **Frontend:** React 18 + Vite + TypeScript (no UI framework; custom CSS in `frank-create/src/styles.css`).
- **Backend:** there is no separate server process. `frank-create/server/frankApi.ts`
  runs as a Vite plugin and implements the `/api/frank/*` API in-process —
  image generation via the **Lovable AI Gateway** (`google/gemini-2.5-flash-image`)
  and storage/CRUD via **Supabase** (`sessions`, `messages`, `assets` tables and
  the private `studio-images` bucket).
- **Auth:** Lovable Cloud sign-in; access is gated to allow-listed email domains
  in `frankApi.ts`.

## Getting started

```bash
# from the repo root
npm run dev      # installs frank-create deps and starts the Vite dev server on :8080
npm run build    # type-checks and builds the SPA to ./dist
```

### Environment

`frank-create` reads its env from the repo root `.env` (via Vite `envDir: ".."`).

Client (committed, public) keys:

| Var | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL (browser client) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key |

Server-only secrets (injected by the Lovable environment — **never commit**):

| Var | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase URL for the server middleware |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key used by `frankApi.ts` |
| `LOVABLE_API_KEY` | Lovable AI Gateway key for image generation |

## Working in this repo

```bash
cd frank-create
npm test            # vitest (App.test.tsx is the behavioral regression suite)
npm run build       # tsc -b && vite build (type-check + build)
npm run lint        # eslint src
npm run format:check
```

See [`docs/`](./docs) for the design system and archived demo/runbook notes.

## License

GPL-3.0 (inherited from the ComfyUI fork) — see [`LICENSE`](./LICENSE).
