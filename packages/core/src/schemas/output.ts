import { z } from "zod";

export const OutputTypeSchema = z.enum(["shirt", "pants"]);
export type OutputType = z.infer<typeof OutputTypeSchema>;

export const ExportFormatSchema = z.enum(["png"]);
export type ExportFormat = z.infer<typeof ExportFormatSchema>;

export const ExportOptionsSchema = z.object({
  format: ExportFormatSchema.default("png"),
  outputType: OutputTypeSchema,
  includeAlphaChannel: z.boolean().default(true),
});
export type ExportOptions = z.infer<typeof ExportOptionsSchema>;
