import { Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import type { RecoveryOption } from "@/types/demo";

export function RecoveryOptions({
  options,
  onApply,
  onCompare,
}: {
  options: RecoveryOption[];
  onApply: (id: "A" | "B") => void;
  onCompare: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <Card key={opt.id} className={opt.recommended ? "border-[var(--color-red)]/30 bg-[var(--color-red-soft)]" : ""}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-bold text-[var(--color-ink)]">
                Option {opt.id} · {opt.title}
              </p>
              {opt.recommended && (
                <Chip tone="red">
                  <Sparkles size={11} /> Recommended
                </Chip>
              )}
            </div>
            <p className="mt-1 text-xs text-[var(--color-slate)]">{opt.description}</p>
            <dl className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              <div>
                <dt className="text-[var(--color-slate)]">Extra cost</dt>
                <dd className="font-bold text-[var(--color-ink)]">₹{opt.extraCost.toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-slate)]">Refund impact</dt>
                <dd className="font-bold text-[var(--color-ink)]">₹{opt.refundImpact.toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-slate)]">Time impact</dt>
                <dd className="font-semibold text-[var(--color-ink)]">{opt.timeImpact}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-slate)]">Changes</dt>
                <dd className="font-semibold text-[var(--color-ink)]">{opt.changeCount}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs italic text-[var(--color-slate)]">{opt.rationale}</p>
            <button
              type="button"
              onClick={() => onApply(opt.id)}
              className={`mt-3 w-full rounded-lg py-2.5 text-xs font-bold transition ${
                opt.recommended ? "bg-[var(--color-red)] text-white" : "border border-[var(--color-border)] bg-white text-[var(--color-ink)]"
              }`}
            >
              Apply Option {opt.id}
            </button>
          </Card>
        ))}
      </div>
      <button
        type="button"
        onClick={onCompare}
        className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2 text-xs font-semibold text-[var(--color-ink)]"
      >
        Compare options
      </button>
    </div>
  );
}
