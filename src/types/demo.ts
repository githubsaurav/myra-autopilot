export type AutonomyMode = "recommend" | "approval" | "bounded";
export type TravelPace = "relaxed" | "balanced" | "packed";
export type WalkingLevel = "low" | "medium" | "high";

export interface TravellerProfile {
  id: string;
  displayName: string;
  travelPace: TravelPace;
  foodPreferences: string[];
  companionNeeds: string[];
  interests: string[];
  budgetPreference: string;
  autonomyMode: AutonomyMode;
  spendLimit: number;
  refundableOnly: boolean;
  memoryEnabled: boolean;
}

export type BookingType = "flight" | "hotel" | "transfer" | "activity";
export type BookingStatus = "confirmed" | "affected" | "moved" | "cancelled" | "completed";

export interface Booking {
  id: string;
  type: BookingType;
  title: string;
  meta: string;
  date: string;
  status: BookingStatus;
  amount: number;
  refundable: boolean;
  tag?: string;
}

export type ItineraryStatus = "planned" | "moved" | "new" | "completed";

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  title: string;
  category?: string;
  status: ItineraryStatus;
  walkingLevel?: WalkingLevel;
  cost?: number;
  detail?: string;
  struckThrough?: boolean;
}

export interface LiveContext {
  city: string;
  currentTime: string;
  weather: string;
  weatherRisk?: string;
  fatigueLevel: "low" | "medium" | "high";
  freeTimeMinutes: number;
  locationPermission: boolean;
}

export interface DemoTrip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dayNumber: number;
  travellers: number;
  bookingId: string;
  flightPnr: string;
  hotelConfirmation: string;
  bookings: Booking[];
  itinerary: ItineraryItem[];
  liveContext: LiveContext;
}

export interface DestinationOption {
  id: string;
  name: string;
  estCost: number;
  visa: string;
  foodFit: string;
  weatherFit: string;
  flightDuration: string;
  parentFriendly: "Low" | "Medium" | "High";
  reason: string;
  recommended?: boolean;
}

export interface ContextualOption {
  id: string;
  title: string;
  distanceMin: number;
  durationHrs: number;
  walking: WalkingLevel;
  cost: number;
  availableNow: boolean;
  why: string;
  recommended?: boolean;
}

export interface RecoveryOption {
  id: "A" | "B";
  title: string;
  description: string;
  affectedBookings: string[];
  extraCost: number;
  refundImpact: number;
  timeImpact: string;
  changeCount: number;
  walking: WalkingLevel;
  preservesOriginal: boolean;
  rationale: string;
  recommended?: boolean;
}

export interface DependencyNode {
  id: string;
  label: string;
  affected: boolean;
}

export interface DisruptionEvent {
  id: string;
  headline: string;
  detail: string;
  dependencyChain: DependencyNode[];
  options: RecoveryOption[];
}

export type ScenarioId = "1" | "2" | "3" | "4" | "5";

export type ScenarioTag = "GENERATIVE UI" | "CONTEXT" | "ADAPT" | "ORCHESTRATE" | "MEMORY";

export interface ScenarioMeta {
  id: ScenarioId;
  number: string;
  name: string;
  category: "ENTRY" | "GUIDE" | "ADAPT" | "RECOVER" | "LEARN";
  tag: ScenarioTag;
}

export interface InspectorSnapshot {
  scenarioName: string;
  scenarioTag: ScenarioTag;
  userState: string;
  contextUsed: string[];
  intent: string;
  generatedUI: string;
  action: string;
  stateChange: string;
  valueDemonstrated: string[];
  whyMMT?: string;
}
