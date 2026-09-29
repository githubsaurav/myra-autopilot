import { ShieldCheck } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";
import type { RecoveryOption, TravellerProfile } from "@/types/demo";

export function ApprovalSheet({
  option,
  actions,
  traveller,
  onApprove,
  onCancel,
  approved,
}: {
  option: RecoveryOption;
  actions: string[];
  traveller: TravellerProfile;
  onApprove: () => void;
  onCancel: () => void;
  approved: boolean;
}) {
  const net = option.extraCost - option.refundImpact;
  const withinSpendLimit = option.extraCost <= traveller.spendLimit;
  const refundOk = !traveller.refundableOnly || option.refundImpact === 0;

  const checks = [
    { label: `Under ₹${traveller.spendLimit.toLocaleString("en-IN")} spend limit`, pass: withinSpendLimit },
    { label: "Refundable-only rule respected", pass: refundOk },
    { label: "Approved suppliers only", pass: true },
    { label: "Traveller approval required", pass: true },
  ];

  return (
    <Card>
      <SectionLabel>Myra will</SectionLabel>
      <ol className="space-y-1.5">
        {actions.map((a, i) => (
          <li key={a} className="flex items-start gap-2 text-sm text-[var(--color-ink)]">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[9px] font-bold text-[var(--color-navy)]">
              {i + 1}
            </span>
            {a}
          </li>
        ))}
      </ol>

      <div className="mt-3.5 grid grid-cols-2 gap-3 rounded-xl bg-[var(--color-bg)] p-3">
        <div>
          <p className="text-[10px] font-bold uppercase text-[var(--color-slate)]">New charges</p>
          <p className="text-sm font-black text-[var(--color-ink)]">₹{option.extraCost.toLocaleString("en-IN")}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-[var(--color-slate)]">Refunds</p>
          <p className="text-sm font-black text-[var(--color-ink)]">₹{option.refundImpact.toLocaleString("en-IN")}</p>
        </div>
        <div className="col-span-2 border-t border-[var(--color-border)] pt-2">
          <p className="text-[10px] font-bold uppercase text-[var(--color-slate)]">Net impact</p>
          <p className="text-base font-black text-[var(--color-ink)]">₹{net.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="mt-3.5 space-y-1.5">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-2 text-xs">
            <ShieldCheck size={13} className={c.pass ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"} />
            <span className="text-[var(--color-ink)]">{c.label}</span>
            <span className={`ml-auto font-bold ${c.pass ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"}`}>
              {c.pass ? "✓" : "!"}
            </span>
          </div>
        ))}
      </div>

      {approved ? (
        <p className="mt-3.5 text-center text-xs font-semibold text-[var(--color-success)]">Approved</p>
      ) : (
        <div className="mt-3.5 flex gap-2">
          <button
            type="button"
            onClick={onApprove}
            className="flex-1 rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white"
          >
            Approve &amp; Apply
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-xs font-semibold text-[var(--color-ink)]"
          >
            Cancel
          </button>
        </div>
      )}
    </Card>
  );
}
