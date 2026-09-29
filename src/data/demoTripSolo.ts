import type { BookingType, DemoTrip, DestinationOption } from "@/types/demo";

interface SoloBlueprint {
  airportCode: string;
  arrivalCity: string;
  homestayName: string;
  transportType: BookingType;
  transportTitle: string;
  day1TransportTitle: string;
  day2Sight: string;
  sunsetSpot: string;
  craftVillage: string;
}

const soloBlueprints: Record<string, SoloBlueprint> = {
  "dest-majuli": {
    airportCode: "JRH",
    arrivalCity: "Majuli Island",
    homestayName: "Kamalabari Village Homestay",
    transportType: "ferry",
    transportTitle: "Ferry · Nimatighat → Majuli",
    day1TransportTitle: "Ferry to Majuli",
    day2Sight: "Auniati Satra visit",
    sunsetSpot: "Sunset by the Subansiri river",
    craftVillage: "Bamboo craft village",
  },
  "dest-spiti": {
    airportCode: "KUU",
    arrivalCity: "Kaza",
    homestayName: "Kaza Homestay",
    transportType: "transfer",
    transportTitle: "Shared taxi · Kullu → Kaza",
    day1TransportTitle: "Overland drive to Kaza",
    day2Sight: "Key Monastery visit",
    sunsetSpot: "Sunset at the Kaza valley viewpoint",
    craftVillage: "Langza fossil village",
  },
  "dest-ziro": {
    airportCode: "GAU",
    arrivalCity: "Ziro Valley",
    homestayName: "Hong Village Homestay",
    transportType: "transfer",
    transportTitle: "Shared taxi · Guwahati → Ziro",
    day1TransportTitle: "Overland drive to Ziro",
    day2Sight: "Talley Valley viewpoint",
    sunsetSpot: "Ziro paddy fields at dusk",
    craftVillage: "Hong Village bamboo craft",
  },
};

/** Builds a full solo trip for whichever destination the traveller explored — not just the recommended one. */
export function buildSoloTrip(dest: DestinationOption): DemoTrip {
  const bp = soloBlueprints[dest.id] ?? soloBlueprints["dest-majuli"];

  return {
    id: `trip-${dest.id}`,
    destination: dest.name,
    startDate: "8 Nov",
    endDate: "12 Nov",
    totalDays: 5,
    dayNumber: 3,
    travellers: 1,
    bookingId: "MMT-DEMO-6630",
    flightPnr: "DEMO3J",
    hotelConfirmation: "HTL-DEMO-58",
    bookings: [
      { id: "bk-s-flight", type: "flight", title: `Flight · BLR → ${bp.airportCode}`, meta: "PNR DEMO3J", date: "8 Nov", status: "confirmed", amount: Math.round(dest.estCost * 0.5), refundable: true },
      { id: "bk-s-ferry", type: bp.transportType, title: bp.transportTitle, meta: "Departs 09:30", date: "8 Nov", status: "confirmed", amount: Math.round(dest.estCost * 0.02), refundable: false },
      { id: "bk-s-homestay", type: "hotel", title: `Homestay · ${bp.homestayName}`, meta: "Confirmation HTL-DEMO-58", date: "8–12 Nov", status: "confirmed", amount: Math.round(dest.estCost * 0.27), refundable: true },
    ],
    itinerary: [
      { id: "it-s-d1-1", day: 1, time: "09:30", title: bp.day1TransportTitle, status: "completed", category: "logistics" },
      { id: "it-s-d1-2", day: 1, time: "16:00", title: "Homestay check-in + village walk", status: "completed", category: "sightseeing" },
      { id: "it-s-d2-1", day: 2, time: "08:00", title: bp.day2Sight, status: "completed", category: "sightseeing" },
      { id: "it-s-d2-2", day: 2, time: "17:00", title: bp.sunsetSpot, status: "completed", category: "sightseeing" },
      { id: "it-s-d3-1", day: 3, time: "08:00", title: "Breakfast at homestay", status: "planned", category: "food" },
      { id: "it-s-d3-2", day: 3, time: "10:00", title: "Free morning — no fixed plan", status: "planned", category: "free" },
      { id: "it-s-d4-1", day: 4, time: "09:00", title: bp.craftVillage, status: "planned", category: "sightseeing" },
      { id: "it-s-d5-1", day: 5, time: "08:00", title: "Return transport", status: "planned", category: "logistics" },
      { id: "it-s-d5-2", day: 5, time: "12:00", title: `Flight · ${bp.airportCode} → BLR`, status: "planned", category: "logistics" },
    ],
    liveContext: {
      city: bp.arrivalCity,
      currentTime: "9:40 AM",
      weather: "24°C, hazy",
      weatherRisk: "Local conditions can shift plans day to day",
      fatigueLevel: "low",
      freeTimeMinutes: 360,
      locationPermission: true,
    },
  };
}
