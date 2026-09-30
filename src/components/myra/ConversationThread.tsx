import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

export function ConversationThread({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  });

  return (
    <div ref={ref} className="conversation-thread app-scroll min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
      {children}
    </div>
  );
}
