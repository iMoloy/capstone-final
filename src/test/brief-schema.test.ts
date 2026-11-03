import { describe, it, expect } from "vitest";
import { generateSimulatedBrief, contentBriefSchema } from "@/lib/brief-schema";

describe("brief-schema", () => {
  it("generates a simulated brief matching the schema structure", () => {
    const brief = generateSimulatedBrief("Modern Cloud Infrastructure", "blog-post");
    expect(brief.title).toContain("Modern Cloud Infrastructure");
    expect(brief.estimatedWordCount).toBe(1800);

    const parseResult = contentBriefSchema.safeParse(brief);
    expect(parseResult.success).toBe(true);
  });

  it("adjusts word count based on content type", () => {
    const landing = generateSimulatedBrief("SaaS Landing", "landing-page");
    expect(landing.estimatedWordCount).toBe(800);

    const newsletter = generateSimulatedBrief("Weekly Tech", "email-newsletter");
    expect(newsletter.estimatedWordCount).toBe(1200);
  });
});
