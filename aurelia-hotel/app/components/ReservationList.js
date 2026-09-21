"use client";

import { useTransition } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/action";

function ReservationList({ bookings }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete(bookingId) {
    startTransition(async () => {
      try {
        await deleteBooking(bookingId);
      } catch (error) {
        console.error("Delete failed", error);
      }
    });
  }

  return (
    <ul className="space-y-6">
      {bookings.map((booking) => (
        <ReservationCard
          booking={booking}
          disabled={isPending}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
