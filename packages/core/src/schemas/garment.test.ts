import { describe, it, expect } from "vitest";
import {
  GarmentSchema,
  GarmentTypeSchema,
  getUploadSlots,
  SHIRT_UPLOAD_SLOTS,
  PANTS_UPLOAD_SLOTS,
} from "./garment";

describe("GarmentTypeSchema", () => {
  it("accepts shirt", () => {
    expect(GarmentTypeSchema.parse("shirt")).toBe("shirt");
  });

  it("accepts pants", () => {
    expect(GarmentTypeSchema.parse("pants")).toBe("pants");
  });

  it("rejects unknown types", () => {
    expect(() => GarmentTypeSchema.parse("hoodie")).toThrow();
  });
});

describe("GarmentSchema", () => {
  it("validates a shirt garment", () => {
    const result = GarmentSchema.safeParse({
      type: "shirt",
      uploadSlots: SHIRT_UPLOAD_SLOTS,
    });
    expect(result.success).toBe(true);
  });

  it("validates a pants garment", () => {
    const result = GarmentSchema.safeParse({
      type: "pants",
      uploadSlots: PANTS_UPLOAD_SLOTS,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a garment without uploadSlots", () => {
    const result = GarmentSchema.safeParse({ type: "shirt" });
    expect(result.success).toBe(false);
  });
});

describe("getUploadSlots", () => {
  it("returns shirt slots for shirt", () => {
    expect(getUploadSlots("shirt")).toHaveLength(SHIRT_UPLOAD_SLOTS.length);
  });

  it("returns pants slots for pants", () => {
    expect(getUploadSlots("pants")).toHaveLength(PANTS_UPLOAD_SLOTS.length);
  });

  it("shirt slots include required front and back", () => {
    const slots = getUploadSlots("shirt");
    const front = slots.find((s) => s.id === "front");
    const back = slots.find((s) => s.id === "back");
    expect(front?.required).toBe(true);
    expect(back?.required).toBe(true);
  });
});
