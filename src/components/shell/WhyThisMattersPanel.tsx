import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { personas } from "@/data/demoPersonas";
import { Sparkles, Bot } from "lucide-react";
import { useDemoStore } from "@/state/useDemoStore";

export function WhyThisMattersPanel() {
  const { activePersonaId, inspectorHistory, setActivePersona } = useDemoStore();
  const navigate = useNavigate();
  const history = activePersonaId ? inspectorHistory[activePersonaId] : [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history.length]);

  return (
    <aside className="hidden h-full w-[240px] shrink-0 flex-col lg:flex">
      <div className="my-4 ml-4 mr-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-3.5">
          <Bot size={14} className="text-[var(--color-red)]" />
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[var(--color-navy)]">Myra capabilities</p>
            <p className="text-[10px] font-semibold text-[var(--color-slate)]">New as they happen</p>
          </div>
        </div>

        <div className="scenario-switcher"><p className="eyebrow">EXPLORE A JOURNEY</p>{personas.map((p) => { const Icon = p.icon; return <button key={p.id} aria-pressed={activePersonaId === p.id} className={activePersonaId === p.id ? "scenario-link selected" : "scenario-link"} onClick={() => { setActivePersona(p.id); navigate("/myra"); }}><Icon size={17} /><span><strong>{p.name}</strong><small>{p.languageLabel} · Interactive journey</small></span></button>; })}</div>
        <p className="panel-section-label">CAPABILITIES IN ACTION</p>
        {history.length === 0 ? (
          <p className="px-4 py-5 text-xs leading-relaxed text-[var(--color-slate)]">
            Choose a journey above. As you explore, see the capabilities behind each moment.
          </p>
        ) : (
          <div ref={scrollRef} className="app-scroll min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3">
            {history.map((entry, i) => (
              <motion.div
                key={i}
                initial={
                  i === history.length - 1
                    ? { opacity: 0, y: 8, scale: 0.96, boxShadow: "0 0 0 6px rgba(225,45,45,0.28)" }
                    : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0, scale: 1, boxShadow: "0 0 0 0px rgba(225,45,45,0)" }}
                transition={{ duration: 0.25, boxShadow: { duration: 1.4, ease: "easeOut" } }}
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
