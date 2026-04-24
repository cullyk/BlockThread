"""
Tests for the classic template generator.

Verifies:
- Output image is exactly 585x559
- Output mode is RGBA
- All expected panel names are present in the panel list
"""

import sys
from pathlib import Path

import pytest

# Add scripts directory to path so we can import the generator module
sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

from generate_classic_template import (
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    SHIRT_PANELS,
    PANTS_PANELS,
    generate_template,
)


def test_canvas_constants():
    assert CANVAS_WIDTH == 585
    assert CANVAS_HEIGHT == 559


def test_shirt_template_dimensions():
    img = generate_template(SHIRT_PANELS)
    assert img.width == CANVAS_WIDTH
    assert img.height == CANVAS_HEIGHT


def test_pants_template_dimensions():
    img = generate_template(PANTS_PANELS)
    assert img.width == CANVAS_WIDTH
    assert img.height == CANVAS_HEIGHT


def test_shirt_template_is_rgba():
    img = generate_template(SHIRT_PANELS)
    assert img.mode == "RGBA"


def test_pants_template_is_rgba():
    img = generate_template(PANTS_PANELS)
    assert img.mode == "RGBA"


def test_shirt_panels_required_regions():
    names = {p.name for p in SHIRT_PANELS}
    required = {"torso-front", "torso-back", "torso-left", "torso-right"}
    assert required.issubset(names), f"Missing panels: {required - names}"


def test_pants_panels_required_regions():
    names = {p.name for p in PANTS_PANELS}
    required = {"waist-front", "waist-back", "right-leg-front", "left-leg-front"}
    assert required.issubset(names), f"Missing panels: {required - names}"


def test_shirt_has_twelve_panels():
    assert len(SHIRT_PANELS) >= 12


def test_pants_has_twelve_panels():
    assert len(PANTS_PANELS) >= 12


@pytest.mark.parametrize("panel", SHIRT_PANELS)
def test_shirt_panel_within_canvas(panel):
    assert panel.x >= 0
    assert panel.y >= 0
    assert panel.x + panel.width <= CANVAS_WIDTH
    assert panel.y + panel.height <= CANVAS_HEIGHT


@pytest.mark.parametrize("panel", PANTS_PANELS)
def test_pants_panel_within_canvas(panel):
    assert panel.x >= 0
    assert panel.y >= 0
    assert panel.x + panel.width <= CANVAS_WIDTH
    assert panel.y + panel.height <= CANVAS_HEIGHT
