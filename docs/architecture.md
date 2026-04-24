# BlockThread – Architecture

## Overview

```
Browser (Next.js App Router)
  │
  ├── /new                      ← job creation, garment type + output type selection
  ├── /projects/[id]            ← job overview, uploaded images
  ├── /projects/[id]/editor     ← template preview, region adjustment
  └── /projects/[id]/export     ← download PNG
         │
         ▼
  packages/core                 ← Zod schemas: GarmentType, OutputType, GenerationJob
         │
         ▼
  packages/template-engine      ← TemplateCanvas (585×559), panel regions, placeholder generator
         │
         ▼
  workers/image (Python)        ← Pillow-based PNG renderer (prototype)
         │
         ▼
  Output: classic clothing PNG
```

## Packages

### packages/core

Shared schemas and types used across the web app and template engine:

- `GarmentSchema` – garment type (shirt | pants), upload slots
- `GenerationJobSchema` – job ID, status, garment, output type
- `OutputTypeSchema` – shirt | pants
- Zod validation utilities

### packages/template-engine

Defines the Roblox classic template canvas and panel regions:

- `TEMPLATE_CANVAS` – `{ width: 585, height: 559 }`
- `PanelRegion` – typed record `{ name, x, y, width, height, label, fillColor }`
- `SHIRT_PANELS` / `PANTS_PANELS` – canonical panel definitions
- `generatePlaceholderLayout` – returns panel list for a given output type
- `buildExportMetadata` – constructs PNG export metadata record

### workers/image

Python prototype for actual pixel-level rendering:

- `scripts/generate_classic_template.py` – creates a 585×559 RGBA PNG with labelled panels
- `tests/test_template_dimensions.py` – pytest tests verifying dimensions and panels

### apps/web

Next.js 14+ App Router application:

- Landing page explaining the workflow
- `/new` – create a new project
- `/projects/[id]` – project overview
- `/projects/[id]/editor` – template preview/edit
- `/projects/[id]/export` – export PNG

## Data flow (MVP)

1. User selects garment type and output type on `/new`.
2. A `GenerationJob` is created in client-side state (future: persisted to DB).
3. `generatePlaceholderLayout` is called with the output type.
4. The editor page renders the panel regions as an SVG/Canvas overlay.
5. On export, the Python worker (or mock) generates the PNG.

## Future additions

- Background removal via `rembg`
- Clothing region segmentation via OpenCV
- AI plug-in point for style mapping
- Database persistence (Postgres / SQLite)
- File storage (S3-compatible)
