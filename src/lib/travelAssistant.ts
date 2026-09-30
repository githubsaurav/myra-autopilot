import type { ContextualOption, DemoTrip, TravellerProfile } from "../types/demo";

export interface ChatExchange { id: string; user: string; reply: string; atStep: number }
export interface SavedConversation { messages: ChatExchange[]; draft: string; intent: string | null; followup: string | null }
export const emptyConversation = (): SavedConversation => ({ messages: [], draft: "", intent: null, followup: null });

/** Deterministic answers from the current demo state; never implies a live API call. */
export function answerTravelQuestion(text: string, trip: DemoTrip | null, traveller: TravellerProfile, localOptions: ContextualOption[] = []): string | null {
  const query = text.toLowerCase();
  const hindi = /[\u0900-\u097f]/.test(text);
  if (/weather|rain|forecast|मौसम|बारिश/.test(query)) {
    if (!trip) return hindi ? "पहले एक जगह चुनें। फिर उसकी मौसम जानकारी देख सकते हैं।" : "Choose a destination first, then I can show the weather context for that trip.";
    return `${hindi ? "इस डेमो की मौसम जानकारी" : "Weather in this demo"}: ${trip.liveContext.city} — ${trip.liveContext.weather}. ${trip.liveContext.weatherRisk ?? ""}\n${hindi ? "यह लाइव मौसम पूर्वानुमान नहीं है। बदलाव के लिए ऊपर दिए गए विकल्प देखें।" : "This is sample trip context, not a live forecast. Review the suggested recovery options before changing a booking."}`;
  }
  if (/budget|cost|spend|price|बजट|खर्च|कीमत/.test(query)) {
    const total = trip?.bookings.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + b.amount, 0);
    return `${hindi ? "आपका बजट" : "Your budget preference"}: ${traveller.budgetPreference}.\n${hindi ? "अतिरिक्त खर्च की सीमा" : "Additional-spend limit"}: ₹${traveller.spendLimit.toLocaleString("en-IN")}.${total !== undefined ? `\n${hindi ? "मौजूदा बुकिंग का कुल मूल्य" : "Current listed booking total"}: ₹${total.toLocaleString("en-IN")}.` : ""}\n${hindi ? "बजट और अनुमति बदलने के लिए Profile खोलें।" : "You can adjust your spending limit and approval settings in Profile."}`;
  }
  if (/itinerary|today|schedule|plan today|आज|कार्यक्रम/.test(query)) {
    if (!trip) return hindi ? "अभी ट्रिप बुक नहीं हुई है। ऊपर किसी जगह का प्लान खोलें।" : "Your trip isn’t booked yet. Explore a destination above to review its itinerary before booking.";
    const today = trip.itinerary.filter(item => item.day === trip.dayNumber && !item.struckThrough);
    return `${hindi ? "आज का प्लान" : "Your plan today"} · ${trip.destination} · Day ${trip.dayNumber}\n${today.length ? today.map(i => `${i.time} — ${i.title}`).join("\n") : (hindi ? "आज कोई गतिविधि तय नहीं है।" : "Nothing scheduled for today yet.")}\n${hindi ? "पूरा कार्यक्रम Plan में देखें।" : "Open Plan to see the full itinerary."}`;
  }
  if (/booking|ticket|flight|hotel|बुकिंग|टिकट/.test(query)) {
    if (!trip) return hindi ? "अभी कोई बुकिंग नहीं है। जगह चुनकर डेमो बुकिंग की पुष्टि करें।" : "No bookings yet for this journey. Choose a destination and review the demo booking approval first.";
    return `${hindi ? "आपकी बुकिंग" : "Your bookings"} · ${trip.destination}\n${trip.bookings.map(b => `${b.title} — ${b.status}${b.tag ? ` · ${b.tag}` : ""}`).join("\n")}\n${hindi ? "विवरण Bookings में देखें।" : "Open Bookings for the details. These are simulated bookings."}`;
  }
  if (/food|vegetarian|dinner|lunch|खाना|भोजन/.test(query)) {
    return `${hindi ? "आपकी भोजन पसंद" : "Your food preferences"}: ${traveller.foodPreferences.join(", ") || (hindi ? "अभी सेव नहीं हैं" : "none saved yet")}.\n${hindi ? "Profile में पसंद बदलें। ऊपर के विकल्पों से भोजन या स्थानीय अनुभव चुनें; इस डेमो में लाइव रेस्तरां उपलब्धता नहीं है।" : "Update preferences in Profile, or choose from the local experiences above. This demo doesn’t check live restaurant availability."}`;
  }
  if (/local|experience|culture|लोकल|स्थानीय|अनुभव/.test(query)) {
    if (!localOptions.length) return hindi ? "लोकल अनुभव देखने के लिए पहले एक जगह चुनें। फिर उसके क्यूरेटेड विकल्प दिखेंगे।" : "Choose a destination to see its curated local experiences. The solo journey includes local culture, food, and quieter alternatives.";
    return `${hindi ? "आपके लिए स्थानीय अनुभव" : "Local experiences selected for you"}\n${localOptions.map(o => `${o.title} · ₹${o.cost.toLocaleString("en-IN")} · ${o.durationHrs}h · ${o.walking} walking`).join("\n")}\n${hindi ? "नीचे या ऊपर के गतिविधि कार्ड से अपनी पसंद जोड़ें।" : "Use the activity cards to choose an experience for your trip."}`;
  }
  if (/help|what can|मदद/.test(query)) return hindi ? "मैं इस डेमो की यात्रा, बुकिंग, बजट, मौसम और स्थानीय अनुभव दिखा सकती हूं। किसी कार्ड का विकल्प चुनकर प्लान बदलें। वास्तविक भुगतान या बुकिंग नहीं होती।" : "I can explain your itinerary, bookings, budget, food preferences, and demo weather. Use the trip cards to compare options and approve changes. This is a guided prototype, so I can’t answer arbitrary questions or contact real suppliers.";
  return null;
}

/** Replace the free local-experience slot rather than silently duplicating an activity. */
export function chooseLocalExperience(trip: DemoTrip, option: ContextualOption): DemoTrip {
  if (!option.availableNow) return trip;
  const existing = trip.itinerary.find(i => i.id === `myra-local-${option.id}`);
  if (existing) return trip;
  const slot = trip.itinerary.find(i => i.day === trip.dayNumber && (i.category === "free" || i.category === "myra-local"));
  if (!slot) return trip;
  return { ...trip, itinerary: trip.itinerary.map(item => item.id !== slot.id ? item : {
    id: `myra-local-${option.id}`, day: trip.dayNumber, time: slot.time, title: option.title,
    category: "myra-local", status: "new", walkingLevel: option.walking, cost: option.cost,
    detail: `${option.durationHrs} hours · ${option.distanceMin} min away · Added by Myra`,
  }) };
}
