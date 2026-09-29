import { CalendarDays } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { EmptyPersonaNotice } from "@/components/shell/EmptyPersonaNotice";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";

export default function PlanPage() {
  const { activePersonaId, trips } = useDemoStore();

  if (!activePersonaId) {
    return <EmptyPersonaNotice icon={CalendarDays} message="Pick a scenario to see its plan here." />;
  }

  const trip = trips[activePersonaId];
  const persona = personas.find((p) => p.id === activePersonaId)!;

  if (!trip) {
    return <EmptyPersonaNotice icon={CalendarDays} message={`${persona.name} isn't booked yet — keep chatting with Myra.`} />;
  }

  const totalCost = trip.bookings.reduce((sum, b) => sum + b.amount, 0);
  const days = Array.from(new Set(trip.itinerary.map((i) => i.day))).sort((a, b) => a - b);

  return (
    <div className="app-scroll h-full space-y-4 overflow-y-auto px-5 py-5">
      <Card>
        <SectionLabel>Trip summary</SectionLabel>
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
        <SectionLabel>Upcoming itinerary</SectionLabel>
        <div className="space-y-3">
          {days.map((day) => (
            <Card key={day} className="p-0">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2 text-xs font-bold text-[var(--color-navy)]">
                Day {day}
                {day === trip.dayNumber && <Chip tone="navy">Today</Chip>}
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {trip.itinerary
                  .filter((i) => i.day === day)
                  .map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-4 py-2 text-sm">
                      <span className="w-14 shrink-0 font-semibold text-[var(--color-slate)]">{item.time}</span>
                      <span className="flex-1 text-[var(--color-ink)]">{item.title}</span>
                      {item.status === "completed" && <span className="text-[10px] font-semibold text-[var(--color-slate)]">Done</span>}
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
