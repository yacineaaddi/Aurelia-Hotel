"use client";

import { useReservation } from "./ReservationContext";
import { useGuestsContext } from "./GuestsContext";
import { useRouter } from "next/navigation";

function BookingBar({ numberofguests }) {
  const { range, setRange, resetRange } = useReservation();
  const { guests, setGuests } = useGuestsContext();
  const router = useRouter();

  const arr = Array.from({ length: numberofguests }, (_, i) => i + 1);

  function handleSubmit(e) {
    e.preventDefault();

    const params = new URLSearchParams({
      startDate: range.from,
      endDate: range.to,
      numGuests: String(guests),
    });

    router.push(`/availableRooms?${params.toString()}`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="homepage-reservation">
      <div className="homepage-reservation-box">
        <label htmlFor="checkIn" className="homepage-label">
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
          className="homepage-input"
        />
      </div>

      <div className="homepage-reservation-box">
        <label htmlFor="checkOut" className="homepage-label">
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
          className="homepage-input"
        />
      </div>

      <div className="homepage-reservation-box">
        <label htmlFor="numGuests" className="homepage-label">
          Guests
        </label>

        <select
          id="numGuests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="homepage-input"
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
