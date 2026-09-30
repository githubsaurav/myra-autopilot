import type { PersonaId, TravellerProfile } from "@/types/demo";

/**
 * Synthetic traveller — masked, never real PII. One MakeMyTrip account, "Aarav",
 * with three different trips in progress — the same identity every trip folder
 * belongs to, just different companions and context per trip.
 */
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
    id: "traveller-aarav",
    displayName: "Aarav",
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
    id: "traveller-aarav",
    displayName: "Aarav",
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
