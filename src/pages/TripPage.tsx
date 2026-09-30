import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
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

function WelcomeHero({ onPick }: { onPick: (id: PersonaId) => void }) {
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
  const { activePersonaId, setActivePersona, trips, personaStep, personaStage } = useDemoStore();
  const navigate = useNavigate();

  const anyProgress = personas.some((p) => trips[p.id] || personaStep[p.id] > 0);

  if (!anyProgress) {
    return <WelcomeHero onPick={setActivePersona} />;
  }

  const ongoing = personas.filter((p) => trips[p.id]);
  const upcoming = personas.filter((p) => !trips[p.id]);

  const selectedTrip = activePersonaId ? trips[activePersonaId] : null;
  const selectedPersona = activePersonaId ? personas.find((p) => p.id === activePersonaId) : undefined;

  return (
    <div className="app-scroll h-full overflow-y-auto px-5 py-5">
      <div className="space-y-5">
        {ongoing.length > 0 && (
          <div>
            <SectionLabel>Your plans — ongoing</SectionLabel>
            <div className="space-y-2.5">
              {ongoing.map((p) => {
                const trip = trips[p.id]!;
                const Icon = p.icon;
                const inTrip = personaStage[p.id] === "intrip";
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePersona(p.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                      activePersonaId === p.id ? "border-[var(--color-navy)] bg-[var(--color-navy-soft)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-navy)]">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[var(--color-ink)]">{trip.destination}</p>
                      <p className="text-xs text-[var(--color-slate)]">
                        {p.name} · Day {trip.dayNumber} of {trip.totalDays}
                      </p>
                    </div>
                    {inTrip && <Chip tone="red">In-trip assistance active</Chip>}
                    <ChevronRight size={16} className="shrink-0 text-[var(--color-slate)]" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {upcoming.length > 0 && (
          <div>
            <SectionLabel>Upcoming trips</SectionLabel>
            <div className="space-y-2.5">
              {upcoming.map((p) => {
                const Icon = p.icon;
                const started = personaStep[p.id] > 0;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setActivePersona(p.id);
                      navigate("/myra");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-left transition hover:border-[var(--color-navy)]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-slate)]">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[var(--color-ink)]">{p.name}</p>
                      <p className="text-xs text-[var(--color-slate)]">{started ? "In progress — not booked yet" : "Not started"}</p>
                    </div>
                    <ArrowRight size={15} className="shrink-0 text-[var(--color-slate)]" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedPersona && (
          <div className="border-t border-[var(--color-border)] pt-5">
            <div className="mb-3 flex items-center justify-between">
              <SectionLabel>Trip detail</SectionLabel>
              <PersonaSelector value={activePersonaId} onChange={setActivePersona} variant="pill" />
            </div>

            {!selectedTrip ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--color-border)] py-16 text-center">
                <Sparkles size={22} className="text-[var(--color-red)]" />
                <p className="text-sm font-semibold text-[var(--color-ink)]">{selectedPersona.name} isn't booked yet</p>
                <p className="max-w-[280px] text-xs text-[var(--color-slate)]">Keep chatting with Myra to turn this into a confirmed trip.</p>
                <button type="button" onClick={() => navigate("/myra")} className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-xs font-bold text-white">
                  Continue in Myra
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <DestinationHero
                  title={`${selectedPersona.name} · ${selectedTrip.destination}`}
                  subtitle={`Day ${selectedTrip.dayNumber} of ${selectedTrip.totalDays} · ${selectedTrip.liveContext.city}`}
                >
                  <p className="mt-2 text-xs text-white/80">{selectedTrip.liveContext.weather}</p>
                </DestinationHero>

                {Array.from(new Set(selectedTrip.itinerary.map((i) => i.day)))
                  .sort((a, b) => a - b)
                  .map((day) => (
                    <div key={day}>
                      <SectionLabel>Day {day}</SectionLabel>
                      <Card className="divide-y divide-[var(--color-border)] p-0">
                        {selectedTrip.itinerary
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
        )}
      </div>
    </div>
  );
}
