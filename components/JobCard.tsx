import type { CustomerJob } from "@/lib/content";

export function JobCard({ job }: { job: CustomerJob }) {
  const critical = job.critical;
  return (
    <div
      className="flex flex-col rounded-2xl border p-4 shadow-[var(--shadow-sm)]"
      style={{
        borderColor: critical ? "color-mix(in srgb, var(--color-status-critical) 30%, transparent)" : "rgba(0,0,0,0.05)",
        background: critical ? "var(--color-status-critical-bg)" : "var(--color-surface)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-black uppercase tracking-wide"
          style={{ color: critical ? "var(--color-status-critical)" : "var(--color-ink)" }}
        >
          {job.title}
        </h3>
        {critical && (
          <span className="rounded-full bg-[var(--color-status-critical)] px-2 py-0.5 text-[10px] font-bold text-white">
            White space
          </span>
        )}
      </div>
      <p className="mt-2 text-sm italic text-[var(--color-ink)]">&ldquo;{job.quote}&rdquo;</p>
      <div className="mt-3 space-y-1.5 border-t border-black/5 pt-3 text-xs">
        <p>
          <span className="font-bold text-[var(--color-slate)]">Context: </span>
          <span className="text-[var(--color-slate)]">{job.context}</span>
        </p>
        <p>
          <span className="font-bold text-[var(--color-slate)]">Output: </span>
          <span className="text-[var(--color-slate)]">{job.output}</span>
        </p>
      </div>
    </div>
  );
}
