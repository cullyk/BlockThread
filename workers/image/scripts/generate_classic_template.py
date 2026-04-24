"""
generate_classic_template.py

Generates placeholder Roblox classic clothing template PNGs (585x559).
Each panel region is filled with a distinct colour and labelled.

Usage:
    python scripts/generate_classic_template.py [--output-dir OUTPUT_DIR]

Output:
    OUTPUT_DIR/classic_template_shirt.png
    OUTPUT_DIR/classic_template_pants.png
"""

from __future__ import annotations

import argparse
import os
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

CANVAS_WIDTH = 585
CANVAS_HEIGHT = 559

@dataclass
class PanelRegion:
    name: str
    label: str
    x: int
    y: int
    width: int
    height: int
    fill_color: str


SHIRT_PANELS: list[PanelRegion] = [
    PanelRegion("torso-front",     "Torso Front",   98,  2,   192, 248, "#a8d8ea"),
    PanelRegion("torso-back",      "Torso Back",    292, 2,   192, 248, "#a8d8ea"),
    PanelRegion("torso-left",      "Torso Left",    2,   2,   94,  248, "#b8e0d2"),
    PanelRegion("torso-right",     "Torso Right",   486, 2,   94,  248, "#b8e0d2"),
    PanelRegion("right-arm-front", "R Arm Front",   98,  252, 64,  192, "#d6eaf8"),
    PanelRegion("right-arm-back",  "R Arm Back",    164, 252, 64,  192, "#d6eaf8"),
    PanelRegion("right-arm-top",   "R Arm Top",     98,  446, 64,  48,  "#c8e6c9"),
    PanelRegion("right-arm-bottom","R Arm Bottom",  164, 446, 64,  48,  "#c8e6c9"),
    PanelRegion("left-arm-front",  "L Arm Front",   400, 252, 64,  192, "#fce4ec"),
    PanelRegion("left-arm-back",   "L Arm Back",    466, 252, 64,  192, "#fce4ec"),
    PanelRegion("left-arm-top",    "L Arm Top",     400, 446, 64,  48,  "#fff9c4"),
    PanelRegion("left-arm-bottom", "L Arm Bottom",  466, 446, 64,  48,  "#fff9c4"),
]

PANTS_PANELS: list[PanelRegion] = [
    PanelRegion("waist-front",     "Waist Front",   2,   2,   192, 32,  "#e8d5b7"),
    PanelRegion("waist-back",      "Waist Back",    196, 2,   192, 32,  "#e8d5b7"),
    PanelRegion("waist-left",      "Waist Left",    390, 2,   64,  32,  "#f0e6d3"),
    PanelRegion("waist-right",     "Waist Right",   456, 2,   64,  32,  "#f0e6d3"),
    PanelRegion("right-leg-front", "R Leg Front",   2,   36,  96,  256, "#a8d8ea"),
    PanelRegion("right-leg-back",  "R Leg Back",    100, 36,  96,  256, "#a8d8ea"),
    PanelRegion("right-leg-left",  "R Leg Left",    198, 36,  32,  256, "#b8e0d2"),
    PanelRegion("right-leg-right", "R Leg Right",   232, 36,  32,  256, "#b8e0d2"),
    PanelRegion("left-leg-front",  "L Leg Front",   296, 36,  96,  256, "#fce4ec"),
    PanelRegion("left-leg-back",   "L Leg Back",    394, 36,  96,  256, "#fce4ec"),
    PanelRegion("left-leg-left",   "L Leg Left",    492, 36,  32,  256, "#d6eaf8"),
    PanelRegion("left-leg-right",  "L Leg Right",   526, 36,  32,  256, "#d6eaf8"),
]


def _try_get_font(size: int = 10) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        return ImageFont.truetype("DejaVuSans.ttf", size)
    except OSError:
        return ImageFont.load_default()


def generate_template(panels: list[PanelRegion]) -> Image.Image:
    """Create a 585x559 RGBA image with labelled panel rectangles."""
    img = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    font = _try_get_font(10)

    for panel in panels:
        x0, y0 = panel.x, panel.y
        x1, y1 = panel.x + panel.width - 1, panel.y + panel.height - 1

        # Fill with semi-transparent colour
        r, g, b = _hex_to_rgb(panel.fill_color)
        draw.rectangle([x0, y0, x1, y1], fill=(r, g, b, 200))

        # Outline
        draw.rectangle([x0, y0, x1, y1], outline=(80, 80, 80, 255))

        # Label (truncate if panel is narrow)
        label = panel.label
        draw.text((x0 + 2, y0 + 2), label, fill=(20, 20, 20, 255), font=font)

    return img


def _hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    hex_color = hex_color.lstrip("#")
    return (
        int(hex_color[0:2], 16),
        int(hex_color[2:4], 16),
        int(hex_color[4:6], 16),
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate classic template PNGs")
    parser.add_argument(
        "--output-dir",
        default="output",
        help="Directory to write output PNGs (default: output/)",
    )
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    for name, panels in [("shirt", SHIRT_PANELS), ("pants", PANTS_PANELS)]:
        img = generate_template(panels)
        out_path = output_dir / f"classic_template_{name}.png"
        img.save(out_path, "PNG")
        print(f"Saved {out_path}  ({img.width}x{img.height})")


if __name__ == "__main__":
    main()
