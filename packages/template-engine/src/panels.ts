import type { OutputType } from "@blockthread/core";

/**
 * A single named panel region within the classic template canvas.
 */
export interface PanelRegion {
  name: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
}

// ---------------------------------------------------------------------------
// Shirt panels
// ---------------------------------------------------------------------------

export const SHIRT_PANELS: PanelRegion[] = [
  { name: "torso-front",        label: "Torso Front",        x: 98,  y: 2,   width: 192, height: 248, fillColor: "#a8d8ea" },
  { name: "torso-back",         label: "Torso Back",         x: 292, y: 2,   width: 192, height: 248, fillColor: "#a8d8ea" },
  { name: "torso-left",         label: "Torso Left",         x: 2,   y: 2,   width: 94,  height: 248, fillColor: "#b8e0d2" },
  { name: "torso-right",        label: "Torso Right",        x: 486, y: 2,   width: 94,  height: 248, fillColor: "#b8e0d2" },
  { name: "right-arm-front",    label: "R Arm Front",        x: 98,  y: 252, width: 64,  height: 192, fillColor: "#d6eaf8" },
  { name: "right-arm-back",     label: "R Arm Back",         x: 164, y: 252, width: 64,  height: 192, fillColor: "#d6eaf8" },
  { name: "right-arm-top",      label: "R Arm Top",          x: 98,  y: 446, width: 64,  height: 48,  fillColor: "#c8e6c9" },
  { name: "right-arm-bottom",   label: "R Arm Bottom",       x: 164, y: 446, width: 64,  height: 48,  fillColor: "#c8e6c9" },
  { name: "left-arm-front",     label: "L Arm Front",        x: 400, y: 252, width: 64,  height: 192, fillColor: "#fce4ec" },
  { name: "left-arm-back",      label: "L Arm Back",         x: 466, y: 252, width: 64,  height: 192, fillColor: "#fce4ec" },
  { name: "left-arm-top",       label: "L Arm Top",          x: 400, y: 446, width: 64,  height: 48,  fillColor: "#fff9c4" },
  { name: "left-arm-bottom",    label: "L Arm Bottom",       x: 466, y: 446, width: 64,  height: 48,  fillColor: "#fff9c4" },
];

// ---------------------------------------------------------------------------
// Pants panels
// ---------------------------------------------------------------------------

export const PANTS_PANELS: PanelRegion[] = [
  { name: "waist-front",        label: "Waist Front",        x: 2,   y: 2,   width: 192, height: 32,  fillColor: "#e8d5b7" },
  { name: "waist-back",         label: "Waist Back",         x: 196, y: 2,   width: 192, height: 32,  fillColor: "#e8d5b7" },
  { name: "waist-left",         label: "Waist Left",         x: 390, y: 2,   width: 64,  height: 32,  fillColor: "#f0e6d3" },
  { name: "waist-right",        label: "Waist Right",        x: 456, y: 2,   width: 64,  height: 32,  fillColor: "#f0e6d3" },
  { name: "right-leg-front",    label: "R Leg Front",        x: 2,   y: 36,  width: 96,  height: 256, fillColor: "#a8d8ea" },
  { name: "right-leg-back",     label: "R Leg Back",         x: 100, y: 36,  width: 96,  height: 256, fillColor: "#a8d8ea" },
  { name: "right-leg-left",     label: "R Leg Left",         x: 198, y: 36,  width: 32,  height: 256, fillColor: "#b8e0d2" },
  { name: "right-leg-right",    label: "R Leg Right",        x: 232, y: 36,  width: 32,  height: 256, fillColor: "#b8e0d2" },
  { name: "left-leg-front",     label: "L Leg Front",        x: 296, y: 36,  width: 96,  height: 256, fillColor: "#fce4ec" },
  { name: "left-leg-back",      label: "L Leg Back",         x: 394, y: 36,  width: 96,  height: 256, fillColor: "#fce4ec" },
  { name: "left-leg-left",      label: "L Leg Left",         x: 492, y: 36,  width: 32,  height: 256, fillColor: "#d6eaf8" },
  { name: "left-leg-right",     label: "L Leg Right",        x: 526, y: 36,  width: 32,  height: 256, fillColor: "#d6eaf8" },
];

export function getPanels(outputType: OutputType): PanelRegion[] {
  return outputType === "shirt" ? SHIRT_PANELS : PANTS_PANELS;
}
