# workers/image – Python Image Pipeline

This directory contains the Python prototype for generating Roblox classic clothing template PNGs.

## Setup

```bash
cd workers/image
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Generate a placeholder template

```bash
python scripts/generate_classic_template.py
# Output: output/classic_template_shirt.png  (585×559)
#         output/classic_template_pants.png  (585×559)
```

## Run tests

```bash
pytest tests/
```

## Design

The pipeline is intentionally simple for Phase 0:

1. Create a 585×559 RGBA transparent canvas (Pillow).
2. Draw each panel region as a filled rectangle with a label.
3. Save as PNG.

Future phases will add:
- Background removal (`rembg`)
- Clothing region segmentation (OpenCV)
- AI texture mapping plug-in point
