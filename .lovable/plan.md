
## Goal
Keep the existing `frank-create/` React UI untouched. Replace its ComfyUI-backed `/api/frank/*` backend with a TanStack Start backend that uses Lovable AI Gateway for inference and Lovable Cloud (Supabase) for the minimal CRUD the UI needs.

## Current state
- Frontend: `frank-create/` Vite app, calls `/api/frank/*`, `/api/upload/image`, `/api/prompt` via `src/lib/api.ts`.
- Today those URLs proxy to a local Python ComfyUI server (not present in the Lovable sandbox), so every call fails.
- Lovable Cloud is already provisioned with tables `sessions`, `messages`, `assets`, `model_capabilities`, `presets`, and a private bucket `studio-images`.
- Root TanStack Start app exists but isn't currently served (lovable.toml runs the frank-create Vite app directly).

## Approach
1. **Serve frank-create from the TanStack Start app** so server routes are available on the same origin:
   - Build frank-create as a static SPA and mount it from the root TanStack app, OR
   - Move the React source into `src/` and let TanStack serve it. Recommend option A (less churn): `frank-create` keeps building to `dist/`, and a TanStack catch-all route serves those static files. The dev server adds a Vite middleware that proxies non-`/api/*` requests to the frank-create dev server on port 5174.

2. **Implement the minimum `/api/frank/*` surface** as TanStack server routes under `src/routes/api/frank/`. Only the endpoints the UI hits at runtime, returning shapes that match `frank-create/src/lib/types.ts`:
   - `GET /health`, `GET /config`, `GET /models`, `GET /provider-status`, `GET /activation-checklist`, `GET /demo-doctor` → return static "ok / Lovable AI ready" payloads so the dashboard/health UI lights up green.
   - `GET/POST/PATCH /sessions`, `/turns`, `/assets`, `/projects`, `/briefs` → thin CRUD backed by the existing Cloud tables (`sessions`, `messages` as turns, `assets`). Projects/briefs map to in-memory stubs since there's no table — return single default rows so the UI navigates.
   - `GET /brand-kit`, `PATCH /brand-kit` → store JSON in `sessions.settings_json` of a "brand-kit" session row (no schema change needed).
   - `POST /prompt-remix` → call Lovable AI `google/gemini-3-flash-preview` with a "rewrite this prompt 3 ways" system prompt, return `{ variants }`.
   - `POST /inference/turn` → call Lovable AI image generation (`openai/gpt-image-2`, streaming OFF for first pass), save bytes to `studio-images` bucket, insert an `assets` row, return `{ turn, status: "complete", assets }`.
   - `POST /videos` → return `{ status: "blocked", error: { code: "video_not_supported", message: "Video generation is not wired to Lovable AI yet." } }` so the UI degrades cleanly.
   - `POST /exports`, `GET /assets/:id/download`, etc. → simple signed-URL passthrough from `studio-images`.

3. **Drop the legacy ComfyUI calls** the UI makes directly:
   - `uploadImage` (`/api/upload/image`) → replace implementation in `frank-create/src/lib/api.ts` only (this is the one tiny frontend exception) to upload to `studio-images` via the new `/api/frank/uploads` route; UI stays the same.
   - `queuePrompt` / `fetchPromptHistory` → stub the route to return an immediate fake completion so any caller that still uses it doesn't crash.

4. **Auth**: routes go under `src/routes/api/frank/` (public on `/api/public/*` is only needed for external callers). All routes call `requireSupabaseAuth` via a middleware so each session/turn/asset is scoped to `auth.uid()`. The frank-create UI has no login screen — add a minimal anonymous sign-in helper in `frank-create/src/lib/api.ts` that calls `supabase.auth.signInAnonymously()` on first load so RLS works without UI changes. (Enable anonymous auth via `configure_auth`.)

5. **Wire the Lovable AI Gateway helper** at `src/lib/ai-gateway.server.ts` per the standard pattern and use it from every server route that calls a model.

## Technical details

```text
src/
  routes/
    api/
      frank/
        health.ts           GET
        config.ts           GET
        models.ts           GET
        provider-status.ts  GET
        activation-checklist.ts
        demo-doctor.ts
        sessions.ts         GET, POST
        sessions.$id.ts     PATCH
        turns.ts            GET, POST
        turns.$id.ts        PATCH
        assets.ts           GET, POST
        assets.$id.ts       PATCH, DELETE
        brand-kit.ts        GET, PATCH
        prompt-remix.ts     POST  → Lovable AI chat
        inference/turn.ts   POST  → Lovable AI image gen + storage
        videos.ts           POST  → returns "blocked"
        exports.ts          GET, POST
        uploads.ts          POST  → studio-images
      prompt.ts             POST stub (ComfyUI compat)
      upload/image.ts       POST → studio-images
  lib/
    ai-gateway.server.ts    Lovable AI provider helper
    frank-store.functions.ts  shared Supabase helpers
```

Server-only env: `LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (all already present).

Storage: `studio-images` bucket already exists (private). Asset rows in `assets` store `storage_path`; downloads use `createSignedUrl`.

frank-create build: leave `frank-create/vite.config.ts` proxy pointing at `http://127.0.0.1:3000` (the TanStack dev port) instead of ComfyUI, so dev hot-reload still works and API calls hit Lovable.

## Out of scope (will degrade gracefully, not crash)
- Local ComfyUI engine status, workflow blueprints, provider env editor, demo evidence / call-brief / readiness-pack generators, channel exports, review board, sync manifest, workflow receipts. These endpoints will return stub responses (`{ ok: true }` or `{ status: "blocked" }`) so the panels render without errors. We can wire them later if needed.
- Video generation (no equivalent in Lovable AI Gateway today).
- ComfyUI canvas (`/comfy/?frankAssetId=...`) — the link will 404; we can hide it later if you want.

## Verification
1. `npm run build` succeeds from repo root.
2. Visit the preview, sign-in happens silently, the Studio loads with a default session.
3. Type a prompt → click Generate → a real Lovable AI image appears and persists in `studio-images`.
4. Prompt remix returns 3 variants from Gemini.
5. Reload — sessions, turns, and assets are still there (Cloud-persisted).
