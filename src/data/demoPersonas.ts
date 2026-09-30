import { Users, Compass, PartyPopper } from "lucide-react";
import type { JourneyStageMeta, PersonaMeta } from "@/types/demo";

/**
 * Three trip folders belonging to the same MakeMyTrip account — not three different
 * people. Each one activates a different facet of Myra: full-lifecycle planning +
 * in-trip assistance (family), hyper-local curation (solo), and group coordination.
 */
export const personas: PersonaMeta[] = [
  {
    id: "family",
    name: "Family Trip",
    tagline: "Planning with your parents",
    description: "Plan a trip with your parents and Myra handles the details — then stays with you when a live disruption hits in-trip.",
    capabilityBadge: "Trip Planning + In-Trip Assistance",
    language: "en",
    languageLabel: "English",
    samplePrompt: "Need to go somewhere with my parents for 5-6 days in October. Budget around 1.5L. International is fine but nothing visa-heavy, and vegetarian food needs to be easy to find.",
    icon: Users,
  },
  {
    id: "solo",
    name: "Solo Trip",
    tagline: "अकेले, दूर, हाइपर-लोकल",
    description: "Go somewhere off the beaten path, solo — Myra curates hyper-local experiences most guidebooks would never surface, in Hindi.",
    capabilityBadge: "Hyper-Local Curation",
    language: "hi",
    languageLabel: "हिन्दी",
    samplePrompt: "अकेले कहीं बिल्कुल ऑफबीट और दूर जाना है — लोकल कल्चर देखना है, टूरिस्ट वाली भीड़ नहीं। नवंबर में शायद एक हफ्ता।",
    icon: Compass,
  },
  {
    id: "group",
    name: "Group Trip",
    tagline: "Planning with friends",
    description: "Bring 3 friends into the plan — Myra reconciles everyone's budget and preferences into one itinerary, then keeps the group in sync in-trip.",
    capabilityBadge: "Group Curation + Live Coordination",
    language: "en",
    languageLabel: "English",
    samplePrompt: "Planning a trip with 3 friends, thinking Goa, sometime in December. We've all got pretty different budgets and vibes.",
    icon: PartyPopper,
  },
];

export const journeyStages: JourneyStageMeta[] = [
  { id: "discovery", label: "Discovery" },
  { id: "curation", label: "Curation" },
  { id: "booking", label: "Booking" },
  { id: "intrip", label: "In-Trip / Post-Trip" },
];
