"use client";

// Error boundary for the root segment — shown when an unhandled server error occurs.
import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error monitoring service in production
    console.error("[GlobalError]", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[--color-bg] px-4">
      <div className="text-center space-y-5 max-w-sm">
        <div className="mx-auto rounded-full border border-[--color-error]/30 bg-[--color-error]/10 p-4 w-fit">
          <AlertCircle className="h-7 w-7 text-[--color-error]" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-[--color-text]">Something went wrong</h1>
        <p className="text-sm text-[--color-text-muted]">
          An unexpected error occurred. Your data is safe — try refreshing.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-[--color-surface] border border-[--color-border] px-5 py-2.5 min-h-11 text-sm font-medium text-[--color-text] hover:border-[--color-accent] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </div>
  );
}
