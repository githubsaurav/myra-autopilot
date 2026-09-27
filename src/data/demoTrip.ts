import type { ItineraryItem, Trip } from "@/types/travel";
import { maskedIdentifiers } from "@/data/demoTraveller";

export const defaultTrip: Trip = {
  id: "trip-vietnam-6d",
  destination: "Vietnam",
  startDate: "12 Mar",
  endDate: "17 Mar",
  totalDays: 6,
  dayNumber: 5,
  travellers: 3,
  bookings: [
    { id: "bk-flight", type: "flight", title: "Flight · BLR → DAD", meta: `PNR ${maskedIdentifiers.flightPnr}`, status: "confirmed", refundable: false, amount: 34500 },
    { id: "bk-hotel", type: "hotel", title: "Hotel · Da Nang Beach Resort", meta: `Confirmation ${maskedIdentifiers.hotelConfirmation}`, status: "confirmed", refundable: true, amount: 28000 },
    { id: "bk-island", type: "activity", title: "Cham Island Boat Tour", meta: "Day 6 · 09:00", status: "confirmed", refundable: true, amount: 3200 },
    { id: "bk-transfer", type: "transfer", title: "Airport Transfer", meta: "Day 6 · 18:00", status: "confirmed", refundable: true, amount: 900 },
  ],
  itinerary: [
    { id: "it-1", day: 5, time: "09:00", title: "Breakfast" },
    { id: "it-2", day: 5, time: "11:00", title: "Marble Mountains" },
    { id: "it-3", day: 5, time: "14:00", title: "Rest" },
    { id: "it-4", day: 5, time: "18:00", title: "Free time" },
    { id: "it-5", day: 5, time: "20:00", title: "Dinner" },
    { id: "it-6", day: 6, time: "09:00", title: "Cham Island Boat Tour", detail: "Weather-dependent" },
    { id: "it-7", day: 6, time: "18:00", title: "Airport transfer" },
  ],
  liveContext: {
    currentLocation: "Da Nang",
    weather: "28°C, partly cloudy",
    fatigueLevel: "medium",
    freeTimeMinutes: 240,
    todaySpend: 1450,
  },
};

/** The original, more strenuous Day 5 plan — shown as "Before" on the Adapt screen. */
export const originalDay5: ItineraryItem[] = defaultTrip.itinerary.filter((i) => i.day === 5);

/** The lighter Day 5 plan Myra proposes on the Adapt screen. */
export const adaptedDay5: ItineraryItem[] = [
  { id: "it-1", day: 5, time: "10:00", title: "Nearby cultural stop", tag: "updated" },
  { id: "it-2", day: 5, time: "12:30", title: "Lunch" },
  { id: "it-3", day: 5, time: "15:00", title: "Rest" },
  { id: "it-4", day: 5, time: "18:00", title: "Local market + dinner", tag: "new" },
];
