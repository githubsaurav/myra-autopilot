import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyraBubble } from "@/components/MyraBubble";
import { ConversationThread } from "@/components/myra/ConversationThread";
import { ChatComposer } from "@/components/myra/ChatComposer";
import { GeneratedUIContainer, ThinkingBubble } from "@/components/myra/GeneratedUIContainer";
import { useThinking } from "@/components/myra/useThinking";
import { IntentSummaryCard } from "@/components/generative/IntentSummaryCard";
import { DestinationGrid } from "@/components/generative/DestinationGrid";
import { GroupPreferencePanel } from "@/components/generative/GroupPreferencePanel";
import { GroupVoteCard } from "@/components/generative/GroupVoteCard";
import { DependencyGraph } from "@/components/generative/DependencyGraph";
import { RecoveryOptions } from "@/components/generative/RecoveryOptions";
import { ComparisonMatrix } from "@/components/generative/ComparisonMatrix";
import { ApprovalSheet } from "@/components/generative/ApprovalSheet";
import { ExecutionTracker } from "@/components/generative/ExecutionTracker";
import { TripCreatedCelebration } from "@/components/generative/TripCreatedCelebration";
import { Card, SectionLabel } from "@/components/Card";
import { destinationOptions, groupMembers, groupStayVoteByDestination, groupSplitEventByDestination } from "@/data/demoInventory";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";

const persona = personas.find((p) => p.id === "group")!;

const intentFacts = [
  { label: "Group size", value: "4 friends" },
  { label: "Destination", value: "Flexible" },
  { label: "Month", value: "December" },
  { label: "Budget", value: "₹12K–25K, mixed" },
  { label: "Priorities", value: "Nightlife, beaches, food" },
];

const actionsFor = (optionId: string) =>
  optionId === "A"
    ? ["Split the group as proposed", "Adjust start/pickup times", "Keep the rest of the itinerary unchanged", "Notify the group chat"]
    : ["Everyone moves together on the later option", "Adjust the itinerary time", "Notify the group chat"];

const executionSteps = ["Splitting the plan", "Adjusting bookings", "Updating the itinerary", "Notifying the group chat"];

export default function PersonaGroup() {
  const {
    personaStep,
    setPersonaStep,
    setPersonaStage,
    trip,
    traveller,
    createTrip,
    mutateTrip,
    recoverySelection,
    selectRecoveryOption,
    groupVoteFinalized,
    finalizeGroupVote,
    addInspectorEntry,
  } = useDemoStoreShim();
  const step = personaStep;
  const [exploredId, setExploredId] = useState<string | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [approved, setApproved] = useState(false);
  const { isThinking, runWithThinking } = useThinking();
  const navigate = useNavigate();

  const explored = destinationOptions.group.find((d) => d.id === exploredId);
  const stayVote = explored ? groupStayVoteByDestination[explored.id] ?? [] : [];
  const splitEvent = explored ? groupSplitEventByDestination[explored.id] : null;
  const option = splitEvent?.options.find((o) => o.id === recoverySelection) ?? null;

  useEffect(() => {
    if (step === 0) return;
    const stage = step <= 2 ? "discovery" : step <= 4 ? "curation" : step === 5 ? "booking" : "intrip";
    setPersonaStage("group", stage);
    addInspectorEntry("group", {
      capability:
        step === 1
          ? "Natural language parsed into structured group intent"
          : step === 2
            ? "4 friends' preferences aggregated into one profile"
            : step === 3
              ? "Destinations ranked by group-fit across all 4 budgets"
              : step === 4
                ? "Group vote run to resolve the stay conflict"
                : step === 5
                  ? "Trip booked — cost split 4 ways automatically"
                  : step === 6
                    ? "Proactively detected the group's plans diverging"
                    : step === 7
                      ? "Two split-plan options generated, no one left out"
                      : step === 8
                        ? "Guardrail checks run before confirming the split"
                        : step === 9
                          ? "Change executed across bookings + group notified"
                          : "Trip fully updated end to end",
      backendAction:
        step === 1
          ? "NLU: extracting group size, budget range, priorities"
          : step === 2
            ? "Merging 4 traveller-preference records"
            : step === 3
              ? "Ranking destination inventory against merged preferences"
              : step === 4
                ? "Tallying group chat votes on stay options"
                : step === 5
                  ? "Writing shared booking + split-cost record"
                  : step === 6
                    ? "Cross-checking tonight's plans against shared itinerary"
                    : step === 7
                      ? "Generating split-plan options within shared budget"
                      : step === 8
                        ? "Validating against spend limit + refundable-only rule"
                        : step === 9
                          ? "Mutating bookings + itinerary, notifying group chat"
                          : "Sync complete",
      scenarioName: `Group Curation · ${persona.languageLabel}`,
      scenarioTag: "GROUP",
      userState: trip ? `Day ${trip.dayNumber} · ${trip.liveContext.city} · 4 friends travelling` : "No active trip — reconciling group input",
      contextUsed: step < 6 ? ["4 friends' preferences", "Mixed budgets", "Group vote"] : ["Split intent", "Shared budget", "Group chat"],
      intent: step < 6 ? "Reconcile 4 different preferences and budgets into one bookable trip." : "Resolve tonight's conflicting plans without anyone losing out.",
      generatedUI:
        step === 1 ? "Intent Summary Card" : step === 2 ? "Group Preference Panel + Destination Grid" : step === 3 ? "Group Vote Card" : step === 6 ? "Dependency Graph" : step === 7 ? "Recovery Options" : "—",
      action: step >= 8 ? "Apply split-group plan" : step >= 5 ? "Trip created, monitoring group plans" : "Aggregating group preferences",
      stateChange: step >= 9 ? "Booking + itinerary updated" : step === 5 ? "New persistent trip created" : "No state change yet",
      valueDemonstrated: ["Aggregates multiple travellers' input", "Reconciles conflict via voting, not guessing", "Every destination option is a real, bookable path"],
      whyMMT: "One shared booking, split cost, and live coordination across every traveller in the group.",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, trip, recoverySelection]);

  function goto(next: number) {
    setPersonaStep("group", next);
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

  function handleFinalizeVote(stayId: string) {
    finalizeGroupVote(stayId);
    goto(4);
  }

  function handleCreateTrip() {
    if (!explored) return;
    createTrip("group", explored);
    goto(5);
  }

  function handleApplyOption(id: string) {
    selectRecoveryOption("group", id);
    goto(8);
  }

  function handleApprove() {
    mutateTrip("group", (t) => {
      const chosen = splitEvent?.options.find((o) => o.id === recoverySelection);
      if (!chosen) return t;
      const bookings = t.bookings.map((b) =>
        chosen.affectedBookings.includes(b.id) ? { ...b, tag: chosen.preservesOriginal ? "Split plan applied" : "Plan moved earlier" } : b
      );
      const itinerary = t.itinerary.map((item) =>
        item.id === "it-g-d2-3"
          ? { ...item, title: chosen.preservesOriginal ? "Split: group plans diverge tonight" : "Everyone moves together", status: "moved" as const }
          : item
      );
      return { ...t, bookings, itinerary };
    });
    setApproved(true);
    goto(9);
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ConversationThread>
        {step >= 1 && <MyraBubble from="user">{persona.samplePrompt}</MyraBubble>}
        {step >= 1 && <MyraBubble>Got it — I'll pull in what everyone else told me too, not just your input.</MyraBubble>}

        {step >= 1 && (
          <GeneratedUIContainer>
            <IntentSummaryCard facts={intentFacts} onLooksRight={handleLooksRight} confirmed={step >= 2} />
          </GeneratedUIContainer>
        )}

        {step >= 2 && (
          <GeneratedUIContainer>
            <GroupPreferencePanel members={groupMembers} />
          </GeneratedUIContainer>
        )}

        {step >= 2 && <MyraBubble>Here are three destinations that fit — pick any of them to see the full plan.</MyraBubble>}

        {step >= 2 && (
          <GeneratedUIContainer delay={0.15}>
            <DestinationGrid options={destinationOptions.group} onExplore={handleExplore} />
          </GeneratedUIContainer>
        )}

        {step >= 3 && explored && stayVote.length > 0 && (
          <>
            <MyraBubble>I put two stay options to a vote in your group chat.</MyraBubble>
            <GeneratedUIContainer>
              <GroupVoteCard options={stayVote} onFinalize={handleFinalizeVote} finalized={groupVoteFinalized} />
            </GeneratedUIContainer>
          </>
        )}

        {step >= 4 && explored && (
          <GeneratedUIContainer>
            <Card>
              <SectionLabel>{explored.name} · 4-day plan, split cost</SectionLabel>
              <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
                <li>Day 1–2 — {stayVote[0]?.title ?? "First stay"}</li>
                <li>Day 3–4 — {stayVote[1]?.title ?? "Second stay"}</li>
              </ul>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--color-bg)] px-3 py-2 text-xs">
                <span className="text-[var(--color-slate)]">Per person (flights + stays, est.)</span>
                <span className="font-bold text-[var(--color-ink)]">₹{Math.round(explored.estCost * 0.62).toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                onClick={handleCreateTrip}
                disabled={step >= 5}
                className="mt-3 w-full rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white disabled:opacity-60"
              >
                {step >= 5 ? "Trip created" : `Create ${explored.name} Trip`}
              </button>
            </Card>
          </GeneratedUIContainer>
        )}

        {step >= 5 && (
          <>
            <GeneratedUIContainer>
              <TripCreatedCelebration title="Your Trip is Live!" subtitle={`${explored?.name} · 4 days · 4 travellers`} />
            </GeneratedUIContainer>
            <MyraBubble>Your trip is confirmed for all 4 of you, split evenly. I'll keep watching for plans that pull the group in different directions.</MyraBubble>
            {step === 5 && (
              <GeneratedUIContainer>
                <button
                  type="button"
                  onClick={() => goto(6)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2.5 text-xs font-bold text-[var(--color-ink)]"
                >
                  Continue — in-trip, Day 2 evening
                </button>
              </GeneratedUIContainer>
            )}
          </>
        )}

        {step >= 6 && splitEvent && <MyraBubble>Heads up — tonight's plans are splitting between the group.</MyraBubble>}

        {step >= 6 && splitEvent && (
          <GeneratedUIContainer>
            <DependencyGraph headline={splitEvent.headline} detail={splitEvent.detail} nodes={splitEvent.dependencyChain} />
          </GeneratedUIContainer>
        )}

        {step >= 7 && <MyraBubble from="user">what should we do?</MyraBubble>}
        {step >= 7 && <MyraBubble>Two ways to resolve this without anyone losing out on their plan.</MyraBubble>}

        {step >= 7 && splitEvent && (
          <GeneratedUIContainer>
            <RecoveryOptions options={splitEvent.options} onApply={handleApplyOption} onCompare={() => setShowCompare((v) => !v)} />
          </GeneratedUIContainer>
        )}

        {step >= 7 && showCompare && splitEvent && (
          <GeneratedUIContainer>
            <ComparisonMatrix options={splitEvent.options} />
          </GeneratedUIContainer>
        )}

        {step >= 8 && option && (
          <GeneratedUIContainer>
            <ApprovalSheet option={option} actions={actionsFor(option.id)} traveller={traveller} onApprove={handleApprove} onCancel={() => goto(7)} approved={approved} />
          </GeneratedUIContainer>
        )}

        {step >= 9 && (
          <GeneratedUIContainer>
            <ExecutionTracker steps={executionSteps} onComplete={() => goto(10)} done={step >= 10} onViewChanges={() => navigate("/bookings")} />
          </GeneratedUIContainer>
        )}

        {isThinking && <ThinkingBubble />}
      </ConversationThread>

      <ChatComposer
        prefill={step === 0 ? persona.samplePrompt : step === 6 ? "what should we do?" : ""}
        disabled={step !== 0 && step !== 6}
        onSend={step === 0 ? handleSend : () => runWithThinking(() => goto(7))}
      />
    </div>
  );
}

/** Thin adapter so this file reads cleanly against the shared demo store, scoped to the "group" persona. */
function useDemoStoreShim() {
  const store = useDemoStore();
  return {
    personaStep: store.personaStep.group,
    setPersonaStep: store.setPersonaStep,
    setPersonaStage: store.setPersonaStage,
    trip: store.trips.group,
    traveller: store.travellers.group,
    createTrip: store.createTrip,
    mutateTrip: store.mutateTrip,
    recoverySelection: store.recoverySelection.group,
    selectRecoveryOption: store.selectRecoveryOption,
    groupVoteFinalized: store.groupVoteFinalized,
    finalizeGroupVote: store.finalizeGroupVote,
    addInspectorEntry: store.addInspectorEntry,
  };
}
