"use client";

// BriefCraft Studio — Production AI Content Brief Generator
// Engineered for desktop & mobile with compact editorial header and dual-pane layout.

import { useState, useCallback } from "react";
import { 
  AlertCircle, 
  Sparkles, 
  Target, 
  Search, 
  ListOrdered 
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { BriefForm } from "@/components/brief-form";
import { BriefResultCard } from "@/components/brief-result-card";
import { BriefSkeleton } from "@/components/brief-skeleton";
import type { ContentBrief, GenerateStatus } from "@/types/brief";

export default function HomePage() {
  const [status, setStatus] = useState<GenerateStatus>("idle");
  const [brief, setBrief] = useState<ContentBrief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<"form" | "result">("form");

  const handleResult = useCallback((result: ContentBrief) => {
    setBrief(result);
    setError(null);
    setMobileTab("result");
  }, []);

  const handleError = useCallback((msg: string) => {
    setError(msg);
    setBrief(null);
  }, []);

  const handleStatusChange = useCallback((s: GenerateStatus) => {
    setStatus(s);
    if (s === "loading") {
      setError(null);
      setMobileTab("result");
    }
  }, []);

  return (
    <div className="min-h-dvh bg-[#0b0f17] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Compact Hero Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 mb-2 text-[11px] font-semibold text-emerald-400">
              <Sparkles className="h-3 w-3" />
              <span>Production Capstone</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              AI Editorial Brief Studio
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
              Turn rough angles into structured, publication-ready briefs with audience personas, SEO tiers, and talking points.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300">
              <span className="text-emerald-400 font-bold font-mono">100%</span> Schema Adherence
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300">
              <span className="text-zinc-200 font-bold font-mono">&lt; 3s</span> Latency
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300">
              <span className="text-emerald-400 font-bold font-mono">WCAG AA</span> Accessible
            </div>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex md:hidden rounded-xl bg-zinc-900/90 border border-zinc-800 p-1 mb-6">
          <button
            type="button"
            onClick={() => setMobileTab("form")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              mobileTab === "form" ? "bg-zinc-800 text-emerald-400 shadow-sm" : "text-zinc-400"
            }`}
          >
            1. Brief Setup
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("result")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              mobileTab === "result" ? "bg-zinc-800 text-emerald-400 shadow-sm" : "text-zinc-400"
            }`}
          >
            2. Generated Output {status === "success" && "•"}
          </button>
        </div>

        {/* Main Dual-Pane Studio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Pane: Setup Form */}
          <section
            aria-label="Brief Configuration Form"
            className={`md:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-7 backdrop-blur-xl shadow-2xl ${
              mobileTab === "form" ? "block" : "hidden md:block"
            }`}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800/80 mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Editorial Configuration
              </h2>
              <span className="text-[11px] font-mono text-zinc-500">Claude 3.5 Haiku</span>
            </div>

            <BriefForm
              onResult={handleResult}
              onError={handleError}
              onStatusChange={handleStatusChange}
            />
          </section>

          {/* Right Pane: Result Viewer */}
          <section
            aria-label="Generated Brief Inspector"
            className={`md:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-7 backdrop-blur-xl shadow-2xl min-h-[480px] ${
              mobileTab === "result" ? "block" : "hidden md:block"
            }`}
          >
            {status === "idle" && <StudioEmptyState />}
            {status === "loading" && <BriefSkeleton />}
            {status === "error" && error && <StudioErrorState message={error} />}
            {status === "success" && brief && <BriefResultCard brief={brief} />}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#090d14] py-6 px-4 text-center text-xs text-zinc-500 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 BriefCraft · FlyRank Capstone Assignment by Moloy Krishna Paul</p>
          <div className="flex items-center gap-3 text-zinc-400">
            <span>Next.js 16.4 App Router</span>
            <span>•</span>
            <span>Tailwind v4</span>
            <span>•</span>
            <span>Vercel AI SDK 4.3</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StudioEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[420px] text-center px-4 py-8">
      <div className="h-12 w-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-white mb-1.5">Editorial Brief Canvas Ready</h3>
      <p className="text-xs sm:text-sm text-zinc-400 max-w-md mb-8 leading-relaxed">
        Choose a preset or type your custom angle on the left. BriefCraft synthesizes audience pain points, SEO keyword clusters, and talking points in seconds.
      </p>

      {/* Feature Value Props Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-left">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 shadow-sm">
          <Target className="h-4 w-4 text-emerald-400 mb-2" />
          <p className="text-xs font-semibold text-zinc-200">Audience Personas</p>
          <p className="text-[11px] text-zinc-400 mt-1">Identifies pain points and demographic targets.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 shadow-sm">
          <Search className="h-4 w-4 text-cyan-400 mb-2" />
          <p className="text-xs font-semibold text-zinc-200">Tiered SEO Keywords</p>
          <p className="text-[11px] text-zinc-400 mt-1">Primary targets, semantic, and long-tail angles.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 shadow-sm">
          <ListOrdered className="h-4 w-4 text-amber-400 mb-2" />
          <p className="text-xs font-semibold text-zinc-200">Structured Outline</p>
          <p className="text-[11px] text-zinc-400 mt-1">Numbered milestones with writer-ready bullet points.</p>
        </div>
      </div>
    </div>
  );
}

function StudioErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4 py-8"
    >
      <div className="h-12 w-12 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-400 mb-4 shadow-lg shadow-red-500/10">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-white mb-1">Brief Generation Stalled</h3>
      <p className="text-xs text-red-400 max-w-sm mb-4 leading-relaxed">{message}</p>
      <p className="text-[11px] text-zinc-500">Please adjust your prompt or check network connection.</p>
    </div>
  );
}
