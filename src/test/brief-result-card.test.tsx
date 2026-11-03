import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BriefResultCard } from "@/components/brief-result-card";
import type { ContentBrief } from "@/types/brief";

const mockBrief: ContentBrief = {
  title: "Complete Guide to Next.js Architecture",
  targetAudience: {
    primary: "Fullstack JavaScript Developers",
    demographics: ["Mid-level engineers", "Frontend architects"],
    painPoints: ["Scaling state", "Server actions error boundaries"],
  },
  keyMessages: [
    "Next.js App router standardizes data fetching",
    "Server components minimize bundle overhead",
  ],
  seoKeywords: {
    primary: ["next.js", "react server components"],
    secondary: ["app router architecture", "nextjs caching"],
    longTail: ["how to structure next.js enterprise projects"],
  },
  outline: [
    { section: "Introduction", points: ["Evolution of Next.js", "Core paradigms"] },
    { section: "Server Components Deep Dive", points: ["RSC wire protocol", "Suspense boundaries"] },
    { section: "Deployment & Hygiene", points: ["Edge runtime", "Rate limiting"] },
  ],
  toneGuide: {
    voice: "Technical and precise",
    style: "Code-centric with practical examples",
    toAvoid: ["Marketing buzzwords", "Surface-level tutorials"],
  },
  estimatedWordCount: 2200,
  callToAction: "Clone the reference architecture repository and deploy to Vercel.",
};

describe("BriefResultCard Component", () => {
  it("renders the brief title and word count accurately", () => {
    render(<BriefResultCard brief={mockBrief} />);
    expect(screen.getByRole("heading", { level: 2, name: /Complete Guide to Next.js Architecture/i })).toBeInTheDocument();
    expect(screen.getByText(/~2,200 words/i)).toBeInTheDocument();
  });

  it("renders target audience and pain points in default overview tab", () => {
    render(<BriefResultCard brief={mockBrief} />);
    expect(screen.getByText("Fullstack JavaScript Developers")).toBeInTheDocument();
    expect(screen.getByText("Scaling state")).toBeInTheDocument();
    expect(screen.getByText("Server actions error boundaries")).toBeInTheDocument();
  });

  it("renders key messages and call to action in overview tab", () => {
    render(<BriefResultCard brief={mockBrief} />);
    expect(screen.getByText("Next.js App router standardizes data fetching")).toBeInTheDocument();
    expect(screen.getByText("Clone the reference architecture repository and deploy to Vercel.")).toBeInTheDocument();
  });

  it("renders outline sections with points when outline tab is clicked", async () => {
    const user = userEvent.setup();
    render(<BriefResultCard brief={mockBrief} />);

    const outlineTab = screen.getByRole("tab", { name: /article outline/i });
    await user.click(outlineTab);

    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("Server Components Deep Dive")).toBeInTheDocument();
    expect(screen.getByText("Evolution of Next.js")).toBeInTheDocument();
  });

  it("renders tone guide voice and avoided phrases when tone tab is clicked", async () => {
    const user = userEvent.setup();
    render(<BriefResultCard brief={mockBrief} />);

    const toneTab = screen.getByRole("tab", { name: /tone & voice/i });
    await user.click(toneTab);

    expect(screen.getByText("Technical and precise")).toBeInTheDocument();
    expect(screen.getByText(/Marketing buzzwords/i)).toBeInTheDocument();
  });
});
