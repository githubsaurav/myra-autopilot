# Myra Travel Autopilot — Prototype

A clickable, high-fidelity prototype for a case competition: Myra evolves
from a conversational MakeMyTrip booking assistant into a persistent **AI
Travel Autopilot** that stays with the trip, senses live context, and
coordinates recovery when things change — all with the traveller in
control.

**This is a prototype.** All data is synthetic and masked (traveller
"Aarav", booking ID `MMT-DEMO-4821`, etc.). No real bookings, payments,
authentication, or external APIs — everything is simulated with local
mock data and `localStorage`.

## Stack

React + TypeScript + Vite + Tailwind CSS v4 + React Router + Lucide icons
+ Framer Motion. No backend.

## Run locally

```bash
npm install
npm run dev
```

## The 13-screen demo flow

Rendered as a mobile app shell (phone-frame on desktop, full-bleed on
actual mobile widths), with bottom tabs (Trip / Plan / Myra / Bookings)
for wayfinding. A **Demo Flow** rail floats on the right on desktop only —
click any step to jump straight there for presentation reliability; it
also has a "Reset demo state" button to restart the story from a clean
slate.

1. **Booking confirmed** (`/booking-confirmed`) — the natural entry point; "Turn on Myra Companion."
2. **Activate Myra** (`/activate-myra`) — progressive onboarding: what MMT already knows vs. what's missing.
3. **Trip home** (`/trip-home`) — the persistent trip workspace: live status, today's timeline, proactive Myra insight, quick actions.
4. **Free time** (`/free-time`) — contextual recommendations, not generic search.
5. **Food assistance** (`/food-assist`) — multi-constraint discovery with live filters.
6. **Adapt my trip** (`/adapt-trip`) — before/after re-planning with impact chips.
7. **Disruption alert** (`/disruption-alert`) — proactive typhoon warning with a dependency chain.
8. **Recovery options** (`/recovery-options`) — the hero screen: two ranked recovery plans with a comparison table.
9. **Apply changes** (`/apply-changes`) — review before Myra acts: actions, cost, guardrail checks.
10. **Coordination progress** (`/applying-changes`) — animated stepper across bookings.
11. **Updated trip** (`/updated-trip`) — new state, outcome summary, feedback loop.
12. **Autopilot settings** (`/autopilot-settings`) — autonomy mode, spend threshold, guardrails. (The one screen with a small "Demo data" badge.)
13. **Next trip learning** (`/next-trip-learning`) — the learned profile pre-loading a future Ladakh trip.

Bonus: **Myra evolution** (`/myra-evolution`) — Assistant → Orchestrator → Autopilot, for framing the pitch.

## Code structure

```
src/
  components/   shared UI: AppShell, TopBar, BottomNav, DemoNav, Card, Chip, MyraBubble, StatusStepper, Toggle
  pages/        one file per screen above
  data/         synthetic demo data (traveller, trip, inventory, disruption)
  state/        tripStore.tsx — React context + localStorage, the only source of truth
  types/        travel.ts — shared domain types
```

All demo state (onboarding answers, itinerary edits, the chosen recovery
option, autonomy settings, learned preferences) lives in one
`TripStoreProvider` (`src/state/tripStore.tsx`), persisted to
`localStorage` so a refresh doesn't lose the demo's place.

## Deploy to Vercel

No environment variables needed.

1. Push to GitHub (already done if you're reading this from the repo).
2. [vercel.com/new](https://vercel.com/new) → import `myra-autopilot`.
3. Framework preset: **Vite**. Defaults are correct — `vercel.json` in
   this repo adds the SPA rewrite so client-side routes (e.g. `/trip-home`)
   don't 404 on refresh or direct link.
