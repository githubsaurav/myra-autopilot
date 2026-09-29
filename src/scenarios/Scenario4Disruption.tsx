import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyraBubble } from "@/components/MyraBubble";
import { ConversationThread } from "@/components/myra/ConversationThread";
import { ChatComposer } from "@/components/myra/ChatComposer";
import { GeneratedUIContainer, ThinkingBubble } from "@/components/myra/GeneratedUIContainer";
import { useThinking } from "@/components/myra/useThinking";
import { DependencyGraph } from "@/components/generative/DependencyGraph";
import { RecoveryOptions } from "@/components/generative/RecoveryOptions";
import { ComparisonMatrix } from "@/components/generative/ComparisonMatrix";
import { ApprovalSheet } from "@/components/generative/ApprovalSheet";
import { ExecutionTracker } from "@/components/generative/ExecutionTracker";
import { useDemoStore } from "@/state/useDemoStore";
import { useInspector } from "@/state/InspectorContext";
import { NoTripNotice } from "@/scenarios/NoTripNotice";

const PREFILL = "what should we do?";

const executionSteps = ["Moving activity", "Extending hotel", "Updating transfer", "Updating itinerary", "Notifying co-travellers"];

function actionsFor(optionId: "A" | "B") {
  return optionId === "A"
    ? ["Move island activity to Day 6", "Extend hotel by one night", "Shift airport transfer by 3 hours", "Update itinerary", "Notify co-travellers"]
    : ["Replace island activity with indoor local experience", "Notify co-travellers"];
}

export default function Scenario4Disruption() {
  const { trip, traveller, disruption, recoverySelectedOption, selectRecoveryOption, applyRecovery } = useDemoStore();
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [showCompare, setShowCompare] = useState(false);
  const [approved, setApproved] = useState(false);
  const { isThinking, runWithThinking } = useThinking();
  const { setSnapshot } = useInspector();
  const navigate = useNavigate();

  const option = disruption.options.find((o) => o.id === recoverySelectedOption) ?? null;

  useEffect(() => {
    setSnapshot({
      scenarioName: "04 · Typhoon recovery",
      scenarioTag: "ORCHESTRATE",
      userState: trip ? `Day ${trip.dayNumber} · typhoon warning received` : "No active trip",
      contextUsed: ["Weather", "Bookings", "Refund rules", "Companions", "Spend limit"],
      intent: "Resolve the disruption while respecting guardrails and preserving the experience.",
      generatedUI:
        step === 0 ? "Dependency graph" : step === 1 ? "Recovery option cards" : step === 2 ? "Approval sheet" : "Execution tracker",
      action: option ? `Apply: ${option.title}` : "Mapping impact across trip components",
      stateChange: step >= 3 ? "3 bookings + itinerary updated" : "No state change yet",
      valueDemonstrated: ["Information → orchestration → outcome"],
      whyMMT: "Can move from recommendation to execution across bookings.",
    });
  }, [step, option, trip, setSnapshot]);

  if (!trip) return <NoTripNotice />;

  function handleSend() {
    runWithThinking(() => setStep(1));
  }

  function handleApplyOption(id: "A" | "B") {
    selectRecoveryOption(id);
    setStep(2);
  }

  function handleApprove() {
    applyRecovery();
    setApproved(true);
    setStep(3);
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ConversationThread>
        <MyraBubble>Tomorrow's island activity is confirmed for 9 AM.</MyraBubble>

        <GeneratedUIContainer>
          <DependencyGraph headline={disruption.headline} detail={disruption.detail} nodes={disruption.dependencyChain} />
        </GeneratedUIContainer>

        <MyraBubble>I checked the rest of your trip. This affects more than the activity, so I mapped the impact before suggesting changes.</MyraBubble>

        {step >= 1 && <MyraBubble from="user">{PREFILL}</MyraBubble>}
        {step >= 1 && <MyraBubble>I found two workable recovery plans. Both respect your refundable-only preference.</MyraBubble>}

        {step >= 1 && (
          <GeneratedUIContainer>
            <RecoveryOptions options={disruption.options} onApply={handleApplyOption} onCompare={() => setShowCompare((v) => !v)} />
          </GeneratedUIContainer>
        )}

        {step >= 1 && showCompare && (
          <GeneratedUIContainer>
            <ComparisonMatrix options={disruption.options} />
          </GeneratedUIContainer>
        )}

        {step >= 2 && option && (
          <GeneratedUIContainer>
            <ApprovalSheet
              option={option}
              actions={actionsFor(option.id)}
              traveller={traveller}
              onApprove={handleApprove}
              onCancel={() => setStep(1)}
              approved={approved}
            />
          </GeneratedUIContainer>
        )}

        {step >= 3 && (
          <GeneratedUIContainer>
            <ExecutionTracker
              steps={executionSteps}
              onComplete={() => setStep(4)}
              done={step >= 4}
              onViewChanges={() => navigate("/bookings")}
            />
          </GeneratedUIContainer>
        )}

        {isThinking && <ThinkingBubble />}
      </ConversationThread>

      <ChatComposer prefill={step === 0 ? PREFILL : ""} disabled={step > 0} onSend={handleSend} />
    </div>
  );
}
