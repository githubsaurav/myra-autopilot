import type { DemoTrip, ItineraryItem } from "@/types/demo";

/** The Vietnam trip — created live in Scenario 1, then used by Scenarios 2–4. */
export const vietnamTrip: DemoTrip = {
  id: "trip-vietnam-6d",
  destination: "Vietnam",
  startDate: "12 Oct",
  endDate: "17 Oct",
  totalDays: 6,
  dayNumber: 2,
  travellers: 3,
  bookingId: "MMT-DEMO-4821",
  flightPnr: "DEMO7X",
  hotelConfirmation: "HTL-DEMO-91",
  bookings: [
    { id: "bk-flight", type: "flight", title: "Flight · BLR → DAD", meta: `PNR DEMO7X`, date: "12 Oct", status: "confirmed", amount: 34500, refundable: false },
    { id: "bk-hotel", type: "hotel", title: "Hotel · Da Nang Beach Resort", meta: `Confirmation HTL-DEMO-91`, date: "12–17 Oct", status: "confirmed", amount: 48000, refundable: true },
    { id: "bk-island", type: "activity", title: "Cham Island Boat Tour", meta: "Day 6 · 09:00", date: "17 Oct", status: "confirmed", amount: 3200, refundable: true },
    { id: "bk-transfer", type: "transfer", title: "Airport Transfer", meta: "Day 6 · 18:00", date: "17 Oct", status: "confirmed", amount: 900, refundable: true },
  ],
  itinerary: [
    { id: "it-d1-1", day: 1, time: "10:00", title: "Arrival + hotel check-in", status: "completed", category: "logistics" },
    { id: "it-d1-2", day: 1, time: "19:00", title: "Light dinner near hotel", status: "completed", category: "food" },
    { id: "it-d2-1", day: 2, time: "09:00", title: "Breakfast", status: "planned", category: "food" },
    { id: "it-d2-2", day: 2, time: "11:00", title: "Marble Mountains", status: "planned", category: "sightseeing", walkingLevel: "medium" },
    { id: "it-d2-3", day: 2, time: "14:00", title: "Rest at hotel", status: "planned", category: "rest" },
    { id: "it-d2-4", day: 2, time: "18:00", title: "Free time", status: "planned", category: "free" },
    { id: "it-d3-1", day: 3, time: "09:00", title: "Distant attraction (Ba Na Hills)", status: "planned", category: "sightseeing", walkingLevel: "high" },
    { id: "it-d3-2", day: 3, time: "12:30", title: "Lunch", status: "planned", category: "food" },
    { id: "it-d3-3", day: 3, time: "15:00", title: "Second attraction", status: "planned", category: "sightseeing", walkingLevel: "high" },
    { id: "it-d3-4", day: 3, time: "19:00", title: "Dinner", status: "planned", category: "food" },
    { id: "it-d6-1", day: 6, time: "09:00", title: "Cham Island Boat Tour", status: "planned", category: "activity", detail: "Weather-dependent" },
    { id: "it-d6-2", day: 6, time: "18:00", title: "Airport transfer", status: "planned", category: "logistics" },
  ],
  liveContext: {
    city: "Da Nang",
    currentTime: "6:00 PM",
    weather: "28°C, clear",
    fatigueLevel: "medium",
    freeTimeMinutes: 240,
    locationPermission: true,
  },
};

/** The heavier "before" plan for Day 3 — used by Scenario 3's Before/After view. */
export const day3Before: ItineraryItem[] = vietnamTrip.itinerary.filter((i) => i.day === 3);

/** The lighter "after" plan Myra proposes for Day 3. */
export const day3After: ItineraryItem[] = [
  { id: "it-d3-1", day: 3, time: "10:00", title: "Nearby cultural stop", status: "moved", category: "sightseeing", walkingLevel: "low" },
  { id: "it-d3-2", day: 3, time: "12:30", title: "Lunch", status: "planned", category: "food" },
  { id: "it-d3-3", day: 3, time: "15:00", title: "Rest at hotel", status: "new", category: "rest" },
  { id: "it-d3-5", day: 3, time: "18:00", title: "Local market + dinner", status: "new", category: "food" },
  { id: "it-d3-4b", day: 6, time: "15:30", title: "Ba Na Hills (moved from Day 3)", status: "moved", category: "sightseeing", walkingLevel: "high" },
];
