import { Sparkles, MapPin, Clock, Footprints } from "lucide-react";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import type { ContextualOption } from "@/types/demo";

export function RecommendationGrid({
  options,
  onAdd,
  addedId,
  addedLabel = "Added to tonight",
}: {
  options: ContextualOption[];
  onAdd: (option: ContextualOption) => void;
  addedId: string | null;
  addedLabel?: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((o) => (
        <Card key={o.id} className={o.recommended ? "border-[var(--color-red)]/25 bg-[var(--color-red-soft)]" : ""}>
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold text-[var(--color-ink)]">{o.title}</p>
            {o.recommended && (
              <Chip tone="red">
                <Sparkles size={11} /> Best fit
              </Chip>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--color-slate)]">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {o.distanceMin} min away
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {o.durationHrs} hrs
            </span>
            <span className="flex items-center gap-1">
              <Footprints size={12} /> {o.walking} walking
            </span>
          </div>
          <p className="mt-2 text-sm font-bold text-[var(--color-ink)]">₹{o.cost.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs italic text-[var(--color-slate)]">{o.why}</p>
          <button
            type="button"
            onClick={() => onAdd(o)}
            disabled={addedId === o.id}
            className={`mt-3 w-full rounded-lg py-2 text-xs font-bold transition ${
              addedId === o.id
                ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
                : o.recommended
                  ? "bg-[var(--color-red)] text-white"
                  : "border border-[var(--color-border)] bg-white text-[var(--color-ink)]"
            }`}
          >
            {addedId === o.id ? addedLabel : "Add to Trip"}
          </button>
        </Card>
      ))}
    </div>
  );
}
