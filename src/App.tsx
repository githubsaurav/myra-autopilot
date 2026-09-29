import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DemoStoreProvider } from "@/state/useDemoStore";
import { DemoShell } from "@/components/shell/DemoShell";
import { MakeMyTripAppShell } from "@/components/shell/MakeMyTripAppShell";
import MakeMyTripHomePage from "@/pages/MakeMyTripHomePage";
import TripPage from "@/pages/TripPage";
import PlanPage from "@/pages/PlanPage";
import MyraWorkspacePage from "@/pages/MyraWorkspacePage";
import BookingsPage from "@/pages/BookingsPage";
import ProfilePage from "@/pages/ProfilePage";

/** The Myra Autopilot product — reached only via the MakeMyTrip home screen's banner. */
function ProductLayout() {
  return (
    <DemoShell>
      <MakeMyTripAppShell />
    </DemoShell>
  );
}

export default function App() {
  return (
    <DemoStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MakeMyTripHomePage />} />
          <Route element={<ProductLayout />}>
            <Route path="/trip" element={<TripPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/myra" element={<MyraWorkspacePage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoStoreProvider>
  );
}
