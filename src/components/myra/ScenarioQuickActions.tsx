import { Link } from "react-router-dom";
import { RotateCcw, Headset, CalendarDays, Ticket } from "lucide-react";

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
    <details className="chat-tools"><summary>Trip tools</summary><div className="chat-utilities flex gap-1.5 overflow-x-auto border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2">
      <Link className="chat-utility-link" to="/plan"><CalendarDays size={12} />Itinerary</Link>
      <Link className="chat-utility-link" to="/bookings"><Ticket size={12} />Bookings</Link>
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
        <Headset size={11} /> {labels?.escalate ?? "Support demo"}
      </button>
    </div></details>
  );
}
