import { useNavigate } from "react-router-dom";
import { Plane, Building2, Car, Ticket as TicketIcon } from "lucide-react";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { useDemoStore } from "@/state/useDemoStore";
import type { Booking, BookingStatus, BookingType } from "@/types/demo";

const typeIcon: Record<BookingType, typeof Plane> = {
  flight: Plane,
  hotel: Building2,
  transfer: Car,
  activity: TicketIcon,
};

const statusTone: Record<BookingStatus, "neutral" | "navy" | "success" | "warning" | "red"> = {
  confirmed: "success",
  affected: "warning",
  moved: "navy",
  cancelled: "red",
  completed: "neutral",
};

function BookingRow({ booking }: { booking: Booking }) {
  const Icon = typeIcon[booking.type];
  return (
    <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3 text-sm last:border-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-soft)] text-[var(--color-navy)]">
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-[var(--color-ink)]">{booking.title}</p>
        <p className="truncate text-xs text-[var(--color-slate)]">{booking.meta}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xs font-bold text-[var(--color-ink)]">₹{booking.amount.toLocaleString("en-IN")}</p>
        <Chip tone={statusTone[booking.status]}>{booking.tag ?? booking.status}</Chip>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const { trip, ladakhTrip } = useDemoStore();
  const navigate = useNavigate();

  if (!trip) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <TicketIcon size={22} className="text-[var(--color-slate)]" />
        <p className="text-sm font-semibold text-[var(--color-ink)]">No bookings yet</p>
        <button type="button" onClick={() => navigate("/myra")} className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-xs font-bold text-white">
          Talk to Myra
        </button>
      </div>
    );
  }

  return (
    <div className="app-scroll h-full space-y-5 overflow-y-auto px-5 py-5">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">
          {trip.destination} · Booking {trip.bookingId}
        </p>
        <Card className="p-0">
          {trip.bookings.map((b) => (
            <BookingRow key={b.id} booking={b} />
          ))}
        </Card>
      </div>

      {ladakhTrip && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">
            {ladakhTrip.destination} · Booking {ladakhTrip.bookingId}
          </p>
          <Card className="p-0">
            {ladakhTrip.bookings.map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
