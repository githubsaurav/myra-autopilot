import type { LucideIcon } from "lucide-react";

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

export type BookingType = "flight" | "hotel" | "transfer" | "activity" | "ferry";
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
  fitLabel: string;
  fitScore: "Low" | "Medium" | "High";
  reason: string;
  recommended?: boolean;
  icon: LucideIcon;
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
  id: string;
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

/** A friend's stated input into a group trip — shown in the Group Curation persona. */
export interface GroupMemberInput {
  id: string;
  name: string;
  initial: string;
  wants: string[];
  budget: string;
}

/** A two-way vote used to reconcile group preferences into one decision. */
export interface GroupVoteOption {
  id: string;
  title: string;
  detail: string;
  votes: number;
  totalVoters: number;
}

export type PersonaId = "family" | "solo" | "group";

export type Language = "hi" | "en";

export interface PersonaMeta {
  id: PersonaId;
  name: string;
  tagline: string;
  description: string;
  /** Short capability label shown as a banner inside the Myra chat, e.g. "Trip Planning + In-Trip Assistance". */
  capabilityBadge: string;
  language: Language;
  languageLabel: string;
  samplePrompt: string;
  icon: LucideIcon;
}

export type JourneyStage = "discovery" | "curation" | "booking" | "intrip";

export interface JourneyStageMeta {
  id: JourneyStage;
  label: string;
}

export interface InspectorSnapshot {
  /** Short, step-specific headline for the "why this matters" feed, e.g. "Natural language parsed into structured intent". */
  capability: string;
  /** Short, step-specific headline for the "agent backend" feed, e.g. "NLU: extracting duration, budget, visa & food constraints". */
  backendAction: string;
  /** Which technology partner this backend step demonstrates — shown as a small badge next to the step. */
  poweredBy: "OpenAI" | "Google Cloud" | "Mastercard";
  scenarioName: string;
  scenarioTag: string;
  userState: string;
  contextUsed: string[];
  intent: string;
  generatedUI: string;
  action: string;
  stateChange: string;
  valueDemonstrated: string[];
  whyMMT?: string;
}
