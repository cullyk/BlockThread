import { describe, it, expect } from "vitest";
import { TEMPLATE_CANVAS } from "./canvas";

describe("TEMPLATE_CANVAS", () => {
  it("has width 585", () => {
    expect(TEMPLATE_CANVAS.width).toBe(585);
  });

  it("has height 559", () => {
    expect(TEMPLATE_CANVAS.height).toBe(559);
  });
});
