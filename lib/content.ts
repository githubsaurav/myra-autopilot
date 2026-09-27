/**
 * All copy for the Myra Travel Autopilot prototype, structured to match the
 * Slide 3 solution narrative: Entry & UX -> Autopilot Core -> AI Travel
 * Ecosystem -> Trust & Autonomy -> Evolution. Kept as data so the story can
 * be revised without touching component/layout code.
 */

export const hero = {
  eyebrow: "03 · Solution",
  title: "Myra Travel Autopilot",
  subtitle: "One intelligence layer that plans, adapts and acts across the trip",
  description:
    "Build on MMT's booking context, supplier network and transaction rails to move from fragmented assistance to a connected AI travel ecosystem.",
  tag: "KNOW → SENSE → DECIDE → ACT → LEARN",
};

export const entryFlow = [
  {
    step: "Plan with Myra",
    quote: "6 days in Vietnam with my parents, relaxed pace, vegetarian, ₹1.5L.",
    detail: "Myra plans with bookable MMT inventory.",
  },
  {
    step: "Booking confirmed",
    quote: null,
    detail: "The moment one component is booked, a persistent trip object is created automatically.",
  },
  {
    step: "Turn on Autopilot",
    quote: "Turn on Myra Autopilot for this trip?",
    detail: "This is the onboarding moment.",
  },
];

export const liveTrip = {
  title: "Vietnam · 6 Days · 3 Travellers",
  items: [
    { label: "Flight", done: true },
    { label: "Hotel", done: true },
    { label: "Activities", done: false },
    { label: "Transfers", done: false },
    { label: "Insurance", done: false },
    { label: "Trip preferences", done: false },
  ],
};

export const onboarding = {
  known: ["Dates", "Destination", "Bookings", "Travellers", "Transaction history"],
  learned: ["Travel pace", "Food preferences", "Interests", "Companion needs", "Budget flexibility", "Action permissions"],
  line: "Use known data first. Learn context progressively.",
};

export interface CustomerJob {
  id: string;
  title: string;
  quote: string;
  context: string;
  output: string;
  critical?: boolean;
}

export const jobs: CustomerJob[] = [
  {
    id: "guide",
    title: "Guide me",
    quote: "We have four free hours. What should we do?",
    context: "Location + time + companions + budget",
    output: "2–3 relevant, feasible options",
  },
  {
    id: "adapt",
    title: "Adapt with me",
    quote: "Yesterday was exhausting. Make today lighter.",
    context: "Re-sequences activities, checks travel time and availability",
    output: "A lighter day that still protects the must-dos",
  },
  {
    id: "recover",
    title: "Recover for me",
    quote: "Typhoon tomorrow. What happens to the trip?",
    context: "Identifies affected bookings and coordinates approved changes",
    output: "Alternatives with cost/refund impact shown upfront",
    critical: true,
  },
  {
    id: "discover",
    title: "Discover for me",
    quote: "Near us, under ₹1,000, vegetarian, minimal walking for my parents.",
    context: "Contextual assistance, not generic search",
    output: "Ranked picks that fit the constraint, not just the query",
  },
];

export interface LoopStage {
  id: string;
  stage: string;
  title: string;
  line: string;
  items: string[];
  solves?: string;
}

export const loopStages: LoopStage[] = [
  {
    id: "know",
    stage: "1",
    title: "Know the trip",
    line: "Not isolated bookings. One connected trip.",
    items: ["Traveller", "Companions", "Flights", "Hotels", "Activities", "Transfers", "Budget", "Preferences", "Dependencies"],
  },
  {
    id: "sense",
    stage: "2",
    title: "Sense now",
    line: "New context continuously enters the trip graph.",
    items: ["Location", "Time", "Weather", "Flight status", "Local availability", "Fatigue", "Free time", "Preference changes", "Disruptions"],
    solves: "Solves Context Loss",
  },
  {
    id: "decide",
    stage: "3",
    title: "Decide next",
    line: "Evaluates what changed, what's affected, and what still fits.",
    items: ["What changed?", "What is affected?", "What options remain feasible?", "What best fits the traveller?", "What is the cost / time / refund impact?"],
    solves: "Solves Adaptation Burden",
  },
  {
    id: "act",
    stage: "4",
    title: "Act + coordinate",
    line: "This is where MMT becomes different from a generic assistant.",
    items: ["Recommend", "Book", "Modify", "Cancel", "Rebook", "Notify suppliers", "Move transfers", "Adjust itinerary", "Escalate to human"],
    solves: "Solves Coordination Burden",
  },
  {
    id: "learn",
    stage: "5",
    title: "Learn",
    line: "Every trip makes the next trip easier.",
    items: ["Accepted suggestions", "Rejected suggestions", "Actual pace", "Spend", "Changes", "Experience feedback"],
  },
];

export const typhoonScenario = {
  trigger: "Typhoon detected",
  impact: ["Island tour ✕", "Transfer affected", "Hotel may extend", "Next-day plan affected"],
  options: [
    {
      label: "Option A",
      title: "Move activity to Day 6",
      cost: "+₹1,200 incremental cost",
      note: "Original experience preserved",
    },
    {
      label: "Option B",
      title: "Replace with indoor/local experience",
      cost: "+₹650 incremental cost",
      note: "No hotel extension",
    },
  ],
  resolution: ["Traveller approves", "MMT coordinates the changes"],
};

export interface EcosystemLayer {
  id: string;
  title: string;
  icon: string;
  items: string[];
}

export const ecosystemLayers: EcosystemLayer[] = [
  { id: "transaction", title: "MMT Transaction Rails", icon: "✈️", items: ["Flights", "Hotels", "Rail", "Bus", "Cabs"] },
  { id: "experience", title: "Experience Layer", icon: "🎟️", items: ["Activities", "Local tours", "Restaurants / partners", "Events"] },
  { id: "context", title: "Context Layer", icon: "🗺️", items: ["Maps", "Weather", "Places", "Live status", "Destination information"] },
  { id: "assurance", title: "Assurance Layer", icon: "🛡️", items: ["Insurance", "Forex", "Visa", "Protection products"] },
  { id: "service", title: "Service Layer", icon: "🤝", items: ["Supplier servicing", "Refunds", "Human agents", "Escalation"] },
];

export const ecosystemLine = "MMT does not need to own every service. It needs to orchestrate the ecosystem around the traveller.";

export interface MoatPillar {
  title: string;
  detail: string;
}

export const moatPillars: MoatPillar[] = [
  { title: "Traveller Context", detail: "History + intent + transactions" },
  { title: "Live Inventory", detail: "Bookable travel supply" },
  { title: "Execution Rails", detail: "Payments + modification + servicing" },
  { title: "Supplier Ecosystem", detail: "Ability to move from recommendation to action" },
];

export const moatLine = "AI is the intelligence. MMT's ecosystem makes the intelligence executable.";

export interface AutonomyLevel {
  level: number;
  title: string;
  quote: string;
}

export const autonomyLevels: AutonomyLevel[] = [
  { level: 1, title: "Recommend", quote: "Here are your options." },
  { level: 2, title: "Coordinate", quote: "Here is what changes across your trip." },
  { level: 3, title: "Execute with approval", quote: "Apply these three changes?" },
  { level: 4, title: "Bounded Autopilot", quote: "Automatically handle refundable changes below ₹2,000." },
];

export const guardrails = ["Spend limit", "Refundability", "Supplier preference", "Approval threshold", "Emergency escalation"];
export const autonomyLine = "The traveller sets the rules. Myra operates within them.";

export const evolution = [
  { from: "Assistant", detail: "Answers" },
  { from: "Trip Orchestrator", detail: "Coordinates outcomes" },
  { from: "Travel Autopilot", detail: "Manages within traveller-defined rules" },
];

export const equation = ["Trip Graph", "Live Context", "MMT Ecosystem"];
export const equationResult = "Myra Travel Autopilot";
