import { Check } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";
import type { GroupVoteOption } from "@/types/demo";

export function GroupVoteCard({
  options,
  onFinalize,
  finalized,
}: {
  options: GroupVoteOption[];
  onFinalize: (id: string) => void;
  finalized: string | null;
}) {
  const winner = options.reduce((a, b) => (b.votes > a.votes ? b : a), options[0]);

  return (
    <Card>
      <SectionLabel>Group vote — where to stay</SectionLabel>
      <div className="space-y-3">
        {options.map((o) => {
          const pct = Math.round((o.votes / o.totalVoters) * 100);
          const isWinner = o.id === winner.id;
          const isFinalized = finalized === o.id;
          return (
            <div key={o.id} className={`rounded-xl border p-3 ${isWinner ? "border-[var(--color-navy)]/25 bg-[var(--color-navy-soft)]" : "border-[var(--color-border)]"}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-[var(--color-ink)]">{o.title}</p>
                <span className="shrink-0 text-xs font-bold text-[var(--color-ink)]">
                  {o.votes}/{o.totalVoters} votes
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[var(--color-slate)]">{o.detail}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                <div className="h-full rounded-full bg-[var(--color-navy)]" style={{ width: `${pct}%` }} />
              </div>
              {isWinner && !isFinalized && (
                <button
                  type="button"
                  onClick={() => onFinalize(o.id)}
                  disabled={!!finalized}
                  className="mt-3 w-full rounded-lg bg-[var(--color-navy)] py-2 text-xs font-bold text-white disabled:opacity-60"
                >
                  Finalize this stay
                </button>
              )}
              {isFinalized && (
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--color-success)]">
                  <Check size={13} /> Finalized
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
