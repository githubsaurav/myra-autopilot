import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex justify-center px-4"
        >
          <div className="flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-pop)]">
            <CheckCircle2 size={14} className="text-[var(--color-success)]" />
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
