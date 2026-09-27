import { useMemo, useState } from "react";
import { Navigation2, PlusCircle, CalendarCheck2, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { MyraBubble } from "@/components/MyraBubble";
import { Toggle } from "@/components/Toggle";
import { restaurantOptions } from "@/data/demoInventory";

export default function FoodAssistPage() {
  const [maxWalkMin, setMaxWalkMin] = useState(15);
  const [openNow, setOpenNow] = useState(true);
  const [minRating, setMinRating] = useState(4);
  const [booked, setBooked] = useState<Record<string, boolean>>({});

  const results = useMemo(
    () => restaurantOptions.filter((r) => r.walkMin <= maxWalkMin && r.rating >= minRating && (!openNow || r.open)),
    [maxWalkMin, minRating, openNow]
  );

  return (
    <AppShell title="Food Assistance">
      <div className="space-y-5 px-4 py-5">
        <MyraBubble from="user">Need vegetarian food nearby, and my parents don&apos;t want to walk much.</MyraBubble>

        <Card>
          <SectionLabel>Adjust</SectionLabel>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[var(--color-ink)]">
                <span>Max walking time</span>
                <span>{maxWalkMin} min</span>
              </div>
              <input
                type="range"
                min={2}
                max={20}
                value={maxWalkMin}
                onChange={(e) => setMaxWalkMin(Number(e.target.value))}
                className="mt-1 w-full accent-[var(--color-red)]"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-[var(--color-ink)]">
                <span>Minimum rating</span>
                <span>{minRating.toFixed(1)}+</span>
              </div>
              <input
                type="range"
                min={3}
                max={5}
                step={0.1}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="mt-1 w-full accent-[var(--color-red)]"
              />
            </div>
            <Toggle checked={openNow} onChange={setOpenNow} label="Open now" />
          </div>
        </Card>

        <div>
          <SectionLabel>{results.length} matching places</SectionLabel>
          <div className="space-y-3">
            {results.map((r) => (
              <Card key={r.id}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-[var(--color-ink)]">{r.name}</p>
                  <Chip tone={r.vegetarianConfidence === "high" ? "success" : "warning"}>
                    {r.vegetarianConfidence === "high" ? "Vegetarian confident" : "Vegetarian options"}
                  </Chip>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[var(--color-slate)]">
                  <span>{r.walkMin} min walk</span>
                  <span>·</span>
                  <span>{r.cabMin} min cab</span>
                  <span>·</span>
                  <span>{r.price}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <Star size={11} className="fill-[var(--color-warning)] text-[var(--color-warning)]" /> {r.rating}
                  </span>
                </div>
                <p className="mt-2 rounded-lg bg-black/[0.03] px-2.5 py-1.5 text-xs text-[var(--color-ink)]">
                  <span className="font-semibold">Why this? </span>
                  {r.why}
                </p>
                <div className="mt-3 flex gap-2">
                  <button type="button" className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[var(--color-border)] py-2 text-xs font-semibold text-[var(--color-ink)]">
                    <Navigation2 size={13} /> Navigate
                  </button>
                  <button type="button" className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[var(--color-border)] py-2 text-xs font-semibold text-[var(--color-ink)]">
                    <PlusCircle size={13} /> Add to trip
                  </button>
                  <button
                    type="button"
                    onClick={() => setBooked((b) => ({ ...b, [r.id]: true }))}
                    className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-xs font-bold ${
                      booked[r.id] ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : "bg-[var(--color-red)] text-white"
                    }`}
                  >
                    <CalendarCheck2 size={13} /> {booked[r.id] ? "Booked" : "Book table"}
                  </button>
                </div>
              </Card>
            ))}
            {results.length === 0 && (
              <p className="rounded-xl border border-dashed border-[var(--color-border)] p-4 text-center text-xs text-[var(--color-slate)]">
                No places match right now — try widening walking time or rating.
              </p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
