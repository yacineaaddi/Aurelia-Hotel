import { roomsPerPage } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Error from "../../ui/Error";
import CabinRow from "./CabinRow";
import { useEffect } from "react";
import { useState } from "react";

function CabinTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startData-asc";

  useEffect(() => {
    setCurrentPage(0);
  }, [filterValue, sortBy]);

  let filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  if (isLoading || !cabins) return <Spinner />;
  if (error) return <Error data="cabins" />;
  if (!cabins) return <Empty resourceName="cabins" />;

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  const indexOfLastRoom = (currentPage + 1) * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = sortedCabins?.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(sortedCabins?.length / roomsPerPage);

  return (
    <Menus>
      <Table columns="0.6fr 1fr 2fr 1.4fr 1fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>Rooms</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={currentRooms}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
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
export default CabinTable;
