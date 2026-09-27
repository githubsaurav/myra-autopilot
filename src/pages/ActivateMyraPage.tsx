import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Bell, BrainCircuit } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { Toggle } from "@/components/Toggle";
import { useTripStore } from "@/state/tripStore";
import type { AutonomyMode, TravelPace } from "@/types/travel";

const known = ["Vietnam", "6 days", "3 travellers", "Flight booked", "Hotel booked", "Travel dates", "MMT booking history"];

const paceOptions: { value: TravelPace; label: string }[] = [
  { value: "relaxed", label: "Relaxed" },
  { value: "balanced", label: "Balanced" },
  { value: "packed", label: "Packed" },
];

const foodOptions = ["Vegetarian", "Vegan", "No restriction"];
const companionOptions = ["Minimise walking", "Avoid late nights", "Accessibility", "None"];
const interestOptions = ["Food", "Culture", "Nature", "Shopping", "Adventure"];

const autonomyOptions: { value: AutonomyMode; label: string; description: string }[] = [
  { value: "recommend", label: "Recommend only", description: "Myra never acts on its own." },
  { value: "approval", label: "Coordinate after approval", description: "Myra prepares changes; you approve before execution." },
  { value: "bounded", label: "Low-risk auto-actions", description: "Myra can take bounded, low-risk actions within your rules." },
];

export default function ActivateMyraPage() {
  const navigate = useNavigate();
  const { traveller, completeOnboarding } = useTripStore();

  const [pace, setPace] = useState<TravelPace>(traveller.travelPace);
  const [food, setFood] = useState<string>(traveller.foodPreferences[0] ?? "Vegetarian");
  const [companionNeeds, setCompanionNeeds] = useState<string[]>(traveller.companionNeeds.length ? traveller.companionNeeds : ["Minimise walking"]);
  const [interests, setInterests] = useState<string[]>(traveller.interests.length ? traveller.interests : ["Food", "Culture"]);
  const [autonomyMode, setAutonomyMode] = useState<AutonomyMode>(traveller.autonomyMode);
  const [useLocation, setUseLocation] = useState(traveller.useLocation);
  const [disruptionAlerts, setDisruptionAlerts] = useState(traveller.disruptionAlerts);
  const [rememberPreferences, setRememberPreferences] = useState(traveller.rememberPreferences);

  function toggleFrom(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function handleActivate() {
    completeOnboarding({
      travelPace: pace,
      foodPreferences: [food],
      companionNeeds,
      interests,
      autonomyMode,
      useLocation,
      disruptionAlerts,
      rememberPreferences,
    });
    navigate("/trip-home");
  }

  return (
    <AppShell title="Activate Myra">
      <div className="space-y-5 px-4 py-5">
        <div>
          <SectionLabel>Already known from MMT</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {known.map((k) => (
              <Chip key={k} tone="navy">
                {k}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>Tell Myra only what&apos;s missing</SectionLabel>

          <Card className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Travel pace</p>
              <div className="mt-1.5 flex gap-1.5">
                {paceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPace(opt.value)}
                    className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                      pace === opt.value ? "border-[var(--color-red)] bg-[var(--color-red-soft)] text-[var(--color-red)]" : "border-[var(--color-border)] text-[var(--color-slate)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Food</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {foodOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFood(opt)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      food === opt ? "border-[var(--color-red)] bg-[var(--color-red-soft)] text-[var(--color-red)]" : "border-[var(--color-border)] text-[var(--color-slate)]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Companion needs</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {companionOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleFrom(companionNeeds, setCompanionNeeds, opt)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      companionNeeds.includes(opt) ? "border-[var(--color-navy)] bg-[var(--color-navy-soft)] text-[var(--color-navy)]" : "border-[var(--color-border)] text-[var(--color-slate)]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Interests</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {interestOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleFrom(interests, setInterests, opt)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      interests.includes(opt) ? "border-[var(--color-navy)] bg-[var(--color-navy-soft)] text-[var(--color-navy)]" : "border-[var(--color-border)] text-[var(--color-slate)]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div>
          <SectionLabel>Autopilot permission</SectionLabel>
          <div className="space-y-2">
            {autonomyOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAutonomyMode(opt.value)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                  autonomyMode === opt.value ? "border-[var(--color-navy)] bg-[var(--color-navy-soft)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <BrainCircuit size={16} className="mt-0.5 shrink-0 text-[var(--color-navy)]" />
                <span>
                  <span className="block text-sm font-bold text-[var(--color-ink)]">{opt.label}</span>
                  <span className="block text-xs text-[var(--color-slate)]">{opt.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <Card>
          <SectionLabel>Trust controls</SectionLabel>
          <div className="divide-y divide-[var(--color-border)]">
            <Toggle checked={useLocation} onChange={setUseLocation} label="Use current location during the trip" />
            <Toggle checked={disruptionAlerts} onChange={setDisruptionAlerts} label="Send disruption alerts" />
            <Toggle checked={rememberPreferences} onChange={setRememberPreferences} label="Remember preferences for future trips" />
          </div>
        </Card>

        <div className="flex items-start gap-2 rounded-xl bg-black/[0.03] p-3 text-xs text-[var(--color-slate)]">
          <MapPin size={14} className="mt-0.5 shrink-0" />
          <span>Activation is safe and transparent — you can change any of this later in Autopilot settings.</span>
        </div>

        <button
          type="button"
          onClick={handleActivate}
          className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
        >
          Activate Myra
        </button>
        <div className="flex items-center gap-1.5 pb-2 text-[11px] text-[var(--color-slate)]">
          <Bell size={12} /> You can turn off alerts anytime in settings.
        </div>
      </div>
    </AppShell>
  );
}
