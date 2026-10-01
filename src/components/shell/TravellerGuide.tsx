import { Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";
import { journeyBenefits } from "@/data/journeyBenefits";

export function TravellerGuide() {
  const { activePersonaId, setActivePersona, personaStage, trips, toggleInspector } = useDemoStore();
  const navigate = useNavigate();
  return <aside className="traveller-guide" aria-label="Explore Myra">
    <div className="guide-brand"><Sparkles size={22} /><span>Myra<span>YOUR TRAVEL COPILOT</span></span></div>
    <h2>Your trip.<br />Less to juggle.</h2><p>From the first idea to a change of plans, see how Myra turns travel decisions into an updated trip.</p>
    <span className="guide-label">TRY A JOURNEY</span>
    <div className="guide-journeys">{personas.map(p => { const Icon = p.icon; return <button key={p.id} aria-pressed={activePersonaId === p.id} onClick={() => { setActivePersona(p.id); navigate('/myra'); }}><Icon size={19} /><span><strong>{p.name}</strong><small>{p.id === 'family' ? 'Recover from a disruption' : p.id === 'solo' ? 'Discover something local' : 'Get everyone in sync'}</small></span><ArrowUpRight size={14} /></button>; })}</div>
    {activePersonaId && <section className="guide-outcome"><span className="guide-label">WHAT THIS JOURNEY SHOWS</span><p>{journeyBenefits[activePersonaId].outcome}</p><span className="guide-stage">{trips[activePersonaId]?.destination ?? 'Finding your destination'} · {personaStage[activePersonaId] === 'intrip' ? 'In-trip assistance' : personaStage[activePersonaId]}</span></section>}
    <div className="guide-footer"><ShieldCheck size={18} /><p><strong>You stay in control</strong>Review costs and approve proposed changes before they’re applied.</p></div>
    <button className="guide-insights" onClick={toggleInspector}>How this demo works <ArrowUpRight size={13} /></button>
    <small className="guide-disclaimer">Interactive prototype. Bookings, payments and live conditions are simulated.</small>
  </aside>;
}
