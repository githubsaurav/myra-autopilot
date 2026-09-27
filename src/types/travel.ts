export type AutonomyMode = "recommend" | "approval" | "bounded";
export type TravelPace = "relaxed" | "balanced" | "packed";

export interface TravellerProfile {
  id: string;
  displayName: string;
  travelPace: TravelPace;
  foodPreferences: string[];
  interests: string[];
  companionNeeds: string[];
  autonomyMode: AutonomyMode;
  spendLimit: number;
  refundableOnly: boolean;
  useLocation: boolean;
  disruptionAlerts: boolean;
  rememberPreferences: boolean;
  escalateOnLowConfidence: boolean;
}

export type BookingType = "flight" | "hotel" | "transfer" | "activity";
export type BookingStatus = "confirmed" | "affected" | "changed" | "cancelled";

export interface Booking {
  id: string;
  type: BookingType;
  title: string;
  meta: string;
  status: BookingStatus;
  refundable: boolean;
  amount: number;
}

export type ItineraryTag = "moved" | "new" | "updated" | null;

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  title: string;
  detail?: string;
  tag?: ItineraryTag;
  struckThrough?: boolean;
}

export interface LiveContext {
  currentLocation: string;
  weather: string;
  weatherRisk?: string;
  fatigueLevel: "low" | "medium" | "high";
  freeTimeMinutes: number;
  todaySpend: number;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dayNumber: number;
  travellers: number;
  bookings: Booking[];
  itinerary: ItineraryItem[];
  liveContext: LiveContext;
}

export interface RecoveryOption {
  id: "A" | "B";
  title: string;
  description: string;
  affectedBookings: string[];
  extraCost: number;
  refundImpact: number;
  rationale: string;
  changeCount: number;
  walking: "low" | "moderate" | "high";
  preservesOriginal: boolean;
  recommended?: boolean;
}

export interface DisruptionEvent {
  id: string;
  headline: string;
  detail: string;
  dependencyChain: string[];
  options: RecoveryOption[];
}
