import { useNavigate } from "react-router-dom";
import { CloudSun, Clock3, Wallet, AlertTriangle, Sparkles, Utensils, Feather, RadioTower } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { useTripStore } from "@/state/tripStore";

export default function TripHomePage() {
  const navigate = useNavigate();
  const { trip, traveller } = useTripStore();
  const today = trip.itinerary.filter((i) => i.day === trip.dayNumber);
  const nextBooking = trip.bookings.find((b) => b.type !== "flight" && b.status !== "cancelled");

  return (
    <AppShell title="My Trip" showBack={false}>
      <div className="space-y-5 px-4 py-5">
        <div>
          <h1 className="text-xl font-black text-[var(--color-ink)]">My {trip.destination} Trip</h1>
          <p className="text-sm text-[var(--color-slate)]">
            Day {trip.dayNumber} of {trip.totalDays} · {trip.liveContext.currentLocation} · {trip.travellers} travellers
          </p>
        </div>

        <button type="button" onClick={() => navigate("/disruption-alert")} className="flex w-full items-center gap-2.5 rounded-xl border border-[var(--color-red)]/25 bg-[var(--color-red-soft)] p-3 text-left">
          <AlertTriangle size={18} className="shrink-0 text-[var(--color-red)]" />
          <span className="text-sm font-semibold text-[var(--color-red)]">Typhoon warning for tomorrow — tap to review impact</span>
        </button>

        <Card>
          <SectionLabel>Live status</SectionLabel>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CloudSun size={16} className="text-[var(--color-navy)]" />
              <span>{trip.liveContext.weather}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 size={16} className="text-[var(--color-navy)]" />
              <span>Next: {nextBooking?.title ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-[var(--color-navy)]" />
              <span>Today&apos;s spend ₹{trip.liveContext.todaySpend.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center gap-2">
              <RadioTower size={16} className="text-[var(--color-red)]" />
              <span>1 active alert</span>
            </div>
          </div>
        </Card>

        <div>
          <SectionLabel>Today&apos;s timeline</SectionLabel>
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
              You have a {Math.round(trip.liveContext.freeTimeMinutes / 60)}-hour free window tonight. Want ideas that
              fit {traveller.companionNeeds[0]?.toLowerCase() || "your parents' walking preference"} and vegetarian
              food nearby?
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/free-time")}
              className="flex-1 rounded-lg bg-[var(--color-red)] py-2 text-xs font-bold text-white"
            >
              Show options
            </button>
            <button type="button" className="flex-1 rounded-lg border border-[var(--color-border)] py-2 text-xs font-semibold text-[var(--color-slate)]">
              Dismiss
            </button>
          </div>
        </div>

        <div>
          <SectionLabel>Quick actions</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            <QuickAction icon={Sparkles} label="What should we do now?" onClick={() => navigate("/free-time")} />
            <QuickAction icon={Feather} label="Make today lighter" onClick={() => navigate("/adapt-trip")} />
            <QuickAction icon={Utensils} label="Find food nearby" onClick={() => navigate("/food-assist")} />
            <QuickAction icon={AlertTriangle} label="Something changed" onClick={() => navigate("/disruption-alert")} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function QuickAction({ icon: Icon, label, onClick }: { icon: typeof Sparkles; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-left transition hover:border-[var(--color-navy)]/40"
    >
      <Icon size={16} className="text-[var(--color-navy)]" />
      <span className="text-xs font-semibold text-[var(--color-ink)]">{label}</span>
    </button>
  );
}
