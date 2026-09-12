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
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledDashboardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1350px) {
    flex-direction: column;
  }
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
      <StyledDashboardBox>
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
      </StyledDashboardBox>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
