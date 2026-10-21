"use client";

import { useReservation } from "@/app/components/ReservationContext";
import EditDateSelector from "@/app/components/EditDateSelector";
import { useState } from "react";

export default function ReservationCabinSelector({
  cabins,
  cabinName,
  bookedDates,
  cabin,
  settings,
  startDate,
  endDate,
  hasBreakfast,
  numGuests,
}) {
  const { resetRange } = useReservation();
  const [withBreakfast, setWithBreakfast] = useState(hasBreakfast);
  const [selectedCabin, setSelectedCabin] = useState(cabinName);
  const [currentBookedDates, setCurrentBookedDates] = useState(bookedDates);
  const [currentCabin, setCurrentCabin] = useState(cabin);

  function handleBreakfast(e) {
    const value = e.target.value === "true";

    setWithBreakfast(value);
  }

  async function handleCabinChange(e) {
    const newCabinName = e.target.value;

    setSelectedCabin(newCabinName);

    resetRange();

    const res = await fetch(`/api/cabins/${encodeURIComponent(newCabinName)}`);

    const data = await res.json();

    setCurrentBookedDates(data.bookedDates);
    setCurrentCabin(data.cabin);
  }

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="cabinName">Change hotel room</label>

        <select
          name="cabinName"
          id="cabinName"
          value={selectedCabin}
          onChange={handleCabinChange}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          {cabins.map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>

        <select
          name="numGuests"
          id="numGuests"
          defaultValue={numGuests}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="">Select number of guests...</option>

          {Array.from(
            { length: currentCabin.maxCapacity },
            (_, i) => i + 1,
          ).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="hasBreakfast">Do you have breakfast?</label>

        <select
          name="hasBreakfast"
          id="hasBreakfast"
          value={withBreakfast}
          onChange={handleBreakfast}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>

      <EditDateSelector
        selectedCabin={selectedCabin}
        originalCabinName={cabinName}
        settings={settings}
        bookedDates={currentBookedDates}
        cabin={currentCabin}
        startDate={startDate}
        endDate={endDate}
        hasBreakfast={withBreakfast}
      />
    </>
  );
}
