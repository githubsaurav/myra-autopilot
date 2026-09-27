import { SectionHeader } from "@/components/SectionHeader";
import { ecosystemLayers, ecosystemLine, moatPillars, moatLine } from "@/lib/content";

export function EcosystemSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        index="3"
        title="AI Travel Ecosystem"
        subtitle="How Myra can actually do all of this — not a technical API diagram, a platform ecosystem."
        color="var(--color-ecosystem)"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {ecosystemLayers.map((layer) => (
          <div key={layer.id} className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl text-lg" style={{ background: "var(--color-ecosystem-bg)" }}>
              {layer.icon}
            </span>
            <h3 className="mt-2 text-sm font-black text-[var(--color-ink)]">{layer.title}</h3>
            <ul className="mt-2 space-y-1 text-xs text-[var(--color-slate)]">
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* hub visual */}
      <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-ecosystem)]/15 bg-[var(--color-ecosystem-bg)] py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)]">
          All five layers connect to
        </p>
        <p className="rounded-full bg-[var(--color-ecosystem)] px-5 py-2 text-sm font-black text-white">
          Myra Autopilot
        </p>
        <span className="text-[var(--color-slate)]">↓</span>
        <p className="rounded-full border-2 border-[var(--color-ecosystem)] px-5 py-1.5 text-sm font-bold text-[var(--color-ecosystem)]">
          Traveller
        </p>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-semibold text-[var(--color-ink)]">
        {ecosystemLine}
      </p>

      {/* Moat */}
      <div className="mt-10">
        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-[var(--color-slate)]">
          Why MakeMyTrip can build this
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moatPillars.map((p) => (
            <div key={p.title} className="rounded-xl border border-black/5 bg-[var(--color-surface)] p-4 text-center shadow-[var(--shadow-sm)]">
              <p className="text-sm font-black uppercase tracking-wide text-[var(--color-ecosystem)]">{p.title}</p>
              <p className="mt-1 text-xs text-[var(--color-slate)]">{p.detail}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl rounded-xl bg-[var(--color-ink)] px-5 py-3 text-center text-sm font-bold text-white">
          {moatLine}
        </p>
      </div>
    </section>
  );
}
