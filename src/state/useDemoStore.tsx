import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DemoTrip, DestinationOption, InspectorSnapshot, JourneyStage, PersonaId, TravellerProfile } from "@/types/demo";
import { travellers as defaultTravellers } from "@/data/demoTraveller";
import { buildFamilyTrip } from "@/data/demoTrip";
import { buildSoloTrip } from "@/data/demoTripSolo";
import { buildGroupTrip } from "@/data/demoTripGroup";

const STORAGE_KEY = "myra-autopilot:v4-demo-state";

const tripBuilders: Record<PersonaId, (dest: DestinationOption) => DemoTrip> = {
  family: buildFamilyTrip,
  solo: buildSoloTrip,
  group: buildGroupTrip,
};

interface PersistedState {
  activePersonaId: PersonaId | null;
  personaStep: Record<PersonaId, number>;
  personaStage: Record<PersonaId, JourneyStage>;
  trips: Record<PersonaId, DemoTrip | null>;
  tripDestinationId: Record<PersonaId, string | null>;
  travellers: Record<PersonaId, TravellerProfile>;
  learnedPreferences: Record<PersonaId, string[]>;
  recoverySelection: Record<PersonaId, string | null>;
  groupVoteFinalized: string | null;
  inspectorOpen: boolean;
  inspectorHistory: Record<PersonaId, InspectorSnapshot[]>;
}

const initialState: PersistedState = {
  activePersonaId: null,
  personaStep: { family: 0, solo: 0, group: 0 },
  personaStage: { family: "discovery", solo: "discovery", group: "discovery" },
  trips: { family: null, solo: null, group: null },
  tripDestinationId: { family: null, solo: null, group: null },
  travellers: defaultTravellers,
  learnedPreferences: { family: [], solo: [], group: [] },
  recoverySelection: { family: null, solo: null, group: null },
  groupVoteFinalized: null,
  inspectorOpen: false,
  inspectorHistory: { family: [], solo: [], group: [] },
};

function loadState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      ...initialState,
      ...parsed,
      personaStep: { ...initialState.personaStep, ...parsed.personaStep },
      personaStage: { ...initialState.personaStage, ...parsed.personaStage },
      trips: { ...initialState.trips, ...parsed.trips },
      tripDestinationId: { ...initialState.tripDestinationId, ...parsed.tripDestinationId },
      travellers: { ...initialState.travellers, ...parsed.travellers },
      learnedPreferences: { ...initialState.learnedPreferences, ...parsed.learnedPreferences },
      recoverySelection: { ...initialState.recoverySelection, ...parsed.recoverySelection },
      inspectorHistory: { ...initialState.inspectorHistory, ...parsed.inspectorHistory },
    };
  } catch {
    return initialState;
  }
}

interface DemoStoreValue extends PersistedState {
  setActivePersona: (id: PersonaId | null) => void;
  setPersonaStep: (id: PersonaId, step: number) => void;
  setPersonaStage: (id: PersonaId, stage: JourneyStage) => void;
  createTrip: (id: PersonaId, destination: DestinationOption) => void;
  mutateTrip: (id: PersonaId, updater: (trip: DemoTrip) => DemoTrip) => void;
  addLearnedPreference: (id: PersonaId, text: string) => void;
  selectRecoveryOption: (id: PersonaId, optionId: string) => void;
  finalizeGroupVote: (stayId: string) => void;
  updateTraveller: (id: PersonaId, partial: Partial<TravellerProfile>) => void;
  toggleInspector: () => void;
  setInspectorOpen: (open: boolean) => void;
  addInspectorEntry: (id: PersonaId, entry: InspectorSnapshot) => void;
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

  const setActivePersona = useCallback((id: PersonaId | null) => setState((s) => ({ ...s, activePersonaId: id })), []);

  const setPersonaStep = useCallback(
    (id: PersonaId, step: number) => setState((s) => ({ ...s, personaStep: { ...s.personaStep, [id]: step } })),
    []
  );

  const setPersonaStage = useCallback(
    (id: PersonaId, stage: JourneyStage) => setState((s) => ({ ...s, personaStage: { ...s.personaStage, [id]: stage } })),
    []
  );

  const createTrip = useCallback(
    (id: PersonaId, destination: DestinationOption) =>
      setState((s) => ({
        ...s,
        trips: { ...s.trips, [id]: tripBuilders[id](destination) },
        tripDestinationId: { ...s.tripDestinationId, [id]: destination.id },
      })),
    []
  );

  const mutateTrip = useCallback(
    (id: PersonaId, updater: (trip: DemoTrip) => DemoTrip) =>
      setState((s) => {
        const trip = s.trips[id];
        if (!trip) return s;
        return { ...s, trips: { ...s.trips, [id]: updater(trip) } };
      }),
    []
  );

  const addLearnedPreference = useCallback(
    (id: PersonaId, text: string) =>
      setState((s) => {
        if (s.learnedPreferences[id].includes(text)) return s;
        return { ...s, learnedPreferences: { ...s.learnedPreferences, [id]: [...s.learnedPreferences[id], text] } };
      }),
    []
  );

  const selectRecoveryOption = useCallback(
    (id: PersonaId, optionId: string) =>
      setState((s) => ({ ...s, recoverySelection: { ...s.recoverySelection, [id]: optionId } })),
    []
  );

  const finalizeGroupVote = useCallback(
    (stayId: string) => setState((s) => ({ ...s, groupVoteFinalized: stayId })),
    []
  );

  const updateTraveller = useCallback(
    (id: PersonaId, partial: Partial<TravellerProfile>) =>
      setState((s) => ({ ...s, travellers: { ...s.travellers, [id]: { ...s.travellers[id], ...partial } } })),
    []
  );

  const toggleInspector = useCallback(() => setState((s) => ({ ...s, inspectorOpen: !s.inspectorOpen })), []);
  const setInspectorOpen = useCallback((open: boolean) => setState((s) => ({ ...s, inspectorOpen: open })), []);

  const addInspectorEntry = useCallback(
    (id: PersonaId, entry: InspectorSnapshot) =>
      setState((s) => {
        const list = s.inspectorHistory[id];
        const last = list[list.length - 1];
        if (last && JSON.stringify(last) === JSON.stringify(entry)) return s;
        return { ...s, inspectorHistory: { ...s.inspectorHistory, [id]: [...list, entry] } };
      }),
    []
  );

  const resetDemo = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  }, []);

  const value = useMemo<DemoStoreValue>(
    () => ({
      ...state,
      setActivePersona,
      setPersonaStep,
      setPersonaStage,
      createTrip,
      mutateTrip,
      addLearnedPreference,
      selectRecoveryOption,
      finalizeGroupVote,
      updateTraveller,
      toggleInspector,
      setInspectorOpen,
      addInspectorEntry,
      resetDemo,
    }),
    [
      state,
      setActivePersona,
      setPersonaStep,
      setPersonaStage,
      createTrip,
      mutateTrip,
      addLearnedPreference,
      selectRecoveryOption,
      finalizeGroupVote,
      updateTraveller,
      toggleInspector,
      setInspectorOpen,
      addInspectorEntry,
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
