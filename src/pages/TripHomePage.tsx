import { useNavigate } from "react-router-dom";
import { AlertTriangle, Sparkles, Utensils, Feather } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DestinationHero } from "@/components/DestinationHero";
import { useTripStore } from "@/state/tripStore";

const quickActions = [
  { icon: Sparkles, label: "Plan tonight", to: "/free-time" },
  { icon: Feather, label: "Make today lighter", to: "/adapt-trip" },
  { icon: Utensils, label: "Find food nearby", to: "/food-assist" },
];

export default function TripHomePage() {
  const navigate = useNavigate();
  const { trip } = useTripStore();
  const today = trip.itinerary.filter((i) => i.day === trip.dayNumber);

  return (
    <AppShell title="My Trip" showBack={false}>
      <div className="space-y-4 px-4 py-5">
        <DestinationHero title={`My ${trip.destination} Trip`} subtitle={`Day ${trip.dayNumber} of ${trip.totalDays} · ${trip.liveContext.currentLocation}`}>
          <p className="mt-2 text-xs text-white/80">{trip.liveContext.weather}</p>
        </DestinationHero>

        <button
          type="button"
          onClick={() => navigate("/disruption-alert")}
          className="flex w-full items-center gap-2.5 rounded-xl border border-[var(--color-red)]/25 bg-[var(--color-red-soft)] p-3 text-left"
        >
          <AlertTriangle size={17} className="shrink-0 text-[var(--color-red)]" />
          <span className="text-sm font-semibold text-[var(--color-red)]">Typhoon may affect tomorrow — tap to see</span>
        </button>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">Today</p>
          <Card className="divide-y divide-[var(--color-border)] p-0">
            {today.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                <span className="w-12 shrink-0 font-semibold text-[var(--color-slate)]">{item.time}</span>
                <span className="text-[var(--color-ink)]">{item.title}</span>
                {item.tag && <Chip tone="navy">{item.tag}</Chip>}
              </div>
            ))}
          </Card>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-start gap-2">
            <Sparkles size={16} className="mt-0.5 shrink-0 text-[var(--color-red)]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">
              You've got {Math.round(trip.liveContext.freeTimeMinutes / 60)} free hours tonight. Want a few ideas nearby?
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/free-time")}
            className="mt-3 w-full rounded-lg bg-[var(--color-red)] py-2 text-xs font-bold text-white"
          >
            Show me
          </button>
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {quickActions.map(({ icon: Icon, label, to }) => (
            <button
              key={label}
              type="button"
              onClick={() => navigate(to)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--color-ink)]"
            >
              <Icon size={13} className="text-[var(--color-navy)]" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
