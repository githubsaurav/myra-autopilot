import { useState } from "react";
import { CalendarDays, Clock, Footprints, MapPin, Plane, UtensilsCrossed, Camera, Sparkles, Coffee, ChevronRight, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { EmptyPersonaNotice } from "@/components/shell/EmptyPersonaNotice";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";
import type { ItineraryItem, PersonaId } from "@/types/demo";

const categoryMeta: Record<string, { icon: LucideIcon; label: string }> = {
  logistics: { icon: Plane, label: "Logistics" },
  food: { icon: UtensilsCrossed, label: "Food" },
  sightseeing: { icon: Camera, label: "Sightseeing" },
  activity: { icon: Sparkles, label: "Activity" },
  free: { icon: Coffee, label: "Free time" },
};

function categoryFor(item: ItineraryItem) {
  return categoryMeta[item.category ?? ""] ?? { icon: Clock, label: "Plan" };
}

function statusTag(item: ItineraryItem) {
  if (item.status === "moved") return { label: "Moved by Myra", tone: "navy" as const };
  if (item.status === "new") return { label: "Added by Myra", tone: "success" as const };
  if (item.status === "completed") return { label: "Done", tone: "neutral" as const };
  return null;
}

export default function PlanPage() {
  const { activePersonaId, setActivePersona, trips } = useDemoStore();
  const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(null);

  const bookedPersonas = personas.filter((p) => trips[p.id]);

  if (bookedPersonas.length === 0) {
    return <EmptyPersonaNotice icon={CalendarDays} message="No trips booked yet — chat with Myra to plan and book your first trip." />;
  }

  const selectedPersonaId: PersonaId = activePersonaId && trips[activePersonaId] ? activePersonaId : bookedPersonas[0].id;
  const trip = trips[selectedPersonaId]!;
  const persona = personas.find((p) => p.id === selectedPersonaId)!;

  const totalCost = trip.bookings.reduce((sum, b) => sum + b.amount, 0);
  const days = Array.from(new Set(trip.itinerary.map((i) => i.day))).sort((a, b) => a - b);
  const dayItems = (day: number) => trip.itinerary.filter((i) => i.day === day).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="app-scroll h-full space-y-4 overflow-y-auto px-5 py-5">
      <div>
        <SectionLabel>Select a trip</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {bookedPersonas.map((p) => {
            const Icon = p.icon;
            const t = trips[p.id]!;
            const active = selectedPersonaId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePersona(p.id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${
                  active
                    ? "border-[var(--color-navy)] bg-[var(--color-navy-soft)] text-[var(--color-navy)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
                }`}
              >
                <Icon size={14} />
                {t.destination}
              </button>
            );
          })}
        </div>
      </div>

      <Card>
        <SectionLabel>
          {trip.destination} · {persona.name}
        </SectionLabel>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-black text-[var(--color-ink)]">{trip.totalDays}</p>
            <p className="text-[10px] font-semibold text-[var(--color-slate)]">Days</p>
          </div>
          <div>
            <p className="text-lg font-black text-[var(--color-ink)]">{trip.travellers}</p>
            <p className="text-[10px] font-semibold text-[var(--color-slate)]">Travellers</p>
          </div>
          <div>
            <p className="text-lg font-black text-[var(--color-ink)]">₹{Math.round(totalCost / 1000)}K</p>
            <p className="text-[10px] font-semibold text-[var(--color-slate)]">Total spend</p>
          </div>
        </div>
      </Card>

      <div>
        <SectionLabel>Itinerary — tap an activity for details</SectionLabel>
        <div className="space-y-3">
          {days.map((day) => (
            <Card key={day} className="p-0">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2 text-xs font-bold text-[var(--color-navy)]">
                Day {day}
                {day === trip.dayNumber && <Chip tone="navy">Today</Chip>}
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {dayItems(day).map((item) => {
                  const meta = categoryFor(item);
                  const Icon = meta.icon;
                  const tag = statusTag(item);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-black/[0.03]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[var(--color-navy)]">
                        <Icon size={13} />
                      </span>
                      <span className="w-14 shrink-0 font-semibold text-[var(--color-slate)]">{item.time}</span>
                      <span className="flex-1 truncate text-[var(--color-ink)]">{item.title}</span>
                      {tag && <Chip tone={tag.tone}>{tag.label}</Chip>}
                      <ChevronRight size={14} className="shrink-0 text-[var(--color-slate)]" />
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedItem && <ActivityDetailSheet item={selectedItem} dayItems={dayItems(selectedItem.day)} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}

function ActivityDetailSheet({ item, dayItems, onClose }: { item: ItineraryItem; dayItems: ItineraryItem[]; onClose: () => void }) {
  const meta = categoryFor(item);
  const Icon = meta.icon;
  const tag = statusTag(item);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-pop)] sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[420px] sm:max-w-[90vw] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[var(--color-navy)]">
              <Icon size={16} />
            </span>
            <div>
              <p className="text-sm font-bold text-[var(--color-ink)]">{item.title}</p>
              <p className="text-xs text-[var(--color-slate)]">
                Day {item.day} · {item.time} · {meta.label}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--color-slate)] hover:bg-black/5"
          >
            <X size={15} />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tag && <Chip tone={tag.tone}>{tag.label}</Chip>}
          {item.walkingLevel && (
            <Chip tone="neutral">
              <Footprints size={11} /> {item.walkingLevel} walking
            </Chip>
          )}
          {typeof item.cost === "number" && <Chip tone="neutral">₹{item.cost.toLocaleString("en-IN")}</Chip>}
        </div>

        {item.detail && <p className="mt-3 text-xs leading-relaxed text-[var(--color-slate)]">{item.detail}</p>}

        <div className="mt-4 border-t border-[var(--color-border)] pt-3">
          <p className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-slate)]">
            <MapPin size={11} /> Day {item.day} plan
          </p>
          <div className="space-y-1.5">
            {dayItems.map((d) => {
              const dMeta = categoryFor(d);
              const DIcon = dMeta.icon;
              const active = d.id === item.id;
              return (
                <div key={d.id} className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 ${active ? "bg-[var(--color-navy-soft)]" : ""}`}>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      active ? "bg-[var(--color-navy)] text-white" : "bg-black/[0.06] text-[var(--color-slate)]"
                    }`}
                  >
                    <DIcon size={11} />
                  </span>
                  <span className="w-12 shrink-0 text-[11px] font-semibold text-[var(--color-slate)]">{d.time}</span>
                  <span className={`flex-1 truncate text-xs ${active ? "font-bold text-[var(--color-navy)]" : "text-[var(--color-ink)]"}`}>{d.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
