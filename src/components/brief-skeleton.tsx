export function BriefSkeleton() {
  return (
    <div aria-busy="true" aria-label="Generating content brief…" className="space-y-6">
      {/* Header shimmer */}
      <div className="border-b border-zinc-800 pb-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="skeleton-shimmer h-4 w-28 rounded-full" />
          <div className="skeleton-shimmer h-7 w-20 rounded-lg" />
        </div>
        <div className="skeleton-shimmer h-7 w-4/5 rounded-lg" />
        <div className="skeleton-shimmer h-3.5 w-1/3 rounded" />
      </div>

      {/* Tab bar placeholder */}
      <div className="flex gap-2 border-b border-zinc-800 pb-2">
        <div className="skeleton-shimmer h-6 w-24 rounded" />
        <div className="skeleton-shimmer h-6 w-24 rounded" />
        <div className="skeleton-shimmer h-6 w-24 rounded" />
      </div>

      {/* Body placeholders */}
      <div className="space-y-4 pt-2">
        <div className="skeleton-shimmer h-20 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          <div className="skeleton-shimmer h-16 rounded-xl" />
          <div className="skeleton-shimmer h-16 rounded-xl" />
        </div>
        <div className="skeleton-shimmer h-24 w-full rounded-xl" />
      </div>
    </div>
  );
}
