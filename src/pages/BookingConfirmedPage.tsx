import { useNavigate } from "react-router-dom";
import { Plane, Hotel, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { DestinationHero } from "@/components/DestinationHero";
import { useTripStore } from "@/state/tripStore";
import { coTravellers, maskedIdentifiers } from "@/data/demoTraveller";

export default function BookingConfirmedPage() {
  const navigate = useNavigate();
  const { trip, setMyraCompanionOn } = useTripStore();
  const flight = trip.bookings.find((b) => b.type === "flight");
  const hotel = trip.bookings.find((b) => b.type === "hotel");

  return (
    <AppShell title="Booking Confirmed" showBack={false}>
      <div className="space-y-4 px-4 py-5">
        <div className="flex items-center gap-2 text-[var(--color-success)]">
          <CheckCircle2 size={18} />
          <p className="text-sm font-bold text-[var(--color-ink)]">Booking confirmed</p>
        </div>

        <DestinationHero
          title={trip.destination}
          subtitle={`${trip.startDate} – ${trip.endDate} · Aarav + ${coTravellers.join(" + ")}`}
        />

        <Card className="divide-y divide-[var(--color-border)] p-0">
          <div className="flex items-center gap-3 px-4 py-3">
            <Plane size={16} className="text-[var(--color-navy)]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{flight?.title}</p>
            </div>
            <span className="text-xs font-semibold text-[var(--color-success)]">Confirmed</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <Hotel size={16} className="text-[var(--color-navy)]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{hotel?.title}</p>
            </div>
            <span className="text-xs font-semibold text-[var(--color-success)]">Confirmed</span>
          </div>
        </Card>
        <p className="-mt-2 px-1 text-[11px] text-[var(--color-slate)]">Booking {maskedIdentifiers.bookingId}</p>

        <div className="rounded-2xl border border-[var(--color-navy)]/15 bg-[var(--color-navy-soft)] p-4">
          <p className="text-sm font-black text-[var(--color-navy)]">Your trip is now live</p>
          <p className="mt-1 text-sm text-[var(--color-ink)]">
            Myra can stay with it — helping you prepare, adjust plans, and handle things if they change.
          </p>
        </div>

        <div className="space-y-2 pb-2 pt-2">
          <button
            type="button"
            onClick={() => {
              setMyraCompanionOn(true);
              navigate("/activate-myra");
            }}
            className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Turn on Myra Companion
          </button>
          <button
            type="button"
            onClick={() => navigate("/trip-home")}
            className="w-full py-2 text-center text-xs font-semibold text-[var(--color-slate)]"
          >
            Not now
          </button>
        </div>
      </div>
    </AppShell>
  );
}
