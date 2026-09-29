import { useInspector } from "@/state/InspectorContext";
import { SectionLabel } from "@/components/Card";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[var(--color-border)] px-4 py-3.5 last:border-0">
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  );
}

export function AutopilotInspector() {
  const { snapshot } = useInspector();

  return (
    <aside className="hidden h-full w-[300px] shrink-0 flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] xl:flex">
      <div className="border-b border-[var(--color-border)] px-4 py-4">
        <p className="text-xs font-black uppercase tracking-wide text-[var(--color-navy)]">Autopilot Inspector</p>
        <p className="mt-0.5 text-[11px] text-[var(--color-slate)]">Presentation explanation layer</p>
      </div>

      {!snapshot ? (
        <p className="px-4 py-6 text-xs text-[var(--color-slate)]">Select a scenario to see what Myra is doing behind the scenes.</p>
      ) : (
        <div className="app-scroll flex-1 overflow-y-auto">
          <Section label="Scenario">
            <p className="text-sm font-bold text-[var(--color-ink)]">{snapshot.scenarioName}</p>
            <span className="mt-1 inline-block rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-ink)]">
              {snapshot.scenarioTag}
            </span>
          </Section>

          <Section label="User state">
            <p className="text-sm text-[var(--color-ink)]">{snapshot.userState}</p>
          </Section>

          <Section label="Context used">
            <div className="flex flex-wrap gap-1.5">
              {snapshot.contextUsed.map((c) => (
                <span key={c} className="rounded-full bg-[var(--color-navy-soft)] px-2 py-1 text-[11px] font-semibold text-[var(--color-navy)]">
                  {c}
                </span>
              ))}
            </div>
          </Section>

          <Section label="Intent">
            <p className="text-sm text-[var(--color-ink)]">{snapshot.intent}</p>
          </Section>

          <Section label="Generated UI">
            <p className="text-sm text-[var(--color-ink)]">{snapshot.generatedUI}</p>
          </Section>

          <Section label="Action">
            <p className="text-sm text-[var(--color-ink)]">{snapshot.action}</p>
          </Section>

          <Section label="State change">
            <p className="text-sm font-semibold text-[var(--color-navy)]">{snapshot.stateChange}</p>
          </Section>

          <Section label="Value demonstrated">
            <ul className="space-y-1">
              {snapshot.valueDemonstrated.map((v) => (
                <li key={v} className="text-sm text-[var(--color-ink)]">
                  • {v}
                </li>
              ))}
            </ul>
          </Section>

          {snapshot.whyMMT && (
            <Section label="Why MMT">
              <p className="text-sm text-[var(--color-ink)]">{snapshot.whyMMT}</p>
            </Section>
          )}
        </div>
      )}
    </aside>
  );
}
