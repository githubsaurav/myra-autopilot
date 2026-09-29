import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyraBubble } from "@/components/MyraBubble";
import { ConversationThread } from "@/components/myra/ConversationThread";
import { ChatComposer } from "@/components/myra/ChatComposer";
import { GeneratedUIContainer, ThinkingBubble } from "@/components/myra/GeneratedUIContainer";
import { useThinking } from "@/components/myra/useThinking";
import { IntentSummaryCard } from "@/components/generative/IntentSummaryCard";
import { DestinationGrid } from "@/components/generative/DestinationGrid";
import { DependencyGraph } from "@/components/generative/DependencyGraph";
import { RecoveryOptions } from "@/components/generative/RecoveryOptions";
import { ComparisonMatrix } from "@/components/generative/ComparisonMatrix";
import { ApprovalSheet } from "@/components/generative/ApprovalSheet";
import { ExecutionTracker } from "@/components/generative/ExecutionTracker";
import { TripCreatedCelebration } from "@/components/generative/TripCreatedCelebration";
import { Card, SectionLabel } from "@/components/Card";
import { destinationOptions, familyWeatherDisruption } from "@/data/demoInventory";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";

const persona = personas.find((p) => p.id === "family")!;

const intentFacts = [
  { label: "Duration", value: "5–6 days" },
  { label: "Travellers", value: "3 (with parents)" },
  { label: "Month", value: "October" },
  { label: "Budget", value: "~₹1.5L" },
  { label: "Visa", value: "Low complexity preferred" },
  { label: "Food", value: "Vegetarian-friendly" },
  { label: "Pace", value: "Balanced / relaxed" },
];

const actionsFor = (optionId: string) =>
  optionId === "A"
    ? ["Move the activity to Day 6 evening", "Extend hotel by one night", "Shift airport transfer by 3 hours", "Update itinerary", "Notify co-travellers"]
    : ["Replace the activity with an indoor experience", "Notify co-travellers"];

const executionSteps = ["Moving activity", "Extending hotel", "Updating transfer", "Updating itinerary", "Notifying co-travellers"];

export default function PersonaFamily() {
  const { personaStep, setPersonaStep, setPersonaStage, trip, traveller, createTrip, mutateTrip, recoverySelection, selectRecoveryOption, addInspectorEntry } =
    useDemoStoreShim();
  const step = personaStep;
  const [exploredId, setExploredId] = useState<string | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [approved, setApproved] = useState(false);
  const { isThinking, runWithThinking } = useThinking();
  const navigate = useNavigate();

  const option = familyWeatherDisruption.options.find((o) => o.id === recoverySelection) ?? null;

  useEffect(() => {
    if (step === 0) return;
    const stage = step <= 2 ? "discovery" : step === 3 ? "curation" : step === 4 ? "booking" : "intrip";
    setPersonaStage("family", stage);
    addInspectorEntry("family", {
      capability:
        step === 1
          ? "Natural language parsed into structured intent"
          : step === 2
            ? "Options matched against budget, visa & food constraints"
            : step === 3
              ? "Full itinerary generated for the chosen destination"
              : step === 4
                ? "Trip booked — Myra now stays with it"
                : step === 5
                  ? "Proactively detected a disruption before being asked"
                  : step === 6
                    ? "Two recovery plans generated, respecting traveller rules"
                    : step === 7
                      ? "Guardrail checks run before spending a rupee"
                      : step === 8
                        ? "Change executed across every affected booking"
                        : "Trip fully updated end to end",
      backendAction:
        step === 1
          ? "NLU: extracting duration, budget, visa & food constraints"
          : step === 2
            ? "Ranking destination inventory against constraints"
            : step === 3
              ? "Assembling day-by-day itinerary + cost estimate"
              : step === 4
                ? "Writing booking + itinerary to trip state"
                : step === 5
                  ? "Cross-checking weather feed against active bookings"
                  : step === 6
                    ? "Generating recovery options within spend/refund rules"
                    : step === 7
                      ? "Validating against spend limit + refundable-only rule"
                      : step === 8
                        ? "Mutating bookings + itinerary, notifying co-travellers"
                        : "Sync complete",
      scenarioName: `Family Trip · ${persona.languageLabel}`,
      scenarioTag: "FAMILY",
      userState: trip ? `Day ${trip.dayNumber} · ${trip.liveContext.city} · travelling with parents` : "No active trip — planning stage",
      contextUsed: step < 5 ? ["Budget", "Companions", "Food preference", "Visa preference"] : ["Weather", "Bookings", "Refund rules", "Spend limit"],
      intent: step < 5 ? "Low-hassle international trip with parents." : "Resolve the weather disruption within guardrails.",
      generatedUI:
        step === 1 ? "Intent Summary Card" : step === 2 ? "Destination Grid" : step === 5 ? "Dependency Graph" : step === 6 ? "Recovery Options" : step >= 7 ? "Approval + Execution" : "—",
      action: step >= 8 ? "Apply weather recovery" : step >= 4 ? "Trip created, monitoring for disruption" : "Structuring natural-language intent",
      stateChange: step >= 9 ? "3 bookings + itinerary updated" : step === 4 ? "New persistent trip created" : "No state change yet",
      valueDemonstrated: ["Natural language → structured trip", "Every destination option is a real, bookable path", "In-trip orchestration, not just chat"],
      whyMMT: "Live inventory + booking context turn recommendation into a real, bookable outcome.",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, trip, recoverySelection]);

  function goto(next: number) {
    setPersonaStep("family", next);
  }

  function handleSend() {
    runWithThinking(() => goto(1));
  }

  function handleLooksRight() {
    runWithThinking(() => goto(2));
  }

  function handleExplore(id: string) {
    setExploredId(id);
    goto(3);
  }

  function handleCreateTrip() {
    if (!explored) return;
    createTrip("family", explored);
    goto(4);
  }

  function handleApplyOption(id: string) {
    selectRecoveryOption("family", id);
    goto(7);
  }

  function handleApprove() {
    mutateTrip("family", (t) => {
      const chosen = familyWeatherDisruption.options.find((o) => o.id === recoverySelection);
      if (!chosen) return t;
      const bookings = t.bookings.map((b) => {
        if (!chosen.affectedBookings.includes(b.id)) return b;
        if (b.id === "bk-island") {
          return chosen.preservesOriginal
            ? { ...b, status: "moved" as const, meta: "Day 6 · 18:00", tag: "Moved by Myra" }
            : { ...b, status: "cancelled" as const, tag: "Cancelled — replaced" };
        }
        if (b.id === "bk-hotel" && chosen.preservesOriginal) {
          return { ...b, meta: `Confirmation ${t.hotelConfirmation} · Extended`, amount: b.amount + chosen.extraCost, tag: "Extended by Myra" };
        }
        if (b.id === "bk-transfer" && chosen.preservesOriginal) {
          return { ...b, meta: "Day 7 · 21:00 (shifted +3h)", tag: "Pickup updated" };
        }
        return b;
      });
      const itinerary = t.itinerary.map((item) => {
        if (item.id === "it-d6-1") {
          return chosen.preservesOriginal
            ? { ...item, time: "18:00", status: "moved" as const, detail: "Moved later in the day" }
            : { ...item, title: "Local food + heritage experience", status: "new" as const, detail: undefined };
        }
        if (item.id === "it-d6-2" && chosen.preservesOriginal) {
          return { ...item, time: "21:00", status: "moved" as const, detail: "Shifted by 3 hours" };
        }
        return item;
      });
      return { ...t, bookings, itinerary };
    });
    setApproved(true);
    goto(8);
  }

  const explored = destinationOptions.family.find((d) => d.id === exploredId);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ConversationThread>
        {step >= 1 && <MyraBubble from="user">{persona.samplePrompt}</MyraBubble>}
        {step >= 1 && (
          <MyraBubble>Got it. I'll keep the trip comfortable for your parents, avoid visa-heavy options, and stay around your budget.</MyraBubble>
        )}

        {step >= 1 && (
          <GeneratedUIContainer>
            <IntentSummaryCard facts={intentFacts} onLooksRight={handleLooksRight} confirmed={step >= 2} />
          </GeneratedUIContainer>
        )}

        {step >= 2 && <MyraBubble>Here are three destinations that fit — pick any of them to see the full plan.</MyraBubble>}

        {step >= 2 && (
          <GeneratedUIContainer>
            <DestinationGrid options={destinationOptions.family} onExplore={handleExplore} />
          </GeneratedUIContainer>
        )}

        {step >= 3 && explored && (
          <GeneratedUIContainer>
            <Card>
              <SectionLabel>{explored.name} · 6-day itinerary preview</SectionLabel>
              <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
                <li>Day 1 — Arrival + hotel check-in</li>
                <li>Day 2–4 — City, culture and food</li>
                <li>Day 5 — Free day, local exploration</li>
                <li>Day 6 — Signature activity + departure</li>
              </ul>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--color-bg)] px-3 py-2 text-xs">
                <span className="text-[var(--color-slate)]">Flight + hotel package (est.)</span>
                <span className="font-bold text-[var(--color-ink)]">₹{explored.estCost.toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                onClick={handleCreateTrip}
                disabled={step >= 4}
                className="mt-3 w-full rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white disabled:opacity-60"
              >
                {step >= 4 ? "Trip created" : `Create My ${explored.name} Trip`}
              </button>
            </Card>
          </GeneratedUIContainer>
        )}

        {step >= 4 && (
          <>
            <GeneratedUIContainer>
              <TripCreatedCelebration title="Your Trip is Live!" subtitle={`${explored?.name} · 6 days`} />
            </GeneratedUIContainer>
            <MyraBubble>Your trip is confirmed. I'll stay with you for the whole journey — no need to re-explain anything.</MyraBubble>
            {step === 4 && (
              <GeneratedUIContainer>
                <button
                  type="button"
                  onClick={() => goto(5)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2.5 text-xs font-bold text-[var(--color-ink)]"
                >
                  Continue — in-trip, Day 5
                </button>
              </GeneratedUIContainer>
            )}
          </>
        )}

        {step >= 5 && <MyraBubble>Tomorrow's activity is confirmed for 9 AM.</MyraBubble>}

        {step >= 5 && (
          <GeneratedUIContainer>
            <DependencyGraph headline={familyWeatherDisruption.headline} detail={familyWeatherDisruption.detail} nodes={familyWeatherDisruption.dependencyChain} />
          </GeneratedUIContainer>
        )}

        {step >= 5 && <MyraBubble>I checked the rest of your trip. This affects more than the activity, so I mapped the impact before suggesting changes.</MyraBubble>}

        {step >= 6 && <MyraBubble from="user">what should we do?</MyraBubble>}
        {step >= 6 && <MyraBubble>I found two workable recovery plans. Both respect your refundable-only preference.</MyraBubble>}

        {step >= 6 && (
          <GeneratedUIContainer>
            <RecoveryOptions options={familyWeatherDisruption.options} onApply={handleApplyOption} onCompare={() => setShowCompare((v) => !v)} />
          </GeneratedUIContainer>
        )}

        {step >= 6 && showCompare && (
          <GeneratedUIContainer>
            <ComparisonMatrix options={familyWeatherDisruption.options} />
          </GeneratedUIContainer>
        )}

        {step >= 7 && option && (
          <GeneratedUIContainer>
            <ApprovalSheet option={option} actions={actionsFor(option.id)} traveller={traveller} onApprove={handleApprove} onCancel={() => goto(6)} approved={approved} />
          </GeneratedUIContainer>
        )}

        {step >= 8 && (
          <GeneratedUIContainer>
            <ExecutionTracker steps={executionSteps} onComplete={() => goto(9)} done={step >= 9} onViewChanges={() => navigate("/bookings")} />
          </GeneratedUIContainer>
        )}

        {isThinking && <ThinkingBubble />}
      </ConversationThread>

      <ChatComposer
        prefill={step === 0 ? persona.samplePrompt : step === 5 ? "what should we do?" : ""}
        disabled={step !== 0 && step !== 5}
        onSend={step === 0 ? handleSend : () => runWithThinking(() => goto(6))}
      />
    </div>
  );
}

/** Thin adapter so this file reads cleanly against the shared demo store, scoped to the "family" persona. */
function useDemoStoreShim() {
  const store = useDemoStore();
  return {
    personaStep: store.personaStep.family,
    setPersonaStep: store.setPersonaStep,
    setPersonaStage: store.setPersonaStage,
    trip: store.trips.family,
    traveller: store.travellers.family,
    createTrip: store.createTrip,
    mutateTrip: store.mutateTrip,
    recoverySelection: store.recoverySelection.family,
    selectRecoveryOption: store.selectRecoveryOption,
    addInspectorEntry: store.addInspectorEntry,
  };
}
