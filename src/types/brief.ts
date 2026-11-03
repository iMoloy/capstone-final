// Shared types for the BriefCraft application

export interface ContentBrief {
  title: string;
  targetAudience: {
    primary: string;
    demographics: string[];
    painPoints: string[];
  };
  keyMessages: string[];
  seoKeywords: {
    primary: string[];
    secondary: string[];
    longTail: string[];
  };
  outline: {
    section: string;
    points: string[];
  }[];
  toneGuide: {
    voice: string;
    style: string;
    toAvoid: string[];
  };
  estimatedWordCount: number;
  callToAction: string;
}

export type GenerateStatus = "idle" | "loading" | "success" | "error";

export interface GenerateResult {
  brief: ContentBrief | null;
  status: GenerateStatus;
  error?: string;
}

// API response shape — always this structure
export type ApiSuccess = { success: true; brief: ContentBrief };
export type ApiError = { success: false; error: string };
export type ApiResponse = ApiSuccess | ApiError;
