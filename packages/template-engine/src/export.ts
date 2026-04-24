import type { OutputType } from "@blockthread/core";
import { TEMPLATE_CANVAS } from "./canvas";

export interface ExportMetadata {
  outputType: OutputType;
  canvasWidth: number;
  canvasHeight: number;
  format: "png";
  hasAlphaChannel: boolean;
  generatedAt: string;
  version: string;
}

/**
 * Builds PNG export metadata for a given output type.
 * The actual PNG generation is handled by the Python worker (workers/image).
 */
export function buildExportMetadata(outputType: OutputType): ExportMetadata {
  return {
    outputType,
    canvasWidth: TEMPLATE_CANVAS.width,
    canvasHeight: TEMPLATE_CANVAS.height,
    format: "png",
    hasAlphaChannel: true,
    generatedAt: new Date().toISOString(),
    version: "0.1.0",
  };
}
