import { Check } from "lucide-react";
import { Card } from "@/components/Card";
import type { RecoveryOption } from "@/types/demo";

const rows: { label: string; get: (o: RecoveryOption) => string }[] = [
  { label: "Extra cost", get: (o) => `₹${o.extraCost.toLocaleString("en-IN")}` },
  { label: "Refund impact", get: (o) => `₹${o.refundImpact.toLocaleString("en-IN")}` },
  { label: "Time impact", get: (o) => o.timeImpact },
  { label: "Walking", get: (o) => o.walking },
  { label: "Original experience", get: (o) => (o.preservesOriginal ? "Preserved" : "Replaced") },
  { label: "Changes required", get: (o) => String(o.changeCount) },
];

export function ComparisonMatrix({ options }: { options: RecoveryOption[] }) {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[420px] text-xs">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="px-3.5 py-2.5 text-left font-bold text-[var(--color-slate)]">Compare</th>
            {options.map((o) => (
              <th key={o.id} className="px-3.5 py-2.5 text-left font-bold text-[var(--color-ink)]">
                <span className="flex items-center gap-1.5">
                  Option {o.id}
                  {o.recommended && <Check size={12} className="text-[var(--color-success)]" />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="px-3.5 py-2.5 font-semibold text-[var(--color-slate)]">{row.label}</td>
              {options.map((o) => (
                <td key={o.id} className="px-3.5 py-2.5 font-medium text-[var(--color-ink)]">
                  {row.get(o)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
