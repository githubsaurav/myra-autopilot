import { emptyConversation, type SavedConversation } from "@/lib/travelAssistant";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DemoTrip, DestinationOption, InspectorSnapshot, JourneyStage, PersonaId, TravellerProfile } from "@/types/demo";
import { travellers as defaultTravellers } from "@/data/demoTraveller";
import { destinationOptions } from "@/data/demoInventory";
import { buildFamilyTrip } from "@/data/demoTrip";
import { buildSoloTrip } from "@/data/demoTripSolo";
import { buildGroupTrip } from "@/data/demoTripGroup";

const STORAGE_KEY = "myra-autopilot:v7-demo-state";

const tripBuilders: Record<PersonaId, (dest: DestinationOption) => DemoTrip> = {
  family: buildFamilyTrip,
  solo: buildSoloTrip,
  group: buildGroupTrip,
};

interface PersistedState {
  conversations: Record<PersonaId, SavedConversation>;
  activePersonaId: PersonaId | null;
  personaStep: Record<PersonaId, number>;
  personaStage: Record<PersonaId, JourneyStage>;
  trips: Record<PersonaId, DemoTrip | null>;
  tripDestinationId: Record<PersonaId, string | null>;
  exploredDestinationId: Record<PersonaId, string | null>;
  travellers: Record<PersonaId, TravellerProfile>;
  learnedPreferences: Record<PersonaId, string[]>;
  recoverySelection: Record<PersonaId, string | null>;
  groupVoteFinalized: string | null;
  inspectorOpen: boolean;
  inspectorHistory: Record<PersonaId, InspectorSnapshot[]>;
}

interface PersonaSeed {
  step: number;
  stage: JourneyStage;
  destinationId: string | null;
  trip: DemoTrip | null;
}

/**
 * One account, three trip folders, each pre-filled at a distinct live stage so the prototype
 * is legible on first load without requiring a viewer to script through discovery from zero —
 * and so "Restart this scenario" / "Reset demo" return here, not to a blank slate:
 * Family/Vietnam is an ongoing, already-booked trip (Day 5) with the in-trip disruption one
 * step away; Solo is at the very start of curation — three offbeat options just surfaced,
 * nothing chosen yet; Group already has all 4 friends' preferences in and a stay vote live,
 * mid-planning, not yet booked.
 */
const personaSeed: Record<PersonaId, PersonaSeed> = {
  family: {
    step: 4,
    stage: "booking",
    destinationId: "dest-vietnam",
    trip: buildFamilyTrip(destinationOptions.family.find((d) => d.id === "dest-vietnam")!),
  },
  solo: {
    step: 2,
    stage: "discovery",
    destinationId: null,
    trip: null,
  },
  group: {
    step: 3,
    stage: "curation",
    destinationId: "dest-goa",
    trip: null,
  },
};

const initialState: PersistedState = {
  conversations: { family: emptyConversation(), solo: emptyConversation(), group: emptyConversation() },
  activePersonaId: null,
  personaStep: { family: personaSeed.family.step, solo: personaSeed.solo.step, group: personaSeed.group.step },
  personaStage: { family: personaSeed.family.stage, solo: personaSeed.solo.stage, group: personaSeed.group.stage },
  trips: { family: personaSeed.family.trip, solo: personaSeed.solo.trip, group: personaSeed.group.trip },
  tripDestinationId: {
    family: personaSeed.family.trip ? personaSeed.family.destinationId : null,
    solo: personaSeed.solo.trip ? personaSeed.solo.destinationId : null,
    group: personaSeed.group.trip ? personaSeed.group.destinationId : null,
  },
  exploredDestinationId: { family: personaSeed.family.destinationId, solo: personaSeed.solo.destinationId, group: personaSeed.group.destinationId },
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
      conversations: { family: { ...emptyConversation(), ...parsed.conversations?.family }, solo: { ...emptyConversation(), ...parsed.conversations?.solo }, group: { ...emptyConversation(), ...parsed.conversations?.group } },
      personaStep: { ...initialState.personaStep, ...parsed.personaStep },
      personaStage: { ...initialState.personaStage, ...parsed.personaStage },
      trips: { ...initialState.trips, ...parsed.trips },
      tripDestinationId: { ...initialState.tripDestinationId, ...parsed.tripDestinationId },
      exploredDestinationId: { ...initialState.exploredDestinationId, ...parsed.exploredDestinationId },
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
  updateConversation: (id: PersonaId, update: (current: SavedConversation) => SavedConversation) => void;
  setActivePersona: (id: PersonaId | null) => void;
  setPersonaStep: (id: PersonaId, step: number) => void;
  setPersonaStage: (id: PersonaId, stage: JourneyStage) => void;
  createTrip: (id: PersonaId, destination: DestinationOption) => void;
  mutateTrip: (id: PersonaId, updater: (trip: DemoTrip) => DemoTrip) => void;
  setExploredDestination: (id: PersonaId, destinationId: string | null) => void;
  addLearnedPreference: (id: PersonaId, text: string) => void;
  selectRecoveryOption: (id: PersonaId, optionId: string) => void;
  finalizeGroupVote: (stayId: string) => void;
  updateTraveller: (id: PersonaId, partial: Partial<TravellerProfile>) => void;
  toggleInspector: () => void;
  setInspectorOpen: (open: boolean) => void;
  addInspectorEntry: (id: PersonaId, entry: InspectorSnapshot) => void;
  resetPersona: (id: PersonaId) => void;
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

  const updateConversation = useCallback((id: PersonaId, update: (current: SavedConversation) => SavedConversation) => setState(s => ({ ...s, conversations: { ...s.conversations, [id]: update(s.conversations[id]) } })), []);

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

  const setExploredDestination = useCallback(
    (id: PersonaId, destinationId: string | null) =>
      setState((s) => ({ ...s, exploredDestinationId: { ...s.exploredDestinationId, [id]: destinationId } })),
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

  const resetPersona = useCallback(
    (id: PersonaId) =>
      setState((s) => {
        const seed = personaSeed[id];
        return {
          ...s,
          conversations: { ...s.conversations, [id]: emptyConversation() },
          personaStep: { ...s.personaStep, [id]: seed.step },
          personaStage: { ...s.personaStage, [id]: seed.stage },
          trips: { ...s.trips, [id]: seed.trip },
          tripDestinationId: { ...s.tripDestinationId, [id]: seed.trip ? seed.destinationId : null },
          exploredDestinationId: { ...s.exploredDestinationId, [id]: seed.destinationId },
          learnedPreferences: { ...s.learnedPreferences, [id]: [] },
          recoverySelection: { ...s.recoverySelection, [id]: null },
          inspectorHistory: { ...s.inspectorHistory, [id]: [] },
          groupVoteFinalized: id === "group" ? null : s.groupVoteFinalized,
        };
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
      updateConversation,
      setActivePersona,
      setPersonaStep,
      setPersonaStage,
      createTrip,
      mutateTrip,
      setExploredDestination,
      addLearnedPreference,
      selectRecoveryOption,
      finalizeGroupVote,
      updateTraveller,
      toggleInspector,
      setInspectorOpen,
      addInspectorEntry,
      resetPersona,
      resetDemo,
    }),
    [
      state,
      updateConversation,
      setActivePersona,
      setPersonaStep,
      setPersonaStage,
      createTrip,
      mutateTrip,
      setExploredDestination,
      addLearnedPreference,
      selectRecoveryOption,
      finalizeGroupVote,
      updateTraveller,
      toggleInspector,
      setInspectorOpen,
      addInspectorEntry,
      resetPersona,
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
