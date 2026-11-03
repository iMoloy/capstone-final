import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[--color-bg] px-4">
      <div className="text-center space-y-4">
        <p className="text-6xl font-bold text-[--color-accent]" aria-hidden="true">404</p>
        <h1 className="text-xl font-semibold text-[--color-text]">Page not found</h1>
        <p className="text-sm text-[--color-text-muted]">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[--color-surface] border border-[--color-border] px-4 py-2 min-h-11 text-sm font-medium text-[--color-text] hover:border-[--color-accent] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
        >
          Back to BriefCraft
        </Link>
      </div>
    </div>
  );
}
