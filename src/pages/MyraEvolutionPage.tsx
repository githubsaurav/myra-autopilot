import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";

const today = ["Search", "Compare", "Book", "Chat"];
const autopilot = ["Persistent Trip Graph", "Live context", "Dynamic adaptation", "Connected recovery", "Approved execution", "Learning"];

export default function MyraEvolutionPage() {
  return (
    <AppShell title="Myra Evolution">
      <div className="space-y-5 px-4 py-5">
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <SectionLabel>Myra today</SectionLabel>
            <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
              {today.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </Card>
          <Card className="border-[var(--color-navy)]/25 bg-[var(--color-navy-soft)]">
            <SectionLabel>Myra autopilot</SectionLabel>
            <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
              {autopilot.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-2xl bg-black/[0.04] py-4 text-center text-sm font-black text-[var(--color-ink)]">
          <span>Assistant</span>
          <span className="text-[var(--color-slate)]">→</span>
          <span>Orchestrator</span>
          <span className="text-[var(--color-slate)]">→</span>
          <span className="text-[var(--color-red)]">Autopilot</span>
        </div>

        <p className="text-center text-sm font-semibold text-[var(--color-ink)]">
          The shift is from conversational booking to persistent trip orchestration.
        </p>
      </div>
    </AppShell>
  );
}
