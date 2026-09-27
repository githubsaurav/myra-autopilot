import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TripStoreProvider } from "@/state/tripStore";
import { DemoNav } from "@/components/DemoNav";
import BookingConfirmedPage from "@/pages/BookingConfirmedPage";
import ActivateMyraPage from "@/pages/ActivateMyraPage";
import TripHomePage from "@/pages/TripHomePage";
import FreeTimePage from "@/pages/FreeTimePage";
import FoodAssistPage from "@/pages/FoodAssistPage";
import AdaptTripPage from "@/pages/AdaptTripPage";
import DisruptionAlertPage from "@/pages/DisruptionAlertPage";
import RecoveryOptionsPage from "@/pages/RecoveryOptionsPage";
import ApplyChangesPage from "@/pages/ApplyChangesPage";
import ApplyingChangesPage from "@/pages/ApplyingChangesPage";
import UpdatedTripPage from "@/pages/UpdatedTripPage";
import AutopilotSettingsPage from "@/pages/AutopilotSettingsPage";
import NextTripLearningPage from "@/pages/NextTripLearningPage";
import MyraEvolutionPage from "@/pages/MyraEvolutionPage";

export default function App() {
  return (
    <TripStoreProvider>
      <BrowserRouter>
        <DemoNav />
        <Routes>
          <Route path="/" element={<Navigate to="/booking-confirmed" replace />} />
          <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />
          <Route path="/activate-myra" element={<ActivateMyraPage />} />
          <Route path="/trip-home" element={<TripHomePage />} />
          <Route path="/free-time" element={<FreeTimePage />} />
          <Route path="/food-assist" element={<FoodAssistPage />} />
          <Route path="/adapt-trip" element={<AdaptTripPage />} />
          <Route path="/disruption-alert" element={<DisruptionAlertPage />} />
          <Route path="/recovery-options" element={<RecoveryOptionsPage />} />
          <Route path="/apply-changes" element={<ApplyChangesPage />} />
          <Route path="/applying-changes" element={<ApplyingChangesPage />} />
          <Route path="/updated-trip" element={<UpdatedTripPage />} />
          <Route path="/autopilot-settings" element={<AutopilotSettingsPage />} />
          <Route path="/next-trip-learning" element={<NextTripLearningPage />} />
          <Route path="/myra-evolution" element={<MyraEvolutionPage />} />
          <Route path="*" element={<Navigate to="/booking-confirmed" replace />} />
        </Routes>
      </BrowserRouter>
    </TripStoreProvider>
  );
}
