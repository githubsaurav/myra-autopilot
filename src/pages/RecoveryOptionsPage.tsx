import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { useTripStore } from "@/state/tripStore";

export default function RecoveryOptionsPage() {
  const navigate = useNavigate();
  const { disruption, selectRecoveryOption } = useTripStore();

  function choose(id: "A" | "B") {
    selectRecoveryOption(id);
    navigate("/apply-changes");
  }

  return (
    <AppShell title="Recovery Options">
      <div className="space-y-4 px-4 py-5">
        <h1 className="text-lg font-black text-[var(--color-ink)]">2 ways to handle this</h1>

        {disruption.options.map((opt) => (
          <Card key={opt.id} className={opt.recommended ? "border-[var(--color-red)]/30 bg-[var(--color-red-soft)]" : ""}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-bold text-[var(--color-ink)]">{opt.title.split(" → ")[0]}</p>
              {opt.recommended && (
                <Chip tone="red">
                  <Sparkles size={11} /> Best fit
                </Chip>
              )}
            </div>
            <p className="mt-1 text-xs text-[var(--color-slate)]">
              +₹{opt.extraCost.toLocaleString("en-IN")} · {opt.preservesOriginal ? "Keeps your island tour" : "Replaces the island tour"}
            </p>
            <p className="mt-2 text-xs italic text-[var(--color-slate)]">{opt.rationale}</p>
            <button
              type="button"
              onClick={() => choose(opt.id)}
              className={`mt-3 w-full rounded-lg py-2.5 text-xs font-bold transition ${
                opt.recommended ? "bg-[var(--color-red)] text-white" : "border border-[var(--color-border)] bg-white text-[var(--color-ink)]"
              }`}
            >
              Choose this
            </button>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
