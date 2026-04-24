import { z } from "zod";

export const GarmentTypeSchema = z.enum(["shirt", "pants"]);
export type GarmentType = z.infer<typeof GarmentTypeSchema>;

export const UploadSlotSchema = z.object({
  id: z.string(),
  label: z.string(),
  required: z.boolean(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});
export type UploadSlot = z.infer<typeof UploadSlotSchema>;

export const GarmentSchema = z.object({
  type: GarmentTypeSchema,
  uploadSlots: z.array(UploadSlotSchema),
  notes: z.string().optional(),
});
export type Garment = z.infer<typeof GarmentSchema>;

export const SHIRT_UPLOAD_SLOTS: UploadSlot[] = [
  { id: "front", label: "Front", required: true, description: "Front of the shirt" },
  { id: "back", label: "Back", required: true, description: "Back of the shirt" },
  { id: "detail-left-sleeve", label: "Left sleeve detail", required: false },
  { id: "detail-right-sleeve", label: "Right sleeve detail", required: false },
];

export const PANTS_UPLOAD_SLOTS: UploadSlot[] = [
  { id: "front", label: "Front", required: true, description: "Front of the pants" },
  { id: "back", label: "Back", required: true, description: "Back of the pants" },
  { id: "detail-left-leg", label: "Left leg detail", required: false },
  { id: "detail-right-leg", label: "Right leg detail", required: false },
];

export function getUploadSlots(type: GarmentType): UploadSlot[] {
  return type === "shirt" ? SHIRT_UPLOAD_SLOTS : PANTS_UPLOAD_SLOTS;
}
