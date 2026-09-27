import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function MyraBubble({ children, from = "myra" }: { children: ReactNode; from?: "user" | "myra" }) {
  if (from === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[var(--color-navy)] px-3.5 py-2.5 text-sm font-medium text-white">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-red-soft)] text-[var(--color-red)]">
        <Sparkles size={13} />
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-ink)]">
        {children}
      </div>
    </div>
  );
}
