import { describe, it, expect } from "vitest";
import { generatePlaceholderLayout } from "./placeholder";
import { TEMPLATE_CANVAS } from "./canvas";

describe("generatePlaceholderLayout", () => {
  it("returns correct canvas dimensions for shirt", () => {
    const layout = generatePlaceholderLayout("shirt");
    expect(layout.canvas.width).toBe(TEMPLATE_CANVAS.width);
    expect(layout.canvas.height).toBe(TEMPLATE_CANVAS.height);
  });

  it("returns correct canvas dimensions for pants", () => {
    const layout = generatePlaceholderLayout("pants");
    expect(layout.canvas.width).toBe(TEMPLATE_CANVAS.width);
    expect(layout.canvas.height).toBe(TEMPLATE_CANVAS.height);
  });

  it("returns at least 12 panels for shirt", () => {
    const layout = generatePlaceholderLayout("shirt");
    expect(layout.panels.length).toBeGreaterThanOrEqual(12);
  });

  it("returns at least 12 panels for pants", () => {
    const layout = generatePlaceholderLayout("pants");
    expect(layout.panels.length).toBeGreaterThanOrEqual(12);
  });

  it("sets the outputType correctly", () => {
    expect(generatePlaceholderLayout("shirt").outputType).toBe("shirt");
    expect(generatePlaceholderLayout("pants").outputType).toBe("pants");
  });
});
