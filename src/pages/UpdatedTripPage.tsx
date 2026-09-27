import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { useTripStore } from "@/state/tripStore";

export default function UpdatedTripPage() {
  const navigate = useNavigate();
  const { trip, selectedOption, recoveryFeedback, setRecoveryFeedback } = useTripStore();
  const dayFiveSix = trip.itinerary.filter((i) => i.day === 5 || i.day === 6);
  const coordinatedCount = trip.bookings.filter((b) => b.status === "changed" || b.status === "cancelled").length;
  const changedCount = trip.itinerary.filter((i) => i.tag).length;

  return (
    <AppShell title="Updated Trip">
      <div className="space-y-5 px-4 py-5">
        <h1 className="text-lg font-black text-[var(--color-ink)]">My {trip.destination} Trip — Updated</h1>

        <Card className="divide-y divide-[var(--color-border)] p-0">
          {dayFiveSix.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              <span className="w-9 shrink-0 text-[10px] font-bold text-[var(--color-slate)]">D{item.day}</span>
              <span className="w-12 shrink-0 font-semibold text-[var(--color-slate)]">{item.time}</span>
              <span className="flex-1 text-[var(--color-ink)]">{item.title}</span>
              {item.tag && <Chip tone="navy">{item.tag}</Chip>}
            </div>
          ))}
        </Card>

        <Card>
          <SectionLabel>Outcome summary</SectionLabel>
          <ul className="space-y-1 text-sm text-[var(--color-ink)]">
            <li>• {coordinatedCount} bookings coordinated</li>
            <li>• {changedCount} itinerary change{changedCount === 1 ? "" : "s"}</li>
            <li>• Net additional cost ₹{selectedOption?.extraCost.toLocaleString("en-IN") ?? 0}</li>
            <li>• Original island experience {selectedOption?.preservesOriginal ? "preserved" : "replaced"}</li>
          </ul>
        </Card>

        <Card>
          <SectionLabel>Did this recovery plan work for you?</SectionLabel>
          <div className="flex gap-2">
            {(["yes", "mostly", "no"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setRecoveryFeedback(v)}
                className={`flex-1 rounded-lg border py-2 text-xs font-bold capitalize transition ${
                  recoveryFeedback === v ? "border-[var(--color-navy)] bg-[var(--color-navy-soft)] text-[var(--color-navy)]" : "border-[var(--color-border)] text-[var(--color-slate)]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          {recoveryFeedback === "yes" && (
            <p className="mt-3 flex items-start gap-2 rounded-lg bg-[var(--color-success-soft)] p-2.5 text-xs text-[var(--color-ink)]">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--color-success)]" />
              Got it. I&apos;ll remember that preserving must-do activities matters more to you than minimizing every
              extra cost.
            </p>
          )}
        </Card>

        <button
          type="button"
          onClick={() => navigate("/trip-home")}
          className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
        >
          Continue trip
        </button>
      </div>
    </AppShell>
  );
}
