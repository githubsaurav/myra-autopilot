import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { useTripStore } from "@/state/tripStore";

const actionsFor = (optionId: "A" | "B") =>
  optionId === "A"
    ? [
        "Move island activity to Day 6",
        "Extend hotel by one night",
        "Shift airport transfer by 3 hours",
        "Update itinerary",
        "Notify co-travellers",
      ]
    : ["Replace island activity with indoor local experience", "Update itinerary", "Notify co-travellers"];

export default function ApplyChangesPage() {
  const navigate = useNavigate();
  const { disruption, selectedOption, traveller, applyRecovery } = useTripStore();
  const option = selectedOption ?? disruption.options.find((o) => o.recommended)!;
  const net = option.extraCost - option.refundImpact;
  const withinSpendLimit = option.extraCost <= traveller.spendLimit || traveller.autonomyMode !== "bounded";

  return (
    <AppShell title="Review & Approve">
      <div className="space-y-5 px-4 py-5">
        <div>
          <h1 className="text-lg font-black text-[var(--color-ink)]">Review before Myra acts</h1>
          <p className="text-sm text-[var(--color-slate)]">Applying Option {option.id}: {option.title}</p>
        </div>

        <div>
          <SectionLabel>Actions</SectionLabel>
          <Card className="space-y-2 p-0">
            {actionsFor(option.id).map((action, i) => (
              <div key={action} className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-2.5 text-sm last:border-0">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[10px] font-bold text-[var(--color-navy)]">
                  {i + 1}
                </span>
                <span className="text-[var(--color-ink)]">{action}</span>
              </div>
            ))}
          </Card>
        </div>

        <Card>
          <SectionLabel>Cost summary</SectionLabel>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-slate)]">New charges</span>
              <span className="font-semibold text-[var(--color-ink)]">₹{option.extraCost.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-slate)]">Refunds</span>
              <span className="font-semibold text-[var(--color-ink)]">₹{option.refundImpact.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--color-border)] pt-1.5">
              <span className="font-semibold text-[var(--color-ink)]">Net impact</span>
              <span className="font-bold text-[var(--color-navy)]">₹{net.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </Card>

        <Card>
          <SectionLabel>Guardrail check</SectionLabel>
          <div className="space-y-1.5 text-sm text-[var(--color-ink)]">
            <GuardrailRow label="Under spend limit" ok={withinSpendLimit} />
            <GuardrailRow label="Refundable-only rule respected" ok={!traveller.refundableOnly || option.refundImpact === 0} />
            <GuardrailRow label="Approved supplier set" ok />
            <GuardrailRow label="Traveller approval required" ok />
          </div>
        </Card>

        <div className="space-y-2 pb-2">
          <button
            type="button"
            onClick={() => {
              applyRecovery();
              navigate("/applying-changes");
            }}
            className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Approve & apply changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/recovery-options")}
            className="w-full rounded-xl border border-[var(--color-border)] py-3 text-sm font-semibold text-[var(--color-slate)] hover:bg-black/[0.03]"
          >
            Cancel
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function GuardrailRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <ShieldCheck size={15} className={ok ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"} />
      <span>{label}</span>
      <span className="ml-auto font-bold">{ok ? "✅" : "⚠"}</span>
    </div>
  );
}
