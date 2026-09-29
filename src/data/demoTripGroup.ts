import type { DemoTrip, DestinationOption } from "@/types/demo";

interface GroupBlueprint {
  airportCode: string;
  phase1Location: string;
  phase1Evening: string;
  day2Activity1: string;
  day2Activity2: string;
  phase2Location: string;
  phase2Evening: string;
  villaName: string;
  resortName: string;
}

const groupBlueprints: Record<string, GroupBlueprint> = {
  "dest-goa": {
    airportCode: "GOI",
    phase1Location: "North Goa (Anjuna)",
    phase1Evening: "Beach club night, Anjuna",
    day2Activity1: "Water sports, Baga",
    day2Activity2: "Flea market, Anjuna",
    phase2Location: "South Goa (Palolem)",
    phase2Evening: "Palolem beach, low-key evening",
    villaName: "Villa · North Goa (Anjuna)",
    resortName: "Beach Resort · South Goa (Palolem)",
  },
  "dest-rishikesh": {
    airportCode: "DED",
    phase1Location: "Riverside camp, Rishikesh",
    phase1Evening: "Bonfire + live music night",
    day2Activity1: "White-water rafting, the Ganges",
    day2Activity2: "Laxman Jhula market walk",
    phase2Location: "Boutique cottage, Tapovan",
    phase2Evening: "Sunset yoga + quiet evening",
    villaName: "Riverside Camp · Rishikesh",
    resortName: "Boutique Cottage · Tapovan",
  },
  "dest-coorg": {
    airportCode: "IXE",
    phase1Location: "Plantation homestay, Madikeri",
    phase1Evening: "Bonfire + local dinner",
    day2Activity1: "Coffee plantation trek",
    day2Activity2: "Abbey Falls + spice market",
    phase2Location: "Spa resort, Kabini",
    phase2Evening: "Riverside relaxed evening",
    villaName: "Plantation Homestay · Madikeri",
    resortName: "Spa Resort · Kabini",
  },
};

/** Builds a full group trip for whichever destination the group explored — not just the recommended one. */
export function buildGroupTrip(dest: DestinationOption): DemoTrip {
  const bp = groupBlueprints[dest.id] ?? groupBlueprints["dest-goa"];

  return {
    id: `trip-${dest.id}`,
    destination: dest.name,
    startDate: "12 Dec",
    endDate: "15 Dec",
    totalDays: 4,
    dayNumber: 2,
    travellers: 4,
    bookingId: "MMT-DEMO-9014",
    flightPnr: "DEMO5G",
    hotelConfirmation: "HTL-DEMO-27",
    bookings: [
      { id: "bk-g-flight", type: "flight", title: `Flights · BLR → ${bp.airportCode} (4 travellers)`, meta: "PNR DEMO5G", date: "12 Dec", status: "confirmed", amount: Math.round(dest.estCost * 4 * 0.42), refundable: true },
      { id: "bk-g-villa", type: "hotel", title: bp.villaName, meta: "2 nights, split 4 ways", date: "12–14 Dec", status: "confirmed", amount: Math.round(dest.estCost * 4 * 0.3), refundable: true },
      { id: "bk-g-resort", type: "hotel", title: bp.resortName, meta: "2 nights, split 4 ways", date: "14–15 Dec", status: "confirmed", amount: Math.round(dest.estCost * 4 * 0.16), refundable: true },
    ],
    itinerary: [
      { id: "it-g-d1-1", day: 1, time: "12:00", title: `Arrival + check-in, ${bp.phase1Location}`, status: "completed", category: "logistics" },
      { id: "it-g-d1-2", day: 1, time: "20:00", title: bp.phase1Evening, status: "completed", category: "nightlife" },
      { id: "it-g-d2-1", day: 2, time: "10:00", title: bp.day2Activity1, status: "planned", category: "activity" },
      { id: "it-g-d2-2", day: 2, time: "14:00", title: bp.day2Activity2, status: "planned", category: "sightseeing" },
      { id: "it-g-d2-3", day: 2, time: "20:00", title: "Free evening — plan TBD", status: "planned", category: "free" },
      { id: "it-g-d3-1", day: 3, time: "11:00", title: `Transfer to ${bp.phase2Location}`, status: "planned", category: "logistics" },
      { id: "it-g-d3-2", day: 3, time: "16:00", title: bp.phase2Evening, status: "planned", category: "sightseeing" },
      { id: "it-g-d4-1", day: 4, time: "13:00", title: "Departure", status: "planned", category: "logistics" },
    ],
    liveContext: {
      city: bp.phase1Location,
      currentTime: "7:30 PM",
      weather: "29°C, clear",
      fatigueLevel: "low",
      freeTimeMinutes: 180,
      locationPermission: true,
    },
  };
}
