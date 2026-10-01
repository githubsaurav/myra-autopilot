import type { ReactNode } from "react";
import { AutopilotInspector } from "@/components/shell/AutopilotInspector";
import { TravellerGuide } from "@/components/shell/TravellerGuide";

export function DemoShell({ children }: { children: ReactNode }) {
  return <div className="demo-workspace traveller-workspace"><TravellerGuide /><main className="traveller-main">{children}</main><AutopilotInspector /></div>;
}
