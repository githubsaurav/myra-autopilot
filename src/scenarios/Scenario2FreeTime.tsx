import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyraBubble } from "@/components/MyraBubble";
import { ConversationThread } from "@/components/myra/ConversationThread";
import { ChatComposer } from "@/components/myra/ChatComposer";
import { GeneratedUIContainer, ThinkingBubble } from "@/components/myra/GeneratedUIContainer";
import { useThinking } from "@/components/myra/useThinking";
import { RecommendationGrid } from "@/components/generative/RecommendationGrid";
import { Chip } from "@/components/Chip";
import { Toast } from "@/components/Toast";
import { useToast } from "@/components/useToast";
import { freeTimeOptions } from "@/data/demoInventory";
import { useDemoStore } from "@/state/useDemoStore";
import { useInspector } from "@/state/InspectorContext";
import { NoTripNotice } from "@/scenarios/NoTripNotice";
import type { ContextualOption } from "@/types/demo";

const PREFILL = "we are free till 10. kya kar sakte hai? parents are a bit tired";

export default function Scenario2FreeTime() {
  const { trip, addFreeTimeItem } = useDemoStore();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [added, setAdded] = useState<ContextualOption | null>(null);
  const { isThinking, runWithThinking } = useThinking();
  const { setSnapshot } = useInspector();
  const { message, show } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setSnapshot({
      scenarioName: "02 · Four free hours",
      scenarioTag: "CONTEXT",
      userState: trip ? `Day ${trip.dayNumber} · ${trip.liveContext.city} · travelling with parents` : "No active trip",
      contextUsed: ["Location", "Time", "Companions", "Fatigue", "Diet", "Budget"],
      intent: "Find something low-effort nearby for a 4-hour window.",
      generatedUI: step >= 1 ? "Ranked contextual recommendation cards" : "Context strip",
      action: added ? `Add "${added.title}" to tonight's plan` : "Filtering local options",
      stateChange: added ? "2 itinerary items added" : "No state change yet",
      valueDemonstrated: ["Contextual discovery without restarting search", "No need to re-explain the trip"],
    });
  }, [step, added, trip, setSnapshot]);

  if (!trip) return <NoTripNotice />;

  function handleSend() {
    runWithThinking(() => setStep(1));
  }

  function handleAdd(option: ContextualOption) {
    addFreeTimeItem(option.title, option.cost);
    setAdded(option);
    setStep(2);
    show("Added to tonight");
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ConversationThread>
        <MyraBubble>Welcome to Da Nang. Your hotel check-in is complete.</MyraBubble>
        <MyraBubble from="user">Thanks</MyraBubble>
        <MyraBubble>I'll keep today light after your travel.</MyraBubble>

        {step >= 1 && <MyraBubble from="user">{PREFILL}</MyraBubble>}
        {step >= 1 && <MyraBubble>You have about 4 hours. I've filtered for low walking, nearby options and vegetarian food.</MyraBubble>}

        {step >= 1 && (
          <GeneratedUIContainer>
            <div className="mb-3 flex flex-wrap gap-1.5">
              <Chip tone="navy">6:00–10:00 PM</Chip>
              <Chip>Parents travelling</Chip>
              <Chip>Low walking</Chip>
              <Chip>Vegetarian</Chip>
              <Chip>Within 20 min</Chip>
              <Chip>Moderate budget</Chip>
            </div>
            <RecommendationGrid options={freeTimeOptions} onAdd={handleAdd} addedId={added?.id ?? null} />
          </GeneratedUIContainer>
        )}

        {step >= 2 && added && (
          <>
            <MyraBubble>Updated tonight's timeline:</MyraBubble>
            <GeneratedUIContainer>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm">
                <p className="flex justify-between py-1">
                  <span>18:30</span>
                  <span className="font-semibold text-[var(--color-ink)]">{added.title}</span>
                </p>
                <p className="flex justify-between py-1 text-[var(--color-slate)]">
                  <span>21:30</span>
                  <span>Return to hotel</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/trip")}
                className="mt-3 w-full rounded-lg bg-[var(--color-navy)] py-2.5 text-xs font-bold text-white"
              >
                View My Trip
              </button>
            </GeneratedUIContainer>
          </>
        )}

        {isThinking && <ThinkingBubble />}
      </ConversationThread>

      <Toast message={message} />
      <ChatComposer prefill={step === 0 ? PREFILL : ""} disabled={step > 0} onSend={handleSend} />
    </div>
  );
}
