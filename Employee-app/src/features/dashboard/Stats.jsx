import React from "react";

import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numBooking = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Booking"
        value={numBooking}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkins}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}
