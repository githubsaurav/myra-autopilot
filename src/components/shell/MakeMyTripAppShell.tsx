import { NavLink, Outlet } from "react-router-dom";
import { MapPinned, CalendarDays, Sparkles, Ticket, User } from "lucide-react";

const tabs = [
  { to: "/trip", label: "Trip", icon: MapPinned },
  { to: "/plan", label: "Plan", icon: CalendarDays },
  { to: "/myra", label: "Myra", icon: Sparkles },
  { to: "/bookings", label: "Bookings", icon: Ticket },
  { to: "/profile", label: "Profile", icon: User },
];

export function MakeMyTripAppShell() {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col bg-[var(--color-bg)]">
      <header className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3">
        <div className="flex items-center gap-1 text-[15px] font-black tracking-tight text-[var(--color-navy)]">
          make
          <span className="rounded-md bg-[var(--color-red)] px-1.5 py-0.5 text-white">my</span>
          trip
        </div>
        <nav className="hidden items-center gap-5 text-xs font-semibold text-[var(--color-slate)] sm:flex">
          <NavLink to="/trip" className={({ isActive }) => (isActive ? "text-[var(--color-navy)]" : "")}>
            My Trips
          </NavLink>
          <NavLink to="/bookings" className={({ isActive }) => (isActive ? "text-[var(--color-navy)]" : "")}>
            Bookings
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-[var(--color-navy)]" : "")}>
            Profile
          </NavLink>
        </nav>
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
