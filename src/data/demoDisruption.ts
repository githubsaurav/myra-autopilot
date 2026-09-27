import type { DisruptionEvent } from "@/types/travel";

export const typhoonDisruption: DisruptionEvent = {
  id: "disruption-typhoon",
  headline: "Typhoon warning for tomorrow",
  detail: "Your island activity is likely to be affected.",
  dependencyChain: ["Island activity", "Transfer", "Hotel", "Day 6 plan", "Budget"],
  options: [
    {
      id: "A",
      title: "Move island experience to Day 6 → Day 6 extended stay",
      description: "Move the island experience by extending the trip one day.",
      affectedBookings: ["bk-island", "bk-hotel", "bk-transfer"],
      extraCost: 1200,
      refundImpact: 0,
      rationale: "Preserves the experience you wanted and fits your parents' preferred pace.",
      changeCount: 3,
      walking: "low",
      preservesOriginal: true,
      recommended: true,
    },
    {
      id: "B",
      title: "Replace with indoor local experience",
      description: "Swap the island tour for a food + heritage experience, no schedule changes.",
      affectedBookings: ["bk-island"],
      extraCost: 650,
      refundImpact: 0,
      rationale: "Fastest to resolve with no hotel or transfer disruption.",
      changeCount: 1,
      walking: "low",
      preservesOriginal: false,
    },
  ],
};
