import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

export function ConversationThread({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  });

  return (
    <div ref={ref} className="app-scroll flex-1 space-y-4 overflow-y-auto px-5 py-5">
      {children}
    </div>
  );
}
