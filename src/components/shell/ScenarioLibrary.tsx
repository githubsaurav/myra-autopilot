import { Play, RotateCcw, ArrowRight } from "lucide-react";
import { scenarios } from "@/data/demoScenarios";
import { useDemoStore } from "@/state/useDemoStore";
import type { ScenarioTag } from "@/types/demo";
import { useNavigate } from "react-router-dom";

const tagTone: Record<ScenarioTag, string> = {
  "GENERATIVE UI": "bg-[var(--color-navy-soft)] text-[var(--color-navy)]",
  CONTEXT: "bg-black/[0.05] text-[var(--color-ink)]",
  ADAPT: "bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
  ORCHESTRATE: "bg-[var(--color-red-soft)] text-[var(--color-red)]",
  MEMORY: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
};

const categoryLabel: Record<string, string> = {
  ENTRY: "ENTRY",
  GUIDE: "IN TRIP",
  ADAPT: "ADAPT",
  RECOVER: "RECOVER",
  LEARN: "LEARN",
};

export function ScenarioLibrary() {
  const { activeScenarioId, setActiveScenario, heroFlowActive, startHeroFlow, stopHeroFlow, advanceHeroFlow, resetDemo } =
    useDemoStore();
  const navigate = useNavigate();

  let lastCategory = "";

  return (
    <aside className="hidden h-full w-[260px] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:flex">
      <div className="border-b border-[var(--color-border)] px-4 py-4">
        <p className="text-xs font-black uppercase tracking-wide text-[var(--color-navy)]">Myra Autopilot Demo</p>
        <p className="mt-0.5 text-[11px] text-[var(--color-slate)]">Scenario library</p>
      </div>

      <nav className="app-scroll flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {scenarios.map((s) => {
          const showCategory = s.category !== lastCategory;
          lastCategory = s.category;
          const active = s.id === activeScenarioId;
          return (
            <div key={s.id}>
              {showCategory && (
                <p className="mb-1 mt-3 px-2 text-[10px] font-black uppercase tracking-wider text-[var(--color-slate)] first:mt-0">
                  {categoryLabel[s.category]}
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setActiveScenario(s.id);
                  navigate("/myra");
                }}
                className={`relative flex w-full flex-col gap-1 rounded-xl px-3 py-2.5 text-left transition ${
                  active ? "bg-[var(--color-navy)] text-white" : "hover:bg-black/[0.04]"
                }`}
              >
                {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[var(--color-red)]" />}
                <span className={`text-[11px] font-bold ${active ? "text-white/70" : "text-[var(--color-slate)]"}`}>{s.number}</span>
                <span className={`text-sm font-semibold ${active ? "text-white" : "text-[var(--color-ink)]"}`}>{s.name}</span>
                <span
                  className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                    active ? "bg-white/15 text-white" : tagTone[s.tag]
                  }`}
                >
                  {s.tag}
                </span>
              </button>
            </div>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-[var(--color-border)] p-3">
        {heroFlowActive ? (
          <button
            type="button"
            onClick={() => {
              advanceHeroFlow();
              navigate("/myra");
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white"
          >
            Next Demo Moment <ArrowRight size={13} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              startHeroFlow();
              navigate("/myra");
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-navy)] py-2.5 text-xs font-bold text-white"
          >
            <Play size={13} /> Play Hero Flow
          </button>
        )}
        {heroFlowActive && (
          <button
            type="button"
            onClick={stopHeroFlow}
            className="w-full rounded-lg border border-[var(--color-border)] py-2 text-xs font-semibold text-[var(--color-slate)]"
          >
            Exit hero flow
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            resetDemo();
            navigate("/myra");
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] py-2 text-xs font-semibold text-[var(--color-slate)] hover:bg-black/5"
        >
          <RotateCcw size={13} /> Reset Demo
        </button>
      </div>
    </aside>
  );
}
