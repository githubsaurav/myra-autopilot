# Myra Travel Autopilot

Interactive prototype for the "Myra Travel Autopilot" solution slide: one
intelligence layer that plans, adapts and acts across a trip, built on
MakeMyTrip's booking context, supplier network and transaction rails.

## Stack

Next.js (App Router) + TypeScript + Tailwind v4. No backend, no env vars —
static content, deploys anywhere Next.js runs.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's on the page

One scrolling narrative, matching the solution slide structure:

1. **Enter once, stay connected** — the plan → live trip → "turn on Autopilot"
   flow, progressive onboarding (known vs. learned data), and the four
   customer jobs (Guide / Adapt / Recover / Discover — Recover called out as
   the sharpest white space).
2. **Myra Autopilot Core** — the closed loop (Know → Sense → Decide → Act →
   Learn), each stage naming which pain it solves, plus an interactive
   typhoon-disruption scenario: pick Option A or B and watch the
   traveller-approval / MMT-coordination steps resolve.
3. **AI Travel Ecosystem** — the five layers Myra orchestrates (transaction
   rails, experience, context, assurance, service) feeding into Myra and out
   to the traveller, plus the "why MakeMyTrip can build this" moat pillars.
4. **Trust & autonomy** — the four-level autonomy ladder (Recommend →
   Coordinate → Execute with approval → Bounded Autopilot) with guardrails,
   so "Autopilot" reads as earned and bounded, not uncontrolled.
5. Closing evolution strip (Assistant → Orchestrator → Autopilot) and the
   Trip Graph + Live Context + MMT Ecosystem = Myra Travel Autopilot equation.

All copy lives in [lib/content.ts](lib/content.ts) as plain typed data —
edit it there to change wording without touching layout code.

## Deploy to Vercel

No environment variables needed.

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new), import `myra-autopilot`.
3. Framework preset auto-detects as Next.js — leave defaults, click Deploy.

Every push to `main` redeploys automatically once the project is linked.
