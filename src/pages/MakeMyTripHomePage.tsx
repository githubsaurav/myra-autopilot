import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Sparkles, Check, Compass, ShieldCheck, HeartHandshake } from "lucide-react";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";

export default function MakeMyTripHomePage() {
  const navigate = useNavigate();
  const { setActivePersona } = useDemoStore();
  return (
    <div className="landing">
      <header className="landing-nav">
        <Link to="/" aria-label="MakeMyTrip home"><img src="/makemytrip-logo.svg" alt="MakeMyTrip" /></Link>
        <span className="landing-nav-label">A little more trip. A lot less planning.</span>
        <Link to="/trip" className="nav-trip">My trips <ArrowUpRight size={15} /></Link>
      </header>
      <main>
        <section className="landing-hero">
          <div className="landing-copy">
            <span className="eyebrow"><span className="status-dot" /> INTRODUCING MYRA AUTOPILOT</span>
            <h1>You make<br />the memories.<br /><em>Myra makes<br className="desktop-break" /> it happen.</em></h1>
            <p>Your plans, your people, your kind of travel. Meet the companion that connects every detail—and stays with you when plans change.</p>
            <Link to="/myra" className="primary-cta">Meet your travel companion <ArrowRight size={18} /></Link>
            <div className="hero-note"><ShieldCheck size={15} /> Your preferences. Your approval. Always.</div>
          </div>
          <div className="landing-art">
            <img src="/travel-landscape.svg" alt="Illustration of a sailboat among the limestone islands of Vietnam" />
            <div className="destination-caption"><span>LESS PLANNING. MORE BEING HERE.</span><strong>Somewhere you’ll remember.</strong></div>
            <div className="floating-message"><span className="myra-avatar"><Sparkles size={19} /></span><div><strong>A little change of plans? I’m on it.</strong><p>Weather shifted. Your trip doesn’t have to.</p><span><Check size={12} /> A backup plan, ready for your approval</span></div></div>
            <span className="art-coordinate">VIETNAM · 20.9101° N, 107.1839° E</span>
          </div>
        </section>
        <section className="journey-section">
          <div className="section-heading"><div><span className="eyebrow">ONE COMPANION. EVERY KIND OF TRIP.</span><h2>Where shall we begin?</h2></div><span className="demo-tag">Interactive concept · Sample trips</span></div>
          <div className="journey-cards">{personas.map((persona, i) => {
            const Icon = persona.icon;
            const descriptions = ["A slower pace. Vegetarian finds. Every detail taken care of, together.", "Follow your curiosity. Find the places that never make the usual lists.", "Different budgets. Different wish lists. One trip everyone can get behind."];
            return <button className={`journey-card journey-${persona.id}`} key={persona.id} onClick={() => { setActivePersona(persona.id); navigate("/myra"); }}><div className="journey-card-top"><span className="journey-icon"><Icon size={21} /></span><span>0{i + 1}</span></div><h3>{persona.name === "Family Trip" ? "Bring your favourite people." : persona.name === "Solo Trip" ? "Take the road less travelled." : "Get the whole group on board."}</h3><p>{descriptions[i]}</p><div className="journey-card-bottom"><span>{persona.name} · {persona.languageLabel}</span><ArrowUpRight size={20} /></div></button>;
          })}</div>
        </section>
        <section className="promise-row"><div><Compass size={20} /><span><strong>Knows your kind of travel</strong><small>Built around what matters to you.</small></span></div><div><Sparkles size={20} /><span><strong>Connects the whole trip</strong><small>From the first idea to the way home.</small></span></div><div><HeartHandshake size={20} /><span><strong>Keeps you in control</strong><small>You approve the important decisions.</small></span></div></section>
      </main>
      <footer className="landing-footer"><span>MakeMyTrip × Myra Autopilot</span><span>Case competition prototype · Simulated bookings & responses</span></footer>
    </div>
  );
}
