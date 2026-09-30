import type { ReactNode } from "react";
import { AutopilotInspector } from "@/components/shell/AutopilotInspector";
import { JourneyStageTracker } from "@/components/shell/JourneyStageTracker";
import { WhyThisMattersPanel } from "@/components/shell/WhyThisMattersPanel";
import { AgentBackendPanel } from "@/components/shell/AgentBackendPanel";

export function DemoShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[var(--color-bg)] demo-workspace">
      <div className="flex min-h-0 flex-1 items-stretch justify-center">
        <WhyThisMattersPanel />
        <main className="flex min-h-0 w-full max-w-[880px] min-w-0 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-x border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] sm:my-4 sm:rounded-3xl sm:border">
            {children}
          </div>
        </main>
        <AgentBackendPanel />
      </div>
      <div className="shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <JourneyStageTracker />
      </div>
      <AutopilotInspector />
    </div>
  );
}
