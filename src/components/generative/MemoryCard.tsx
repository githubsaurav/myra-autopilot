import { Check, Sparkles } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";

export function MemoryLearnedCard({
  preferences,
  onKeep,
  kept,
}: {
  preferences: string[];
  onKeep: () => void;
  kept: boolean;
}) {
  return (
    <Card className="border-[var(--color-navy)]/20 bg-[var(--color-navy-soft)]">
      <div className="flex items-center gap-1.5">
        <Sparkles size={14} className="text-[var(--color-navy)]" />
        <SectionLabel>Myra learned</SectionLabel>
      </div>
      <ul className="space-y-1.5">
        {preferences.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-[var(--color-ink)]">
            <Check size={14} className="mt-0.5 shrink-0 text-[var(--color-navy)]" />
            {p}
          </li>
        ))}
      </ul>
      {kept ? (
        <p className="mt-3 text-xs font-semibold text-[var(--color-success)]">Saved to your profile</p>
      ) : (
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={onKeep} className="flex-1 rounded-lg bg-[var(--color-navy)] py-2 text-xs font-bold text-white">
            Keep this
          </button>
          <button type="button" className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-ink)]">
            Edit memory
          </button>
        </div>
      )}
    </Card>
  );
}

export function MemoryAppliedCard({ items }: { items: string[] }) {
  return (
    <Card className="border-[var(--color-navy)]/20 bg-[var(--color-navy-soft)]">
      <SectionLabel>Using from your previous trip</SectionLabel>
      <ul className="space-y-1.5">
        {items.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-[var(--color-ink)]">
            <Check size={14} className="mt-0.5 shrink-0 text-[var(--color-navy)]" />
            {p}
          </li>
        ))}
      </ul>
    </Card>
  );
}
