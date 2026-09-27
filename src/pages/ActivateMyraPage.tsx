import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Gauge, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Toggle } from "@/components/Toggle";
import { useTripStore } from "@/state/tripStore";
import type { TravelPace } from "@/types/travel";

const paceOptions: { value: TravelPace; label: string; hint: string }[] = [
  { value: "relaxed", label: "Relaxed", hint: "Fewer stops, more downtime" },
  { value: "balanced", label: "Balanced", hint: "A steady mix" },
  { value: "packed", label: "Packed", hint: "See as much as possible" },
];

const foodOptions = ["Vegetarian", "Vegan", "No restriction"];

export default function ActivateMyraPage() {
  const navigate = useNavigate();
  const { traveller, completeOnboarding } = useTripStore();

  const [pace, setPace] = useState<TravelPace>(traveller.travelPace);
  const [food, setFood] = useState<string>(traveller.foodPreferences[0] ?? "Vegetarian");
  const [useLocation, setUseLocation] = useState(traveller.useLocation);

  function handleActivate() {
    completeOnboarding({
      travelPace: pace,
      foodPreferences: [food],
      companionNeeds: ["Minimise walking"],
      interests: ["Food", "Culture"],
    });
    navigate("/trip-home");
  }

  return (
    <AppShell title="Set Up Myra">
      <div className="flex min-h-full flex-col px-4 py-6">
        <div>
          <h1 className="text-lg font-black text-[var(--color-ink)]">A couple of quick things</h1>
          <p className="mt-1 text-sm text-[var(--color-slate)]">
            We already know your dates, flights, hotel and travellers.
          </p>
        </div>

        <div className="mt-6">
          <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-ink)]">
            <Gauge size={15} className="text-[var(--color-navy)]" /> How do you like to travel?
          </p>
          <div className="mt-2.5 space-y-2">
            {paceOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPace(opt.value)}
                className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition ${
                  pace === opt.value ? "border-[var(--color-red)] bg-[var(--color-red-soft)]" : "border-[var(--color-border)]"
                }`}
              >
                <span>
                  <span className="block text-sm font-bold text-[var(--color-ink)]">{opt.label}</span>
                  <span className="block text-xs text-[var(--color-slate)]">{opt.hint}</span>
                </span>
                <span
                  className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                    pace === opt.value ? "border-[var(--color-red)] bg-[var(--color-red)]" : "border-[var(--color-border)]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-ink)]">
            <Utensils size={15} className="text-[var(--color-navy)]" /> Food preference
          </p>
          <div className="mt-2.5 flex gap-2">
            {foodOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFood(opt)}
                className={`flex-1 rounded-xl border py-2.5 text-xs font-bold transition ${
                  food === opt ? "border-[var(--color-red)] bg-[var(--color-red-soft)] text-[var(--color-red)]" : "border-[var(--color-border)] text-[var(--color-ink)]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] p-3.5">
          <MapPin size={16} className="shrink-0 text-[var(--color-navy)]" />
          <div className="flex-1">
            <Toggle checked={useLocation} onChange={setUseLocation} label="Use my location on the trip" />
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-[var(--color-slate)]">
          You're in control — change permissions anytime in Myra settings.
        </p>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={handleActivate}
            className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    </AppShell>
  );
}
