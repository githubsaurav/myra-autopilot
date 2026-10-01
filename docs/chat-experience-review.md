# Myra traveller experience review

## Findings and changes

This is an expert walkthrough of the prototype, not a study with recruited users.

- Technical side panels and a permanent stage tracker competed with the trip. The default workspace now uses one traveller-focused guide and a larger conversation. Insights remains available on demand.
- A new visitor previously entered each scenario partway through, with decisions already made. New and restarted journeys now begin with a brief. Existing saved progress is retained.
- The value of the three journeys was implicit. Each now explains the problem, expected outcome, and the traveller's role in approving changes.
- The next action was easy to lose in a long transcript. A compact, stage-specific instruction stays visible, with Hindi instructions in the solo journey.
- Large recommendation responses scrolled straight past their beginning. Scroll following now reveals the beginning of a large addition when the viewer was following new messages.
- Text contrast, card typography, keyboard focus, and narrow-screen layouts were refined. Reduced-motion preferences are respected.
- Side-question answers remain separate from the journey. Resume trip closes that panel without advancing the current decision.

## Design references

- [Microsoft: Design foundations for agents](https://learn.microsoft.com/en-us/agents/design-guidelines/design-foundations): design the complete interaction lifecycle and keep users in control.
- [Google PAIR: Explainability + Trust](https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/): explain capabilities and limits, make value recognizable, and connect explanations to user actions.
- [Microsoft HAX: Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/): set expectations, support efficient interaction, and support recovery.

## Verification

Production build and six functional tests pass. Lint has no errors and one existing React Fast Refresh warning. Browser walkthroughs covered the new family opening and brief confirmation, a group budget question and return to the same booking decision, and a 390px mobile layout without horizontal overflow.

The application remains a deterministic prototype using sample inventory and simulated supplier, payment, and booking actions.
