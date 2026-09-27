import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Disclosure } from "@/components/Disclosure";
import { useTripStore } from "@/state/tripStore";

const actionsFor = (optionId: "A" | "B") =>
  optionId === "A"
    ? ["Move island activity to Day 6", "Extend hotel by one night", "Shift airport transfer by 3 hours", "Notify co-travellers"]
    : ["Replace island activity with indoor local experience", "Notify co-travellers"];

export default function ApplyChangesPage() {
  const navigate = useNavigate();
  const { disruption, selectedOption, traveller, applyRecovery } = useTripStore();
  const option = selectedOption ?? disruption.options.find((o) => o.recommended)!;
  const net = option.extraCost - option.refundImpact;
  const withinSpendLimit = option.extraCost <= traveller.spendLimit || traveller.autonomyMode !== "bounded";
  const refundOk = !traveller.refundableOnly || option.refundImpact === 0;

  return (
    <AppShell title="Confirm Changes">
      <div className="space-y-4 px-4 py-5">
        <div>
          <h1 className="text-lg font-black text-[var(--color-ink)]">Here&apos;s what Myra will do</h1>
        </div>

        <Card className="space-y-2.5 p-0">
          {actionsFor(option.id).map((action, i) => (
            <div key={action} className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-2.5 text-sm last:border-0">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[10px] font-bold text-[var(--color-navy)]">
                {i + 1}
              </span>
              <span className="text-[var(--color-ink)]">{action}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-slate)]">Extra cost</span>
            <span className="text-lg font-black text-[var(--color-ink)]">₹{net.toLocaleString("en-IN")}</span>
          </div>
        </Card>

        <div className="flex items-start gap-2 rounded-xl bg-[var(--color-success-soft)] p-3">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[var(--color-success)]" />
          <p className="text-xs font-medium text-[var(--color-ink)]">
            Within your autopilot rules — {refundOk ? "refundable" : "reviewed"} and {withinSpendLimit ? "under your spend limit" : "flagged for review"}.
          </p>
        </div>

        <Disclosure label="View guardrail details">
          <ul className="space-y-1 rounded-xl bg-black/[0.03] p-3 text-xs text-[var(--color-ink)]">
            <li>• Under spend limit: {withinSpendLimit ? "Yes" : "No"}</li>
            <li>• Refundable-only rule respected: {refundOk ? "Yes" : "No"}</li>
            <li>• Approved supplier network: Yes</li>
            <li>• Traveller approval required: Yes</li>
          </ul>
        </Disclosure>

        <div className="space-y-2 pb-2 pt-2">
          <button
            type="button"
            onClick={() => {
              applyRecovery();
              navigate("/applying-changes");
            }}
            className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Confirm changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/recovery-options")}
            className="w-full py-2 text-center text-xs font-semibold text-[var(--color-slate)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </AppShell>
  );
}

