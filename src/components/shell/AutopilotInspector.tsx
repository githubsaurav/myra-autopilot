import { X } from "lucide-react";
import { useDemoStore } from "@/state/useDemoStore";
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
  const { inspectorOpen, setInspectorOpen, activePersonaId, inspectorHistory } = useDemoStore();
  const history = activePersonaId ? inspectorHistory[activePersonaId] : [];
  const snapshot = history[history.length - 1] ?? null;

  return (
    <>
      <div
        onClick={() => setInspectorOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${inspectorOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-x-0 bottom-0 top-auto z-50 flex h-[80vh] w-full max-w-full flex-col rounded-t-2xl border-t border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-pop)] transition-transform duration-300 sm:inset-x-auto sm:right-0 sm:top-0 sm:bottom-auto sm:h-full sm:w-[320px] sm:max-w-[85vw] sm:translate-y-0 sm:rounded-t-none sm:border-l sm:border-t-0 ${
          inspectorOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full"
        }`}
      >
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-black/10 sm:hidden" />
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[var(--color-navy)]">Agent Insights</p>
            <p className="mt-0.5 text-[11px] text-[var(--color-slate)]">What Myra is doing behind the scenes</p>
          </div>
          <button
            type="button"
            onClick={() => setInspectorOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-slate)] hover:bg-black/5"
            aria-label="Close agent insights"
          >
            <X size={16} />
          </button>
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

            <Section label="Powered by">
              <p className="text-sm font-semibold text-[var(--color-ink)]">{snapshot.poweredBy}</p>
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
    </>
  );
}
