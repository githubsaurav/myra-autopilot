import { ArrowLeft, ArrowUpRight, BatteryFull, Check, CloudRain, Coffee, MapPin, MoreHorizontal, Palette, Signal, Sparkles, Users, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDemoStore } from "@/state/useDemoStore";
import type { PersonaId } from "@/types/demo";

const previews = {
  family: {
    title: "In-trip assistance", context: "VIETNAM · DAY 5 · WITH FAMILY",
    prompt: "Rain tomorrow? We have a boat tour booked, and my parents can’t walk too much.",
    reply: "I’m on it. Here’s a gentler backup that keeps your trip together.",
    action: "Explore family assistance", footer: "You approve. Myra takes care of the details.",
  },
  solo: {
    title: "Local curation", context: "MAJULI · A DAY BEYOND THE GUIDEBOOK",
    prompt: "आज कुछ असली लोकल करना है — भीड़ से दूर, लोगों और उनकी कला के करीब।",
    reply: "आपके लिए तीन छोटे, खास अनुभव चुने हैं। आराम से, आपकी अपनी रफ़्तार पर।",
    action: "Explore solo discoveries", footer: "Less checklist. More connection.",
  },
  group: {
    title: "Group coordination", context: "GOA · 4 FRIENDS · ONE SHARED PLAN",
    prompt: "We all want different things. Can you get everyone on the same page?",
    reply: "I’ve brought everyone’s preferences together. Here’s the plan your group is leaning toward.",
    action: "Explore group coordination", footer: "Everyone gets a say. One plan stays in sync.",
  },
};

function FamilyPreview() {
  return <div className="preview-card">
    <div className="preview-alert"><CloudRain size={18} /><span><strong>Weather may affect your boat tour</strong><small>Let’s keep tomorrow comfortable.</small></span></div>
    <div className="preview-card-heading"><span>YOUR BACKUP PLAN</span><span className="preview-badge">For your approval</span></div>
    <div className="preview-plan-row"><span className="preview-time">10:00</span><div><strong>Indoor cultural experience</strong><small>Easy walking · sheltered from the rain</small></div></div>
    <div className="preview-plan-row"><span className="preview-time">12:30</span><div><strong>A vegetarian lunch nearby</strong><small>A short ride, then time to rest</small></div></div>
    <div className="preview-connected"><Check size={12} /> Tour, transfer & itinerary considered together</div>
  </div>;
}

function SoloPreview() {
  const places = [
    { icon: Palette, time: "10:00", title: "Meet a mask-making artisan", detail: "Samaguri Satra · craft & conversation", tag: "Local culture" },
    { icon: Coffee, time: "13:00", title: "A Mishing home-style lunch", detail: "Regional flavours · a slower afternoon", tag: "Local food" },
    { icon: MapPin, time: "16:30", title: "A quiet riverside sunset", detail: "Brahmaputra views · away from the crowds", tag: "Hidden corners" },
  ];
  return <div className="preview-local-list">{places.map(({ icon: Icon, ...place }) => <div className="preview-local-item" key={place.time}><span className="preview-local-icon"><Icon size={17} /></span><div><span className="preview-local-tag">{place.time} · {place.tag}</span><strong>{place.title}</strong><small>{place.detail}</small></div></div>)}<div className="preview-connected"><Sparkles size={12} /> Picked for your interests, pace & location</div></div>;
}

function GroupPreview() {
  return <div className="preview-card">
    <div className="preview-group-members"><span>A</span><span>P</span><span>R</span><span>Z</span><div><strong>Four friends. All heard.</strong><small>Budget · beaches · food · nightlife</small></div></div>
    <div className="preview-card-heading"><span>THE GROUP’S PICK</span><Users size={13} /></div>
    <div className="preview-vote"><div><strong>Shared villa · North Goa</strong><span>3 / 4 votes</span></div><div className="preview-vote-bar"><span /></div><small>Close to the beach · shared costs</small></div>
    <div className="preview-friend"><span>Z</span><p>“The villa works for me too. Close to the beach clubs!”<strong>Zoya · just voted</strong></p></div>
    <div className="preview-connected"><Check size={12} /> One shared itinerary, everyone in the loop</div>
  </div>;
}

export function MyraPhonePreview({ persona }: { persona: PersonaId }) {
  const navigate = useNavigate();
  const { setActivePersona } = useDemoStore();
  const preview = previews[persona];
  return <article className={`phone-stage phone-preview-${persona}`}>
    <div className="preview-heading"><span className="eyebrow">{persona === "family" ? "01 · FAMILY" : persona === "solo" ? "02 · SOLO" : "03 · GROUP"}</span><h3>{preview.title}</h3></div>
    <div className="phone-device" aria-label={`${preview.title} mobile preview`}>
      <div className="phone-status" aria-hidden="true"><span>9:41</span><span className="phone-island" /><span><Signal size={12} /><Wifi size={12} /><BatteryFull size={16} /></span></div>
      <div className="phone-brand"><img src="/makemytrip-logo.svg" alt="MakeMyTrip" /><span>MYRA AUTOPILOT</span></div>
      <div className="phone-header"><ArrowLeft size={17} aria-hidden="true" /><span className="myra-avatar"><Sparkles size={18} /></span><div><strong>Myra Copilot</strong><small><i /> {preview.title}</small></div><MoreHorizontal size={20} aria-hidden="true" /></div>
      <div className="phone-conversation">
        <div className="phone-date">{preview.context}</div>
        <div className="phone-user" lang={persona === "solo" ? "hi" : "en"}>{preview.prompt}</div>
        <div className="phone-reply"><span><Sparkles size={13} /> MYRA</span><p lang={persona === "solo" ? "hi" : "en"}>{preview.reply}</p></div>
        {persona === "family" ? <FamilyPreview /> : persona === "solo" ? <SoloPreview /> : <GroupPreview />}
      </div>
      <button className="preview-open" onClick={() => { setActivePersona(persona); navigate("/myra"); }}>{preview.action}<ArrowUpRight size={14} /></button>
      <div className="phone-home-indicator" aria-hidden="true" />
    </div>
    <p className="phone-caption">{preview.footer}</p>
  </article>;
}
