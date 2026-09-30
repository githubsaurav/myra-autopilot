import { Sparkles } from "lucide-react";
import { MyraHeader } from "@/components/myra/MyraHeader";
import { CapabilityBanner } from "@/components/myra/CapabilityBanner";
import { PersonaSelector } from "@/components/shell/PersonaSelector";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";
import type { PersonaId } from "@/types/demo";
import PersonaFamily from "@/scenarios/PersonaFamily";
import PersonaSolo from "@/scenarios/PersonaSolo";
import PersonaGroup from "@/scenarios/PersonaGroup";

const personaComponents: Record<PersonaId, React.ComponentType> = {
  family: PersonaFamily,
  solo: PersonaSolo,
  group: PersonaGroup,
};

export default function MyraWorkspacePage() {
  const { activePersonaId, setActivePersona, trips } = useDemoStore();

  if (!activePersonaId) {
    return (
      <div className="flex h-full flex-col">
        <MyraHeader />
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-red-soft)] text-[var(--color-red)]">
            <Sparkles size={20} />
          </span>
          <div>
            <p className="text-sm font-bold text-[var(--color-ink)]">Pick a trip to continue</p>
            <p className="mt-1 text-xs text-[var(--color-slate)]">Same account, three trip folders — Myra activates with that trip's context, and your trip/bookings/profile switch with it.</p>
          </div>
          <PersonaSelector value={null} onChange={setActivePersona} />
          <div className="w-full space-y-2 pt-2">
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePersona(p.id)}
                  className="flex w-full items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-left text-xs text-[var(--color-ink)] hover:border-[var(--color-navy)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[var(--color-navy)]">
                    <Icon size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{p.name}</span>
                    <span className="mt-0.5 block text-[var(--color-slate)]">"{p.samplePrompt}"</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const ActiveScenario = personaComponents[activePersonaId];
  const trip = trips[activePersonaId];
  const persona = personas.find((p) => p.id === activePersonaId)!;

  return (
    <div className="flex h-full flex-col">
      <MyraHeader
        tripLabel={trip ? `${trip.destination} · Day ${trip.dayNumber} of ${trip.totalDays}` : persona.tagline}
        persona={persona}
        onChangePersona={setActivePersona}
      />
      <CapabilityBanner label={persona.capabilityBadge} />
      <ActiveScenario key={activePersonaId} />
    </div>
  );
}
