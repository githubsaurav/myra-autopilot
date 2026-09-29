import { useNavigate } from "react-router-dom";
import { Plane, Building2, Home as HomeIcon, TrainFront, Bus, Package, Sparkles, ArrowRight, ShieldCheck, Headset, BadgePercent } from "lucide-react";
import { TopNav } from "@/components/shell/TopNav";

const categories = [
  { icon: Plane, label: "Flights" },
  { icon: Building2, label: "Hotels" },
  { icon: HomeIcon, label: "Homestays" },
  { icon: TrainFront, label: "Trains" },
  { icon: Bus, label: "Buses" },
  { icon: Package, label: "Holidays" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Secure payments" },
  { icon: BadgePercent, label: "Best price guarantee" },
  { icon: Headset, label: "24x7 support" },
];

export default function MakeMyTripHomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-[var(--color-bg)]">
      <header className="flex flex-wrap items-center justify-between gap-y-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3">
        <div className="flex items-center gap-3">
          <img src="/makemytrip-logo.svg" alt="MakeMyTrip" className="h-6 w-auto" />
          <TopNav />
        </div>
        <nav className="flex items-center gap-5 text-xs font-semibold text-[var(--color-slate)]">
          <span>My Trips</span>
          <span className="hidden sm:inline">Support</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[var(--color-navy)]">A</span>
        </nav>
      </header>

      <main className="mx-auto max-w-[880px] px-5 py-6">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {categories.map(({ icon: Icon, label }) => (
            <div key={label} className="flex cursor-default flex-col items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3">
              <Icon size={18} className="text-[var(--color-navy)]" />
              <span className="text-[11px] font-semibold text-[var(--color-ink)]">{label}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/trip")}
          className="group relative mt-6 flex w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-navy)] via-[#124a8c] to-[#1e6bb8] px-6 py-8 text-left shadow-[var(--shadow-pop)] transition hover:opacity-95 sm:px-10 sm:py-10"
        >
          <div className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 left-16 h-28 w-28 rounded-full bg-white/10" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-red)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              <Sparkles size={11} /> New
            </span>
            <p className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">Myra Autopilot</p>
            <p className="mt-2 max-w-md text-xs text-white/80 sm:text-sm">
              Your AI travel companion — plan smarter, and let Myra stay with your trip from planning to the moment it happens.
            </p>
          </div>
          <ArrowRight size={28} className="relative shrink-0 text-white transition group-hover:translate-x-1" />
        </button>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-4 text-center">
              <Icon size={16} className="text-[var(--color-slate)]" />
              <span className="text-[10px] font-semibold text-[var(--color-slate)]">{label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
