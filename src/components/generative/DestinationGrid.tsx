import { Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import type { DestinationOption } from "@/types/demo";

export function DestinationGrid({
  options,
  onExplore,
  labels,
}: {
  options: DestinationOption[];
  onExplore: (id: string) => void;
  labels?: { recommended?: string; explore?: string };
}) {
  const recommendedLabel = labels?.recommended ?? "Recommended";
  const exploreLabel = labels?.explore ?? "Explore";
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((d) => {
        const Icon = d.icon;
        return (
          <Card key={d.id} className={`overflow-hidden p-0 ${d.recommended ? "border-[var(--color-navy)]/30" : ""}`}>
            <div className="relative flex h-16 items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-navy)] via-[#124a8c] to-[#1e6bb8]">
              <div className="pointer-events-none absolute -right-4 -top-6 h-16 w-16 rounded-full bg-white/10" />
              <Icon size={24} className="text-white/90" strokeWidth={1.75} />
              {d.recommended && (
                <span className="absolute right-2 top-2">
                  <Chip tone="navy">
                    <Sparkles size={11} /> {recommendedLabel}
                  </Chip>
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm font-bold text-[var(--color-ink)]">{d.name}</p>
              <p className="mt-1 text-lg font-black text-[var(--color-ink)]">₹{d.estCost.toLocaleString("en-IN")}</p>
              <ul className="mt-2 space-y-1 text-xs text-[var(--color-slate)]">
                <li>Visa: {d.visa}</li>
                <li>Food: {d.foodFit}</li>
                <li>Weather: {d.weatherFit}</li>
                <li>Flight: {d.flightDuration}</li>
                <li>
                  {d.fitLabel}: {d.fitScore}
                </li>
              </ul>
              <p className="mt-2 text-xs italic text-[var(--color-slate)]">{d.reason}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => onExplore(d.id)}
                  className="flex-1 rounded-lg bg-[var(--color-navy)] py-2 text-xs font-bold text-white"
                >
                  {exploreLabel}
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
