import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusStepper } from "@/components/StatusStepper";
import { useTripStore } from "@/state/tripStore";

const stepsFor = (optionId: "A" | "B") =>
  optionId === "A"
    ? ["Activity moved", "Hotel extended", "Transfer changed", "Itinerary updated", "Co-travellers notified"]
    : ["Activity replaced", "Itinerary updated", "Co-travellers notified"];

export default function ApplyingChangesPage() {
  const navigate = useNavigate();
  const { disruption, selectedOption } = useTripStore();
  const option = selectedOption ?? disruption.options.find((o) => o.recommended)!;
  const [finished, setFinished] = useState(false);

  return (
    <AppShell title="Coordinating" showBack={false} hideBottomNav>
      <div className="space-y-6 px-4 py-8">
        <p className="text-center text-sm text-[var(--color-slate)]">
          Myra is coordinating Option {option.id} across your bookings
        </p>

        <StatusStepper steps={stepsFor(option.id)} onComplete={() => setFinished(true)} />

        {finished && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)]">
                <PartyPopper size={22} />
              </span>
              <p className="text-lg font-black text-[var(--color-ink)]">Your trip is updated</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/updated-trip")}
              className="w-full rounded-xl bg-[var(--color-red)] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
            >
              View updated trip
            </button>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
