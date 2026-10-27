"use client";

import { useReservation } from "./ReservationContext";
import {
  isWithinInterval,
  differenceInDays,
  isPast,
  isSameDay,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, bookedDates, cabin, hasBreakfast }) {
  const { range, setRange, resetRange } = useReservation();

  function handleSelect(newRange) {
    if (isAlreadyBooked(newRange, bookedDates)) {
      resetRange();
      return;
    }
    setRange(newRange);
  }

  useEffect(() => {
    if (isAlreadyBooked(range, bookedDates)) {
      resetRange();
    }
  }, [range, setRange, resetRange]);

  const { regularPrice, discount } = cabin;

  const numNights = differenceInDays(range?.to, range?.from);

  const cabinPrice = numNights * (regularPrice - discount);

  const breakfastPriceperNight = numNights * settings.breakfastPrice;

  const totalPrice = hasBreakfast
    ? cabinPrice + breakfastPriceperNight
    : cabinPrice;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between border border-primary-800 rounded-xl py-2">
      <DayPicker
        className="p-8 place-self-center"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        onSelect={handleSelect}
        selected={range}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 2}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-4 md:px-8 py-4 md:py-3 bg-accent-500 text-primary-800 min-h-[72px] rounded-2xl m-4">
        {/* Price per night */}
        <p className="flex items-baseline gap-2">
          {discount > 0 ? (
            <>
              <span className="text-2xl font-semibold">
                ${regularPrice - discount}
              </span>
              <span className="line-through font-semibold text-primary-700">
                ${regularPrice}
              </span>
            </>
          ) : (
            <span className="text-2xl font-semibold">${regularPrice}</span>
          )}
          <span>/night</span>
        </p>

        {numNights ? (
          <>
            {/* Number of nights */}
            <p className="bg-accent-600 px-3 py-2 text-xl md:text-2xl rounded-xl">
              <span>&times;</span> <span>{numNights}</span>
            </p>

            {/* Breakfast */}
            {hasBreakfast && (
              <p className="flex items-baseline gap-2">
                <span className="text-base md:text-lg font-medium">
                  Breakfast/night
                </span>
                <span className="text-xl md:text-2xl font-medium">
                  ${breakfastPriceperNight}
                </span>
              </p>
            )}

            {/* Total */}
            <p className="flex items-baseline gap-2">
              <span className="text-base md:text-lg font-bold uppercase">
                Total
              </span>
              <span className="text-2xl font-semibold">${totalPrice}</span>
            </p>
          </>
        ) : null}
        {range.from || range.to ? (
          <button
            className="border bg-primary-800 border-primary-800 py-2 px-5 text-sm font-semibold text-accent-500 transition-colors rounded-xl"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
