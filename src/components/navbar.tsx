import Link from "next/link";
import { Sparkles, Github } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 text-zinc-950 shadow-md shadow-green-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 fill-zinc-950" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-zinc-100 flex items-center gap-1">
              Brief<span className="text-green-400">Craft</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              AI Editorial Studio
            </span>
          </div>
        </Link>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          {/* Status pill */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-medium">Claude 3.5 Haiku</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Ready</span>
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/iMoloy/capstone-final"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 min-h-11 sm:min-h-9 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
