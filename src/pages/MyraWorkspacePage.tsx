import { MyraHeader } from "@/components/myra/MyraHeader";
import { useDemoStore } from "@/state/useDemoStore";
import Scenario1Entry from "@/scenarios/Scenario1Entry";
import Scenario2FreeTime from "@/scenarios/Scenario2FreeTime";
import Scenario3Adapt from "@/scenarios/Scenario3Adapt";
import Scenario4Disruption from "@/scenarios/Scenario4Disruption";
import Scenario5Learning from "@/scenarios/Scenario5Learning";

const scenarioComponents = {
  "1": Scenario1Entry,
  "2": Scenario2FreeTime,
  "3": Scenario3Adapt,
  "4": Scenario4Disruption,
  "5": Scenario5Learning,
};

export default function MyraWorkspacePage() {
  const { activeScenarioId, trip } = useDemoStore();
  const ScenarioComponent = scenarioComponents[activeScenarioId];

  return (
    <div className="flex h-full flex-col">
      <MyraHeader tripLabel={trip ? `My ${trip.destination} Trip · Day ${trip.dayNumber} of ${trip.totalDays}` : undefined} />
      {/* key forces a clean remount per scenario so scripted steps always restart from 0 */}
      <ScenarioComponent key={activeScenarioId} />
    </div>
  );
}
