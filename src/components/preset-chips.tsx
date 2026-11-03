"use client";

import { Sparkles, Terminal, Rocket, Database, Layers } from "lucide-react";

interface PresetChipsProps {
  onSelect: (topic: string, contentType: "blog-post" | "landing-page" | "social-campaign" | "email-newsletter" | "video-script", audience?: string) => void;
  disabled?: boolean;
}

const PRESETS = [
  {
    icon: Rocket,
    label: "B2B SaaS Growth",
    topic: "Product-Led Growth Playbook for B2B SaaS Startups",
    contentType: "blog-post" as const,
    audience: "Early-stage founders, growth product managers",
  },
  {
    icon: Terminal,
    label: "Micro-Frontends",
    topic: "Enterprise Micro-Frontend Architecture with Next.js 16 and Module Federation",
    contentType: "blog-post" as const,
    audience: "Staff frontend engineers, technical architects",
  },
  {
    icon: Database,
    label: "AI Multi-Agent RAG",
    topic: "How Multi-Agent Systems are Replacing Monolithic RAG Pipelines",
    contentType: "email-newsletter" as const,
    audience: "AI researchers, senior backend developers",
  },
  {
    icon: Layers,
    label: "Design Tokens",
    topic: "Building Accessible, Cross-Platform Design Tokens with Tailwind v4",
    contentType: "landing-page" as const,
    audience: "Design engineers, UI/UX systems teams",
  },
];

export function PresetChips({ onSelect, disabled }: PresetChipsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        <Sparkles className="h-3 w-3 text-emerald-400" aria-hidden="true" />
        <span>Quick Presets:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.label}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(preset.topic, preset.contentType, preset.audience)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 shadow-sm"
            >
              <Icon className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
