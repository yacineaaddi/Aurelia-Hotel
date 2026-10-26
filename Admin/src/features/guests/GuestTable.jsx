import { guestsPerPage } from "../../utils/constants";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import useGuests from "./useGuests";
import Error from "../../ui/Error";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import GuestRow from "./GuestRow";

import { useState } from "react";

function GuestTable() {
  const [currentPage, setCurrentPage] = useState(0);

  let { isLoadingGuests, guests, error } = useGuests();

  const GuestsData = guests;

  if (error) return <Error data="guests" />;

  if (isLoadingGuests) return <Spinner />;

  if (!guests) return <Empty resourceName="guests" />;

  const indexOfLastGuest = (currentPage + 1) * guestsPerPage;

  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;

  const currentGuests = GuestsData?.slice(indexOfFirstGuest, indexOfLastGuest);

  const totalPages = Math.ceil(GuestsData?.length / guestsPerPage);

  return (
    <Menus>
      <Table columns="1.5fr 2fr 1.7fr 1fr 1fr">
        <Table.Header>
          <div>full Name</div>
          <div>Email</div>
          <div>Nationality</div>
          <div>National ID</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={currentGuests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />{" "}
      </Table>

      <FormRow>
        <Button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
        >
          ←
        </Button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage >= totalPages - 1}
        >
          →
        </Button>
      </FormRow>
    </Menus>
  );
}
export default GuestTable;
