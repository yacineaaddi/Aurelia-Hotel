import TodayActivity from "../check-in-out/TodayActivity";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import SalesChart from "./SalesChart";
import Stats from "./Stats";

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
  const { isLoadingRecentStays, confirmedStays, numDays } = useRecentStays();
  const { bookings, isLoadingRecentBookings } = useRecentBookings();
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
