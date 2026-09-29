import { Card, SectionLabel } from "@/components/Card";
import type { GroupMemberInput } from "@/types/demo";

export function GroupPreferencePanel({ members }: { members: GroupMemberInput[] }) {
  return (
    <Card>
      <SectionLabel>What everyone wants</SectionLabel>
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-xs font-bold text-[var(--color-navy)]">
              {m.initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[var(--color-ink)]">{m.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                {m.wants.map((w) => (
                  <span key={w} className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-ink)]">
                    {w}
                  </span>
                ))}
                <span className="text-[10px] font-semibold text-[var(--color-slate)]">{m.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
