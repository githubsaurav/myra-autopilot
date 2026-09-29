import { ChevronDown } from "lucide-react";
import { personas } from "@/data/demoPersonas";
import type { PersonaId } from "@/types/demo";

export function PersonaSelector({
  value,
  onChange,
  variant = "chat",
}: {
  value: PersonaId | null;
  onChange: (id: PersonaId) => void;
  variant?: "chat" | "pill";
}) {
  const activePersona = personas.find((p) => p.id === value);
  const ActiveIcon = activePersona?.icon;

  if (variant === "pill") {
    return (
      <div className="relative inline-flex items-center">
        {ActiveIcon && (
          <span className="pointer-events-none absolute left-2.5 flex h-4 w-4 items-center justify-center text-[var(--color-navy)]">
            <ActiveIcon size={13} />
          </span>
        )}
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value as PersonaId)}
          className={`appearance-none rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 ${ActiveIcon ? "pl-7" : "pl-3"} pr-7 text-xs font-bold text-[var(--color-navy)] outline-none`}
        >
          {!value && <option value="" disabled>Choose scenario</option>}
          {personas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2.5 text-[var(--color-navy)]" />
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      {ActiveIcon && (
        <span className="pointer-events-none absolute left-2.5 flex h-4 w-4 items-center justify-center text-[var(--color-navy)]">
          <ActiveIcon size={14} />
        </span>
      )}
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value as PersonaId)}
        className={`appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] py-2 ${ActiveIcon ? "pl-8" : "pl-3"} pr-8 text-xs font-bold text-[var(--color-ink)] outline-none focus:border-[var(--color-navy)]`}
      >
        <option value="" disabled>
          Choose a scenario
        </option>
        {personas.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} · {p.languageLabel}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 text-[var(--color-slate)]" />
    </div>
  );
}
