import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";
import { useDemoStore } from "@/state/useDemoStore";

export function WhyThisMattersPanel() {
  const { activePersonaId, inspectorHistory } = useDemoStore();
  const history = activePersonaId ? inspectorHistory[activePersonaId] : [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history.length]);

  return (
    <aside className="hidden h-full w-[260px] shrink-0 flex-col lg:flex">
      <div className="my-6 ml-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-3.5">
          <Bot size={14} className="text-[var(--color-red)]" />
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[var(--color-navy)]">Myra capabilities</p>
            <p className="text-[10px] font-semibold text-[var(--color-slate)]">New as they happen</p>
          </div>
        </div>

        {history.length === 0 ? (
          <p className="px-4 py-5 text-xs leading-relaxed text-[var(--color-slate)]">
            Pick a scenario — each new capability Myra demonstrates will show up here as it happens.
          </p>
        ) : (
          <div ref={scrollRef} className="app-scroll min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3">
            {history.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`rounded-xl border p-3 ${
                  i === history.length - 1 ? "border-[var(--color-red)]/25 bg-[var(--color-red-soft)]" : "border-[var(--color-border)] bg-[var(--color-bg)]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[var(--color-red)]">
                    {i + 1}
                  </span>
                  <p className="text-xs font-semibold leading-snug text-[var(--color-ink)]">{entry.capability}</p>
                </div>
              </motion.div>
            ))}
            {history[history.length - 1]?.whyMMT && (
              <div className="rounded-xl bg-[var(--color-navy-soft)] p-3">
                <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-navy)]">
                  <Sparkles size={10} /> Why MakeMyTrip
                </p>
                <p className="mt-1 text-xs leading-snug text-[var(--color-ink)]">{history[history.length - 1].whyMMT}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
