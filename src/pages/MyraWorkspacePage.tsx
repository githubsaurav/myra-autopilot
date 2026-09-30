import { Sparkles } from "lucide-react";
import { MyraHeader } from "@/components/myra/MyraHeader";
import { CapabilityBanner } from "@/components/myra/CapabilityBanner";
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
        <div className="chat-welcome app-scroll">
          <span className="welcome-emblem"><Sparkles size={28} /></span>
          <span className="eyebrow">LESS TO ORGANISE. MORE TO EXPERIENCE.</span>
          <h2>Wherever you’re going,<br /><em>let’s make it yours.</em></h2>
          <p>Pick up a journey. I’ll bring the context, the ideas, and a little peace of mind.</p>
          <div className="welcome-journeys">{personas.map(p => { const Icon = p.icon; return <button key={p.id} onClick={() => setActivePersona(p.id)}><span className={`welcome-icon welcome-${p.id}`}><Icon size={21} /></span><span><strong>{p.name}</strong><small>{p.capabilityBadge}</small></span><span aria-hidden="true">↗</span></button>; })}</div>
          <small>Three guided journeys · Sample data · Your progress stays on this device</small>
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
