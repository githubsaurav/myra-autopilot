import { AlertTriangle } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";
import type { DependencyNode } from "@/types/demo";

export function DependencyGraph({ headline, detail, nodes }: { headline: string; detail: string; nodes: DependencyNode[] }) {
  return (
    <Card className="border-[var(--color-red)]/25 bg-[var(--color-red-soft)]">
      <div className="flex items-start gap-2">
        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[var(--color-red)]" />
        <div>
          <p className="text-sm font-bold text-[var(--color-red)]">{headline}</p>
          <p className="mt-0.5 text-xs text-[var(--color-ink)]">{detail}</p>
        </div>
      </div>
      <div className="mt-3">
        <SectionLabel>Trip impact map</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {nodes.map((n) => (
            <span
              key={n.id}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                n.affected
                  ? "border-[var(--color-red)]/30 bg-white text-[var(--color-red)]"
                  : "border-[var(--color-border)] bg-white text-[var(--color-slate)]"
              }`}
            >
              {n.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
