"use client";

import { useReservation } from "./ReservationContext";
import { useGuestsContext } from "./GuestsContext";
import { useRouter } from "next/navigation";

function BookingBar({ numberofguests }) {
  const router = useRouter();
  const { guests, setGuests, resetGuests } = useGuestsContext();
  const { range, setRange, resetRange } = useReservation();

  const arr = Array.from({ length: numberofguests }, (_, i) => i + 1);

  function handleSubmit(e) {
    e.preventDefault();

    const params = new URLSearchParams({
      startDate: range.from,
      endDate: range.to,
      numGuests: String(guests),
    });

    router.push(`/availableRooms?${params.toString()}`);

    // Navigate to your availability or reservation page here.
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-2xl bg-primary-100 px-8 py-5 shadow-md md:grid-cols-4 md:items-end md:gap-5 md:p-6"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="checkIn"
          className="text-xs font-semibold uppercase tracking-widest text-primary-800"
        >
          Check-in
        </label>

        <input
          type="date"
          id="checkIn"
          value={range.from || ""}
          min={today}
          onChange={(e) => {
            const newCheckIn = e.target.value;

            if (range.to && newCheckIn >= range.to) {
              resetRange();
              return;
            }

            setRange((prev) => ({
              ...prev,
              from: newCheckIn,
            }));
          }}
          required
          className="rounded-2xl w-full border border-primary-300 bg-primary-50 px-3 py-3 text-sm text-primary-900 outline-none transition focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="checkOut"
          className="text-xs font-semibold uppercase tracking-widest text-primary-800"
        >
          Check-out
        </label>

        <input
          type="date"
          id="checkOut"
          value={range.to || ""}
          min={range.from || today}
          onChange={(e) => {
            const newCheckOut = e.target.value;

            if (range.from && newCheckOut <= range.from) {
              resetRange();
              return;
            }

            setRange((prev) => ({
              ...prev,
              to: newCheckOut,
            }));
          }}
          required
          className="rounded-2xl w-full border border-primary-300 bg-primary-50 px-3 py-3 text-sm text-primary-900 outline-none transition focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="numGuests"
          className="text-xs font-semibold uppercase tracking-widest text-primary-800"
        >
          Guests
        </label>

        <select
          id="numGuests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="rounded-2xl w-full border border-primary-300 bg-primary-50 px-3 py-3 text-sm text-primary-900 outline-none transition focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        >
          {arr.map((guest) => (
            <option key={guest} value={guest}>
              {guest} {guest === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 bg-accent-500 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-950 transition hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 rounded-2xl"
      >
        Check availability
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

export default BookingBar;
