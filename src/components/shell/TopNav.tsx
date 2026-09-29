import { Link, useLocation } from "react-router-dom";

const productPaths = ["/trip", "/plan", "/myra", "/bookings", "/profile"];

export function TopNav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isProduct = productPaths.includes(pathname);

  return (
    <nav className="flex items-center gap-1 rounded-full bg-black/[0.04] p-1 text-xs font-semibold">
      <Link
        to="/"
        className={`rounded-full px-3 py-1.5 transition ${
          isHome ? "bg-[var(--color-surface)] text-[var(--color-navy)] shadow-sm" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
        }`}
      >
        Home
      </Link>
      <Link
        to="/trip"
        className={`rounded-full px-3 py-1.5 transition ${
          isProduct ? "bg-[var(--color-surface)] text-[var(--color-navy)] shadow-sm" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
        }`}
      >
        Myra Autopilot
      </Link>
    </nav>
  );
}
