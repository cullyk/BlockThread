# BlockThread MVP Roadmap

## Phase 0 – Scaffold (current)

- [x] Monorepo structure
- [x] packages/core: Zod schemas, garment types, job types
- [x] packages/template-engine: panel definitions, placeholder generator
- [x] apps/web: Next.js shell, landing page, /new, /projects/[id], editor, export
- [x] workers/image: Python placeholder PNG generator
- [x] Unit tests (TypeScript + Python)
- [x] Docs

## Phase 1 – Real image pipeline

- [ ] Integrate `rembg` for background removal
- [ ] Basic clothing region detection (Pillow crop + manual anchor)
- [ ] Wire Python worker output into Next.js via API route (`/api/generate`)
- [ ] Store generated PNG locally (filesystem or SQLite blob)

## Phase 2 – Editor improvements

- [ ] Interactive panel boundary adjustment in the browser
- [ ] Zoom, pan, and region highlight
- [ ] Save/load project state

## Phase 3 – Persistence

- [ ] User accounts (NextAuth / Clerk)
- [ ] Project database (Postgres / SQLite)
- [ ] File storage (S3-compatible / Cloudflare R2)

## Phase 4 – Quality

- [ ] OpenCV-based automatic seam detection
- [ ] AI plug-in point for style mapping / texture enhancement
- [ ] Batch export for shirt + pants in one job

## Phase 5 – Polish

- [ ] Export with correct Roblox metadata
- [ ] One-click copy to Roblox Studio (future Roblox API, if public)
- [ ] Mobile-responsive upload UI
