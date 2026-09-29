import { StatusStepper } from "@/components/StatusStepper";
import { Card } from "@/components/Card";
import { CheckCircle2 } from "lucide-react";

export function ExecutionTracker({
  steps,
  onComplete,
  done,
  onViewChanges,
  labels,
}: {
  steps: string[];
  onComplete: () => void;
  done: boolean;
  onViewChanges: () => void;
  labels?: { done?: string; viewChanges?: string };
}) {
  return (
    <Card>
      {done ? (
        <div className="space-y-3 text-center">
          <CheckCircle2 size={28} className="mx-auto text-[var(--color-success)]" />
          <p className="text-sm font-bold text-[var(--color-ink)]">{labels?.done ?? "Your trip is updated"}</p>
          <button
            type="button"
            onClick={onViewChanges}
            className="w-full rounded-lg bg-[var(--color-navy)] py-2.5 text-xs font-bold text-white"
          >
            {labels?.viewChanges ?? "View changes in My Trips"}
          </button>
        </div>
      ) : (
        <StatusStepper steps={steps} onComplete={onComplete} />
      )}
    </Card>
  );
}
