import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { MapPinned, CalendarDays, Sparkles, Ticket, User, Radar, RotateCcw, Bell, Heart } from "lucide-react";
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
  const [bellOpen, setBellOpen] = useState(false);

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col bg-[var(--color-bg)]">
      <header className="relative flex shrink-0 flex-wrap items-center justify-between gap-y-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5">
        <div className="flex items-center gap-3">
          <Link to="/" title="Back to MakeMyTrip home">
            <img src="/makemytrip-logo.svg" alt="MakeMyTrip" className="h-6 w-auto" />
          </Link>
          <TopNav />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setBellOpen((v) => !v)}
              className="relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-black/5"
              aria-label="Proactive notifications"
              title="Proactive notifications"
            >
              <Bell size={15} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-red)]" />
            </button>
            {bellOpen && (
              <div className="absolute right-0 top-10 z-50 w-[280px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 text-left shadow-[var(--shadow-pop)]">
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-slate)]">
                  <Heart size={11} className="text-[var(--color-red)]" /> From Myra
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-ink)]">
                  Hope Vietnam's been amazing so far! I noticed tomorrow's weather might affect your Day 6 boat tour — want me to look at backup plans?
                </p>
                <p className="mt-2.5 border-t border-[var(--color-border)] pt-2 text-[10px] font-semibold text-[var(--color-slate)]">
                  ✓ Sent to your phone
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={toggleInspector}
            className="flex items-center gap-1.5 rounded-full bg-[var(--color-navy-soft)] px-3 py-1.5 text-xs font-bold text-[var(--color-navy)] hover:opacity-80"
            title="See what Myra is doing behind the scenes"
          >
            <Radar size={13} />
            Agent Insights
          </button>
          <button
            type="button"
            onClick={resetDemo}
            className="flex items-center gap-1.5 rounded-full bg-[var(--color-red-soft)] px-3 py-1.5 text-xs font-bold text-[var(--color-red)] hover:opacity-80"
            aria-label="Reset demo"
            title="Reset demo — back to the starting scenarios"
          >
            <RotateCcw size={13} />
            Reset demo
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
