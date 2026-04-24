import { describe, it, expect } from "vitest";
import { GenerationJobSchema, createJob, JobStatusSchema } from "./job";

describe("JobStatusSchema", () => {
  it("accepts all valid statuses", () => {
    for (const status of ["pending", "processing", "complete", "error"]) {
      expect(JobStatusSchema.parse(status)).toBe(status);
    }
  });

  it("rejects invalid status", () => {
    expect(() => JobStatusSchema.parse("cancelled")).toThrow();
  });
});

describe("createJob", () => {
  it("creates a job with default pending status", () => {
    const job = createJob("shirt", "shirt");
    expect(job.status).toBe("pending");
  });

  it("creates a job with a valid UUID", () => {
    const job = createJob("shirt", "shirt");
    expect(job.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it("creates a job with matching garment and output types", () => {
    const job = createJob("pants", "pants");
    expect(job.garmentType).toBe("pants");
    expect(job.outputType).toBe("pants");
  });

  it("produces a job that passes GenerationJobSchema validation", () => {
    const job = createJob("shirt", "shirt");
    const result = GenerationJobSchema.safeParse(job);
    expect(result.success).toBe(true);
  });
});
