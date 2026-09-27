import { useNavigate } from "react-router-dom";
import { CloudLightning } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MyraBubble } from "@/components/MyraBubble";
import { useTripStore } from "@/state/tripStore";

export default function DisruptionAlertPage() {
  const navigate = useNavigate();
  const { disruption } = useTripStore();

  return (
    <AppShell title="Trip Alert">
      <div className="space-y-5 px-4 py-6">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-red-soft)] text-[var(--color-red)]">
            <CloudLightning size={26} />
          </span>
          <div>
            <p className="text-lg font-black text-[var(--color-ink)]">{disruption.headline}</p>
            <p className="mt-1 text-sm text-[var(--color-slate)]">{disruption.detail}</p>
          </div>
        </div>

        <p className="rounded-xl bg-black/[0.03] px-3.5 py-3 text-center text-sm text-[var(--color-ink)]">
          This could affect your {disruption.dependencyChain.slice(0, -1).join(", ").toLowerCase()} and{" "}
          {disruption.dependencyChain.at(-1)?.toLowerCase()}.
        </p>

        <MyraBubble>I found two ways to handle this.</MyraBubble>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate("/recovery-options")}
            className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            See your options
          </button>
          <button
            type="button"
            onClick={() => navigate("/trip-home")}
            className="w-full py-2 text-center text-xs font-semibold text-[var(--color-slate)]"
          >
            I&apos;ll handle it myself
          </button>
        </div>
      </div>
    </AppShell>
  );
}
