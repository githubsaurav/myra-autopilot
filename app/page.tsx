import { Hero } from "@/components/Hero";
import { EntrySection } from "@/components/EntrySection";
import { AutopilotLoop } from "@/components/AutopilotLoop";
import { EcosystemSection } from "@/components/EcosystemSection";
import { AutonomySection } from "@/components/AutonomySection";
import { EvolutionStrip } from "@/components/EvolutionStrip";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <EntrySection />
      <AutopilotLoop />
      <EcosystemSection />
      <AutonomySection />
      <EvolutionStrip />
      <footer className="pb-10 text-center text-xs text-[var(--color-slate)]">
        Myra Travel Autopilot — a MakeMyTrip solution prototype.
      </footer>
    </main>
  );
}
