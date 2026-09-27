import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

export function AppShell({
  title,
  showBack = true,
  hideBottomNav = false,
  children,
}: {
  title: string;
  showBack?: boolean;
  hideBottomNav?: boolean;
  children: ReactNode;
}) {
  const location = useLocation();

  return (
    <div className="flex min-h-dvh items-stretch justify-center bg-[var(--color-bg)] sm:items-center sm:py-8">
      <div className="flex w-full max-w-[430px] flex-col overflow-hidden bg-[var(--color-surface)] sm:h-[860px] sm:rounded-[2.25rem] sm:border sm:border-[var(--color-border)] sm:shadow-[var(--shadow-pop)]">
        <TopBar title={title} showBack={showBack} />
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="app-scroll flex-1 overflow-y-auto bg-[var(--color-bg)]"
        >
          {children}
        </motion.div>
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
