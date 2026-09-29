import { Users, Compass, PartyPopper } from "lucide-react";
import type { JourneyStageMeta, PersonaMeta } from "@/types/demo";

export const personas: PersonaMeta[] = [
  {
    id: "family",
    name: "Family Trip",
    tagline: "Planning with parents",
    description: "Aarav plans a trip with his parents — Myra handles the planning, then a live weather disruption in-trip.",
    language: "en",
    languageLabel: "English",
    samplePrompt: "Need to go somewhere with my parents for 5-6 days in October. Budget around 1.5L. International is fine but nothing visa-heavy, and vegetarian food needs to be easy to find.",
    icon: Users,
  },
  {
    id: "solo",
    name: "Solo · Hyper-Local",
    tagline: "अकेले, दूर, एक यात्री",
    description: "Meera travels solo to a remote destination — Myra surfaces hyper-local experiences a guidebook wouldn't know, in Hindi.",
    language: "hi",
    languageLabel: "हिन्दी",
    samplePrompt: "अकेले कहीं बिल्कुल ऑफबीट और दूर जाना है — लोकल कल्चर देखना है, टूरिस्ट वाली भीड़ नहीं। नवंबर में शायद एक हफ्ता।",
    icon: Compass,
  },
  {
    id: "group",
    name: "Group Curation",
    tagline: "Friends planning together",
    description: "Zara plans a Goa trip with 3 friends — Myra reconciles everyone's budget and preferences into one itinerary.",
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
