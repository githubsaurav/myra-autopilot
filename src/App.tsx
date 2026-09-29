import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DemoStoreProvider } from "@/state/useDemoStore";
import { InspectorProvider } from "@/state/InspectorContext";
import { DemoShell } from "@/components/shell/DemoShell";
import { MakeMyTripAppShell } from "@/components/shell/MakeMyTripAppShell";
import TripPage from "@/pages/TripPage";
import PlanPage from "@/pages/PlanPage";
import MyraWorkspacePage from "@/pages/MyraWorkspacePage";
import BookingsPage from "@/pages/BookingsPage";
import ProfilePage from "@/pages/ProfilePage";

export default function App() {
  return (
    <DemoStoreProvider>
      <InspectorProvider>
        <BrowserRouter>
          <DemoShell>
            <Routes>
              <Route element={<MakeMyTripAppShell />}>
                <Route path="/" element={<Navigate to="/myra" replace />} />
                <Route path="/trip" element={<TripPage />} />
                <Route path="/plan" element={<PlanPage />} />
                <Route path="/myra" element={<MyraWorkspacePage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/myra" replace />} />
              </Route>
            </Routes>
          </DemoShell>
        </BrowserRouter>
      </InspectorProvider>
    </DemoStoreProvider>
  );
}
