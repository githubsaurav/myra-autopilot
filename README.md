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

## Experience and design

The entry page introduces Myra with an original, locally stored Vietnam illustration
and three interactive trip cards. Each card opens its existing scripted journey.
The red action colour, blue navigation, MakeMyTrip logo, and persistent trip tabs
carry through to the conversation workspace.

- **Family trip** — planning with parents, destination selection, booking approval,
  and in-trip disruption recovery.
- **Solo trip** — Hindi conversation with offbeat destination recommendations and
  hyper-local curation.
- **Group trip** — shared preferences, stay voting, booking, and group coordination.

Desktop includes a journey switcher and capability history on the left, the
customer app in the centre, and simulated orchestration details on the right.
On mobile, the trip selector and Insights button provide access to the same context.
Trip, Plan, Myra, Bookings, and Profile remain connected to the shared demo state.

### Validation

```bash
npm run build
npm run lint
```

The design refresh was checked in-browser at desktop and mobile widths, including
journey switching and advancing the group stay vote. The existing store has one
non-blocking Fast Refresh lint warning.

## Code structure

- `src/pages/` — landing page and the five product tabs.
- `src/components/shell/` — persistent navigation, journey controls, and demo panels.
- `src/components/myra/` — chat header, composer, and conversation container.
- `src/components/generative/` — interactive recommendation, voting, approval,
  recovery, and execution cards.
- `src/scenarios/` — family, solo, and group scripted controllers.
- `src/state/useDemoStore.tsx` — shared trip state persisted in localStorage.
- `src/index.css` — theme, responsive entry layout, and workspace styling.
- `public/travel-landscape.svg` — original local illustration; no remote image dependency.

## Deploy to Vercel

No environment variables needed.

1. Push to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import `myra-autopilot`.
3. Framework preset: **Vite**. Defaults are correct — `vercel.json` in
   this repo adds the SPA rewrite so client-side routes (e.g. `/trip`)
   don't 404 on refresh or direct link.
