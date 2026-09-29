# Myra Travel Autopilot — Prototype

A scripted, deterministic prototype for a case competition: Myra evolves
from a conversational MakeMyTrip booking assistant into a persistent **AI
Travel Autopilot**. Natural language is the command layer; Generative UI
is the action layer — the traveller's intent renders the right interface
for the moment, and every action mutates a live, shared trip state.

**This is a prototype.** All data is synthetic and masked (traveller
"Aarav", booking ID `MMT-DEMO-4821`, etc.). No real bookings, payments,
authentication, LLM calls, or external APIs — everything is scripted with
local mock data and `localStorage`.

## Stack

React + TypeScript + Vite + Tailwind CSS v4 + React Router + Lucide icons
+ Framer Motion. No backend.

## Run locally

```bash
npm install
npm run dev
```

## The demo shell

A three-column desktop presentation shell:

- **Scenario Library** (left, `lg:` and up) — pick any of the 5 scripted
  scenarios, or run **Play Hero Flow** to step through all of them in
  order with a "Next Demo Moment" control. Includes **Reset Demo**.
- **MakeMyTrip product** (centre) — the actual consumer surface, with
  bottom tabs **Trip / Plan / Myra / Bookings / Profile**. This is what
  an evaluator should imagine as the real future product.
- **Autopilot Inspector** (right, `xl:` and up) — a live, per-step
  explanation of what Myra is doing: user state, context used, intent,
  generated UI, action, state change, and value demonstrated. Presenter
  aid only, not part of the consumer product.

On narrower widths, only the centre MakeMyTrip product is shown.

## The 5 scripted scenarios

Each scenario has a pre-filled chat message, a deterministic scripted
response, at least one Generative UI component, and — where relevant — a
mutation to the shared trip state that's visible in the normal MMT tabs.

1. **Plan with natural language** (`ENTRY`) — messy Hinglish intent →
   Intent Summary Card → Destination Recommendation Grid → creates the
   Vietnam trip.
2. **Four free hours** (`GUIDE`) — in-trip contextual discovery →
   Recommendation Grid → adds items to today's itinerary.
3. **Make today lighter** (`ADAPT`) — Before/After Adaptation View →
   re-sequences Day 3 → Memory Learned Card.
4. **Typhoon recovery** (`RECOVER`, the hero scenario) — proactive alert →
   Dependency Graph → Recovery Options → Comparison Matrix → Approval
   Sheet → Execution Tracker → updates 3 bookings + itinerary.
5. **Next trip starts smarter** (`LEARN`) — Memory Applied Card reuses
   preferences learned from Vietnam to start a Ladakh trip.

Scenario 1 must run before 2–4 (they continue an active trip); running
Scenario 3 before 5 adds an extra learned preference to Scenario 5's
memory card, but 5 also has its own baseline of learned preferences so it
works standalone.

## Code structure

```
src/
  components/
    shell/        DemoShell, ScenarioLibrary, AutopilotInspector, MakeMyTripAppShell
    myra/          MyraHeader, ConversationThread, ChatComposer, GeneratedUIContainer, useThinking
    generative/    IntentSummaryCard, DestinationGrid, RecommendationGrid, BeforeAfterPlan,
                   DependencyGraph, RecoveryOptions, ComparisonMatrix, ApprovalSheet,
                   ExecutionTracker, MemoryCard
    Card, Chip, Toggle, MyraBubble, StatusStepper, DestinationHero, Toast — shared primitives
  pages/           TripPage, PlanPage, MyraWorkspacePage, BookingsPage, ProfilePage (the 5 MMT tabs)
  scenarios/       Scenario1Entry … Scenario5Learning — one scripted controller per scenario
  data/            synthetic traveller, trip, inventory, disruption, scenario metadata
  state/
    useDemoStore.tsx      the one source of truth: trip, traveller, learned preferences,
                          active scenario, hero-flow state — persisted to localStorage
    InspectorContext.tsx  lets the active scenario push its current step's explanation
                          to the Autopilot Inspector panel
  types/demo.ts    shared domain types
```

## Deploy to Vercel

No environment variables needed.

1. Push to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import `myra-autopilot`.
3. Framework preset: **Vite**. Defaults are correct — `vercel.json` in
   this repo adds the SPA rewrite so client-side routes (e.g. `/trip`)
   don't 404 on refresh or direct link.
