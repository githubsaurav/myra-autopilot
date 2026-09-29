import type { PersonaId, TravellerProfile } from "@/types/demo";

/** Synthetic travellers — masked, never real PII. */
export const travellers: Record<PersonaId, TravellerProfile> = {
  family: {
    id: "traveller-aarav",
    displayName: "Aarav",
    travelPace: "balanced",
    foodPreferences: ["Vegetarian"],
    companionNeeds: ["Lower walking for parents"],
    interests: ["Culture", "Food", "Nature"],
    budgetPreference: "Value-conscious, modest convenience premium okay",
    autonomyMode: "approval",
    spendLimit: 2000,
    refundableOnly: true,
    memoryEnabled: true,
  },
  solo: {
    id: "traveller-meera",
    displayName: "Meera",
    travelPace: "relaxed",
    foodPreferences: ["Flexible, loves local food"],
    companionNeeds: ["Travelling solo — safety check-ins matter"],
    interests: ["Local culture", "Offbeat places", "Photography"],
    budgetPreference: "Mid-range, prioritises authentic experiences over comfort",
    autonomyMode: "bounded",
    spendLimit: 1500,
    refundableOnly: false,
    memoryEnabled: true,
  },
  group: {
    id: "traveller-zara",
    displayName: "Zara",
    travelPace: "packed",
    foodPreferences: ["Mixed group — no restrictions"],
    companionNeeds: ["Planning for 4 friends with different budgets"],
    interests: ["Nightlife", "Beaches", "Food"],
    budgetPreference: "Group split, ranges from tight to flexible per person",
    autonomyMode: "approval",
    spendLimit: 2500,
    refundableOnly: true,
    memoryEnabled: true,
  },
};

export const maskedIdentifiers = {
  phone: "******4321",
  paymentInstrument: "•••• 4821",
};

export const coTravellers: Record<PersonaId, string[]> = {
  family: ["Parent 1", "Parent 2"],
  solo: [],
  group: ["Priya", "Rohan", "Zoya"],
};
