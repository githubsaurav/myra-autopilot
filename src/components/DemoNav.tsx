import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useTripStore } from "@/state/tripStore";

const steps: { path: string; label: string }[] = [
  { path: "/booking-confirmed", label: "1. Booking confirmed" },
  { path: "/activate-myra", label: "2. Activate Myra" },
  { path: "/trip-home", label: "3. Trip home" },
  { path: "/free-time", label: "4. Free time" },
  { path: "/food-assist", label: "5. Food assistance" },
  { path: "/adapt-trip", label: "6. Adapt trip" },
  { path: "/disruption-alert", label: "7. Typhoon alert" },
  { path: "/recovery-options", label: "8. Recovery options" },
  { path: "/apply-changes", label: "9. Apply changes" },
  { path: "/applying-changes", label: "10. Coordination progress" },
  { path: "/updated-trip", label: "11. Updated trip" },
  { path: "/autopilot-settings", label: "12. Autopilot settings" },
  { path: "/next-trip-learning", label: "13. Next trip learning" },
  { path: "/myra-evolution", label: "Bonus: Myra evolution" },
];

export function DemoNav() {
  const [open, setOpen] = useState(true);
  const { resetDemo } = useTripStore();

  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
      {open ? (
        <div className="w-64 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-pop)]">
          <div className="flex items-center justify-between px-1 pb-2">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">Demo flow</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-[var(--color-slate)] hover:bg-black/5"
              aria-label="Collapse demo navigator"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <nav className="max-h-[70vh] space-y-0.5 overflow-y-auto app-scroll pr-1">
            {steps.map((step) => (
              <NavLink
                key={step.path}
                to={step.path}
                className={({ isActive }) =>
                  `block rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                    isActive ? "bg-[var(--color-navy)] text-white" : "text-[var(--color-ink)] hover:bg-black/5"
                  }`
                }
              >
                {step.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={resetDemo}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-slate)] hover:bg-black/5"
          >
            <RotateCcw size={13} /> Reset demo state
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-pop)]"
          aria-label="Expand demo navigator"
        >
          <ChevronLeft size={16} />
        </button>
      )}
    </div>
  );
}
