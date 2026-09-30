import { useState } from "react";
import { CalendarDays, ChevronDown, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PersonaSelector } from "@/components/shell/PersonaSelector";
import { useDemoStore } from "@/state/useDemoStore";
import type { PersonaId, PersonaMeta } from "@/types/demo";

export function MyraHeader({ tripLabel, persona, onChangePersona }: {
  tripLabel?: string; persona?: PersonaMeta; onChangePersona?: (id: PersonaId) => void;
}) {
  const [contextOpen, setContextOpen] = useState(false);
  const { trips, travellers } = useDemoStore();
  const trip = persona ? trips[persona.id] : null;
  const traveller = persona ? travellers[persona.id] : null;
  return <header className="chat-header-v2">
    <div className="chat-header-main"><span className="chat-brand-mark"><Sparkles size={22} /></span><div className="chat-header-title"><span>YOUR TRAVEL, TAKEN CARE OF</span><h1>Myra Autopilot</h1><p>{tripLabel ?? "A little inspiration. A plan that feels like you."}</p></div><span className="chat-demo-badge">Interactive demo</span></div>
    {persona && onChangePersona && <div className="chat-context-toolbar"><PersonaSelector value={persona.id} onChange={onChangePersona} variant="pill" /><span className="chat-language">{persona.languageLabel}</span><button className="chat-context-toggle" aria-expanded={contextOpen} onClick={() => setContextOpen(v => !v)}>Trip context <ChevronDown size={12} /></button></div>}
    {contextOpen && traveller && <div className="trip-context-details"><span><MapPin size={13} />{trip?.destination ?? "Choosing a destination"}</span><span><Users size={13} />{trip ? `${trip.travellers} travellers` : persona?.name}</span><span><CalendarDays size={13} />{trip ? `${trip.startDate} – ${trip.endDate}` : "Dates flexible"}</span><span><ShieldCheck size={13} />₹{traveller.spendLimit.toLocaleString("en-IN")} extra-spend limit</span><Link to="/profile">Edit preferences →</Link></div>}
  </header>;
}
