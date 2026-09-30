import { useTravelChat } from "@/components/myra/useTravelChat";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyraBubble } from "@/components/MyraBubble";
import { ConversationThread } from "@/components/myra/ConversationThread";
import { ChatComposer } from "@/components/myra/ChatComposer";
import { ScenarioQuickActions } from "@/components/myra/ScenarioQuickActions";
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
import { BookingConsentSheet } from "@/components/generative/BookingConsentSheet";
import { Card, SectionLabel } from "@/components/Card";
import { destinationOptions, groupMembers, groupStayVoteByDestination, groupSplitEventByDestination } from "@/data/demoInventory";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";

const persona = personas.find((p) => p.id === "group")!;
const MID_PROMPT = "what should we do?";
const ESCALATE_USER_TEXT = "Can someone from your team help us directly?";
const ESCALATE_REPLY = "This demo can show the handoff, but it does not contact a real travel expert. In a live product, your trip context and this conversation would be shared with support.";

/** Shows a friend's own chat message (not the traveller's, not Myra's) — this is a group chat, not a 1:1. */
function MemberBubble({ name, initial, children }: { name: string; initial: string; children: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.08] text-[10px] font-bold text-[var(--color-ink)]">
        {initial}
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)]">
        <p className="mb-0.5 text-[10px] font-bold text-[var(--color-slate)]">{name}</p>
        {children}
      </div>
    </div>
  );
}

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
    exploredDestinationId,
    setExploredDestination,
    addInspectorEntry,
    resetPersona,
  } = useDemoStoreShim();
  const step = personaStep;
  const [showCompare, setShowCompare] = useState(false);
  const [approved, setApproved] = useState(false);
  const { sentIntent, setSentIntent, sentMid, setSentMid, notes, setNotes, replyTo } = useTravelChat("group", persona.samplePrompt, MID_PROMPT);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const { isThinking, thinkingLabel, runWithThinking, cancelThinking } = useThinking();
  const navigate = useNavigate();

  const explored = destinationOptions.group.find((d) => d.id === exploredDestinationId);
  const stayVote = explored ? groupStayVoteByDestination[explored.id] ?? [] : [];
  const splitEvent = explored ? groupSplitEventByDestination[explored.id] : null;
  const option = splitEvent?.options.find((o) => o.id === recoverySelection) ?? null;
  const perPersonAmount = explored ? Math.round(explored.estCost * 0.62) : 0;

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
          ? "Understanding the group's trip — size, budget range, what everyone cares about"
          : step === 2
            ? "Pulling together what all 4 of you want into one picture"
            : step === 3
              ? "Comparing destinations against everyone's budget and priorities"
              : step === 4
                ? "Counting the group's votes on where to stay"
                : step === 5
                  ? "Connecting with our suppliers to lock this in, split 4 ways"
                  : step === 6
                    ? "Noticing tonight's plans are pulling the group in different directions"
                    : step === 7
                      ? "Working out split-plan options that keep everyone's shared budget intact"
                      : step === 8
                        ? "Double-checking this stays within spend limit and refund rules before touching anything"
                        : step === 9
                          ? "Updating bookings and letting the whole group chat know"
                          : "Everything's back in sync",
      poweredBy:
        step === 1
          ? "OpenAI"
          : step === 3
            ? "Mastercard"
            : step === 7
              ? "OpenAI"
              : "Google Cloud",
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

  function handleLooksRight() {
    runWithThinking(() => goto(2), "Myra is pulling everyone's preferences together");
  }

  function handleExplore(id: string) {
    if (step >= 5 || isThinking) return;
    setExploredDestination("group", id);
    setAwaitingPayment(false);
    goto(3);
  }

  function handleFinalizeVote(stayId: string) {
    finalizeGroupVote(stayId);
    goto(4);
  }

  function handleRequestPayment() {
    setAwaitingPayment(true);
  }

  function handleApprovePayment() {
    if (!explored) return;
    setPaymentApproved(true);
    createTrip("group", explored);
    goto(5);
  }

  function handleApplyOption(id: string) {
    if (step >= 9) return;
    selectRecoveryOption("group", id);
    goto(8);
  }

  function handleApprove() {
    if (step >= 9) return;
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

  function handleComposerSend(text: string) {
    const answer = step === 0 ? null : replyTo(text);
    if (answer) {
      runWithThinking(() => setNotes(n => [...n, { id: crypto.randomUUID(), user: text, reply: answer, atStep: step }]), "Checking your trip details");
      return;
    }
    if (step === 0) {
      setSentIntent(text);
      runWithThinking(() => goto(1), "Myra is understanding the group's trip");
    } else if (step === 6) {
      setSentMid(text);
      runWithThinking(() => goto(7), "Myra is working out split-plan options");
    } else {
      const atStep = step;
      runWithThinking(() => setNotes((n) => [...n, { id: crypto.randomUUID(), user: text, reply: "I can help with your itinerary, budget, bookings, weather, and preferences in this guided demo. Try a suggested question below, or use a trip card to make a change.", atStep }]), "Myra is noting that down");
    }
  }

  function handleRestart() {
    cancelThinking();
    resetPersona("group");
    setShowCompare(false);
    setApproved(false);
    setSentIntent(persona.samplePrompt);
    setSentMid(MID_PROMPT);
    setNotes([]);
    setAwaitingPayment(false);
    setPaymentApproved(false);
  }

  function handleEscalate() {
    const atStep = step;
    runWithThinking(
      () => setNotes((n) => [...n, { id: crypto.randomUUID(), user: ESCALATE_USER_TEXT, reply: ESCALATE_REPLY, atStep }]),
      "Showing the support handoff"
    );
  }

  function renderNotes() {
    return notes
      .map((n) => (
        <Fragment key={n.id}>
          <MyraBubble from="user">{n.user}</MyraBubble>
          <MyraBubble>{n.reply}</MyraBubble>
        </Fragment>
      ));
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2">
        <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-slate)]">This trip:</span>
        <div className="flex items-center -space-x-1.5">
          {groupMembers.map((m) => (
            <span
              key={m.id}
              title={m.name}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-navy-soft)] text-[9px] font-bold text-[var(--color-navy)]"
            >
              {m.initial}
            </span>
          ))}
        </div>
        <span className="truncate text-[11px] font-semibold text-[var(--color-ink)]">
          {groupMembers.map((m) => m.name).join(", ")}
        </span>
      </div>
      <ConversationThread>

        {step >= 1 && <MyraBubble from="user">{sentIntent}</MyraBubble>}
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

        {step >= 2 && <MemberBubble name="Priya" initial="P">Let's keep the budget reasonable, I don't want anything too pricey 🙏</MemberBubble>}
        {step >= 2 && <MemberBubble name="Rohan" initial="R">I'm voting for wherever has the best nightlife tbh</MemberBubble>}

        {step >= 2 && <MyraBubble>Here are three destinations that fit — pick any of them to see the full plan.</MyraBubble>}

        {step >= 2 && (
          <GeneratedUIContainer delay={0.15}>
            <DestinationGrid options={destinationOptions.group} onExplore={handleExplore} disabled={isThinking || step >= 5} />
          </GeneratedUIContainer>
        )}


        {step >= 3 && explored && stayVote.length > 0 && (
          <>
            <MyraBubble>I put two stay options to a vote in your group chat.</MyraBubble>
            <GeneratedUIContainer>
              <GroupVoteCard options={stayVote} onFinalize={handleFinalizeVote} finalized={groupVoteFinalized} />
            </GeneratedUIContainer>
            <MemberBubble name="Zoya" initial="Zo">Just voted for the villa — closer to the beach clubs, works for me!</MemberBubble>
          </>
        )}


        {step >= 4 && explored && !awaitingPayment && (
          <GeneratedUIContainer>
            <Card>
              <SectionLabel>{explored.name} · 4-day plan, split cost</SectionLabel>
              <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
                <li>Day 1–2 — {stayVote[0]?.title ?? "First stay"}</li>
                <li>Day 3–4 — {stayVote[1]?.title ?? "Second stay"}</li>
              </ul>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--color-bg)] px-3 py-2 text-xs">
                <span className="text-[var(--color-slate)]">Per person (flights + stays, est.)</span>
                <span className="font-bold text-[var(--color-ink)]">₹{perPersonAmount.toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                onClick={handleRequestPayment}
                disabled={step >= 5}
                className="mt-3 w-full rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white disabled:opacity-60"
              >
                {step >= 5 ? "Trip created" : `Create ${explored.name} Trip`}
              </button>
            </Card>
          </GeneratedUIContainer>
        )}

        {step === 4 && explored && awaitingPayment && (
          <>
            <MyraBubble>
              I've locked this in with our flight & stay suppliers, split 4 ways. You're paying your share with your usual method — want to go ahead, or change it?
            </MyraBubble>
            <GeneratedUIContainer>
              <BookingConsentSheet
                destinationName={`${explored.name} (your share)`}
                amount={perPersonAmount}
                onApprove={handleApprovePayment}
                onCancel={() => setAwaitingPayment(false)}
                approved={paymentApproved}
              />
            </GeneratedUIContainer>
          </>
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

        {step >= 7 && <MyraBubble from="user">{sentMid}</MyraBubble>}
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
            <ApprovalSheet option={option} actions={actionsFor(option.id)} traveller={traveller} onApprove={handleApprove} onCancel={() => goto(7)} approved={approved || step >= 9} />
          </GeneratedUIContainer>
        )}


        {step >= 9 && (
          <GeneratedUIContainer>
            <ExecutionTracker steps={executionSteps} onComplete={() => goto(10)} done={step >= 10} onViewChanges={() => navigate("/bookings")} />
          </GeneratedUIContainer>
        )}


        {renderNotes()}
        {isThinking && <ThinkingBubble label={thinkingLabel} />}
      </ConversationThread>

      <ScenarioQuickActions onRestart={handleRestart} onEscalate={handleEscalate} />
      <ChatComposer
        prefill={step === 0 ? persona.samplePrompt : step === 6 ? MID_PROMPT : ""}
        disabled={isThinking}
        onSend={handleComposerSend}
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
    exploredDestinationId: store.exploredDestinationId.group,
    setExploredDestination: store.setExploredDestination,
    addInspectorEntry: store.addInspectorEntry,
    resetPersona: store.resetPersona,
  };
}
