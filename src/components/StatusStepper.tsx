import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

export function StatusStepper({ steps, onComplete }: { steps: string[]; onComplete?: () => void }) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (doneCount >= steps.length) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => setDoneCount((c) => c + 1), 650);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneCount]);

  return (
    <ul className="space-y-2">
      {steps.map((step, i) => {
        const done = i < doneCount;
        const active = i === doneCount;
        return (
          <motion.li
            key={step}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-sm font-medium transition ${
              done
                ? "border-[var(--color-success)]/25 bg-[var(--color-success-soft)] text-[var(--color-ink)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-slate)]"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${
                done ? "bg-[var(--color-success)]" : active ? "bg-[var(--color-navy)]" : "bg-black/15"
              }`}
            >
              {done ? <Check size={14} /> : active ? <Loader2 size={14} className="animate-spin" /> : <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            </span>
            {step}
          </motion.li>
        );
      })}
    </ul>
  );
}
