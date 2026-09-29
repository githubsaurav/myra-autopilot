import { ArrowRight } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";
import type { ItineraryItem } from "@/types/demo";

export function BeforeAfterPlan({
  before,
  after,
  metrics,
  onApply,
  applied,
}: {
  before: ItineraryItem[];
  after: ItineraryItem[];
  metrics: { label: string; before: string; after: string }[];
  onApply: () => void;
  applied: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <SectionLabel>Current plan</SectionLabel>
          <ul className="space-y-2">
            {before.map((item) => (
              <li key={item.id} className="flex gap-2 text-sm">
                <span className="w-12 shrink-0 font-semibold text-[var(--color-slate)]">{item.time}</span>
                <span className="text-[var(--color-ink)]">{item.title}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-[var(--color-navy)]/25 bg-[var(--color-navy-soft)]">
          <SectionLabel>Suggested plan</SectionLabel>
          <ul className="space-y-2">
            {after.map((item) => (
              <li key={item.id} className="flex gap-2 text-sm">
                <span className="w-12 shrink-0 font-semibold text-[var(--color-slate)]">{item.time}</span>
                <span className="text-[var(--color-ink)]">{item.title}</span>
                {item.status !== "planned" && (
                  <span className="ml-auto shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--color-navy)]">
                    {item.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-0">
        <div className="grid grid-cols-4 divide-x divide-[var(--color-border)]">
          {metrics.map((m) => (
            <div key={m.label} className="px-3 py-2.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-slate)]">{m.label}</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs font-bold text-[var(--color-ink)]">
                <span className="text-[var(--color-slate)] line-through">{m.before}</span>
                <ArrowRight size={10} className="text-[var(--color-slate)]" />
                <span className="text-[var(--color-success)]">{m.after}</span>
              </p>
            </div>
          ))}
        </div>
      </Card>

      <button
        type="button"
        onClick={onApply}
        disabled={applied}
        className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
      >
        {applied ? "Lighter plan applied" : "Apply lighter plan"}
      </button>
    </div>
  );
}
