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
import { RecommendationGrid } from "@/components/generative/RecommendationGrid";
import { TripCreatedCelebration } from "@/components/generative/TripCreatedCelebration";
import { Card, SectionLabel } from "@/components/Card";
import { destinationOptions, soloDependencyByDestination, soloHyperLocalOptionsByDestination } from "@/data/demoInventory";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";
import type { ContextualOption } from "@/types/demo";

const persona = personas.find((p) => p.id === "solo")!;

const intentFacts = [
  { label: "यात्री", value: "अकेले" },
  { label: "शैली", value: "दूर और ऑफबीट" },
  { label: "फोकस", value: "लोकल कल्चर, टूरिस्ट स्पॉट नहीं" },
  { label: "अवधि", value: "~7 दिन" },
  { label: "महीना", value: "नवंबर" },
  { label: "बजट", value: "मिड-रेंज" },
];

export default function PersonaSolo() {
  const { personaStep, setPersonaStep, setPersonaStage, trip, createTrip, addLearnedPreference, addInspectorEntry } = useDemoStoreShim();
  const step = personaStep;
  const [exploredId, setExploredId] = useState<string | null>(null);
  const [added, setAdded] = useState<ContextualOption | null>(null);
  const { isThinking, runWithThinking } = useThinking();
  const navigate = useNavigate();

  const explored = destinationOptions.solo.find((d) => d.id === exploredId);
  const dependency = explored ? soloDependencyByDestination[explored.id] : null;
  const hyperLocalOptions = explored ? soloHyperLocalOptionsByDestination[explored.id] ?? [] : [];

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
          ? "NLU: extracting solo/offbeat/duration/budget signals"
          : step === 2
            ? "Ranking destination inventory by crowd + culture fit"
            : step === 3
              ? "Assembling day-by-day itinerary + cost estimate"
              : step === 4
                ? "Writing booking + itinerary to trip state"
                : step === 5
                  ? "Polling local conditions feed for this destination"
                  : step === 6
                    ? "Matching today's free window to hyper-local inventory"
                    : "Appending itinerary item, syncing trip state",
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
    createTrip("solo", explored);
    addLearnedPreference("solo", "Prefers offbeat, low-crowd destinations over popular circuits");
    goto(4);
  }

  function handleAdd(option: ContextualOption) {
    setAdded(option);
    goto(7);
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ConversationThread>
        {step >= 1 && <MyraBubble from="user">{persona.samplePrompt}</MyraBubble>}
        {step >= 1 && <MyraBubble>समझ गई — मैं दूर, कम भीड़ वाली और असली लोकल कल्चर वाली जगहें ढूंढ रही हूं, टूरिस्ट लिस्ट नहीं।</MyraBubble>}

        {step >= 1 && (
          <GeneratedUIContainer>
            <IntentSummaryCard
              facts={intentFacts}
              onLooksRight={handleLooksRight}
              confirmed={step >= 2}
              labels={{ title: "समझी गई जानकारी", looksRight: "ठीक है", edit: "बदलें", confirmed: "पुष्टि हो गई" }}
            />
          </GeneratedUIContainer>
        )}

        {step >= 2 && <MyraBubble>ये तीन जगहें फिट बैठती हैं — कोई भी चुनकर पूरा प्लान देखें।</MyraBubble>}

        {step >= 2 && (
          <GeneratedUIContainer>
            <DestinationGrid options={destinationOptions.solo} onExplore={handleExplore} labels={{ recommended: "अनुशंसित", explore: "एक्सप्लोर करें" }} />
          </GeneratedUIContainer>
        )}

        {step >= 3 && explored && (
          <GeneratedUIContainer>
            <Card>
              <SectionLabel>{explored.name} · 5 दिन का प्लान</SectionLabel>
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
                onClick={handleCreateTrip}
                disabled={step >= 4}
                className="mt-3 w-full rounded-lg bg-[var(--color-red)] py-2.5 text-xs font-bold text-white disabled:opacity-60"
              >
                {step >= 4 ? "ट्रिप बन गई" : `${explored.name} ट्रिप बनाएं`}
              </button>
            </Card>
          </GeneratedUIContainer>
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

        {step >= 6 && <MyraBubble from="user">तो आज सुबह क्या कर सकते हैं?</MyraBubble>}
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

        {isThinking && <ThinkingBubble />}
      </ConversationThread>

      <ChatComposer
        prefill={step === 0 ? persona.samplePrompt : step === 5 ? "तो आज सुबह क्या कर सकते हैं?" : ""}
        disabled={step !== 0 && step !== 5}
        onSend={step === 0 ? handleSend : () => runWithThinking(() => goto(6))}
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
    addInspectorEntry: store.addInspectorEntry,
  };
}
