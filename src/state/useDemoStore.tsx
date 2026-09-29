import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DemoTrip, ScenarioId, TravellerProfile } from "@/types/demo";
import { defaultTraveller } from "@/data/demoTraveller";
import { vietnamTrip, day3After } from "@/data/demoTrip";
import { typhoonDisruption } from "@/data/demoDisruption";

const STORAGE_KEY = "myra-autopilot:v2-demo-state";

interface PersistedState {
  activeScenarioId: ScenarioId;
  scenarioStep: Record<ScenarioId, number>;
  heroFlowActive: boolean;
  traveller: TravellerProfile;
  trip: DemoTrip | null;
  ladakhTrip: DemoTrip | null;
  learnedPreferences: string[];
  recoverySelectedOption: "A" | "B" | null;
}

const initialState: PersistedState = {
  activeScenarioId: "1",
  scenarioStep: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
  heroFlowActive: false,
  traveller: defaultTraveller,
  trip: null,
  ladakhTrip: null,
  learnedPreferences: [],
  recoverySelectedOption: null,
};

function loadState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return { ...initialState, ...parsed, scenarioStep: { ...initialState.scenarioStep, ...parsed.scenarioStep } };
  } catch {
    return initialState;
  }
}

interface DemoStoreValue extends PersistedState {
  disruption: typeof typhoonDisruption;
  setActiveScenario: (id: ScenarioId) => void;
  setScenarioStep: (id: ScenarioId, step: number) => void;
  startHeroFlow: () => void;
  stopHeroFlow: () => void;
  advanceHeroFlow: () => void;
  createTripFromDestination: () => void;
  addFreeTimeItem: (title: string, cost: number) => void;
  applyLighterDay: () => void;
  rememberFatiguePreference: () => void;
  selectRecoveryOption: (id: "A" | "B") => void;
  applyRecovery: () => void;
  createLadakhTrip: () => void;
  updateTraveller: (partial: Partial<TravellerProfile>) => void;
  resetDemo: () => void;
}

const DemoStoreContext = createContext<DemoStoreValue | null>(null);

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // demo persistence only — safe to ignore if storage is unavailable
    }
  }, [state]);

  const setActiveScenario = useCallback((id: ScenarioId) => setState((s) => ({ ...s, activeScenarioId: id })), []);

  const setScenarioStep = useCallback(
    (id: ScenarioId, step: number) => setState((s) => ({ ...s, scenarioStep: { ...s.scenarioStep, [id]: step } })),
    []
  );

  const startHeroFlow = useCallback(
    () => setState((s) => ({ ...s, heroFlowActive: true, activeScenarioId: "1" })),
    []
  );
  const stopHeroFlow = useCallback(() => setState((s) => ({ ...s, heroFlowActive: false })), []);
  const advanceHeroFlow = useCallback(
    () =>
      setState((s) => {
        const order: ScenarioId[] = ["1", "2", "3", "4", "5"];
        const idx = order.indexOf(s.activeScenarioId);
        if (idx >= order.length - 1) return { ...s, heroFlowActive: false };
        return { ...s, activeScenarioId: order[idx + 1] };
      }),
    []
  );

  const createTripFromDestination = useCallback(
    () => setState((s) => ({ ...s, trip: vietnamTrip })),
    []
  );

  const addFreeTimeItem = useCallback(
    (title: string, cost: number) =>
      setState((s) => {
        if (!s.trip) return s;
        const newItem = {
          id: `it-freetime-${Date.now()}`,
          day: s.trip.dayNumber,
          time: "18:30",
          title,
          category: "activity",
          status: "new" as const,
          cost,
        };
        return { ...s, trip: { ...s.trip, itinerary: [...s.trip.itinerary, newItem] } };
      }),
    []
  );

  const applyLighterDay = useCallback(
    () =>
      setState((s) => {
        if (!s.trip) return s;
        const rest = s.trip.itinerary.filter((i) => i.day !== 3);
        return { ...s, trip: { ...s.trip, itinerary: [...rest, ...day3After] } };
      }),
    []
  );

  const rememberFatiguePreference = useCallback(
    () =>
      setState((s) => {
        const pref = "Prefers a lighter pace after long travel days";
        if (s.learnedPreferences.includes(pref)) return s;
        return { ...s, learnedPreferences: [...s.learnedPreferences, pref] };
      }),
    []
  );

  const selectRecoveryOption = useCallback(
    (id: "A" | "B") => setState((s) => ({ ...s, recoverySelectedOption: id })),
    []
  );

  const applyRecovery = useCallback(
    () =>
      setState((s) => {
        if (!s.trip) return s;
        const option = typhoonDisruption.options.find((o) => o.id === s.recoverySelectedOption);
        if (!option) return s;

        const bookings = s.trip.bookings.map((b) => {
          if (!option.affectedBookings.includes(b.id)) return b;
          if (b.id === "bk-island") {
            return option.preservesOriginal
              ? { ...b, status: "moved" as const, meta: "Moved to Day 6 · 09:00", tag: "Moved by Myra" }
              : { ...b, status: "cancelled" as const, tag: "Cancelled — replaced" };
          }
          if (b.id === "bk-hotel" && option.preservesOriginal) {
            return { ...b, meta: "Confirmation HTL-DEMO-91 · Extended", amount: b.amount + option.extraCost, tag: "Extended by Myra" };
          }
          if (b.id === "bk-transfer" && option.preservesOriginal) {
            return { ...b, meta: "Day 7 · 21:00 (shifted +3h)", tag: "Pickup updated" };
          }
          return b;
        });

        const itinerary = s.trip.itinerary.map((item) => {
          if (item.id === "it-d6-1") {
            return option.preservesOriginal
              ? { ...item, day: 6, status: "moved" as const, detail: "Moved from original schedule" }
              : { ...item, title: "Local food + heritage experience", status: "new" as const, detail: undefined };
          }
          if (item.id === "it-d6-2" && option.preservesOriginal) {
            return { ...item, time: "21:00", status: "moved" as const, detail: "Shifted by 3 hours" };
          }
          return item;
        });

        return {
          ...s,
          trip: {
            ...s.trip,
            bookings,
            itinerary,
            totalDays: option.preservesOriginal ? s.trip.totalDays + 1 : s.trip.totalDays,
          },
        };
      }),
    []
  );

  const createLadakhTrip = useCallback(
    () =>
      setState((s) => ({
        ...s,
        ladakhTrip: {
          id: "trip-ladakh-6d",
          destination: "Ladakh",
          startDate: "8 Oct",
          endDate: "13 Oct",
          totalDays: 6,
          dayNumber: 1,
          travellers: 3,
          bookingId: "MMT-DEMO-7742",
          flightPnr: "DEMO9L",
          hotelConfirmation: "HTL-DEMO-33",
          bookings: [
            { id: "bk-l-flight", type: "flight", title: "Flight · BLR → IXL", meta: "PNR DEMO9L", date: "8 Oct", status: "confirmed", amount: 41000, refundable: true },
            { id: "bk-l-hotel", type: "hotel", title: "Hotel · Leh Boutique Stay", meta: "Confirmation HTL-DEMO-33", date: "8–13 Oct", status: "confirmed", amount: 36000, refundable: true },
          ],
          itinerary: [
            { id: "it-l-1", day: 1, time: "10:00", title: "Arrival + acclimatisation rest", status: "planned", category: "rest", walkingLevel: "low" },
            { id: "it-l-2", day: 2, time: "09:00", title: "Leh Palace + Shanti Stupa (low pace)", status: "planned", category: "sightseeing", walkingLevel: "low" },
          ],
          liveContext: {
            city: "Leh",
            currentTime: "—",
            weather: "Cool, clear",
            fatigueLevel: "low",
            freeTimeMinutes: 0,
            locationPermission: false,
          },
        },
      })),
    []
  );

  const updateTraveller = useCallback(
    (partial: Partial<TravellerProfile>) => setState((s) => ({ ...s, traveller: { ...s.traveller, ...partial } })),
    []
  );

  const resetDemo = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  }, []);

  const value = useMemo<DemoStoreValue>(
    () => ({
      ...state,
      disruption: typhoonDisruption,
      setActiveScenario,
      setScenarioStep,
      startHeroFlow,
      stopHeroFlow,
      advanceHeroFlow,
      createTripFromDestination,
      addFreeTimeItem,
      applyLighterDay,
      rememberFatiguePreference,
      selectRecoveryOption,
      applyRecovery,
      createLadakhTrip,
      updateTraveller,
      resetDemo,
    }),
    [
      state,
      setActiveScenario,
      setScenarioStep,
      startHeroFlow,
      stopHeroFlow,
      advanceHeroFlow,
      createTripFromDestination,
      addFreeTimeItem,
      applyLighterDay,
      rememberFatiguePreference,
      selectRecoveryOption,
      applyRecovery,
      createLadakhTrip,
      updateTraveller,
      resetDemo,
    ]
  );

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
}

export function useDemoStore() {
  const ctx = useContext(DemoStoreContext);
  if (!ctx) throw new Error("useDemoStore must be used within DemoStoreProvider");
  return ctx;
}
