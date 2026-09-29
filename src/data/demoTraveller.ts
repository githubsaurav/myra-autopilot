import type { TravellerProfile } from "@/types/demo";

/** Synthetic traveller — masked, never real PII. */
export const defaultTraveller: TravellerProfile = {
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
};

export const maskedIdentifiers = {
  phone: "******4321",
  paymentInstrument: "•••• 4821",
};

export const coTravellers = ["Parent 1", "Parent 2"];
