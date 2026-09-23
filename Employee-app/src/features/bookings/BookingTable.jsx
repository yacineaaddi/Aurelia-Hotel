import Pagination from "../../ui/Pagination";
import useCabins from "../cabins/useCabins";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import Error from "../../ui/Error";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function BookingTable() {
  const { bookings, isLoading, count, error } = useBookings();
  const { cabins, isLoadingCabins } = useCabins();

  if (error) return <Error data="bookings" />;

  if (isLoading || isLoadingCabins) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="booking" />;

  return (
    <Menus>
      <Table columns="0.8fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Room</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} cabins={cabins} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
