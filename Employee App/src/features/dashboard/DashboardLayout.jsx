import React from "react";
import styled from "styled-components";

import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from "../cabins/useCabins";

import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoadingRecentBookings } = useRecentBookings();
  const { isLoadingRecentStays, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoadingCabins } = useCabins();

  if (isLoadingRecentBookings || isLoadingRecentStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
