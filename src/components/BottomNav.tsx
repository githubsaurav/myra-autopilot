import { NavLink } from "react-router-dom";
import { MapPinned, CalendarDays, Sparkles, Ticket } from "lucide-react";

const tabs = [
  { to: "/trip-home", label: "Trip", icon: MapPinned },
  { to: "/free-time", label: "Plan", icon: CalendarDays },
  { to: "/autopilot-settings", label: "Myra", icon: Sparkles },
  { to: "/booking-confirmed", label: "Bookings", icon: Ticket },
];

export function BottomNav() {
  return (
    <nav className="grid grid-cols-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
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
  );
}
