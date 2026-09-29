import { Plane, Building2, Car, Ticket as TicketIcon, Ship } from "lucide-react";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { EmptyPersonaNotice } from "@/components/shell/EmptyPersonaNotice";
import { personas } from "@/data/demoPersonas";
import { useDemoStore } from "@/state/useDemoStore";
import type { Booking, BookingStatus, BookingType } from "@/types/demo";

const typeIcon: Record<BookingType, typeof Plane> = {
  flight: Plane,
  hotel: Building2,
  transfer: Car,
  activity: TicketIcon,
  ferry: Ship,
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
  const { activePersonaId, trips } = useDemoStore();

  if (!activePersonaId) {
    return <EmptyPersonaNotice icon={TicketIcon} message="Pick a scenario to see its bookings here." />;
  }

  const trip = trips[activePersonaId];
  const persona = personas.find((p) => p.id === activePersonaId)!;

  if (!trip) {
    return <EmptyPersonaNotice icon={TicketIcon} message={`${persona.name} isn't booked yet — keep chatting with Myra.`} />;
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
    </div>
  );
}
