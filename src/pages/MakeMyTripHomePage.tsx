import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Compass, ShieldCheck, HeartHandshake } from "lucide-react";
import { MyraPhonePreview } from "@/components/MyraPhonePreview";

export default function MakeMyTripHomePage() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Link to="/" aria-label="MakeMyTrip home"><img src="/makemytrip-logo.svg" alt="MakeMyTrip" /></Link>
        <span className="landing-nav-label">A little more trip. A lot less planning.</span>
        <Link to="/trip" className="nav-trip">My trips <ArrowRight size={15} /></Link>
      </header>
      <main>
        <section className="landing-hero three-screen-hero">
          <div className="landing-copy">
            <span className="eyebrow"><span className="status-dot" /> INTRODUCING MYRA AUTOPILOT</span>
            <h1>Every trip is different.<br /><em>Myra stays by your side.</em></h1>
            <p>Your plans, your people, your kind of travel. Meet the companion that connects every detail—and stays with you when plans change.</p>
            <Link to="/myra" className="primary-cta">Meet your travel companion <ArrowRight size={18} /></Link>
            <div className="hero-note"><ShieldCheck size={15} /> Your preferences. Your approval. Always.</div>
          </div>
        </section>
        <section className="showcase-section" aria-labelledby="showcase-title">
          <div className="section-heading"><div><span className="eyebrow">ONE COMPANION. THREE WAYS TO TRAVEL BETTER.</span><h2 id="showcase-title">See Myra in the moments that matter.</h2></div><span className="demo-tag">Illustrative conversations · Interactive journeys</span></div>
          <div className="phone-showcase"><MyraPhonePreview persona="family" /><MyraPhonePreview persona="solo" /><MyraPhonePreview persona="group" /></div>
        </section>
        <section className="promise-row"><div><Compass size={20} /><span><strong>Knows your kind of travel</strong><small>Built around what matters to you.</small></span></div><div><Sparkles size={20} /><span><strong>Connects the whole trip</strong><small>From the first idea to the way home.</small></span></div><div><HeartHandshake size={20} /><span><strong>Keeps you in control</strong><small>You approve the important decisions.</small></span></div></section>
      </main>
      <footer className="landing-footer"><span>MakeMyTrip × Myra Autopilot</span><span>Case competition prototype · Simulated bookings & responses</span></footer>
    </div>
  );
}
