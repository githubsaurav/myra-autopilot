import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { DestinationHero } from "@/components/DestinationHero";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { useDemoStore } from "@/state/useDemoStore";
import type { DemoTrip, ItineraryItem } from "@/types/demo";

function statusTag(item: ItineraryItem) {
  if (item.status === "moved") return { label: "Moved by Myra", tone: "navy" as const };
  if (item.status === "new") return { label: "Added by Myra", tone: "success" as const };
  return null;
}

function TripCard({ trip }: { trip: DemoTrip }) {
  const days = Array.from(new Set(trip.itinerary.map((i) => i.day))).sort((a, b) => a - b);

  return (
    <div className="space-y-4">
      <DestinationHero title={`My ${trip.destination} Trip`} subtitle={`Day ${trip.dayNumber} of ${trip.totalDays} · ${trip.liveContext.city}`}>
        <p className="mt-2 text-xs text-white/80">{trip.liveContext.weather}</p>
      </DestinationHero>

      {days.map((day) => (
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
  );
}

export default function TripPage() {
  const { trip, ladakhTrip } = useDemoStore();
  const navigate = useNavigate();

  if (!trip) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <Sparkles size={22} className="text-[var(--color-red)]" />
        <p className="text-sm font-semibold text-[var(--color-ink)]">No active trip yet</p>
        <p className="text-xs text-[var(--color-slate)]">Ask Myra to plan something and it'll show up here.</p>
        <button type="button" onClick={() => navigate("/myra")} className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-xs font-bold text-white">
          Talk to Myra
        </button>
      </div>
    );
  }

  return (
    <div className="app-scroll h-full overflow-y-auto px-5 py-5">
      <div className="space-y-6">
        <TripCard trip={trip} />
        {ladakhTrip && (
          <div className="border-t border-[var(--color-border)] pt-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">Upcoming trip</p>
            <TripCard trip={ladakhTrip} />
          </div>
        )}
      </div>
    </div>
  );
}
