import { ArrowUpRight, Check, ChevronDown, Sparkles } from "lucide-react";
import type { DestinationOption } from "@/types/demo";

export function DestinationGrid({ options, onExplore, labels, disabled = false }: {
  options: DestinationOption[];
  onExplore: (id: string) => void;
  labels?: { recommended?: string; explore?: string };
  disabled?: boolean;
}) {
  return <div className="destination-options">{options.map((d, index) => {
    const Icon = d.icon;
    return <article key={d.id} className={`destination-option destination-tone-${index} ${d.recommended ? "is-recommended" : ""}`}>
      <div className="destination-option-art"><Icon size={29} strokeWidth={1.4} /><span>{String(index + 1).padStart(2, "0")}</span></div>
      <div className="destination-option-content">
        <div className="destination-option-heading"><h3>{d.name}</h3>{d.recommended && <span className="fit-badge"><Sparkles size={10} />{labels?.recommended ?? "Best match"}</span>}</div>
        <p className="destination-reason">{d.reason}</p>
        <div className="destination-facts"><span><Check size={11} />{d.visa}</span><span>{d.fitLabel}: {d.fitScore}</span></div>
        <details><summary>Trip details <ChevronDown size={11} /></summary><dl><div><dt>Food</dt><dd>{d.foodFit}</dd></div><div><dt>Weather</dt><dd>{d.weatherFit}</dd></div><div><dt>Journey</dt><dd>{d.flightDuration}</dd></div></dl></details>
        <div className="destination-option-footer"><div><small>Estimated trip total</small><strong>₹{d.estCost.toLocaleString("en-IN")}</strong></div><button onClick={() => onExplore(d.id)} disabled={disabled}>{disabled ? "Preview only" : labels?.explore ?? "Explore trip"}<ArrowUpRight size={14} /></button></div>
      </div>
    </article>;
  })}</div>;
}
