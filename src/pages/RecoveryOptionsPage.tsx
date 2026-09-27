import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { useTripStore } from "@/state/tripStore";

export default function RecoveryOptionsPage() {
  const navigate = useNavigate();
  const { disruption, selectRecoveryOption } = useTripStore();
  const [expanded, setExpanded] = useState(false);
  const [a, b] = disruption.options;

  function choose(id: "A" | "B") {
    selectRecoveryOption(id);
    navigate("/apply-changes");
  }

  return (
    <AppShell title="Recovery Options">
      <div className="space-y-5 px-4 py-5">
        <h1 className="text-lg font-black text-[var(--color-ink)]">{disruption.options.length} recovery plans found</h1>

        {[a, b].map((opt) => (
          <Card key={opt.id} className={opt.recommended ? "border-[var(--color-red)]/30 bg-[var(--color-red-soft)]" : ""}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">Option {opt.id}</p>
              {opt.recommended && (
                <Chip tone="red">
                  <Sparkles size={11} /> Recommended
                </Chip>
              )}
            </div>
            <p className="mt-1 text-sm font-bold text-[var(--color-ink)]">{opt.title}</p>
            <ul className="mt-2 space-y-1 text-xs text-[var(--color-ink)]">
              <li>• {opt.preservesOriginal ? "Original experience preserved" : "Original island activity cancelled"}</li>
              <li>• Extra cost: <span className="font-bold">₹{opt.extraCost.toLocaleString("en-IN")}</span></li>
              <li>• Refund impact: <span className="font-bold">₹{opt.refundImpact.toLocaleString("en-IN")}</span></li>
              <li>• {opt.changeCount} change{opt.changeCount > 1 ? "s" : ""} across your trip</li>
            </ul>
            <p className="mt-2 rounded-lg bg-white/70 px-2.5 py-1.5 text-xs text-[var(--color-ink)]">
              <span className="font-semibold">Why {opt.recommended ? "recommended" : "this option"}: </span>
              {opt.rationale}
            </p>
            <button
              type="button"
              onClick={() => choose(opt.id)}
              className={`mt-3 w-full rounded-lg py-2.5 text-xs font-bold transition ${
                opt.recommended ? "bg-[var(--color-red)] text-white" : "border border-[var(--color-border)] bg-white text-[var(--color-ink)]"
              }`}
            >
              {opt.recommended ? `Apply Option ${opt.id}` : `Choose Option ${opt.id}`}
            </button>
          </Card>
        ))}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-center gap-1 text-xs font-semibold text-[var(--color-slate)]"
        >
          Review details <ChevronDown size={13} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        {expanded && (
          <div>
            <SectionLabel>Comparison</SectionLabel>
            <Card className="overflow-x-auto p-0">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-slate)]">
                    <th className="px-3 py-2 font-semibold">Attribute</th>
                    <th className="px-3 py-2 font-semibold">Option A</th>
                    <th className="px-3 py-2 font-semibold">Option B</th>
                  </tr>
                </thead>
                <tbody>
                  <Row label="Original activity preserved" a="Yes" b="No" />
                  <Row label="Extra travel" a="Low" b="Low" />
                  <Row label="Extra cost" a={`₹${a.extraCost}`} b={`₹${b.extraCost}`} />
                  <Row label="Change count" a={String(a.changeCount)} b={String(b.changeCount)} />
                  <Row label="Walking" a="Low" b="Low" />
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Row({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr className="border-b border-[var(--color-border)] last:border-0">
      <td className="px-3 py-2 font-medium text-[var(--color-ink)]">{label}</td>
      <td className="px-3 py-2 text-[var(--color-slate)]">{a}</td>
      <td className="px-3 py-2 text-[var(--color-slate)]">{b}</td>
    </tr>
  );
}
