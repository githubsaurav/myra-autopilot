import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import { useDemoStore } from "@/state/useDemoStore";

export function AgentBackendPanel() {
  const { activePersonaId, inspectorHistory } = useDemoStore();
  const history = activePersonaId ? inspectorHistory[activePersonaId] : [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history.length]);

  const latest = history[history.length - 1];

  return (
    <aside className="hidden h-full w-[300px] shrink-0 flex-col xl:flex">
      <div className="my-6 mr-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-3.5">
          <Radar size={14} className="text-[var(--color-navy)]" />
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[var(--color-navy)]">Agent backend</p>
            <p className="text-[10px] font-semibold text-[var(--color-slate)]">Steps taken so far</p>
          </div>
        </div>

        {history.length === 0 ? (
          <p className="px-4 py-5 text-xs leading-relaxed text-[var(--color-slate)]">
            Every step the agent takes to fulfil the request will appear here as it happens.
          </p>
        ) : (
          <>
            <div ref={scrollRef} className="app-scroll min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3">
              {history.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`rounded-xl border p-3 ${
                    i === history.length - 1 ? "border-[var(--color-navy)]/25 bg-[var(--color-navy-soft)]" : "border-[var(--color-border)] bg-[var(--color-bg)]"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[var(--color-navy)]">
                      {i + 1}
                    </span>
                    <p className="text-xs font-semibold leading-snug text-[var(--color-ink)]">{entry.backendAction}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {latest && (
              <div className="border-t border-[var(--color-border)] px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  {latest.contextUsed.map((c) => (
                    <span key={c} className="rounded-full bg-[var(--color-navy-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-navy)]">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-[var(--color-slate)]">State change</p>
                <p className="text-xs font-semibold text-[var(--color-navy)]">{latest.stateChange}</p>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
