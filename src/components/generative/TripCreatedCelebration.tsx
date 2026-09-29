import { motion } from "framer-motion";
import { Check } from "lucide-react";

const burstColors = ["var(--color-navy)", "var(--color-red)", "var(--color-success)"];

export function TripCreatedCelebration({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 text-center shadow-[var(--shadow-card)]">
      <div className="relative flex h-14 w-14 items-center justify-center">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: burstColors[i % burstColors.length] }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(angle) * 34, y: Math.sin(angle) * 34, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            />
          );
        })}
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success)] text-white"
        >
          <Check size={22} strokeWidth={3} />
        </motion.span>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-base font-black text-[var(--color-ink)]"
      >
        {title}
      </motion.p>
      <p className="text-xs text-[var(--color-slate)]">{subtitle}</p>
    </div>
  );
}
