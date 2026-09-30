import { ArrowLeft, ArrowUp, ArrowUpRight, BatteryFull, Check, MapPin, MoreHorizontal, Signal, Sparkles, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDemoStore } from "@/state/useDemoStore";

export function MyraHeroPhonePreview() {
  const navigate = useNavigate();
  const { setActivePersona } = useDemoStore();
  function openMyra() {
    setActivePersona("family");
    navigate("/myra");
  }
  return (
    <div className="phone-stage">
      <div className="phone-orbit" aria-hidden="true" />
      <div className="phone-device" aria-label="Mobile preview of Myra Copilot">
        <div className="phone-status" aria-hidden="true"><span>9:41</span><span className="phone-island" /><span><Signal size={12} /><Wifi size={12} /><BatteryFull size={16} /></span></div>
        <div className="phone-brand"><img src="/makemytrip-logo.svg" alt="MakeMyTrip" /><span>YOUR TRAVEL COMPANION</span></div>
        <div className="phone-header"><ArrowLeft size={17} aria-hidden="true" /><span className="myra-avatar"><Sparkles size={18} /></span><div><strong>Myra Copilot</strong><small><i /> Here for your whole trip</small></div><MoreHorizontal size={20} aria-hidden="true" /></div>
        <div className="phone-conversation">
          <div className="phone-date">A LITTLE INSPIRATION FOR YOUR NEXT TRIP</div>
          <div className="phone-user">Somewhere beautiful with my parents. Easy days, great food. Around ₹1.5L.</div>
          <div className="phone-reply"><span><Sparkles size={13} /> MYRA</span><p>I have just the place. A little culture, a little coast, and plenty of time together.</p></div>
          <div className="phone-destination"><div className="phone-destination-photo"><img src="/travel-landscape.svg" alt="Vietnam’s island landscape" /><span><Sparkles size={10} /> PICKED FOR YOU</span></div><div className="phone-destination-body"><div><strong>Vietnam, at your pace.</strong><MapPin size={13} /></div><p>6 days · 3 travellers · October</p><div className="phone-preferences"><span><Check size={10} /> Veg-friendly</span><span><Check size={10} /> Relaxed pace</span></div><div className="phone-price"><span>From <strong>₹1,32,000</strong><small>Estimated trip total</small></span><button onClick={openMyra}>Explore trip <ArrowUpRight size={13} /></button></div></div></div>
          <div className="phone-followup"><Sparkles size={12} /><span>And if plans change? I’ll help you find a way.</span></div>
        </div>
        <button className="phone-input" onClick={openMyra}><span>Let’s make this trip yours…</span><span><ArrowUp size={17} /></span></button>
        <div className="phone-home-indicator" aria-hidden="true" />
      </div>
      <div className="phone-caption"><span className="status-dot" /> A conversation. A whole trip, connected.</div>
    </div>
  );
}
