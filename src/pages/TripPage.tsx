import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { DestinationHero } from "@/components/DestinationHero";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { PersonaSelector } from "@/components/shell/PersonaSelector";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";
import type { ItineraryItem, PersonaId } from "@/types/demo";

function statusTag(item: ItineraryItem) {
  if (item.status === "moved") return { label: "Moved by Myra", tone: "navy" as const };
  if (item.status === "new") return { label: "Added by Myra", tone: "success" as const };
  return null;
}

function Home({ onPick }: { onPick: (id: PersonaId) => void }) {
  const navigate = useNavigate();
  return (
    <div className="app-scroll h-full overflow-y-auto px-5 py-6">
      <DestinationHero title="Meet Myra Autopilot" subtitle="Your AI travel companion">
        <p className="mt-2 text-xs text-white/80">
          Natural language plans the trip. Myra stays with it — sensing change and coordinating outcomes, not just answering questions.
        </p>
      </DestinationHero>

      <button
        type="button"
        onClick={() => navigate("/myra")}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm hover:opacity-90"
      >
        Create Trip <ArrowRight size={15} />
      </button>

      <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">Or try a scenario</p>
      <div className="space-y-3">
        {personas.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onPick(p.id);
                navigate("/myra");
              }}
              className="flex w-full items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-[var(--shadow-card)] transition hover:border-[var(--color-navy)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[var(--color-navy)]">
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-[var(--color-ink)]">{p.name}</p>
                  <span className="shrink-0 rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-ink)]">{p.languageLabel}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-slate)]">{p.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TripPage() {
  const { activePersonaId, setActivePersona, trips } = useDemoStore();
  const navigate = useNavigate();

  if (!activePersonaId) {
    return <Home onPick={setActivePersona} />;
  }

  const trip = trips[activePersonaId];
  const persona = personas.find((p) => p.id === activePersonaId)!;

  return (
    <div className="app-scroll h-full overflow-y-auto px-5 py-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">Viewing</span>
        <PersonaSelector value={activePersonaId} onChange={setActivePersona} variant="pill" />
      </div>

      {!trip ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--color-border)] py-16 text-center">
          <Sparkles size={22} className="text-[var(--color-red)]" />
          <p className="text-sm font-semibold text-[var(--color-ink)]">{persona.name} isn't booked yet</p>
          <p className="max-w-[280px] text-xs text-[var(--color-slate)]">Keep chatting with Myra to turn this into a confirmed trip.</p>
          <button type="button" onClick={() => navigate("/myra")} className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-xs font-bold text-white">
            Continue in Myra
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <DestinationHero title={`${persona.name} · ${trip.destination}`} subtitle={`Day ${trip.dayNumber} of ${trip.totalDays} · ${trip.liveContext.city}`}>
            <p className="mt-2 text-xs text-white/80">{trip.liveContext.weather}</p>
          </DestinationHero>

          {Array.from(new Set(trip.itinerary.map((i) => i.day)))
            .sort((a, b) => a - b)
            .map((day) => (
              <div key={day}>
                <SectionLabel>Day {day}</SectionLabel>
                <Card className="divide-y divide-[var(--color-border)] p-0">
                  {trip.itinerary
                    .filter((i) => i.day === day)
                    .map((item) => {
                      const tag = statusTag(item);
                      return (
                        <div key={item.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                          <span className="w-14 shrink-0 font-semibold text-[var(--color-slate)]">{item.time}</span>
                          <span className="flex-1 text-[var(--color-ink)]">{item.title}</span>
                          {tag && <Chip tone={tag.tone}>{tag.label}</Chip>}
                        </div>
                      );
                    })}
                </Card>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
