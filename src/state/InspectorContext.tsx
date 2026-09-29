import { createContext, useContext, useState, type ReactNode } from "react";
import type { InspectorSnapshot } from "@/types/demo";

interface InspectorContextValue {
  snapshot: InspectorSnapshot | null;
  setSnapshot: (snapshot: InspectorSnapshot) => void;
}

const InspectorContext = createContext<InspectorContextValue | null>(null);

export function InspectorProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<InspectorSnapshot | null>(null);
  return <InspectorContext.Provider value={{ snapshot, setSnapshot }}>{children}</InspectorContext.Provider>;
}

export function useInspector() {
  const ctx = useContext(InspectorContext);
  if (!ctx) throw new Error("useInspector must be used within InspectorProvider");
  return ctx;
}
