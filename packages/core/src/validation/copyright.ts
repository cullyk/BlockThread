/**
 * Copyright and logo detection placeholder.
 *
 * This module provides a hook for future integration with a logo/text
 * detection model. Currently it returns a safe default (no issues detected)
 * to allow the MVP pipeline to proceed.
 *
 * Future: integrate with an on-device OCR or logo-detection model.
 */

export interface CopyrightCheckResult {
  passed: boolean;
  warnings: string[];
}

/**
 * Placeholder implementation. Always passes in MVP.
 * Replace the body of this function when adding real detection.
 */
export function detectLogoOrText(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _imageData: unknown
): CopyrightCheckResult {
  // TODO: integrate OCR / logo detection model
  return {
    passed: true,
    warnings: [],
  };
}

export const COPYRIGHT_WARNING =
  "Only upload photos of clothing you own or have explicit permission to use. " +
  "Do not upload images containing logos, brand marks, or copyrighted graphics. " +
  "You are responsible for any content you upload or publish to Roblox.";
