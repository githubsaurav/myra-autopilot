import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function GeneratedUIContainer({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay }}
      className="pl-8"
    >
      {children}
    </motion.div>
  );
}

export function ThinkingBubble({ label = "Myra is typing" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 pl-0">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-red-soft)] text-[var(--color-red)]">
        <Sparkles size={13} />
      </span>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5">
        <span className="text-xs font-medium text-[var(--color-slate)]">{label}</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-slate)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
