import { Link, NavLink, Outlet } from "react-router-dom";
import { MapPinned, CalendarDays, Sparkles, Ticket, User, Radar, RotateCcw } from "lucide-react";
import { useDemoStore } from "@/state/useDemoStore";
import { TopNav } from "@/components/shell/TopNav";

const tabs = [
  { to: "/trip", label: "Trip", icon: MapPinned },
  { to: "/plan", label: "Plan", icon: CalendarDays },
  { to: "/myra", label: "Myra", icon: Sparkles },
  { to: "/bookings", label: "Bookings", icon: Ticket },
  { to: "/profile", label: "Profile", icon: User },
];

export function MakeMyTripAppShell() {
  const { toggleInspector, resetDemo } = useDemoStore();

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col bg-[var(--color-bg)]">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-y-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5">
        <div className="flex items-center gap-3">
          <Link to="/" title="Back to MakeMyTrip home">
            <img src="/makemytrip-logo.svg" alt="MakeMyTrip" className="h-6 w-auto" />
          </Link>
          <TopNav />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleInspector}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] hover:bg-black/5"
            title="See what Myra is doing behind the scenes"
          >
            <Radar size={13} className="text-[var(--color-navy)]" />
            Agent Insights
          </button>
          <button
            type="button"
            onClick={resetDemo}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-slate)] hover:bg-black/5"
            aria-label="Reset demo"
            title="Reset demo"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </div>

      <nav className="grid shrink-0 grid-cols-5 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
                isActive ? "text-[var(--color-navy)]" : "text-[var(--color-slate)]"
              }`
            }
          >
            <Icon size={19} strokeWidth={2.2} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
