import { evolution, equation, equationResult } from "@/lib/content";

export function EvolutionStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {evolution.map((e, i) => (
            <div key={e.from} className="flex items-center gap-x-6">
              {i > 0 && <span className="text-xl text-[var(--color-slate)]">→</span>}
              <div className="text-center">
                <p className="text-base font-black text-[var(--color-ink)]">{e.from}</p>
                <p className="text-sm text-[var(--color-slate)]">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-black/5 pt-8 text-center">
          {equation.map((term, i) => (
            <span key={term} className="flex items-center gap-3">
              <span className="rounded-full bg-black/[0.04] px-4 py-2 text-sm font-bold text-[var(--color-ink)]">{term}</span>
              {i < equation.length - 1 && <span className="text-lg font-bold text-[var(--color-slate)]">+</span>}
            </span>
          ))}
          <span className="text-lg font-bold text-[var(--color-slate)]">=</span>
          <span className="gradient-bar rounded-full px-5 py-2 text-sm font-black text-white">{equationResult}</span>
        </div>
      </div>
    </section>
  );
}
