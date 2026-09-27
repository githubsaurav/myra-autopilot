import type { ReactNode } from "react";

export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "navy" | "red" | "success" | "warning";
}) {
  const toneClasses: Record<string, string> = {
    neutral: "bg-black/[0.04] text-[var(--color-ink)]",
    navy: "bg-[var(--color-navy-soft)] text-[var(--color-navy)]",
    red: "bg-[var(--color-red-soft)] text-[var(--color-red)]",
    success: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
    warning: "bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
