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
            <div className="relative flex h-11 items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-navy)] via-[#124a8c] to-[#1e6bb8]">
              <div className="pointer-events-none absolute -right-4 -top-6 h-16 w-16 rounded-full bg-white/10" />
              <Icon size={18} className="text-white/90" strokeWidth={1.75} />
              {d.recommended && (
                <span className="absolute right-1.5 top-1.5">
                  <Chip tone="navy">
                    <Sparkles size={10} /> {recommendedLabel}
                  </Chip>
                </span>
              )}
            </div>
            <div className="p-2.5">
              <p className="text-xs font-bold text-[var(--color-ink)]">{d.name}</p>
              <p className="mt-0.5 text-sm font-black text-[var(--color-ink)]">₹{d.estCost.toLocaleString("en-IN")}</p>
              <ul className="mt-1.5 space-y-0.5 text-[10px] leading-snug text-[var(--color-slate)]">
                <li>Visa: {d.visa}</li>
                <li>Food: {d.foodFit}</li>
                <li>Weather: {d.weatherFit}</li>
                <li>Flight: {d.flightDuration}</li>
                <li>
                  {d.fitLabel}: {d.fitScore}
                </li>
              </ul>
              <p className="mt-1.5 text-[10px] italic leading-snug text-[var(--color-slate)]">{d.reason}</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => onExplore(d.id)}
                  className="flex-1 rounded-lg bg-[var(--color-navy)] py-1.5 text-[11px] font-bold text-white"
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
