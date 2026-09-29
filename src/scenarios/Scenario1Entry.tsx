import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyraBubble } from "@/components/MyraBubble";
import { ConversationThread } from "@/components/myra/ConversationThread";
import { ChatComposer } from "@/components/myra/ChatComposer";
import { GeneratedUIContainer, ThinkingBubble } from "@/components/myra/GeneratedUIContainer";
import { useThinking } from "@/components/myra/useThinking";
import { IntentSummaryCard } from "@/components/generative/IntentSummaryCard";
import { DestinationGrid } from "@/components/generative/DestinationGrid";
import { Card, SectionLabel } from "@/components/Card";
import { Toast } from "@/components/Toast";
import { useToast } from "@/components/useToast";
import { destinationOptions } from "@/data/demoInventory";
import { useDemoStore } from "@/state/useDemoStore";
import { useInspector } from "@/state/InspectorContext";

const PREFILL =
  "parents ke saath 5-6 din kahi jana hai oct me. budget around 1.5L. international chalega but visa ka zyada headache nahi chahiye. veg food bhi easy hona chahiye";

const intentFacts = [
  { label: "Duration", value: "5–6 days" },
  { label: "Travellers", value: "3 (with parents)" },
  { label: "Month", value: "October" },
  { label: "Budget", value: "~₹1.5L" },
  { label: "Visa", value: "Low complexity preferred" },
  { label: "Food", value: "Vegetarian-friendly" },
  { label: "Pace", value: "Balanced / relaxed" },
];

type Step = 0 | 1 | 2 | 3 | 4 | 5;

export default function Scenario1Entry() {
  const [step, setStep] = useState<Step>(0);
  const [exploredId, setExploredId] = useState<string | null>(null);
  const { isThinking, runWithThinking } = useThinking();
  const { createTripFromDestination } = useDemoStore();
  const { setSnapshot } = useInspector();
  const { message, show } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setSnapshot({
      scenarioName: "01 · Plan with natural language",
      scenarioTag: "GENERATIVE UI",
      userState: "No active trip — planning stage",
      contextUsed: ["Budget", "Companions", "Food preference", "Visa preference", "Duration"],
      intent: "Traveller wants a low-hassle international trip with parents.",
      generatedUI:
        step === 0
          ? "Waiting for input"
          : step === 1
            ? "Intent Summary Card"
            : "Destination Recommendation Grid",
      action: step >= 4 ? "Create trip from Vietnam recommendation" : "Structuring natural-language intent",
      stateChange: step >= 4 ? "New persistent trip created" : "No state change yet",
      valueDemonstrated: ["Natural language → structured, bookable trip", "No filters to fill manually"],
      whyMMT: "Live inventory + booking context turn the recommendation into a real trip.",
    });
  }, [step, setSnapshot]);

  function handleSend() {
    runWithThinking(() => setStep(1));
  }

  function handleLooksRight() {
    runWithThinking(() => setStep(2));
  }

  function handleExplore(id: string) {
    setExploredId(id);
    setStep(3);
  }

  function handleCreateTrip() {
    createTripFromDestination();
    setStep(4);
    show("Vietnam trip created");
  }

  const explored = destinationOptions.find((d) => d.id === exploredId);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ConversationThread>
        {step >= 1 && <MyraBubble from="user">{PREFILL}</MyraBubble>}

        {step >= 1 && (
          <MyraBubble>Got it. I'll keep the trip comfortable for your parents, avoid visa-heavy options, and stay around your budget.</MyraBubble>
        )}

        {step >= 1 && (
          <GeneratedUIContainer>
            <IntentSummaryCard facts={intentFacts} onLooksRight={handleLooksRight} confirmed={step >= 2} />
          </GeneratedUIContainer>
        )}

        {step >= 2 && <MyraBubble>Here are three destinations that fit — Vietnam is the strongest match.</MyraBubble>}

        {step >= 2 && (
          <GeneratedUIContainer>
            <DestinationGrid options={destinationOptions} onExplore={handleExplore} />
          </GeneratedUIContainer>
        )}

        {step >= 3 && explored && (
          <GeneratedUIContainer>
            <Card>
              <SectionLabel>{explored.name} · 6-day itinerary preview</SectionLabel>
              <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
                <li>Day 1 — Arrival + check-in</li>
                <li>Day 2–4 — City + culture + food experiences</li>
                <li>Day 5 — Free day, local discovery</li>
                <li>Day 6 — Island / nature experience + departure</li>
              </ul>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--color-bg)] px-3 py-2 text-xs">
                <span className="text-[var(--color-slate)]">Flight + hotel package (est.)</span>
                <span className="font-bold text-[var(--color-ink)]">₹{explored.estCost.toLocaleString("en-IN")}</span>
              </div>
              {exploredId === "dest-vietnam" ? (
                <button
                  type="button"
                  onClick={handleCreateTrip}
                  disabled={step >= 4}
                  className="mt-3 w-full rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white disabled:opacity-60"
                >
                  {step >= 4 ? "Trip created" : `Create My ${explored.name} Trip`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => show(`This prototype's full in-trip demo continues with Vietnam — try Explore → Vietnam.`)}
                  className="mt-3 w-full rounded-lg border border-[var(--color-border)] bg-white py-2.5 text-xs font-bold text-[var(--color-ink)]"
                >
                  Create My {explored.name} Trip
                </button>
              )}
            </Card>
          </GeneratedUIContainer>
        )}

        {step >= 4 && (
          <>
            <MyraBubble>Your Vietnam trip is live. I'll stay with you for the whole journey — no need to re-explain anything.</MyraBubble>
            <GeneratedUIContainer>
              <button
                type="button"
                onClick={() => navigate("/trip")}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2.5 text-xs font-bold text-[var(--color-ink)]"
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
