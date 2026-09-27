import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { RecoveryOption, TravellerProfile, Trip } from "@/types/travel";
import { defaultTraveller } from "@/data/demoTraveller";
import { defaultTrip, adaptedDay5 } from "@/data/demoTrip";
import { typhoonDisruption } from "@/data/demoDisruption";

const STORAGE_KEY = "myra-autopilot:demo-state";

interface PersistedState {
  onboarded: boolean;
  myraCompanionOn: boolean;
  traveller: TravellerProfile;
  trip: Trip;
  adaptApplied: boolean;
  recoverySelectedOption: "A" | "B" | null;
  recoveryApplied: boolean;
  recoveryFeedback: "yes" | "mostly" | "no" | null;
  learnedPreferences: string[];
}

const initialState: PersistedState = {
  onboarded: false,
  myraCompanionOn: false,
  traveller: defaultTraveller,
  trip: defaultTrip,
  adaptApplied: false,
  recoverySelectedOption: null,
  recoveryApplied: false,
  recoveryFeedback: null,
  learnedPreferences: [],
};

function loadState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as PersistedState;
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
}

interface TripStoreValue extends PersistedState {
  completeOnboarding: (prefs: Partial<TravellerProfile>) => void;
  setMyraCompanionOn: (on: boolean) => void;
  applyLighterDay: () => void;
  selectRecoveryOption: (id: "A" | "B") => void;
  applyRecovery: () => void;
  setRecoveryFeedback: (feedback: "yes" | "mostly" | "no") => void;
  updateAutonomySettings: (partial: Partial<TravellerProfile>) => void;
  resetDemo: () => void;
  disruption: typeof typhoonDisruption;
  selectedOption: RecoveryOption | null;
}

const TripStoreContext = createContext<TripStoreValue | null>(null);

export function TripStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // demo persistence only — safe to ignore if storage is unavailable
    }
  }, [state]);

  const value = useMemo<TripStoreValue>(() => {
    const selectedOption =
      typhoonDisruption.options.find((o) => o.id === state.recoverySelectedOption) ?? null;

    return {
      ...state,
      disruption: typhoonDisruption,
      selectedOption,

      completeOnboarding: (prefs) =>
        setState((s) => ({ ...s, onboarded: true, traveller: { ...s.traveller, ...prefs } })),

      setMyraCompanionOn: (on) => setState((s) => ({ ...s, myraCompanionOn: on })),

      applyLighterDay: () =>
        setState((s) => ({
          ...s,
          adaptApplied: true,
          trip: { ...s.trip, itinerary: [...s.trip.itinerary.filter((i) => i.day !== 5), ...adaptedDay5] },
        })),

      selectRecoveryOption: (id) => setState((s) => ({ ...s, recoverySelectedOption: id })),

      applyRecovery: () =>
        setState((s) => {
          const option = typhoonDisruption.options.find((o) => o.id === s.recoverySelectedOption);
          if (!option) return s;
          const bookings = s.trip.bookings.map((b) => {
            if (!option.affectedBookings.includes(b.id)) return b;
            if (b.id === "bk-island" && !option.preservesOriginal) return { ...b, status: "cancelled" as const };
            return { ...b, status: "changed" as const };
          });
          const itinerary = s.trip.itinerary.map((item) => {
            if (item.id === "it-6") {
              return option.preservesOriginal
                ? { ...item, day: 6, time: "09:00", tag: "moved" as const, detail: "Moved from original schedule" }
                : { ...item, title: "Local food + heritage experience", tag: "new" as const };
            }
            if (item.id === "it-7" && option.preservesOriginal) {
              return { ...item, tag: "updated" as const, detail: "Shifted by 3 hours" };
            }
            return item;
          });
          return {
            ...s,
            recoveryApplied: true,
            trip: { ...s.trip, bookings, itinerary },
          };
        }),

      setRecoveryFeedback: (feedback) =>
        setState((s) => {
          const learned =
            feedback === "yes" && !s.learnedPreferences.includes("Preserving must-do experiences matters more than minimising every extra cost")
              ? [...s.learnedPreferences, "Preserving must-do experiences matters more than minimising every extra cost"]
              : s.learnedPreferences;
          return { ...s, recoveryFeedback: feedback, learnedPreferences: learned };
        }),

      updateAutonomySettings: (partial) =>
        setState((s) => ({ ...s, traveller: { ...s.traveller, ...partial } })),

      resetDemo: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        setState(initialState);
      },
    };
  }, [state]);

  return <TripStoreContext.Provider value={value}>{children}</TripStoreContext.Provider>;
}

export function useTripStore() {
  const ctx = useContext(TripStoreContext);
  if (!ctx) throw new Error("useTripStore must be used within TripStoreProvider");
  return ctx;
}
