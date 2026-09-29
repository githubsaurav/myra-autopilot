import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyraBubble } from "@/components/MyraBubble";
import { ConversationThread } from "@/components/myra/ConversationThread";
import { ChatComposer } from "@/components/myra/ChatComposer";
import { GeneratedUIContainer, ThinkingBubble } from "@/components/myra/GeneratedUIContainer";
import { useThinking } from "@/components/myra/useThinking";
import { BeforeAfterPlan } from "@/components/generative/BeforeAfterPlan";
import { MemoryLearnedCard } from "@/components/generative/MemoryCard";
import { day3Before, day3After } from "@/data/demoTrip";
import { useDemoStore } from "@/state/useDemoStore";
import { useInspector } from "@/state/InspectorContext";
import { NoTripNotice } from "@/scenarios/NoTripNotice";

const PREFILL = "kal ka plan kaafi tiring tha. aaj thoda light kar do but jo main places hai wo miss nahi hone chahiye";

const metrics = [
  { label: "Travel", before: "3h 10m", after: "40m" },
  { label: "Walking", before: "High", after: "Low" },
  { label: "Rest", before: "30m", after: "2h 30m" },
  { label: "Extra cost", before: "—", after: "₹0" },
];

export default function Scenario3Adapt() {
  const { trip, applyLighterDay, rememberFatiguePreference, learnedPreferences } = useDemoStore();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const { isThinking, runWithThinking } = useThinking();
  const { setSnapshot } = useInspector();
  const navigate = useNavigate();

  const preference = "Prefers a lighter pace after long travel days";
  const remembered = learnedPreferences.includes(preference);

  useEffect(() => {
    setSnapshot({
      scenarioName: "03 · Make today lighter",
      scenarioTag: "ADAPT",
      userState: trip ? `Day ${trip.dayNumber} · fatigue from previous day` : "No active trip",
      contextUsed: ["Previous day intensity", "Parent profile", "Must-do flags"],
      intent: "Reduce travel and walking today without losing key experiences.",
      generatedUI: "Before / After Adaptation View",
      action: step >= 2 ? "Move 1 activity, add rest period, update itinerary" : "Comparing current vs. suggested plan",
      stateChange: step >= 2 ? "Itinerary re-sequenced for Day 3" : "No state change yet",
      valueDemonstrated: ["Trip adapts to the traveller instead of forcing a manual rebuild"],
    });
  }, [step, trip, setSnapshot]);

  if (!trip) return <NoTripNotice />;

  function handleSend() {
    runWithThinking(() => setStep(1));
  }

  function handleApply() {
    applyLighterDay();
    setStep(2);
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ConversationThread>
        <MyraBubble>Day 3 is currently your busiest day: two attractions and 2h 45m of travel.</MyraBubble>
        <MyraBubble from="user">okay</MyraBubble>

        {step >= 1 && <MyraBubble from="user">{PREFILL}</MyraBubble>}
        {step >= 1 && <MyraBubble>I can cut about 2.5 hours of travel today and keep your must-do experiences.</MyraBubble>}

        {step >= 1 && (
          <GeneratedUIContainer>
            <BeforeAfterPlan before={day3Before} after={day3After} metrics={metrics} onApply={handleApply} applied={step >= 2} />
          </GeneratedUIContainer>
        )}

        {step >= 2 && (
          <>
            <MyraBubble>Done — I moved the distant attraction to Day 6 and added a rest period today.</MyraBubble>
            <GeneratedUIContainer>
              <MemoryLearnedCard
                preferences={[preference]}
                onKeep={() => {
                  rememberFatiguePreference();
                  setStep(3);
                }}
                kept={remembered}
              />
            </GeneratedUIContainer>
          </>
        )}

        {step >= 3 && (
          <GeneratedUIContainer>
            <button
              type="button"
              onClick={() => navigate("/plan")}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2.5 text-xs font-bold text-[var(--color-ink)]"
            >
              View updated plan
            </button>
          </GeneratedUIContainer>
        )}

        {isThinking && <ThinkingBubble />}
      </ConversationThread>

      <ChatComposer prefill={step === 0 ? PREFILL : ""} disabled={step > 0} onSend={handleSend} />
    </div>
  );
}
