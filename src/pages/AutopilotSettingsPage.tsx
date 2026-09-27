import { useState } from "react";
import { Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { Toggle } from "@/components/Toggle";
import { useTripStore } from "@/state/tripStore";
import type { AutonomyMode } from "@/types/travel";

const modes: { value: AutonomyMode; label: string; description: string }[] = [
  { value: "recommend", label: "Recommend only", description: "Myra never acts." },
  { value: "approval", label: "Coordinate after approval", description: "Myra prepares changes; you approve before execution." },
  { value: "bounded", label: "Bounded Autopilot", description: "Myra can take low-risk actions within rules." },
];

const actOnlyIf = [
  "Refundable",
  "No change to international flight",
  "Supplier is in approved network",
  "Change does not reduce hotel category",
  "No additional visa impact",
];

const alwaysAskFor = ["Flight rebooking", "Hotel change above ₹2,000", "Non-refundable action", "Health/safety decision"];

export default function AutopilotSettingsPage() {
  const { traveller, updateAutonomySettings } = useTripStore();
  const [rules, setRules] = useState<Record<string, boolean>>(Object.fromEntries(actOnlyIf.map((r) => [r, true])));

  return (
    <AppShell title="Autopilot Settings">
      <div className="space-y-5 px-4 py-5">
        <div className="flex items-center gap-1.5 rounded-full bg-black/[0.05] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-slate)] w-fit">
          <Info size={11} /> Demo data — synthetic profile
        </div>

        <div>
          <SectionLabel>Autonomy mode</SectionLabel>
          <div className="space-y-2">
            {modes.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => updateAutonomySettings({ autonomyMode: m.value })}
                className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left transition ${
                  traveller.autonomyMode === m.value ? "border-[var(--color-navy)] bg-[var(--color-navy-soft)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <span>
                  <span className="block text-sm font-bold text-[var(--color-ink)]">{m.label}</span>
                  <span className="block text-xs text-[var(--color-slate)]">{m.description}</span>
                </span>
                <span
                  className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${
                    traveller.autonomyMode === m.value ? "border-[var(--color-navy)] bg-[var(--color-navy)]" : "border-[var(--color-border)]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <Card>
          <SectionLabel>Guardrails</SectionLabel>
          <div className="flex justify-between text-xs font-semibold text-[var(--color-ink)]">
            <span>Spend threshold</span>
            <span>₹{traveller.spendLimit.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5000}
            step={250}
            value={traveller.spendLimit}
            onChange={(e) => updateAutonomySettings({ spendLimit: Number(e.target.value) })}
            className="mt-1.5 w-full accent-[var(--color-red)]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-[var(--color-slate)]">
            <span>₹0</span>
            <span>₹5,000</span>
          </div>

          <div className="mt-4 border-t border-[var(--color-border)] pt-3">
            <Toggle
              checked={traveller.refundableOnly}
              onChange={(v) => updateAutonomySettings({ refundableOnly: v })}
              label="Refundable-only actions"
              description="Only allow changes Myra can undo."
            />
          </div>
        </Card>

        <Card>
          <SectionLabel>Only act if</SectionLabel>
          <div className="divide-y divide-[var(--color-border)]">
            {actOnlyIf.map((rule) => (
              <Toggle key={rule} checked={rules[rule]} onChange={(v) => setRules((r) => ({ ...r, [rule]: v }))} label={rule} />
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>Always ask me for</SectionLabel>
          <ul className="space-y-1 text-sm text-[var(--color-ink)]">
            {alwaysAskFor.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <Toggle
            checked={traveller.escalateOnLowConfidence}
            onChange={(v) => updateAutonomySettings({ escalateOnLowConfidence: v })}
            label="Escalate to a human agent when confidence is low"
          />
        </Card>

        <p className="pb-2 text-center text-xs text-[var(--color-slate)]">
          The traveller sets the rules. Myra operates within them.
        </p>
      </div>
    </AppShell>
  );
}
