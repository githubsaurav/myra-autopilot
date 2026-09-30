import type { Dispatch, SetStateAction } from "react";
import { useDemoStore } from "@/state/useDemoStore";
import { answerTravelQuestion, type ChatExchange } from "@/lib/travelAssistant";
import { destinationOptions, soloHyperLocalOptionsByDestination } from "@/data/demoInventory";
import type { PersonaId } from "@/types/demo";

export function useTravelChat(id: PersonaId, defaultIntent: string, defaultFollowup: string) {
  const { conversations, updateConversation, trips, travellers, exploredDestinationId } = useDemoStore();
  const saved = conversations[id];
  const destination = destinationOptions[id].find(d => d.id === exploredDestinationId[id]);
  const replyTo = (text: string) => answerTravelQuestion(text, trips[id], travellers[id], id === "solo" && destination ? soloHyperLocalOptionsByDestination[destination.id] : []);
  const setNotes: Dispatch<SetStateAction<ChatExchange[]>> = update => updateConversation(id, c => ({ ...c, messages: typeof update === "function" ? update(c.messages) : update }));
  return {
    notes: saved.messages, setNotes, replyTo,
    sentIntent: saved.intent ?? defaultIntent,
    setSentIntent: (intent: string) => updateConversation(id, c => ({ ...c, intent })),
    sentMid: saved.followup ?? defaultFollowup,
    setSentMid: (followup: string) => updateConversation(id, c => ({ ...c, followup })),
  };
}
