import { ShieldCheck } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";
import { maskedIdentifiers } from "@/data/demoTraveller";

interface ConsentLabels {
  title?: string;
  amountLabel?: string;
  paymentMethod?: string;
  guardrail1?: string;
  guardrail2?: string;
  approve?: string;
  cancel?: string;
  approved?: string;
}

export function BookingConsentSheet({
  destinationName,
  amount,
  onApprove,
  onCancel,
  approved,
  labels,
}: {
  destinationName: string;
  amount: number;
  onApprove: () => void;
  onCancel: () => void;
  approved: boolean;
  labels?: ConsentLabels;
}) {
  const l = {
    title: labels?.title ?? "Confirm & pay",
    amountLabel: labels?.amountLabel ?? "Total amount",
    paymentMethod: labels?.paymentMethod ?? "Payment method",
    guardrail1: labels?.guardrail1 ?? "Charged only after you approve here",
    guardrail2: labels?.guardrail2 ?? "Refundable per airline/hotel policy",
    approve: labels?.approve ?? `Approve & Pay ₹${amount.toLocaleString("en-IN")}`,
    cancel: labels?.cancel ?? "Cancel",
    approved: labels?.approved ?? "Payment approved",
  };

  return (
    <Card>
      <SectionLabel>{l.title}</SectionLabel>
      <div className="flex items-center justify-between rounded-lg bg-[var(--color-bg)] px-3 py-2.5">
        <span className="text-sm text-[var(--color-ink)]">{destinationName}</span>
        <span className="text-base font-black text-[var(--color-ink)]">₹{amount.toLocaleString("en-IN")}</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-[var(--color-slate)]">{l.paymentMethod}</span>
        <span className="font-semibold text-[var(--color-ink)]">{maskedIdentifiers.paymentInstrument}</span>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-[var(--color-ink)]">
          <ShieldCheck size={13} className="shrink-0 text-[var(--color-success)]" /> {l.guardrail1}
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-ink)]">
          <ShieldCheck size={13} className="shrink-0 text-[var(--color-success)]" /> {l.guardrail2}
        </div>
      </div>

      {approved ? (
        <p className="mt-3.5 text-center text-xs font-semibold text-[var(--color-success)]">{l.approved}</p>
      ) : (
        <div className="mt-3.5 flex gap-2">
          <button type="button" onClick={onApprove} className="flex-1 rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white">
            {l.approve}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-xs font-semibold text-[var(--color-ink)]"
          >
            {l.cancel}
          </button>
        </div>
      )}
    </Card>
  );
}
