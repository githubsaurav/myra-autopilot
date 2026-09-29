import type { DemoTrip, DestinationOption } from "@/types/demo";

interface FamilyBlueprint {
  airportCode: string;
  arrivalCity: string;
  hotelName: string;
  day5Sight: string;
  signatureActivity: string;
}

const familyBlueprints: Record<string, FamilyBlueprint> = {
  "dest-vietnam": {
    airportCode: "DAD",
    arrivalCity: "Da Nang",
    hotelName: "Da Nang Beach Resort",
    day5Sight: "Marble Mountains",
    signatureActivity: "Cham Island Boat Tour",
  },
  "dest-thailand": {
    airportCode: "HKT",
    arrivalCity: "Phuket",
    hotelName: "Patong Beach Resort",
    day5Sight: "Big Buddha Phuket",
    signatureActivity: "Phi Phi Island Boat Tour",
  },
  "dest-srilanka": {
    airportCode: "CMB",
    arrivalCity: "Galle",
    hotelName: "Galle Fort Boutique Hotel",
    day5Sight: "Galle Fort Ramparts",
    signatureActivity: "Pigeon Island Snorkeling Tour",
  },
};

/** Builds a full family trip for whichever destination the traveller explored — not just the recommended one. */
export function buildFamilyTrip(dest: DestinationOption): DemoTrip {
  const bp = familyBlueprints[dest.id] ?? familyBlueprints["dest-vietnam"];

  return {
    id: `trip-${dest.id}`,
    destination: dest.name,
    startDate: "12 Oct",
    endDate: "17 Oct",
    totalDays: 6,
    dayNumber: 5,
    travellers: 3,
    bookingId: "MMT-DEMO-4821",
    flightPnr: "DEMO7X",
    hotelConfirmation: "HTL-DEMO-91",
    bookings: [
      { id: "bk-flight", type: "flight", title: `Flight · BLR → ${bp.airportCode}`, meta: "PNR DEMO7X", date: "12 Oct", status: "confirmed", amount: Math.round(dest.estCost * 0.26), refundable: false },
      { id: "bk-hotel", type: "hotel", title: `Hotel · ${bp.hotelName}`, meta: "Confirmation HTL-DEMO-91", date: "12–17 Oct", status: "confirmed", amount: Math.round(dest.estCost * 0.36), refundable: true },
      { id: "bk-island", type: "activity", title: bp.signatureActivity, meta: "Day 6 · 09:00", date: "17 Oct", status: "confirmed", amount: Math.round(dest.estCost * 0.024), refundable: true },
      { id: "bk-transfer", type: "transfer", title: "Airport Transfer", meta: "Day 6 · 18:00", date: "17 Oct", status: "confirmed", amount: 900, refundable: true },
    ],
    itinerary: [
      { id: "it-d1-1", day: 1, time: "10:00", title: "Arrival + hotel check-in", status: "completed", category: "logistics" },
      { id: "it-d1-2", day: 1, time: "19:00", title: "Light dinner near hotel", status: "completed", category: "food" },
      { id: "it-d5-1", day: 5, time: "09:00", title: "Breakfast", status: "planned", category: "food" },
      { id: "it-d5-2", day: 5, time: "11:00", title: bp.day5Sight, status: "planned", category: "sightseeing", walkingLevel: "medium" },
      { id: "it-d5-3", day: 5, time: "18:00", title: "Free time", status: "planned", category: "free" },
      { id: "it-d6-1", day: 6, time: "09:00", title: bp.signatureActivity, status: "planned", category: "activity", detail: "Weather-dependent" },
      { id: "it-d6-2", day: 6, time: "18:00", title: "Airport transfer", status: "planned", category: "logistics" },
    ],
    liveContext: {
      city: bp.arrivalCity,
      currentTime: "6:00 PM",
      weather: "28°C, clear",
      fatigueLevel: "medium",
      freeTimeMinutes: 240,
      locationPermission: true,
    },
  };
}
