import type { ReactNode } from "react";

/** Gradient "photo" banner standing in for a destination image — keeps the
 * trip screens feeling like a real app opener rather than a data sheet. */
export function DestinationHero({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  return (
    <div className="destination-hero relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-navy)] via-[#124a8c] to-[#1e6bb8] px-4 py-5 text-white">
      <div className="pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-8 left-10 h-20 w-20 rounded-full bg-white/10" />
      <p className="text-xs font-medium text-white/75">{subtitle}</p>
      <h1 className="mt-0.5 text-2xl font-bold tracking-tight">{title}</h1>
      {children}
    </div>
  );
}
