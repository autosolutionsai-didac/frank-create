## Problem

Lovable's runner expects a Node app at the repo root, but this repo is a ComfyUI fork — the actual web app lives in `frank-create/`. Two failures stem from that:

1. `no package.json found` — preflight checks for `/dev-server/package.json` before any `lovable.toml` script runs.
2. `dist-check failed` — after build, the runner looks for `dist/` at the repo root, but Vite currently emits `frank-create/dist/`.

`lovable.toml` alone can't satisfy either check; we need real files at the root.

## Plan

1. **Create `/package.json` at repo root** that delegates to the subdir app:
   ```json
   {
     "name": "frank-create-root",
     "private": true,
     "scripts": {
       "dev": "npm --prefix frank-create install --silent && npm --prefix frank-create run dev -- --host 0.0.0.0 --port 8080",
       "build": "npm --prefix frank-create install --silent && npm --prefix frank-create run build",
       "build:dev": "npm run build"
     }
   }
   ```
   `npm --prefix` avoids needing `cd` (the runner doesn't spawn a shell), which also resolves the earlier "command not found: cd" issue without `sh -c` wrapping.

2. **Point Vite output to repo-root `dist/`** so `dist-check` finds it. Edit `frank-create/vite.config.ts`:
   ```ts
   build: { outDir: "../dist", emptyOutDir: true }
   ```

3. **Simplify `lovable.toml`** to just run the root scripts (no `cd`, no `sh -c`):
   ```toml
   [run]
   dev = "npm run dev"
   "build:dev" = "npm run build:dev"
   build = "npm run build"
   ```

4. **Add `dist/` to `.gitignore`** at repo root if not already ignored.

5. **Verify** by running `npm run build` from `/dev-server` and confirming `/dev-server/dist/index.html` exists, then checking the dev server starts on port 8080.

## Notes

- No changes to the actual app code in `frank-create/src/`.
- Vite's `--host 0.0.0.0 --port 8080` override in the root `dev` script supersedes the `127.0.0.1:5174` defaults in `vite.config.ts` for Lovable's preview.
- This keeps the ComfyUI Python codebase untouched.
