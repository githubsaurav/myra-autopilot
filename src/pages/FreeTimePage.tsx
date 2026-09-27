import { useState } from "react";
import { MapPin, Clock3, Users, Utensils, Wallet, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, SectionLabel } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { MyraBubble } from "@/components/MyraBubble";
import { freeTimeOptions } from "@/data/demoInventory";

export default function FreeTimePage() {
  const [added, setAdded] = useState<Record<string, boolean>>({});

  return (
    <AppShell title="Free Time">
      <div className="space-y-5 px-4 py-5">
        <MyraBubble from="user">We&apos;re free until 10 PM. What should we do?</MyraBubble>
        <MyraBubble>I found three options that fit your context below.</MyraBubble>

        <Card>
          <SectionLabel>Using your context</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            <Chip tone="navy"><MapPin size={11} /> Current location</Chip>
            <Chip tone="navy"><Clock3 size={11} /> 4-hour window</Chip>
            <Chip tone="navy"><Users size={11} /> 3 travellers</Chip>
            <Chip tone="navy">Parents prefer less walking</Chip>
            <Chip tone="navy"><Utensils size={11} /> Vegetarian</Chip>
            <Chip tone="navy"><Wallet size={11} /> Moderate budget</Chip>
          </div>
        </Card>

        <div className="space-y-3">
          {freeTimeOptions.map((opt) => (
            <Card key={opt.id}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-[var(--color-ink)]">{opt.title}</p>
                {opt.availableNow && <Chip tone="success">Available now</Chip>}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-[var(--color-slate)]">
                <span>{opt.distanceMin} min away</span>
                <span>·</span>
                <span>{opt.durationHrs} hrs</span>
                <span>·</span>
                <span className="capitalize">{opt.walking} walking</span>
                <span>·</span>
                <span>{opt.vegetarian ? "Vegetarian friendly" : "Mixed menu"}</span>
                <span>·</span>
                <span>₹{opt.cost.toLocaleString("en-IN")} total</span>
              </div>
              <p className="mt-2 rounded-lg bg-black/[0.03] px-2.5 py-1.5 text-xs text-[var(--color-ink)]">
                <span className="font-semibold">Why this? </span>
                {opt.why}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdded((a) => ({ ...a, [opt.id]: true }))}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
                    added[opt.id] ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : "bg-[var(--color-red)] text-white"
                  }`}
                >
                  {added[opt.id] ? (
                    <>
                      <Check size={13} /> Added to tonight
                    </>
                  ) : (
                    "Add to tonight"
                  )}
                </button>
                <button type="button" className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-slate)]">
                  Compare
                </button>
                <button type="button" className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-slate)]">
                  Save
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
