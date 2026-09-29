import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { useDemoStore } from "@/state/useDemoStore";

export function NoTripNotice() {
  const navigate = useNavigate();
  const { setActiveScenario } = useDemoStore();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
      <Info size={22} className="text-[var(--color-slate)]" />
      <p className="text-sm font-semibold text-[var(--color-ink)]">This scenario continues from an active trip.</p>
      <p className="text-xs text-[var(--color-slate)]">Run Scenario 1 first to create the Vietnam trip, then come back here.</p>
      <button
        type="button"
        onClick={() => {
          setActiveScenario("1");
          navigate("/myra");
        }}
        className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-xs font-bold text-white"
      >
        Go to Scenario 1
      </button>
    </div>
  );
}
