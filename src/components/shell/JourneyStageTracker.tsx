import { Check } from "lucide-react";
import { journeyStages, personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";
import type { JourneyStage } from "@/types/demo";

const stageMessages: Record<JourneyStage, string> = {
  discovery: "Traveller states intent in natural language — Myra structures it and surfaces options.",
  curation: "Traveller narrows down and refines the plan; Myra adapts the itinerary to fit.",
  booking: "The plan becomes a real, confirmed trip inside MakeMyTrip.",
  intrip: "Myra stays with the trip — sensing change and coordinating outcomes, not just answers.",
};

export function JourneyStageTracker() {
  const { activePersonaId, personaStage, trips } = useDemoStore();

  const persona = activePersonaId ? personas.find((p) => p.id === activePersonaId) : undefined;
  const currentStage = activePersonaId ? personaStage[activePersonaId] : null;
  const currentIndex = currentStage ? journeyStages.findIndex((s) => s.id === currentStage) : -1;
  const hasTrip = activePersonaId ? !!trips[activePersonaId] : false;

  return (
    <div className="mx-auto w-full max-w-[880px] px-5 py-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--color-slate)]">
          User journey {persona ? `· ${persona.name}` : ""}
        </p>
        {hasTrip && <span className="text-[11px] font-semibold text-[var(--color-success)]">Tracking live</span>}
      </div>

      <div className="flex items-start">
        {journeyStages.map((stage, i) => {
          const done = currentIndex > i;
          const active = currentIndex === i;
          const connectorFilled = currentIndex > i;
          return (
            <div key={stage.id} className={`flex items-center ${i === journeyStages.length - 1 ? "" : "flex-1"}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors duration-300 ${
                    done
                      ? "border-[var(--color-success)] bg-[var(--color-success)] text-white"
                      : active
                        ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)]"
                  }`}
                >
                  {done ? <Check size={13} /> : i + 1}
                </div>
                <span
                  className={`mt-1.5 whitespace-nowrap text-[11px] font-semibold ${
                    active ? "text-[var(--color-navy)]" : done ? "text-[var(--color-success)]" : "text-[var(--color-slate)]"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {i !== journeyStages.length - 1 && (
                <div className="mx-1.5 h-0.5 flex-1 self-start rounded-full bg-[var(--color-border)] mt-3.5">
                  <div
                    className={`h-full rounded-full bg-[var(--color-success)] transition-all duration-500 ${connectorFilled ? "w-full" : "w-0"}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[var(--color-slate)]">
        {currentStage
          ? stageMessages[currentStage]
          : "Select a scenario above to see Myra guide the traveller from discovery to in-trip outcomes."}
      </p>
    </div>
  );
}
