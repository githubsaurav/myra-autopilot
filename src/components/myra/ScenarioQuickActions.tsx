import { RotateCcw, Headset } from "lucide-react";

export function ScenarioQuickActions({
  onRestart,
  onEscalate,
  labels,
}: {
  onRestart: () => void;
  onEscalate: () => void;
  labels?: { restart?: string; escalate?: string };
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2">
      <button
        type="button"
        onClick={onRestart}
        className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-navy)]"
      >
        <RotateCcw size={11} /> {labels?.restart ?? "Restart this scenario"}
      </button>
      <button
        type="button"
        onClick={onEscalate}
        className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-navy)]"
      >
        <Headset size={11} /> {labels?.escalate ?? "Talk to a human"}
      </button>
    </div>
  );
}
