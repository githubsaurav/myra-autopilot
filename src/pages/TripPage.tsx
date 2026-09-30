import { useState } from "react";
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

const planningStatus: Partial<Record<PersonaId, string>> = {
  solo: "Three offbeat places just surfaced — curation about to begin",
  group: "Priya, Rohan & Zoya have weighed in — stay vote in progress",
};

const stageTag: Record<PersonaId, { label: string; tone: "success" | "navy" | "warning" }> = {
  family: { label: "Ongoing trip", tone: "success" },
  solo: { label: "Curation just starting", tone: "navy" },
  group: { label: "Planning · conversation started", tone: "warning" },
};

export default function TripPage() {
  const { activePersonaId, setActivePersona, trips, personaStage } = useDemoStore();
  const navigate = useNavigate();
  const [suggestionPicked, setSuggestionPicked] = useState<string | null>(null);

  const ongoing = personas.filter((p) => trips[p.id]);
  const upcoming = personas.filter((p) => !trips[p.id]);

  const selectedTrip = activePersonaId ? trips[activePersonaId] : null;
  const selectedPersona = activePersonaId ? personas.find((p) => p.id === activePersonaId) : undefined;

  function openFolder(id: typeof personas[number]["id"]) {
    setActivePersona(id);
    navigate("/myra");
  }

  return (
    <div className="app-scroll h-full overflow-y-auto px-5 py-5">
      <div className="space-y-5">
        <DestinationHero title="Your Trips" subtitle="One account, three trip folders">
          <p className="mt-2 text-xs text-white/80">
            Same traveller, same Myra — the assistant that shows up is shaped by which trip you open.
          </p>
        </DestinationHero>

        {ongoing.length > 0 && (
          <div>
            <SectionLabel>Current trips</SectionLabel>
            <div className="space-y-2.5">
              {ongoing.map((p) => {
                const trip = trips[p.id]!;
                const Icon = p.icon;
                const inTrip = personaStage[p.id] === "intrip";
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => openFolder(p.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                      activePersonaId === p.id ? "border-[var(--color-navy)] bg-[var(--color-navy-soft)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-navy)]">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-[var(--color-ink)]">{trip.destination}</p>
                        <Chip tone={stageTag[p.id].tone}>{stageTag[p.id].label}</Chip>
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--color-slate)]">
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
            <SectionLabel>Planned trips</SectionLabel>
            <div className="space-y-2.5">
              {upcoming.map((p) => {
                const Icon = p.icon;
                const status = planningStatus[p.id];
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => openFolder(p.id)}
                    className="flex w-full items-start gap-3 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-left transition hover:border-[var(--color-navy)]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-slate)]">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-[var(--color-ink)]">{p.name}</p>
                        <span className="shrink-0 rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-ink)]">{p.languageLabel}</span>
                      </div>
                      <div className="mt-1">
                        <Chip tone={stageTag[p.id].tone}>{stageTag[p.id].label}</Chip>
                      </div>
                      <p className="mt-1 text-xs text-[var(--color-slate)]">{status ?? p.tagline}</p>
                    </div>
                    <ArrowRight size={15} className="mt-1 shrink-0 text-[var(--color-slate)]" />
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
                  title={`${selectedTrip.destination} · ${selectedPersona.name}`}
                  subtitle={`Day ${selectedTrip.dayNumber} of ${selectedTrip.totalDays} · ${selectedTrip.liveContext.city}`}
                >
                  <p className="mt-2 text-xs text-white/80">{selectedTrip.liveContext.weather}</p>
                </DestinationHero>

                <Card>
                  <SectionLabel>You are on this trip right now</SectionLabel>
                  <div className="flex flex-wrap items-center gap-1">
                    {Array.from({ length: selectedTrip.totalDays }, (_, i) => i + 1).map((d) => {
                      const dayState = d < selectedTrip.dayNumber ? "done" : d === selectedTrip.dayNumber ? "current" : "upcoming";
                      return (
                        <span
                          key={d}
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                            dayState === "done"
                              ? "bg-[var(--color-success)] text-white"
                              : dayState === "current"
                                ? "bg-[var(--color-navy)] text-white ring-2 ring-[var(--color-navy)]/30 ring-offset-1"
                                : "bg-black/[0.06] text-[var(--color-slate)]"
                          }`}
                        >
                          {d}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-2.5 text-xs text-[var(--color-slate)]">
                    You're on <span className="font-bold text-[var(--color-ink)]">Day {selectedTrip.dayNumber}</span> of {selectedTrip.totalDays}.
                    {(() => {
                      const headingTo = selectedTrip.itinerary.find((i) => i.day === selectedTrip.dayNumber + 1);
                      return headingTo ? (
                        <>
                          {" "}
                          Heading to <span className="font-semibold text-[var(--color-ink)]">Day {headingTo.day}: {headingTo.title}</span>.
                        </>
                      ) : null;
                    })()}
                  </p>

                  {(() => {
                    const freeItem = selectedTrip.itinerary.find((i) => i.day === selectedTrip.dayNumber && i.category === "free");
                    if (!freeItem) return null;
                    return (
                      <div className="mt-3 rounded-lg bg-[var(--color-navy-soft)] p-3">
                        <p className="text-xs font-semibold text-[var(--color-navy)]">Your evening's free — want to...</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {["Visit a theme park", "Go shopping", "Relax at the hotel"].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSuggestionPicked(s)}
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                                suggestionPicked === s
                                  ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white"
                                  : "border-[var(--color-border)] bg-white text-[var(--color-ink)]"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        {suggestionPicked && (
                          <p className="mt-2 text-[11px] font-semibold text-[var(--color-success)]">
                            Noted — I'll plan the rest of your evening around "{suggestionPicked}".
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </Card>

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
