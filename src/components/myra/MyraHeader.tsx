import { useNavigate } from "react-router-dom";
import { ChevronLeft, Sparkles } from "lucide-react";

export function MyraHeader({ tripLabel }: { tripLabel?: string }) {
  const navigate = useNavigate();
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-black/5"
          aria-label="Back"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-red-soft)] text-[var(--color-red)]">
          <Sparkles size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[var(--color-ink)]">Myra Autopilot</p>
          <p className="truncate text-xs text-[var(--color-slate)]">{tripLabel ?? "Your AI travel companion"}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-success-soft)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-success)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" /> Live
        </span>
      </div>
    </div>
  );
}
