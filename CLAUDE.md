# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## What this is

**Frank Create** — an AI image-generation studio for product photography, built for
the Frank Body brand and hosted on Lovable Cloud. See [`README.md`](./README.md) for
the product overview and [`DESIGN.md`](./DESIGN.md) for the design system / brand voice.

> This repo was originally a **ComfyUI fork**. The ComfyUI Python engine has been
> removed — the product runs entirely on a React + Lovable Cloud stack. The full
> pre-cleanup fork is preserved on the `archive/comfyui-fork` branch. Do **not**
> reintroduce ComfyUI Python code, `*.cmd`/PowerShell demo scripts, or the old
> `/api/frank` Python backend.

## Architecture (the whole app lives in `frank-create/`)

```
frank-create/
  src/
    App.tsx                main UI (large; being decomposed — see "Refactor")
    App.test.tsx           behavioral regression suite (renders <App/>, DOM assertions)
    AuthGate.tsx, main.tsx
    styles.css             all UI styling (no Tailwind/CSS framework)
    lib/                   api client, types, presets, and extracted pure helpers
    components/            extracted, props-driven UI components (growing)
  server/frankApi.ts       THE backend: a Vite middleware implementing /api/frank/*,
                           using the Lovable AI Gateway (image gen) + Supabase (data)
supabase/                  Supabase config + the frank-generate edge function
docs/                      design system + archived (historical) demo/runbook docs
```

There is **no separate backend process** — `frank-create/server/frankApi.ts` runs in
the Vite server. Image generation → Lovable AI Gateway (`google/gemini-2.5-flash-image`);
persistence → Supabase tables (`sessions`, `messages`, `assets`) + the private
`studio-images` bucket.

## Commands

```bash
# repo root
npm run dev          # install frank-create deps + Vite dev server on :8080
npm run build        # tsc -b && vite build  → ./dist

# inside frank-create/
npm test             # vitest run (always keep this green)
npm run lint         # eslint src
npm run format:check # prettier --check src
```

Env: `frank-create` reads the repo-root `.env` (Vite `envDir: ".."`). Public client
vars are `VITE_*`. Server-only secrets (`SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`)
are injected by the Lovable environment and must never be committed or sent to the client.

## Conventions

- **TypeScript + React 18 + Vite.** Strict mode is on. Avoid `any`; reuse the shared
  types in `frank-create/src/lib/types.ts`.
- **Style:** Prettier — 140 cols, double quotes, no trailing commas, LF. Match the
  surrounding code; do not run a repo-wide reformat in feature PRs.
- **Tests are the contract.** `App.test.tsx` exercises behavior end-to-end. Any refactor
  must keep `npm test` green.

## Refactor in progress: shrinking `App.tsx`

`App.tsx` was a ~6k-line monolith. We are extracting it incrementally and safely:
`App.tsx` has no named exports and tests only import the default component, so moving a
pure helper or standalone component into `src/lib/`/`src/components/` and re-importing it
is DOM-identical. Pattern: cut → paste into a new module with explicit imports →
re-import into `App.tsx` → `npm test` + `npm run build` → commit.

Already extracted: `src/lib/format.ts`, `src/lib/walkthrough.ts`.
Still to extract (pure helpers + ~9 components): `assets`, `exports`, `workflowMeta`,
`providerPlan`, `readiness`, `sessionConfig`, and components like `CompareDialog`,
`FrankGraphView`, `MaskPainterDialog`, `OutputStrip`, `WalkthroughOverlay`.

## Notes

- License is GPL-3.0 (inherited from the ComfyUI fork).
- CI (`.github/workflows/ci.yml`) builds + tests on PR; lint is currently non-blocking.
