import { useNavigate } from "react-router-dom";
import { CloudLightning, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { MyraBubble } from "@/components/MyraBubble";
import { useTripStore } from "@/state/tripStore";

export default function DisruptionAlertPage() {
  const navigate = useNavigate();
  const { disruption } = useTripStore();

  return (
    <AppShell title="Disruption Alert">
      <div className="space-y-5 px-4 py-5">
        <div className="rounded-2xl border border-[var(--color-red)]/25 bg-[var(--color-red-soft)] p-4">
          <div className="flex items-center gap-2 text-[var(--color-red)]">
            <CloudLightning size={20} />
            <p className="text-base font-black">{disruption.headline}</p>
          </div>
          <p className="mt-1.5 text-sm text-[var(--color-ink)]">{disruption.detail}</p>
        </div>

        <div>
          <SectionLabel>What this affects</SectionLabel>
          <Card>
            <div className="flex flex-wrap items-center gap-1.5">
              {disruption.dependencyChain.map((node, i) => (
                <div key={node} className="flex items-center gap-1.5">
                  <span className="rounded-lg bg-black/[0.04] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-ink)]">
                    {node}
                  </span>
                  {i < disruption.dependencyChain.length - 1 && <ChevronRight size={13} className="text-[var(--color-slate)]" />}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <MyraBubble>I checked the rest of your trip and found two workable recovery plans.</MyraBubble>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate("/recovery-options")}
            className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Review recovery options
          </button>
          <button
            type="button"
            onClick={() => navigate("/trip-home")}
            className="w-full rounded-xl border border-[var(--color-border)] py-3 text-sm font-semibold text-[var(--color-slate)] hover:bg-black/[0.03]"
          >
            I&apos;ll handle it myself
          </button>
        </div>
      </div>
    </AppShell>
  );
}
