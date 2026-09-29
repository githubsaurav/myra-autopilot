import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function GeneratedUIContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="pl-8"
    >
      {children}
    </motion.div>
  );
}

export function ThinkingBubble() {
  return (
    <div className="flex items-center gap-2 pl-0">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-red-soft)]" />
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-slate)]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
