import { SectionHeader } from "@/components/SectionHeader";
import { autonomyLevels, guardrails, autonomyLine } from "@/lib/content";

/** Ordinal ramp — one hue, increasing lightness->depth as autonomy increases. */
const LEVEL_SHADES = ["#cde2fb", "#6da7ec", "#2a78d6", "#184f95"];

export function AutonomySection() {
  return (
    <section className="border-y border-black/5 bg-black/[0.015]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          index="4"
          title="Autopilot is progressive, not uncontrolled"
          subtitle="“Autopilot” shouldn't sound like AI automatically spending money. Autonomy is earned, level by level."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {autonomyLevels.map((lvl, i) => (
            <div key={lvl.level} className="relative flex flex-col rounded-2xl border border-black/5 p-4 shadow-[var(--shadow-sm)]" style={{ background: i === 3 ? LEVEL_SHADES[3] : "var(--color-surface)" }}>
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: LEVEL_SHADES[i], color: i >= 2 ? "white" : "var(--color-ink)" }}
              >
                {lvl.level}
              </span>
              <h3 className={`mt-2 text-sm font-black ${i === 3 ? "text-white" : "text-[var(--color-ink)]"}`}>{lvl.title}</h3>
              <p className={`mt-1 text-sm italic ${i === 3 ? "text-white/85" : "text-[var(--color-slate)]"}`}>
                &ldquo;{lvl.quote}&rdquo;
              </p>
              {i < autonomyLevels.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[var(--color-slate)] lg:block">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {guardrails.map((g) => (
            <span key={g} className="rounded-full border border-black/10 bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-slate)]">
              {g}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-base font-bold text-[var(--color-ink)]">{autonomyLine}</p>
      </div>
    </section>
  );
}
