import { z } from "zod";

export const generateBriefSchema = z.object({
  topic: z
    .string()
    .min(10, "Topic must be at least 10 characters.")
    .max(500, "Topic must be 500 characters or fewer.")
    .trim(),
  audience: z
    .string()
    .max(200, "Audience must be 200 characters or fewer.")
    .trim()
    .optional(),
  contentType: z
    .enum(["blog-post", "landing-page", "social-campaign", "email-newsletter", "video-script"])
    .default("blog-post"),
});

export type GenerateBriefInput = z.infer<typeof generateBriefSchema>;
