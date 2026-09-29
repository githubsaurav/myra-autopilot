import type { ReactNode } from "react";
import { ScenarioLibrary } from "@/components/shell/ScenarioLibrary";
import { AutopilotInspector } from "@/components/shell/AutopilotInspector";

export function DemoShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[var(--color-bg)]">
      <ScenarioLibrary />
      <main className="flex h-full min-w-0 flex-1 justify-center overflow-hidden">
        <div className="flex h-full w-full max-w-[720px] flex-col overflow-hidden border-x border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
          {children}
        </div>
      </main>
      <AutopilotInspector />
    </div>
  );
}
