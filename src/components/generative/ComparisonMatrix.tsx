import { Check } from "lucide-react";
import { Card } from "@/components/Card";
import type { RecoveryOption } from "@/types/demo";

interface MatrixLabels {
  compare?: string;
  option?: string;
  extraCost?: string;
  refundImpact?: string;
  timeImpact?: string;
  walking?: string;
  originalExperience?: string;
  preserved?: string;
  replaced?: string;
  changesRequired?: string;
}

export function ComparisonMatrix({ options, labels }: { options: RecoveryOption[]; labels?: MatrixLabels }) {
  const l = {
    compare: labels?.compare ?? "Compare",
    option: labels?.option ?? "Option",
    extraCost: labels?.extraCost ?? "Extra cost",
    refundImpact: labels?.refundImpact ?? "Refund impact",
    timeImpact: labels?.timeImpact ?? "Time impact",
    walking: labels?.walking ?? "Walking",
    originalExperience: labels?.originalExperience ?? "Original experience",
    preserved: labels?.preserved ?? "Preserved",
    replaced: labels?.replaced ?? "Replaced",
    changesRequired: labels?.changesRequired ?? "Changes required",
  };

  const rows: { label: string; get: (o: RecoveryOption) => string }[] = [
    { label: l.extraCost, get: (o) => `₹${o.extraCost.toLocaleString("en-IN")}` },
    { label: l.refundImpact, get: (o) => `₹${o.refundImpact.toLocaleString("en-IN")}` },
    { label: l.timeImpact, get: (o) => o.timeImpact },
    { label: l.walking, get: (o) => o.walking },
    { label: l.originalExperience, get: (o) => (o.preservesOriginal ? l.preserved : l.replaced) },
    { label: l.changesRequired, get: (o) => String(o.changeCount) },
  ];

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[420px] text-xs">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="px-3.5 py-2.5 text-left font-bold text-[var(--color-slate)]">{l.compare}</th>
            {options.map((o) => (
              <th key={o.id} className="px-3.5 py-2.5 text-left font-bold text-[var(--color-ink)]">
                <span className="flex items-center gap-1.5">
                  {l.option} {o.id}
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
