import { hero } from "@/lib/content";

export function Hero() {
  return (
    <header className="gradient-wash border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)]">
          <span>{hero.eyebrow}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--color-slate)]" />
          <span className="text-[var(--color-accent)]">MakeMyTrip</span>
        </div>

        <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
          <span className="gradient-text">{hero.title}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold text-[var(--color-ink)] sm:text-xl">
          {hero.subtitle}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--color-slate)] sm:text-base">{hero.description}</p>

        <div className="mx-auto mt-7 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-[var(--color-status-critical)]/25 bg-[var(--color-status-critical-bg)] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[var(--color-status-critical)] sm:text-sm">
          {hero.tag}
        </div>
      </div>
    </header>
  );
}
