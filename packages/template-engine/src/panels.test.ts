import { describe, it, expect } from "vitest";
import { SHIRT_PANELS, PANTS_PANELS, getPanels } from "./panels";
import { TEMPLATE_CANVAS } from "./canvas";

describe("SHIRT_PANELS", () => {
  it("has at least 12 regions", () => {
    expect(SHIRT_PANELS.length).toBeGreaterThanOrEqual(12);
  });

  it("all panels fit within canvas bounds", () => {
    for (const panel of SHIRT_PANELS) {
      expect(panel.x).toBeGreaterThanOrEqual(0);
      expect(panel.y).toBeGreaterThanOrEqual(0);
      expect(panel.x + panel.width).toBeLessThanOrEqual(TEMPLATE_CANVAS.width);
      expect(panel.y + panel.height).toBeLessThanOrEqual(TEMPLATE_CANVAS.height);
    }
  });

  it("includes torso-front panel", () => {
    expect(SHIRT_PANELS.find((p) => p.name === "torso-front")).toBeDefined();
  });

  it("all panels have non-empty names", () => {
    for (const panel of SHIRT_PANELS) {
      expect(panel.name.length).toBeGreaterThan(0);
    }
  });
});

describe("PANTS_PANELS", () => {
  it("has at least 12 regions", () => {
    expect(PANTS_PANELS.length).toBeGreaterThanOrEqual(12);
  });

  it("all panels fit within canvas bounds", () => {
    for (const panel of PANTS_PANELS) {
      expect(panel.x).toBeGreaterThanOrEqual(0);
      expect(panel.y).toBeGreaterThanOrEqual(0);
      expect(panel.x + panel.width).toBeLessThanOrEqual(TEMPLATE_CANVAS.width);
      expect(panel.y + panel.height).toBeLessThanOrEqual(TEMPLATE_CANVAS.height);
    }
  });

  it("includes waist-front panel", () => {
    expect(PANTS_PANELS.find((p) => p.name === "waist-front")).toBeDefined();
  });
});

describe("getPanels", () => {
  it("returns SHIRT_PANELS for shirt", () => {
    expect(getPanels("shirt")).toBe(SHIRT_PANELS);
  });

  it("returns PANTS_PANELS for pants", () => {
    expect(getPanels("pants")).toBe(PANTS_PANELS);
  });
});
