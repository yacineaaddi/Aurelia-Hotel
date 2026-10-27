"use client";

import { useReservation } from "./ReservationContext";
import { useGuestsContext } from "./GuestsContext";
import { createBooking } from "../_lib/action";
import { differenceInDays } from "date-fns";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { guests, resetGuests } = useGuestsContext();
  const { range, resetRange } = useReservation();

  const { maxCapacity, regularPrice, discount } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);

  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinName: cabin.name,
  };

  const creatBookingwithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01] rounded-xl overflow-hidden">
      <div className="bg-primary-800 text-primary-300 px-8 py-4 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await creatBookingwithData(formData);
          resetRange();
          resetGuests();
        }}
        className="bg-primary-900 py-10 px-8 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-5">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={guests || 1}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-xl"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-5">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-xl"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
