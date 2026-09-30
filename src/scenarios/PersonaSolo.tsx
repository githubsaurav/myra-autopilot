import { chooseLocalExperience } from "@/lib/travelAssistant";
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
import { DependencyGraph } from "@/components/generative/DependencyGraph";
import { RecommendationGrid } from "@/components/generative/RecommendationGrid";
import { TripCreatedCelebration } from "@/components/generative/TripCreatedCelebration";
import { BookingConsentSheet } from "@/components/generative/BookingConsentSheet";
import { Card, SectionLabel } from "@/components/Card";
import { destinationOptions, soloDependencyByDestination, soloHyperLocalOptionsByDestination } from "@/data/demoInventory";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";
import type { ContextualOption } from "@/types/demo";

const persona = personas.find((p) => p.id === "solo")!;
const MID_PROMPT = "तो आज सुबह क्या कर सकते हैं?";
const ESCALATE_USER_TEXT = "क्या आपकी टीम से कोई सीधे मदद कर सकता है?";
const ESCALATE_REPLY = "यह सिर्फ सपोर्ट हैंडऑफ़ का डेमो है। किसी वास्तविक ट्रैवल एक्सपर्ट से संपर्क नहीं होता। लाइव प्रोडक्ट में आपका यात्रा संदर्भ और बातचीत सपोर्ट टीम को भेजी जाएगी।";

const intentFacts = [
  { label: "यात्री", value: "अकेले" },
  { label: "शैली", value: "दूर और ऑफबीट" },
  { label: "फोकस", value: "लोकल कल्चर, टूरिस्ट स्पॉट नहीं" },
  { label: "अवधि", value: "~7 दिन" },
  { label: "महीना", value: "नवंबर" },
  { label: "बजट", value: "मिड-रेंज" },
];

export default function PersonaSolo() {
  const {
    personaStep,
    setPersonaStep,
    setPersonaStage,
    trip,
    createTrip,
    addLearnedPreference,
    exploredDestinationId,
    setExploredDestination,
    addInspectorEntry,
    resetPersona,
  } = useDemoStoreShim();
  const [activityFeedback, setActivityFeedback] = useState("");
  const step = personaStep;
  const { mutateTrip } = useDemoStore();

  const { sentIntent, setSentIntent, sentMid, setSentMid, notes, setNotes, replyTo } = useTravelChat("solo", persona.samplePrompt, MID_PROMPT);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const { isThinking, thinkingLabel, runWithThinking, cancelThinking } = useThinking();
  const navigate = useNavigate();

  const explored = destinationOptions.solo.find((d) => d.id === exploredDestinationId);
  const dependency = explored ? soloDependencyByDestination[explored.id] : null;
  const hyperLocalOptions = explored ? soloHyperLocalOptionsByDestination[explored.id] ?? [] : [];

  const added = hyperLocalOptions.find(o => trip?.itinerary.some(i => i.id === `myra-local-${o.id}`)) ?? null;

  useEffect(() => {
    if (step === 0) return;
    const stage = step <= 2 ? "discovery" : step === 3 ? "curation" : step === 4 ? "booking" : "intrip";
    setPersonaStage("solo", stage);
    addInspectorEntry("solo", {
      capability:
        step === 1
          ? "Natural language parsed into structured intent, in Hindi"
          : step === 2
            ? "Offbeat destinations ranked by crowd level & culture depth"
            : step === 3
              ? "Full itinerary generated for the chosen destination"
              : step === 4
                ? "Trip booked — Myra now senses local conditions live"
                : step === 5
                  ? "Local condition shift detected — plan reopened automatically"
                  : step === 6
                    ? "Hyper-local options surfaced — not generic tourist picks"
                    : "Itinerary updated with a genuinely local experience",
      backendAction:
        step === 1
          ? "Understanding what kind of solo trip you want — offbeat, low-crowd, real local culture"
          : step === 2
            ? "Ranking offbeat places by how quiet and culturally deep they are"
            : step === 3
              ? "Curating hyper-local finds and building your day-by-day plan"
              : step === 4
                ? "Connecting with our local suppliers to lock this in"
                : step === 5
                  ? "Checking real-time local conditions at your destination"
                  : step === 6
                    ? "Matching this morning's free window to what's genuinely available nearby"
                    : "Adding this to your plan and syncing everything",
      poweredBy:
        step === 1
          ? "OpenAI"
          : step === 3
            ? "Mastercard"
            : step === 6
              ? "Mastercard"
              : "Google Cloud",
      scenarioName: `Solo · Hyper-Local · ${persona.languageLabel}`,
      scenarioTag: "SOLO",
      userState: trip ? `Day ${trip.dayNumber} · ${trip.liveContext.city} · travelling solo` : "No active trip — planning stage",
      contextUsed: step < 5 ? ["Solo", "Offbeat preference", "Duration", "Budget"] : ["Local conditions", "Weather", "Local availability"],
      intent: step < 5 ? "Remote, culturally immersive solo trip, not a typical tourist circuit." : "Surface what's genuinely doable nearby right now.",
      generatedUI: step === 1 ? "Intent Summary Card" : step === 2 ? "Destination Grid" : step === 5 ? "Dependency Graph" : step === 6 ? "Recommendation Grid" : "—",
      action: added ? `Add "${added.title}" to today` : step >= 4 ? "Trip created, sensing local conditions" : "Structuring natural-language intent",
      stateChange: added ? "1 itinerary item added" : step === 4 ? "New persistent trip created" : "No state change yet",
      valueDemonstrated: ["Conversation in the traveller's own language", "Hyper-local knowledge, not generic search", "Every destination option is a real, bookable path"],
      whyMMT: "Local inventory + live conditions let Myra recommend what's actually possible today.",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, trip, added]);

  function goto(next: number) {
    setPersonaStep("solo", next);
  }

  function handleLooksRight() {
    runWithThinking(() => goto(2), "मैं आपके लिए जगहें क्यूरेट कर रही हूं");
  }

  function handleExplore(id: string) {
    if (step >= 4 || isThinking) return;
    setExploredDestination("solo", id);
    setAwaitingPayment(false);
    runWithThinking(
      () =>
        runWithThinking(
          () =>
            runWithThinking(() => goto(3), "यहां के खास लोकल व्यंजन भी ढूंढ रही हूं..."),
          "ठहरने के अच्छे होमस्टे क्यूरेट कर रही हूं..."
        ),
      "इस जगह के बारे में पूरी जानकारी जुटा रही हूं..."
    );
  }

  function handleRequestPayment() {
    setAwaitingPayment(true);
  }

  function handleApprovePayment() {
    if (!explored) return;
    setPaymentApproved(true);
    createTrip("solo", explored);
    addLearnedPreference("solo", "Prefers offbeat, low-crowd destinations over popular circuits");
    goto(4);
  }

  function handleAdd(option: ContextualOption) {
    if (!trip || !option.availableNow) return;
    const next = chooseLocalExperience(trip, option);
    setActivityFeedback(next === trip ? "There is no free activity slot to replace today." : "Activity added to your itinerary. Open Itinerary to see the update.");
    mutateTrip("solo", t => chooseLocalExperience(t, option));
    goto(7);
  }

  function handleComposerSend(text: string) {
    const isJourneyPrompt = step === 5 && text.trim() === MID_PROMPT;
    const answer = step === 0 || isJourneyPrompt ? null : replyTo(text);
    if (answer) {
      runWithThinking(() => setNotes(n => [...n, { id: crypto.randomUUID(), user: text, reply: answer, atStep: step }]), "Checking your trip details");
      return;
    }
    if (step === 0) {
      setSentIntent(text);
      runWithThinking(() => goto(1), "मैं आपकी बात समझ रही हूं");
    } else if (step === 5) {
      setSentMid(text);
      runWithThinking(() => goto(6), "मैं आस-पास के विकल्प ढूंढ रही हूं");
    } else {
      const atStep = step;
      runWithThinking(() => setNotes((n) => [...n, { id: crypto.randomUUID(), user: text, reply: "I can help with your itinerary, budget, bookings, weather, and preferences in this guided demo. Try a suggested question below, or use a trip card to make a change.", atStep }]), "नोट कर रही हूं");
    }
  }

  function handleRestart() {
    cancelThinking();
    setActivityFeedback("");
    resetPersona("solo");
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
      "सपोर्ट हैंडऑफ़ का डेमो"
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
      <ConversationThread>

        {step >= 1 && <MyraBubble from="user">{sentIntent}</MyraBubble>}
        {step >= 1 && <MyraBubble>समझ गई — मैं दूर, कम भीड़ वाली और असली लोकल कल्चर वाली जगहें ढूंढ रही हूं, टूरिस्ट लिस्ट नहीं।</MyraBubble>}

        {step >= 1 && (
          <GeneratedUIContainer>
            <IntentSummaryCard
              facts={intentFacts}
              onLooksRight={handleLooksRight}
              confirmed={step >= 2}
              labels={{ title: "समझी गई जानकारी", looksRight: "ठीक है", edit: "बदलें", confirmed: "पुष्टि हो गई", save: "बदलाव सहेजें", cancel: "रद्द करें" }}
            />
          </GeneratedUIContainer>
        )}


        {step >= 2 && (
          <MyraBubble>मैं आपके लिए सबसे ऑफबीट, कम भीड़ वाली और असली लोकल कल्चर वाली जगहें ढूंढ और क्यूरेट कर रही हूं...</MyraBubble>
        )}
        {step >= 2 && <MyraBubble>ये तीन जगहें फिट बैठती हैं — कोई भी चुनकर पूरा प्लान देखें।</MyraBubble>}

        {step >= 2 && (
          <GeneratedUIContainer>
            <DestinationGrid options={destinationOptions.solo} onExplore={handleExplore} disabled={isThinking || step >= 4} labels={{ recommended: "अनुशंसित", explore: "एक्सप्लोर करें" }} />
          </GeneratedUIContainer>
        )}


        {step >= 3 && explored && (
          <>
            <MyraBubble>यहां के बेहतरीन होमस्टे और ठहरने के विकल्प देख लिए हैं — लोकल परिवारों के साथ रहने का असली मौका।</MyraBubble>
            <MyraBubble>यहां के खास लोकल व्यंजन भी नोट कर लिए हैं — जो आपको किसी गाइडबुक में नहीं मिलेंगे।</MyraBubble>
            <MyraBubble>इस जगह के लिए मैंने कुछ हाइपरलोकल गहने भी क्यूरेट किए हैं — सिर्फ आम गाइडबुक सुझाव नहीं, प्लान में पहले से जोड़े हुए।</MyraBubble>
          </>
        )}

        {step >= 3 && explored && !awaitingPayment && (
          <GeneratedUIContainer>
            <Card>
              <SectionLabel>{explored.name} · 5 दिन का प्लान</SectionLabel>

              {hyperLocalOptions.length > 0 && (
                <div className="mb-3 rounded-lg bg-[var(--color-navy-soft)] p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-navy)]">क्यूरेटेड हाइपरलोकल गहने</p>
                  <ul className="mt-1 space-y-1">
                    {hyperLocalOptions.slice(0, 2).map((o) => (
                      <li key={o.id} className="text-xs text-[var(--color-ink)]">
                        • {o.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
                <li>दिन 1 — पहुंचना + होमस्टे चेक-इन</li>
                <li>दिन 2 — साइटसीइंग + सनसेट</li>
                <li>दिन 3 — फ्री, बिना तय प्लान — लोकल रफ्तार</li>
                <li>दिन 4 — क्राफ्ट गांव विज़िट</li>
                <li>दिन 5 — वापसी</li>
              </ul>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--color-bg)] px-3 py-2 text-xs">
                <span className="text-[var(--color-slate)]">फ्लाइट + ट्रांसपोर्ट + होमस्टे (अनुमानित)</span>
                <span className="font-bold text-[var(--color-ink)]">₹{explored.estCost.toLocaleString("en-IN")}</span>
              </div>
              <button
                type="button"
                onClick={handleRequestPayment}
                disabled={step >= 4}
                className="mt-3 w-full rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white disabled:opacity-60"
              >
                {step >= 4 ? "ट्रिप बन गई" : `${explored.name} ट्रिप बनाएं`}
              </button>
            </Card>
          </GeneratedUIContainer>
        )}

        {step === 3 && explored && awaitingPayment && (
          <>
            <MyraBubble>
              मैंने होमस्टे और लोकल सप्लायर से यह कीमत पक्की करवा ली है। आपका हमेशा वाला पेमेंट तरीका सेट है — आगे बढ़ें या बदलें?
            </MyraBubble>
          <GeneratedUIContainer>
            <BookingConsentSheet
              destinationName={explored.name}
              amount={explored.estCost}
              onApprove={handleApprovePayment}
              onCancel={() => setAwaitingPayment(false)}
              approved={paymentApproved}
              labels={{
                title: "पुष्टि करें और भुगतान करें",
                amountLabel: "कुल राशि",
                paymentMethod: "भुगतान का तरीका",
                guardrail1: "सिर्फ आपकी मंज़ूरी के बाद चार्ज होगा",
                guardrail2: "एयरलाइन/होटल पॉलिसी के अनुसार रिफंडेबल",
                approve: `भुगतान करें ₹${explored.estCost.toLocaleString("en-IN")}`,
                cancel: "रद्द करें",
                approved: "भुगतान स्वीकृत",
              }}
            />
          </GeneratedUIContainer>
          </>
        )}


        {step >= 4 && (
          <>
            <GeneratedUIContainer>
              <TripCreatedCelebration title="आपकी ट्रिप लाइव है!" subtitle={`${explored?.name} · 5 दिन`} />
            </GeneratedUIContainer>
            <MyraBubble>आपकी ट्रिप कन्फर्म हो गई है। मैं लोकल कंडीशन पर नज़र रखूंगी — यहां चीज़ें फिक्स क्लॉक पर नहीं चलतीं।</MyraBubble>
            {step === 4 && (
              <GeneratedUIContainer>
                <button
                  type="button"
                  onClick={() => goto(5)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2.5 text-xs font-bold text-[var(--color-ink)]"
                >
                  आगे बढ़ें — ट्रिप के दौरान, दिन 3
                </button>
              </GeneratedUIContainer>
            )}
          </>
        )}


        {step >= 5 && <MyraBubble>सुप्रभात। आज सुबह लोकल कंडीशन बदल गई है, तो आपका प्लान थोड़ा खुला है।</MyraBubble>}

        {step >= 5 && dependency && (
          <GeneratedUIContainer>
            <DependencyGraph headline={dependency.headline} detail={dependency.detail} nodes={dependency.nodes} />
          </GeneratedUIContainer>
        )}

        {step >= 5 && <MyraBubble>मैंने चेक किया कि आइलैंड पर आज सुबह असल में क्या मुमकिन है — सिर्फ आम टूरिस्ट सुझाव नहीं।</MyraBubble>}

        {step >= 6 && <MyraBubble from="user">{sentMid}</MyraBubble>}
        {step >= 6 && <MyraBubble>अभी तीन चीज़ें आपके लिए खुली हैं — ये बहुत हद तक सिर्फ आज के लिए हैं।</MyraBubble>}

        {step >= 6 && (
          <GeneratedUIContainer>
            <RecommendationGrid options={hyperLocalOptions} onAdd={handleAdd} addedId={added?.id ?? null} addedLabel="आज के प्लान में जोड़ा गया" />
          </GeneratedUIContainer>
        )}


        {step >= 7 && added && (
          <GeneratedUIContainer>
            <button
              type="button"
              onClick={() => navigate("/trip")}
              className="w-full rounded-lg bg-[var(--color-navy)] py-2.5 text-xs font-bold text-white"
            >
              मेरी ट्रिप देखें
            </button>
          </GeneratedUIContainer>
        )}


        {activityFeedback && <p role="status" className="activity-feedback">{activityFeedback}</p>}
        {renderNotes()}
        {isThinking && <ThinkingBubble label={thinkingLabel} />}
      </ConversationThread>

      <ScenarioQuickActions
        onRestart={handleRestart}
        onEscalate={handleEscalate}
        labels={{ restart: "यह सिनेरियो दोबारा शुरू करें", escalate: "सपोर्ट डेमो" }}
      />
      <ChatComposer
        prefill={step === 0 ? persona.samplePrompt : step === 5 ? MID_PROMPT : ""}
        disabled={isThinking}
        onSend={handleComposerSend}
      />
    </div>
  );
}

/** Thin adapter so this file reads cleanly against the shared demo store, scoped to the "solo" persona. */
function useDemoStoreShim() {
  const store = useDemoStore();
  return {
    personaStep: store.personaStep.solo,
    setPersonaStep: store.setPersonaStep,
    setPersonaStage: store.setPersonaStage,
    trip: store.trips.solo,
    createTrip: store.createTrip,
    addLearnedPreference: store.addLearnedPreference,
    exploredDestinationId: store.exploredDestinationId.solo,
    setExploredDestination: store.setExploredDestination,
    addInspectorEntry: store.addInspectorEntry,
    resetPersona: store.resetPersona,
  };
}
