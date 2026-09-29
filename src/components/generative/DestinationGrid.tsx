import { Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import type { DestinationOption } from "@/types/demo";

export function DestinationGrid({
  options,
  onExplore,
}: {
  options: DestinationOption[];
  onExplore: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((d) => (
        <Card key={d.id} className={d.recommended ? "border-[var(--color-navy)]/30" : ""}>
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold text-[var(--color-ink)]">{d.name}</p>
            {d.recommended && (
              <Chip tone="navy">
                <Sparkles size={11} /> Recommended
              </Chip>
            )}
          </div>
          <p className="mt-1 text-lg font-black text-[var(--color-ink)]">₹{d.estCost.toLocaleString("en-IN")}</p>
          <ul className="mt-2 space-y-1 text-xs text-[var(--color-slate)]">
            <li>Visa: {d.visa}</li>
            <li>Food: {d.foodFit}</li>
            <li>Weather: {d.weatherFit}</li>
            <li>Flight: {d.flightDuration}</li>
            <li>Parent-friendly: {d.parentFriendly}</li>
          </ul>
          <p className="mt-2 text-xs italic text-[var(--color-slate)]">{d.reason}</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => onExplore(d.id)}
              className="flex-1 rounded-lg bg-[var(--color-navy)] py-2 text-xs font-bold text-white"
            >
              Explore
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
