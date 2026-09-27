import { useNavigate } from "react-router-dom";
import { Plane, Hotel, CheckCircle2, Users, CreditCard } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { useTripStore } from "@/state/tripStore";
import { maskedIdentifiers, coTravellers } from "@/data/demoTraveller";

export default function BookingConfirmedPage() {
  const navigate = useNavigate();
  const { trip, setMyraCompanionOn } = useTripStore();
  const flight = trip.bookings.find((b) => b.type === "flight");
  const hotel = trip.bookings.find((b) => b.type === "hotel");

  return (
    <AppShell title="Booking Confirmed" showBack={false}>
      <div className="space-y-5 px-4 py-5">
        <div className="flex items-center gap-2 text-[var(--color-success)]">
          <CheckCircle2 size={22} />
          <div>
            <p className="text-base font-black text-[var(--color-ink)]">Booking confirmed</p>
            <p className="text-sm text-[var(--color-slate)]">Your {trip.destination} trip is now live.</p>
          </div>
        </div>

        <Card>
          <div className="flex items-center gap-2">
            <Plane size={16} className="text-[var(--color-navy)]" />
            <p className="text-sm font-bold text-[var(--color-ink)]">{flight?.title}</p>
          </div>
          <p className="mt-1 text-xs text-[var(--color-slate)]">{flight?.meta}</p>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <Hotel size={16} className="text-[var(--color-navy)]" />
            <p className="text-sm font-bold text-[var(--color-ink)]">{hotel?.title}</p>
          </div>
          <p className="mt-1 text-xs text-[var(--color-slate)]">{hotel?.meta}</p>
        </Card>

        <Card>
          <SectionLabel>Trip details</SectionLabel>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[var(--color-slate)]">Dates</p>
              <p className="font-semibold text-[var(--color-ink)]">
                {trip.startDate} – {trip.endDate}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-[var(--color-slate)]">
                <Users size={12} /> Travellers
              </p>
              <p className="font-semibold text-[var(--color-ink)]">Aarav + {coTravellers.join(" + ")}</p>
            </div>
            <div>
              <p className="text-[var(--color-slate)]">Booking ID</p>
              <p className="font-semibold text-[var(--color-ink)]">{maskedIdentifiers.bookingId}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-[var(--color-slate)]">
                <CreditCard size={12} /> Paid via
              </p>
              <p className="font-semibold text-[var(--color-ink)]">{maskedIdentifiers.paymentInstrument}</p>
            </div>
          </div>
        </Card>

        <div className="rounded-2xl border border-[var(--color-navy)]/15 bg-[var(--color-navy-soft)] p-4">
          <p className="text-sm font-black text-[var(--color-navy)]">Your Trip is Live</p>
          <p className="mt-1.5 text-sm text-[var(--color-ink)]">
            Myra can now stay with your trip, help you prepare, adapt plans when things change, and coordinate
            actions across your bookings.
          </p>
        </div>

        <div className="space-y-2 pb-2">
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
            className="w-full rounded-xl border border-[var(--color-border)] py-3 text-sm font-semibold text-[var(--color-slate)] hover:bg-black/[0.03]"
          >
            Not now
          </button>
        </div>
      </div>
    </AppShell>
  );
}
