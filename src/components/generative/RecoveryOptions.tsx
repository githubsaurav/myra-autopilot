import { Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import type { RecoveryOption } from "@/types/demo";

interface RecoveryLabels {
  option?: string;
  recommended?: string;
  extraCost?: string;
  refundImpact?: string;
  timeImpact?: string;
  changes?: string;
  apply?: string;
  compare?: string;
}

export function RecoveryOptions({
  options,
  onApply,
  onCompare,
  labels,
}: {
  options: RecoveryOption[];
  onApply: (id: string) => void;
  onCompare: () => void;
  labels?: RecoveryLabels;
}) {
  const l = {
    option: labels?.option ?? "Option",
    recommended: labels?.recommended ?? "Recommended",
    extraCost: labels?.extraCost ?? "Extra cost",
    refundImpact: labels?.refundImpact ?? "Refund impact",
    timeImpact: labels?.timeImpact ?? "Time impact",
    changes: labels?.changes ?? "Changes",
    apply: labels?.apply ?? "Apply",
    compare: labels?.compare ?? "Compare options",
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <Card key={opt.id} className={opt.recommended ? "border-[var(--color-red)]/30 bg-[var(--color-red-soft)]" : ""}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-bold text-[var(--color-ink)]">
                {l.option} {opt.id} · {opt.title}
              </p>
              {opt.recommended && (
                <Chip tone="red">
                  <Sparkles size={11} /> {l.recommended}
                </Chip>
              )}
            </div>
            <p className="mt-1 text-xs text-[var(--color-slate)]">{opt.description}</p>
            <dl className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              <div>
                <dt className="text-[var(--color-slate)]">{l.extraCost}</dt>
                <dd className="font-bold text-[var(--color-ink)]">₹{opt.extraCost.toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-slate)]">{l.refundImpact}</dt>
                <dd className="font-bold text-[var(--color-ink)]">₹{opt.refundImpact.toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-slate)]">{l.timeImpact}</dt>
                <dd className="font-semibold text-[var(--color-ink)]">{opt.timeImpact}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-slate)]">{l.changes}</dt>
                <dd className="font-semibold text-[var(--color-ink)]">{opt.changeCount}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs italic text-[var(--color-slate)]">{opt.rationale}</p>
            <button
              type="button"
              onClick={() => onApply(opt.id)}
              className={`mt-2.5 w-full rounded-lg py-2 text-xs font-bold transition ${
                opt.recommended ? "bg-[var(--color-red)] text-white" : "border border-[var(--color-border)] bg-white text-[var(--color-ink)]"
              }`}
            >
              {l.apply} {l.option} {opt.id}
            </button>
          </Card>
        ))}
      </div>
      <button
        type="button"
        onClick={onCompare}
        className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2 text-xs font-semibold text-[var(--color-ink)]"
      >
        {l.compare}
      </button>
    </div>
  );
}
