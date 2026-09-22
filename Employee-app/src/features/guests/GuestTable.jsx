import Spinner from "../../ui/Spinner";
import useGuests from "./useGuests";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import GuestRow from "./GuestRow";

function GuestTable() {
  const { isLoadingGuests, guests } = useGuests();
  console.log(guests);
  if (isLoadingGuests) return <Spinner />;

  if (!guests) return <Empty resourceName="guests" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>full Name</div>
          <div>Email</div>
          <div>Nationality</div>
          <div>National ID</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
      </Table>
    </Menus>
  );
}
export default GuestTable;
