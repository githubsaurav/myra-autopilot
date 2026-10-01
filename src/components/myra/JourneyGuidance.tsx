import { Compass, ShieldCheck, ArrowRight } from "lucide-react";
import { useDemoStore } from "@/state/useDemoStore";
import type { PersonaId } from "@/types/demo";

import { journeyBenefits } from "@/data/journeyBenefits";

const nextSteps: Record<PersonaId, string[]> = {
  family: ["Send the example below to start planning.", "Check the trip brief, then select Looks right.", "Choose a destination to explore its plan.", "Review the itinerary and booking approval below.", "Continue to Day 5 to try in-trip assistance.", "Send the suggested message to explore a backup plan.", "Compare the recovery options and choose one.", "Review the proposed changes before approving.", "Follow the updates, then view your bookings.", "Your changes are ready. Open Bookings to see the result."],
  solo: ["नीचे दिया संदेश भेजकर अपनी यात्रा शुरू करें।", "अपनी पसंद की जानकारी देखकर पुष्टि करें।", "किसी जगह का पूरा प्लान देखें।", "प्लान देखकर डेमो बुकिंग की पुष्टि करें।", "इन-ट्रिप अनुभव देखने के लिए आगे बढ़ें।", "सुबह के विकल्प देखने के लिए नीचे का संदेश भेजें।", "कोई लोकल अनुभव चुनकर आज के प्लान में जोड़ें।", "आपका प्लान अपडेट हो गया। Plan में देखें या दूसरा अनुभव चुनें।"],
  group: ["Send the example below to start the group plan.", "Check the group brief, then select Looks right.", "Explore a destination that fits everyone.", "Review the group vote and finalise your stay.", "Review the shared itinerary and booking approval.", "Continue to Day 2 to try group coordination.", "Send the suggested message to explore split plans.", "Compare the options and choose a plan for the group.", "Review the changes before approving.", "Follow the updates, then view your bookings.", "The group plan is updated. Open Bookings to see the result."],
};

export function JourneyGuidance() {
  const { activePersonaId, personaStep } = useDemoStore();
  if (!activePersonaId) return null;
  const steps = nextSteps[activePersonaId];
  return <div className="journey-guidance"><Compass size={15} /><span><strong>{activePersonaId === "solo" ? "अगला कदम" : "Next step"}</strong>{steps[Math.min(personaStep[activePersonaId], steps.length - 1)]}</span></div>;
}

export function JourneyIntroduction() {
  const { activePersonaId, personaStep } = useDemoStore();
  if (!activePersonaId || personaStep[activePersonaId] !== 0) return null;
  const benefit = journeyBenefits[activePersonaId];
  return <section className="journey-introduction"><span className="intro-label">MEET YOUR TRAVEL COPILOT</span><h2>{benefit.title}</h2><p>{benefit.detail}</p><div className="intro-route"><ArrowRight size={16} /><span>{benefit.outcome}</span></div><div className="intro-control"><ShieldCheck size={15} />You review the options. You approve the changes.</div><small>Guided prototype · Sample trips · No real payments or supplier connections</small></section>;
}
