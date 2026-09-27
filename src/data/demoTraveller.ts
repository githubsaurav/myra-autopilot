import type { TravellerProfile } from "@/types/travel";

/** Synthetic traveller — masked, never real PII. */
export const defaultTraveller: TravellerProfile = {
  id: "traveller-aarav",
  displayName: "Aarav",
  travelPace: "balanced",
  foodPreferences: [],
  interests: [],
  companionNeeds: [],
  autonomyMode: "approval",
  spendLimit: 2000,
  refundableOnly: true,
  useLocation: true,
  disruptionAlerts: true,
  rememberPreferences: true,
  escalateOnLowConfidence: true,
};

export const coTravellers = ["Parent 1", "Parent 2"];

export const maskedIdentifiers = {
  phone: "******4321",
  bookingId: "MMT-DEMO-4821",
  flightPnr: "DEMO7X",
  hotelConfirmation: "HTL-DEMO-91",
  paymentInstrument: "•••• 4821",
};
