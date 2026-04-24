import type { OutputType } from "@blockthread/core";
import { TEMPLATE_CANVAS } from "./canvas";
import { getPanels, type PanelRegion } from "./panels";

export interface PlaceholderLayout {
  canvas: { width: number; height: number };
  panels: PanelRegion[];
  outputType: OutputType;
}

/**
 * Returns a deterministic placeholder layout for the given output type.
 * The layout contains all panel regions with labels and fill colours.
 * This is used to render a preview before real image data is available.
 */
export function generatePlaceholderLayout(
  outputType: OutputType
): PlaceholderLayout {
  return {
    canvas: TEMPLATE_CANVAS,
    panels: getPanels(outputType),
    outputType,
  };
}
