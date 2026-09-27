import { useNavigate } from "react-router-dom";
import { Mountain, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { MyraBubble } from "@/components/MyraBubble";
import { useTripStore } from "@/state/tripStore";

const baselineLearned = [
  "Balanced pace",
  "Vegetarian food",
  "Parents prefer low walking",
  "Preserve must-do experiences",
  "Prefers refundable options",
  "Willing to pay modestly for convenience",
];

const ladakhPreloads = [
  "Slower pacing",
  "Fewer long transit days",
  "Relevant weather / readiness checks",
  "Vegetarian recommendations",
  "Refundable options",
];

export default function NextTripLearningPage() {
  const navigate = useNavigate();
  const { learnedPreferences, resetDemo } = useTripStore();
  const learned = [...new Set([...baselineLearned, ...learnedPreferences])];

  return (
    <AppShell title="Next Trip">
      <div className="space-y-5 px-4 py-5">
        <h1 className="text-lg font-black text-[var(--color-ink)]">Next time, Myra already knows more</h1>

        <Card>
          <SectionLabel>Learned preferences</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {learned.map((l) => (
              <Chip key={l} tone="navy">
                {l}
              </Chip>
            ))}
          </div>
        </Card>

        <MyraBubble from="user">Planning Ladakh with parents in October.</MyraBubble>

        <Card>
          <div className="flex items-center gap-2">
            <Mountain size={16} className="text-[var(--color-navy)]" />
            <p className="text-sm font-bold text-[var(--color-ink)]">Myra preloads your Ladakh trip with</p>
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-ink)]">
            {ladakhPreloads.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Sparkles size={13} className="mt-0.5 shrink-0 text-[var(--color-red)]" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <button
          type="button"
          onClick={() => {
            resetDemo();
            navigate("/booking-confirmed");
          }}
          className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
        >
          Start next trip with Myra
        </button>
      </div>
    </AppShell>
  );
}
