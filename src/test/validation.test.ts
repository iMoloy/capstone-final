import { describe, it, expect } from "vitest";
import { generateBriefSchema } from "@/lib/validation";

describe("generateBriefSchema", () => {
  it("validates a correct payload with minimum required fields", () => {
    const valid = {
      topic: "How to build a SaaS application in 2026",
      contentType: "blog-post",
    };
    const result = generateBriefSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.topic).toBe("How to build a SaaS application in 2026");
      expect(result.data.contentType).toBe("blog-post");
    }
  });

  it("validates optional audience and trims inputs", () => {
    const valid = {
      topic: "   Scaling distributed microservices   ",
      audience: "  Senior backend engineers  ",
      contentType: "landing-page",
    };
    const result = generateBriefSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.topic).toBe("Scaling distributed microservices");
      expect(result.data.audience).toBe("Senior backend engineers");
    }
  });

  it("fails when topic is shorter than 10 characters", () => {
    const invalid = {
      topic: "Short",
      contentType: "blog-post",
    };
    const result = generateBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toContain("at least 10 characters");
    }
  });

  it("fails when topic exceeds 500 characters", () => {
    const invalid = {
      topic: "a".repeat(501),
      contentType: "blog-post",
    };
    const result = generateBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toContain("500 characters or fewer");
    }
  });

  it("fails on invalid content types", () => {
    const invalid = {
      topic: "Valid topic length with valid words",
      contentType: "unknown-type",
    };
    const result = generateBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
