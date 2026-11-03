import { z } from "zod";
import type { ContentBrief } from "@/types/brief";

// Zod schema that mirrors the ContentBrief type — used to validate Claude's structured output.
export const contentBriefSchema = z.object({
  title: z.string(),
  targetAudience: z.object({
    primary: z.string(),
    demographics: z.array(z.string()),
    painPoints: z.array(z.string()),
  }),
  keyMessages: z.array(z.string()).min(2).max(6),
  seoKeywords: z.object({
    primary: z.array(z.string()).min(2).max(5),
    secondary: z.array(z.string()).min(2).max(8),
    longTail: z.array(z.string()).min(2).max(6),
  }),
  outline: z.array(
    z.object({
      section: z.string(),
      points: z.array(z.string()).min(1).max(5),
    })
  ).min(3).max(8),
  toneGuide: z.object({
    voice: z.string(),
    style: z.string(),
    toAvoid: z.array(z.string()).min(1).max(4),
  }),
  estimatedWordCount: z.number().int().min(100).max(10000),
  callToAction: z.string(),
});

// High-fidelity simulator — used when no API key is set, for local dev and testing.
export function generateSimulatedBrief(topic: string, contentType: string): ContentBrief {
  return {
    title: `Complete Guide to ${topic} — ${new Date().getFullYear()} Edition`,
    targetAudience: {
      primary: "Marketing professionals and content creators seeking actionable strategies",
      demographics: ["Age 25–45", "Mid-to-senior career level", "Digital-first mindset"],
      painPoints: [
        "Lack of a structured content planning process",
        "Difficulty aligning content with business goals",
        "Inconsistent brand voice across channels",
      ],
    },
    keyMessages: [
      `${topic} is a foundational skill for modern marketing teams`,
      "A structured approach reduces production time by up to 40%",
      "AI-assisted briefs ensure consistency at scale",
      "Audience-first thinking drives measurable engagement",
    ],
    seoKeywords: {
      primary: [topic.toLowerCase(), `${topic.toLowerCase()} guide`, `${topic.toLowerCase()} strategy`],
      secondary: [`how to ${topic.toLowerCase()}`, `${topic.toLowerCase()} tips`, `best ${topic.toLowerCase()} practices`],
      longTail: [
        `how to create a ${topic.toLowerCase()} plan`,
        `${topic.toLowerCase()} for beginners step by step`,
        `${contentType} ${topic.toLowerCase()} examples`,
      ],
    },
    outline: [
      { section: "Introduction", points: ["Hook with a compelling statistic", "Define the problem this content solves", "Preview the value readers will gain"] },
      { section: "Why This Matters Now", points: ["Current market context", "Cost of ignoring this topic", "Quick win to establish credibility"] },
      { section: "Core Framework", points: ["Step 1 — Audit existing approach", "Step 2 — Define goals and KPIs", "Step 3 — Execute with the right tools"] },
      { section: "Common Mistakes to Avoid", points: ["Over-complicating the process", "Skipping audience research", "Ignoring distribution from day one"] },
      { section: "Conclusion & Next Steps", points: ["Summarize key takeaways", "Provide a downloadable checklist", "Clear CTA to the next action"] },
    ],
    toneGuide: {
      voice: "Authoritative yet approachable — the smart colleague, not the distant expert",
      style: "Practical and example-driven; every claim backed by a concrete illustration",
      toAvoid: ["Jargon without explanation", "Passive voice", "Vague promises without supporting evidence"],
    },
    estimatedWordCount: contentType === "blog-post" ? 1800 : contentType === "landing-page" ? 800 : 1200,
    callToAction: "Download the free content brief template and start your first structured brief today.",
  };
}
