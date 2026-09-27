import { useState } from "react";
import { Bookmark, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { MyraBubble } from "@/components/MyraBubble";
import { freeTimeOptions } from "@/data/demoInventory";

export default function FreeTimePage() {
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  return (
    <AppShell title="Tonight">
      <div className="space-y-4 px-4 py-5">
        <MyraBubble from="user">We&apos;re free until 10 PM. What should we do?</MyraBubble>
        <MyraBubble>Here are three that fit tonight, based on where you are and your pace.</MyraBubble>

        <div className="space-y-3">
          {freeTimeOptions.map((opt) => (
            <Card key={opt.id}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-[var(--color-ink)]">{opt.title}</p>
                {opt.availableNow && <Chip tone="success">Now</Chip>}
              </div>
              <p className="mt-1 text-xs text-[var(--color-slate)]">
                {opt.distanceMin} min away · {opt.durationHrs} hrs · {opt.walking} walking · ₹{opt.cost.toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-xs italic text-[var(--color-slate)]">{opt.why}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdded((a) => ({ ...a, [opt.id]: true }))}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition ${
                    added[opt.id] ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : "bg-[var(--color-red)] text-white"
                  }`}
                >
                  {added[opt.id] ? (
                    <>
                      <Check size={13} /> Added
                    </>
                  ) : (
                    "Add to tonight"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setSaved((s) => ({ ...s, [opt.id]: !s[opt.id] }))}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)]"
                  aria-label="Save for later"
                >
                  <Bookmark size={15} className={saved[opt.id] ? "fill-[var(--color-navy)] text-[var(--color-navy)]" : "text-[var(--color-slate)]"} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
