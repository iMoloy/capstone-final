import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { checkRateLimit } from "@/lib/rate-limiter";
import { generateBriefSchema } from "@/lib/validation";
import { contentBriefSchema, generateSimulatedBrief } from "@/lib/brief-schema";
import type { ApiResponse } from "@/types/brief";

// Cap streaming time on Vercel to 30 seconds — prevents runaway requests
export const maxDuration = 30;

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  // 1. Rate limiting — identify caller by forwarded IP or fallback
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: `Too many requests. Please wait ${rateCheck.retryAfter}s before trying again.` },
      { status: 429 }
    );
  }

  // 2. Parse + validate request body with Zod
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON in request body." }, { status: 400 });
  }

  const parsed = generateBriefSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? "Invalid input.";
    return NextResponse.json({ success: false, error: message }, { status: 422 });
  }

  const { topic, audience, contentType } = parsed.data;

  // 3. Use real Claude if API key is present; fall back to simulator for local dev / demo
  if (!process.env.ANTHROPIC_API_KEY) {
    const brief = generateSimulatedBrief(topic, contentType);
    return NextResponse.json({ success: true, brief });
  }

  try {
    const audienceContext = audience ? `\nTarget audience hint from user: ${audience}` : "";

    // generateObject forces Claude to return structured JSON matching our Zod schema.
    // This eliminates the need for manual JSON parsing and handles retry on schema mismatch.
    const { object: brief } = await generateObject({
      model: anthropic("claude-3-5-haiku-20241022"),
      schema: contentBriefSchema,
      system: `You are a senior content strategist specialising in B2B and B2C content briefs. 
Your job is to produce thorough, actionable content briefs that content writers can use immediately.
Always be specific — avoid generic advice. Ground every recommendation in the given topic.`,
      prompt: `Create a comprehensive content brief for the following topic:

Topic: ${topic}
Content type: ${contentType}${audienceContext}

The brief must be specific to this topic. Include real, relevant SEO keywords — not placeholders.
The outline sections should reflect the actual structure a writer would follow for this exact topic.`,
    });

    return NextResponse.json({ success: true, brief });
  } catch (err) {
    console.error("[generate-brief] Claude error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { success: false, error: "Failed to generate brief. Please try again in a moment." },
      { status: 500 }
    );
  }
}
