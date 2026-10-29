/** Shown while a route segment streams in. Mirrors the hero layout to avoid layout shift. */
export default function Loading() {
  return (
    <div className="container-page animate-pulse pb-16 pt-14 sm:pt-20 lg:pt-28" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true">
        <div className="h-3 w-48 rounded bg-surface-2" />
        <div className="mt-8 h-14 w-full max-w-3xl rounded bg-surface-2 sm:h-20" />
        <div className="mt-4 h-14 w-2/3 max-w-2xl rounded bg-surface-2 sm:h-20" />
        <div className="mt-10 h-4 w-full max-w-xl rounded bg-surface-2" />
        <div className="mt-3 h-4 w-5/6 max-w-lg rounded bg-surface-2" />
      </div>
    </div>
  );
}
