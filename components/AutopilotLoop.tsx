import { SectionHeader } from "@/components/SectionHeader";
import { loopStages } from "@/lib/content";
import { TyphoonScenario } from "@/components/TyphoonScenario";

export function AutopilotLoop() {
  return (
    <section className="border-y border-black/5 bg-black/[0.015]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          index="2"
          title="Myra Autopilot Core"
          subtitle="A closed loop, not a one-off answer — it keeps running for the life of the trip."
          color="var(--color-accent-2)"
        />

        <div className="relative">
          <div className="grid gap-3 lg:grid-cols-5">
            {loopStages.map((stage, i) => (
              <div key={stage.id} className="flex items-stretch gap-3 lg:contents">
                <div
                  className="flex flex-1 flex-col rounded-2xl border border-black/5 bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)]"
                  style={{ borderTopWidth: 3, borderTopColor: `var(--color-stage-${i + 1})` }}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: `var(--color-stage-${i + 1})` }}
                  >
                    {stage.stage}
                  </span>
                  <h3 className="mt-2 text-sm font-black text-[var(--color-ink)]">{stage.title}</h3>
                  <p className="mt-1 text-xs text-[var(--color-slate)]">{stage.line}</p>
                  <ul className="mt-2.5 flex flex-wrap gap-1">
                    {stage.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{
                          background: `color-mix(in srgb, var(--color-stage-${i + 1}) 10%, var(--color-surface))`,
                          color: `var(--color-stage-${i + 1})`,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {stage.solves && (
                    <p className="mt-auto pt-2 text-[10px] font-bold uppercase tracking-wide text-[var(--color-status-critical)]">
                      ✓ {stage.solves}
                    </p>
                  )}
                </div>
                {i < loopStages.length - 1 && (
                  <div className="flex shrink-0 items-center justify-center text-[var(--color-slate)] lg:hidden">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 hidden items-center justify-center gap-2 text-xs font-semibold text-[var(--color-slate)] lg:flex">
            <span>🔁</span>
            <span>Learn feeds back into Know — every cycle sharpens the next one</span>
          </div>
        </div>

        <div className="mt-10">
          <TyphoonScenario />
        </div>
      </div>
    </section>
  );
}
