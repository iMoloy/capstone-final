"use client";

// BriefForm — Accessible editorial studio form with format toggles, presets,
// and real-time character boundary feedback.

import { useState, useId } from "react";
import { 
  Loader2, 
  Sparkles, 
  FileText, 
  Layout, 
  Share2, 
  Mail, 
  Video, 
  Target,
  PenLine
} from "lucide-react";
import { PresetChips } from "@/components/preset-chips";
import type { ContentBrief, GenerateStatus } from "@/types/brief";
import type { ApiResponse } from "@/types/brief";

type ContentType = "blog-post" | "landing-page" | "social-campaign" | "email-newsletter" | "video-script";

const CONTENT_FORMATS: { value: ContentType; label: string; icon: typeof FileText }[] = [
  { value: "blog-post", label: "Blog", icon: FileText },
  { value: "landing-page", label: "Landing", icon: Layout },
  { value: "email-newsletter", label: "Newsletter", icon: Mail },
  { value: "social-campaign", label: "Social", icon: Share2 },
  { value: "video-script", label: "Video", icon: Video },
];

interface BriefFormProps {
  onResult: (brief: ContentBrief) => void;
  onError: (error: string) => void;
  onStatusChange: (status: GenerateStatus) => void;
}

export function BriefForm({ onResult, onError, onStatusChange }: BriefFormProps) {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [contentType, setContentType] = useState<ContentType>("blog-post");
  const [status, setStatus] = useState<GenerateStatus>("idle");

  const topicId = useId();
  const audienceId = useId();

  const isLoading = status === "loading";
  const topicChars = topic.length;
  const isReady = topic.trim().length >= 10;
  const topicNearLimit = topicChars > 450;

  function handlePresetSelect(presetTopic: string, presetType: ContentType, presetAudience?: string) {
    setTopic(presetTopic);
    setContentType(presetType);
    if (presetAudience) setAudience(presetAudience);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading || !isReady) return;

    setStatus("loading");
    onStatusChange("loading");

    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, audience: audience || undefined, contentType }),
      });

      const data: ApiResponse = await res.json();

      if (data.success) {
        setStatus("success");
        onStatusChange("success");
        onResult(data.brief);
      } else {
        setStatus("error");
        onStatusChange("error");
        onError(data.error);
      }
    } catch {
      setStatus("error");
      onStatusChange("error");
      onError("Network error. Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Content brief generator" className="space-y-6">
      
      {/* 1. Format Segmented Controls */}
      <div>
        <label id="content-type-label" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
          Content type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 rounded-xl bg-zinc-950/70 border border-zinc-800" role="radiogroup" aria-labelledby="content-type-label">
          {CONTENT_FORMATS.map((format) => {
            const Icon = format.icon;
            const isSelected = contentType === format.value;
            return (
              <button
                key={format.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isLoading}
                onClick={() => setContentType(format.value)}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 px-3 text-xs font-semibold transition-all min-h-11 sm:min-h-9 cursor-pointer ${
                  isSelected
                    ? "bg-zinc-800 text-emerald-400 shadow-md border border-zinc-700/80"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                } disabled:opacity-50`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-emerald-400" : "text-zinc-500"}`} aria-hidden="true" />
                <span>{format.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Topic Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={topicId} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <PenLine className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            <span>Topic or content idea</span>
            <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <span
            id={`${topicId}-count`}
            aria-live="polite"
            className={`text-xs font-mono tabular-nums ${topicNearLimit ? "text-amber-400" : "text-zinc-500"}`}
          >
            {topicChars}/500
          </span>
        </div>

        <textarea
          id={topicId}
          name="topic"
          required
          rows={4}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          maxLength={500}
          placeholder="e.g. How to architect a resilient multi-agent system with Gemini 2.5 and LangGraph for high-throughput customer operations"
          aria-describedby={`${topicId}-hint`}
          disabled={isLoading}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-100 placeholder:text-zinc-600 resize-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:opacity-50 shadow-inner"
        />

        <p id={`${topicId}-hint`} className="mt-1.5 text-xs text-zinc-500">
          {topicChars < 10 ? `Minimum 10 characters required (${10 - topicChars} more)` : "Detailed prompts generate sharper briefs."}
        </p>
      </div>

      {/* 3. Preset Chips */}
      <div className="pt-1">
        <PresetChips onSelect={handlePresetSelect} disabled={isLoading} />
      </div>

      {/* 4. Target Audience */}
      <div>
        <label htmlFor={audienceId} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
          <Target className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          <span>Target audience <span className="text-zinc-600 font-normal lowercase">(optional)</span></span>
        </label>
        <input
          id={audienceId}
          name="audience"
          type="text"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          maxLength={200}
          placeholder="e.g. Senior Backend Engineers, CTOs of Series A/B startups"
          disabled={isLoading}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:opacity-50 transition-all shadow-inner"
        />
      </div>

      {/* 5. Submit CTA Button */}
      <button
        type="submit"
        disabled={isLoading || !isReady}
        aria-disabled={isLoading || !isReady}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 min-h-12 text-sm font-bold transition-all cursor-pointer ${
          isReady && !isLoading
            ? "bg-gradient-to-r from-emerald-500 to-green-500 text-zinc-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
            : "bg-zinc-800/80 text-zinc-500 cursor-not-allowed border border-zinc-800"
        } focus-visible:ring-2 focus-visible:ring-emerald-400`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-zinc-950" aria-hidden="true" />
            <span>Analyzing domain & generating brief…</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 fill-zinc-950" aria-hidden="true" />
            <span>Generate Production Brief</span>
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-zinc-500">
        Outputs audience analysis, SEO keywords tiers, talking points & tone parameters.
      </p>
    </form>
  );
}
