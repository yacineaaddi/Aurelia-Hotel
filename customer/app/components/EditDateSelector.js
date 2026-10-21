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

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function removeBookedRange(bookedDates, startDate, endDate) {
  return bookedDates.filter((date) => date < startDate || date > endDate);
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
  hasBreakfast,
  startDate,
  endDate,
  selectedCabin,
  originalCabinName,
}) {
  const { range, setRange, resetRange } = useReservation();

  const isOriginalCabin = selectedCabin === originalCabinName;

  const availableDates = isOriginalCabin
    ? removeBookedRange(bookedDates, startDate, endDate)
    : bookedDates;

  const effectiveRange = isOriginalCabin
    ? {
        from: range?.from ?? startDate,
        to: range?.to ?? endDate,
      }
    : {
        from: range?.from,
        to: range?.to,
      };

  function handleSelect(newRange) {
    /*if (isAlreadyBooked(newRange, bookedDates)) {
      resetRange();
      return;
    }*/
    setRange(newRange);
  }

  const { regularPrice, discount } = cabin;

  const numNights = differenceInDays(effectiveRange?.to, effectiveRange?.from);

  const cabinPrice = numNights * (regularPrice - discount);

  const breakfastPriceperNight = numNights * settings.breakfastPrice;

  const totalPrice = hasBreakfast
    ? cabinPrice + breakfastPriceperNight
    : cabinPrice;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between border-2">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        onSelect={handleSelect}
        selected={effectiveRange}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 1}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          availableDates.some((date) => isSameDay(date, curDate))
        }
      />

      <input type="hidden" value={effectiveRange.from} name="range-from" />

      <input type="hidden" value={effectiveRange.to} name="range-to" />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              {hasBreakfast && (
                <p>
                  <span className="text-lg font-md ">BreakfastPrice</span>{" "}
                  <span className="text-2xl font-font-md">
                    ${breakfastPriceperNight}
                  </span>
                </p>
              )}
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${totalPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
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
