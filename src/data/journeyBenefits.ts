import type { PersonaId } from "@/types/demo";

export const journeyBenefits: Record<PersonaId, { title: string; detail: string; outcome: string }> = {
  family: { title: "A change of plans. Taken care of.", detail: "Plan around your parents’ comfort, then see Myra connect the dots when weather disrupts your trip.", outcome: "Compare recovery options → approve a change → see bookings updated" },
  solo: { title: "Less searching. More discovering.", detail: "Find quieter destinations and local experiences that fit an unexpected free morning. Try this journey in Hindi.", outcome: "Find your destination → explore local options → add one to your day" },
  group: { title: "Different travel styles. One shared plan.", detail: "Balance four friends’ preferences, settle the stay together, and coordinate when the group wants different things.", outcome: "Compare preferences → settle a group plan → coordinate a change" },
};

