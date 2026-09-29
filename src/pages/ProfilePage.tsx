import { Check, Sparkles, User } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";
import { Toggle } from "@/components/Toggle";
import { EmptyPersonaNotice } from "@/components/shell/EmptyPersonaNotice";
import { useDemoStore } from "@/state/useDemoStore";
import { maskedIdentifiers, coTravellers } from "@/data/demoTraveller";
import { personas } from "@/data/demoPersonas";
import type { AutonomyMode } from "@/types/demo";

const modes: { value: AutonomyMode; label: string; description: string }[] = [
  { value: "recommend", label: "Recommend only", description: "Myra never executes." },
  { value: "approval", label: "Coordinate after approval", description: "Myra prepares changes; you approve before execution." },
  { value: "bounded", label: "Bounded Autopilot", description: "Low-risk actions can happen within your rules." },
];

const alwaysAskFor = ["Flight rebooking", "Hotel changes above threshold", "Non-refundable changes", "Any health/safety decision"];

export default function ProfilePage() {
  const { activePersonaId, travellers, updateTraveller, learnedPreferences } = useDemoStore();

  if (!activePersonaId) {
    return <EmptyPersonaNotice icon={User} message="Pick a scenario to see that traveller's profile." />;
  }

  const traveller = travellers[activePersonaId];
  const persona = personas.find((p) => p.id === activePersonaId)!;
  const companions = coTravellers[activePersonaId];
  const learned = learnedPreferences[activePersonaId];

  return (
    <div className="app-scroll h-full space-y-5 overflow-y-auto px-5 py-5">
      <Card>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy)] text-sm font-black text-white">
            {traveller.displayName.slice(0, 1)}
          </span>
          <div>
            <p className="text-sm font-bold text-[var(--color-ink)]">{traveller.displayName}</p>
            <p className="text-xs text-[var(--color-slate)]">
              {persona.name} · {maskedIdentifiers.phone}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-[var(--color-slate)]">
          <span className="rounded-full bg-black/[0.05] px-2 py-1">Payment {maskedIdentifiers.paymentInstrument}</span>
          {companions.length > 0 && <span className="rounded-full bg-black/[0.05] px-2 py-1">Travelling with {companions.join(", ")}</span>}
        </div>
      </Card>

      {learned.length > 0 && (
        <Card className="border-[var(--color-navy)]/20 bg-[var(--color-navy-soft)]">
          <div className="mb-1 flex items-center gap-1.5">
            <Sparkles size={13} className="text-[var(--color-navy)]" />
            <SectionLabel>Remembered preferences</SectionLabel>
          </div>
          <ul className="space-y-1.5">
            {learned.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-[var(--color-ink)]">
                <Check size={14} className="mt-0.5 shrink-0 text-[var(--color-navy)]" /> {p}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div>
        <SectionLabel>Autonomy mode</SectionLabel>
        <div className="space-y-2">
          {modes.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => updateTraveller(activePersonaId, { autonomyMode: m.value })}
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
          onChange={(e) => updateTraveller(activePersonaId, { spendLimit: Number(e.target.value) })}
          className="mt-1.5 w-full accent-[var(--color-red)]"
        />
        <div className="mt-1 flex justify-between text-[10px] text-[var(--color-slate)]">
          <span>₹0</span>
          <span>₹5,000</span>
        </div>
        <div className="mt-4 border-t border-[var(--color-border)] pt-3">
          <Toggle
            checked={traveller.refundableOnly}
            onChange={(v) => updateTraveller(activePersonaId, { refundableOnly: v })}
            label="Refundable-only actions"
            description="Only allow changes Myra can undo."
          />
        </div>
        <div className="mt-1 border-t border-[var(--color-border)] pt-3">
          <Toggle
            checked={traveller.memoryEnabled}
            onChange={(v) => updateTraveller(activePersonaId, { memoryEnabled: v })}
            label="Remember preferences across trips"
          />
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

      <p className="pb-2 text-center text-xs text-[var(--color-slate)]">Autopilot removes coordination effort, not traveller control.</p>
    </div>
  );
}
