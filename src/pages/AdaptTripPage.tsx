import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { MyraBubble } from "@/components/MyraBubble";
import { useTripStore } from "@/state/tripStore";
import { originalDay5, adaptedDay5 } from "@/data/demoTrip";

export default function AdaptTripPage() {
  const navigate = useNavigate();
  const { adaptApplied, applyLighterDay } = useTripStore();

  return (
    <AppShell title="Adapt My Trip">
      <div className="space-y-5 px-4 py-5">
        <MyraBubble from="user">Yesterday was exhausting. Can we make today more relaxed?</MyraBubble>
        <MyraBubble>I can reduce today&apos;s travel by 2.5 hours without removing your must-do experiences.</MyraBubble>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <SectionLabel>Before</SectionLabel>
            <Card className="space-y-2 p-3">
              {originalDay5.map((item) => (
                <div key={item.id} className="text-xs">
                  <span className="font-semibold text-[var(--color-slate)]">{item.time}</span>{" "}
                  <span className="text-[var(--color-ink)]">{item.title}</span>
                </div>
              ))}
              <div className="text-xs text-[var(--color-slate)]">Day 6: + distant attraction</div>
            </Card>
          </div>
          <div>
            <SectionLabel>Proposed</SectionLabel>
            <Card className="space-y-2 border-[var(--color-navy)]/25 bg-[var(--color-navy-soft)] p-3">
              {adaptedDay5.map((item) => (
                <div key={item.id} className="text-xs">
                  <span className="font-semibold text-[var(--color-navy)]">{item.time}</span>{" "}
                  <span className="text-[var(--color-ink)]">{item.title}</span>
                  {item.tag && (
                    <span className="ml-1 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase text-[var(--color-navy)]">
                      {item.tag}
                    </span>
                  )}
                </div>
              ))}
              <div className="text-xs font-semibold text-[var(--color-navy)]">Distant attraction → moved to Day 6</div>
            </Card>
          </div>
        </div>

        <p className="rounded-xl bg-[var(--color-success-soft)] px-3.5 py-3 text-sm font-medium text-[var(--color-ink)]">
          2.5 hrs less travel, 35% less walking, no extra cost — your must-dos stay.
        </p>

        {adaptApplied ? (
          <div className="flex items-center gap-2 rounded-xl bg-[var(--color-success-soft)] p-3 text-sm font-semibold text-[var(--color-success)]">
            <CheckCircle2 size={16} /> Itinerary updated — Day 5 is lighter now.
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              applyLighterDay();
              navigate("/trip-home");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Update itinerary <ArrowRight size={15} />
          </button>
        )}
      </div>
    </AppShell>
  );
}
