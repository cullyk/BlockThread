/**
 * Canonical Roblox classic clothing template canvas dimensions.
 * Both shirt and pants use the same 585×559 canvas.
 */
export const TEMPLATE_CANVAS = {
  width: 585,
  height: 559,
} as const;

export type TemplateCanvas = typeof TEMPLATE_CANVAS;
