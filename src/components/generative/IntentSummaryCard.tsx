import { Check, Pencil } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";

export function IntentSummaryCard({
  facts,
  onLooksRight,
  confirmed,
}: {
  facts: { label: string; value: string }[];
  onLooksRight: () => void;
  confirmed: boolean;
}) {
  return (
    <Card>
      <SectionLabel>Interpreted intent</SectionLabel>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="text-[11px] font-medium text-[var(--color-slate)]">{f.label}</dt>
            <dd className="text-sm font-semibold text-[var(--color-ink)]">{f.value}</dd>
          </div>
        ))}
      </dl>
      {confirmed ? (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-success)]">
          <Check size={14} /> Confirmed
        </div>
      ) : (
        <div className="mt-3.5 flex gap-2">
          <button
            type="button"
            onClick={onLooksRight}
            className="flex-1 rounded-lg bg-[var(--color-navy)] py-2 text-xs font-bold text-white"
          >
            Looks right
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-ink)]"
          >
            <Pencil size={12} /> Edit
          </button>
        </div>
      )}
    </Card>
  );
}
