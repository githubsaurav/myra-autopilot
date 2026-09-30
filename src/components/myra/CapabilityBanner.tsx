import { Sparkles } from "lucide-react";

export function CapabilityBanner({ label }: { label: string }) {
  return (
    <div className="capability-banner flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-navy-soft)] px-5 py-2">
      <Sparkles size={12} className="shrink-0 text-[var(--color-navy)]" />
      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--color-navy)]">
        Here to help with <span className="font-black">{label}</span>
      </p>
    </div>
  );
}
