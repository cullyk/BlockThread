import { z } from "zod";
import { GarmentTypeSchema } from "./garment";
import { OutputTypeSchema } from "./output";

export const JobStatusSchema = z.enum([
  "pending",
  "processing",
  "complete",
  "error",
]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

export const GenerationJobSchema = z.object({
  id: z.string().uuid(),
  status: JobStatusSchema,
  garmentType: GarmentTypeSchema,
  outputType: OutputTypeSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  uploadedImageUrls: z.record(z.string(), z.string().url()).default({}),
  outputImageUrl: z.string().url().optional(),
  error: z.string().optional(),
});
export type GenerationJob = z.infer<typeof GenerationJobSchema>;

export function createJob(
  garmentType: GenerationJob["garmentType"],
  outputType: GenerationJob["outputType"]
): GenerationJob {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    status: "pending",
    garmentType,
    outputType,
    createdAt: now,
    updatedAt: now,
    uploadedImageUrls: {},
  };
}
