import type { DisruptionEvent } from "@/types/demo";

export const typhoonDisruption: DisruptionEvent = {
  id: "disruption-typhoon",
  headline: "Weather alert",
  detail: "A typhoon warning may affect tomorrow's island activity.",
  dependencyChain: [
    { id: "dep-island", label: "Island activity", affected: true },
    { id: "dep-hotel", label: "Hotel", affected: true },
    { id: "dep-transfer", label: "Transfer", affected: true },
    { id: "dep-day6", label: "Day 6 plan", affected: true },
    { id: "dep-budget", label: "Budget", affected: true },
    { id: "dep-companions", label: "Companions", affected: false },
  ],
  options: [
    {
      id: "A",
      title: "Move island activity to Day 6",
      description: "Extend the hotel by one night and shift the airport transfer by 3 hours.",
      affectedBookings: ["bk-island", "bk-hotel", "bk-transfer"],
      extraCost: 1200,
      refundImpact: 0,
      timeImpact: "Transfer shifts by 3 hours",
      changeCount: 3,
      walking: "low",
      preservesOriginal: true,
      rationale: "Preserves the activity you wanted while keeping disruption low for your parents.",
      recommended: true,
    },
    {
      id: "B",
      title: "Replace with indoor local experience",
      description: "Swap the island tour for a food + heritage activity. No hotel or transfer change.",
      affectedBookings: ["bk-island"],
      extraCost: 650,
      refundImpact: 0,
      timeImpact: "No schedule change",
      changeCount: 1,
      walking: "low",
      preservesOriginal: false,
      rationale: "Fastest to resolve, but the original island activity is cancelled.",
    },
  ],
};
