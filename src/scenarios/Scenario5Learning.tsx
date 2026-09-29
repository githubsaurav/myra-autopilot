import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyraBubble } from "@/components/MyraBubble";
import { ConversationThread } from "@/components/myra/ConversationThread";
import { ChatComposer } from "@/components/myra/ChatComposer";
import { GeneratedUIContainer, ThinkingBubble } from "@/components/myra/GeneratedUIContainer";
import { useThinking } from "@/components/myra/useThinking";
import { MemoryAppliedCard } from "@/components/generative/MemoryCard";
import { Card, SectionLabel } from "@/components/Card";
import { useDemoStore } from "@/state/useDemoStore";
import { useInspector } from "@/state/InspectorContext";

const PREFILL = "thinking of ladakh with parents in october. maybe 5 days";

const baseLearned = [
  "Balanced pace",
  "Low walking for parents",
  "Vegetarian",
  "Refundable options preferred",
  "Preserve must-do experiences",
];

export default function Scenario5Learning() {
  const { learnedPreferences, ladakhTrip, createLadakhTrip } = useDemoStore();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const { isThinking, runWithThinking } = useThinking();
  const { setSnapshot } = useInspector();
  const navigate = useNavigate();

  const memory = Array.from(new Set([...baseLearned, ...learnedPreferences]));

  useEffect(() => {
    setSnapshot({
      scenarioName: "05 · Next trip starts smarter",
      scenarioTag: "MEMORY",
      userState: "Vietnam trip completed",
      contextUsed: memory,
      intent: "Start planning Ladakh using what Myra already knows.",
      generatedUI: step >= 1 ? "Memory Applied Card + Trip Starter" : "Waiting for input",
      action: ladakhTrip ? "Create Ladakh trip from learned profile" : "Recalling learned preferences",
      stateChange: ladakhTrip ? "New trip created from persistent traveller profile" : "No state change yet",
      valueDemonstrated: ["Every trip makes the next one easier", "Retention + stickiness"],
      whyMMT: "Richer first-party context from prior bookings.",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, ladakhTrip, setSnapshot]);

  function handleSend() {
    runWithThinking(() => setStep(1));
  }

  function handleCreate() {
    createLadakhTrip();
    setStep(2);
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ConversationThread>
        <MyraBubble>Hope you had a good Vietnam trip. I've saved only the preferences you asked me to remember.</MyraBubble>

        {step >= 1 && <MyraBubble from="user">{PREFILL}</MyraBubble>}
        {step >= 1 && (
          <MyraBubble>
            I can start from what I learned in Vietnam. I'll keep the pace lighter, reduce long travel days, prioritise refundable options
            and keep vegetarian availability in mind.
          </MyraBubble>
        )}

        {step >= 1 && (
          <GeneratedUIContainer>
            <MemoryAppliedCard items={memory} />
          </GeneratedUIContainer>
        )}

        {step >= 1 && (
          <GeneratedUIContainer>
            <Card>
              <SectionLabel>Ladakh trip starter</SectionLabel>
              <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
                <li>Suggested duration: 6 days instead of 5</li>
                <li>Lower-transit itinerary with acclimatisation day</li>
                <li>Bookable hotel shortlist, flexible transport</li>
              </ul>
              <p className="mt-2 text-xs italic text-[var(--color-slate)]">Check official altitude and health guidance before travel.</p>
              <button
                type="button"
                onClick={handleCreate}
                disabled={step >= 2}
                className="mt-3 w-full rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white disabled:opacity-60"
              >
                {step >= 2 ? "Ladakh trip created" : "Create Ladakh Trip"}
              </button>
            </Card>
          </GeneratedUIContainer>
        )}

        {step >= 2 && (
          <GeneratedUIContainer>
            <button
              type="button"
              onClick={() => navigate("/trip")}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2.5 text-xs font-bold text-[var(--color-ink)]"
            >
              View My Trip
            </button>
          </GeneratedUIContainer>
        )}

        {isThinking && <ThinkingBubble />}
      </ConversationThread>

      <ChatComposer prefill={step === 0 ? PREFILL : ""} disabled={step > 0} onSend={handleSend} />
    </div>
  );
}
