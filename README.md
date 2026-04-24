# BlockThread

Photo-to-Roblox classic clothing generator for 2D shirt and pants templates.

BlockThread takes uploaded photos of real clothing and produces ready-to-upload Roblox **classic clothing** PNG templates (shirt/pants). It is a deterministic, testable 2D pipeline — no 3D meshes, no layered clothing, no Roblox private APIs.

---

## Setup

### Prerequisites

- Node.js 22 LTS
- pnpm 9+
- Python 3.11+ (for image worker)

### Install

```bash
pnpm install
```

### Run the web app

```bash
pnpm --filter web dev
```

### Type check

```bash
pnpm typecheck
```

### Test (TypeScript)

```bash
pnpm test
```

### Build

```bash
pnpm build
```

### Python worker

```bash
cd workers/image
pip install -r requirements.txt
python scripts/generate_classic_template.py
pytest tests/
```

---

## Monorepo structure

```
/
  apps/web/           # Next.js App Router front-end
  packages/core/      # Shared Zod schemas, garment types, job types
  packages/template-engine/ # Classic template layout definitions and panel helpers
  workers/image/      # Python Pillow image pipeline prototype
  fixtures/           # Test fixtures, sample PNGs, template canvases
  docs/               # Product docs, architecture, roadmap
```

---

## Architecture overview

1. User uploads front/back clothing photos via the web app.
2. A generation job is created (typed via `packages/core`).
3. The template engine (`packages/template-engine`) maps clothing regions onto the canonical 585×559 Roblox classic template canvas.
4. The Python image worker renders a placeholder PNG (future: real segmentation via Pillow/OpenCV).
5. The user previews the result in `/projects/[id]/editor` and exports from `/projects/[id]/export`.

---

## MVP limitations

- PNG generation is placeholder/mocked in TypeScript; real pixel-level rendering is in the Python worker prototype.
- No user accounts or cloud storage yet.
- No AI segmentation yet (plug-in points exist in the pipeline).
- Background removal is not yet implemented.
- Output is a flat labelled placeholder canvas until the image pipeline is wired end-to-end.

---

## Safety and copyright

Users are solely responsible for uploading only clothing photos they own or have explicit permission to use. See `docs/safety-and-copyright.md`.

---

## Next recommended tasks

1. Wire the Python worker output back into the Next.js app via an API route.
2. Implement real background removal (e.g. rembg).
3. Add segmentation to map clothing regions to template panels.
4. Add user project persistence (database or file-system).
Photo-to-Roblox classic clothing generator for 2D shirt and pants templates.
