import { Sparkles } from "lucide-react";
import { PersonaSelector } from "@/components/shell/PersonaSelector";
import type { PersonaId, PersonaMeta } from "@/types/demo";

export function MyraHeader({
  tripLabel,
  persona,
  onChangePersona,
}: {
  tripLabel?: string;
  persona?: PersonaMeta;
  onChangePersona?: (id: PersonaId) => void;
}) {
  return (
    <div className="myra-header border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-red-soft)] text-[var(--color-red)]">
          <Sparkles size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[var(--color-ink)]">Myra Autopilot</p>
          <p className="truncate text-xs text-[var(--color-slate)]">{tripLabel ?? "Your AI travel companion"}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-success-soft)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-success)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" /> Ready
        </span>
      </div>
      {persona && onChangePersona && (
        <div className="mt-2.5 flex items-center gap-2">
          <PersonaSelector value={persona.id} onChange={onChangePersona} variant="pill" />
          <span
            className="flex items-center gap-1 rounded-full bg-black/[0.05] px-2 py-1 text-[10px] font-semibold text-[var(--color-ink)]"
            title="Myra can hold this conversation in multiple languages — this persona is scripted in the one shown"
          >
            🌐 Chat in {persona.languageLabel}
          </span>
        </div>
      )}
    </div>
  );
}
