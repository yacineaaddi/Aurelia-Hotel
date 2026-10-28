import paginationLogic from "../utils/PaginationLogic";
import { getCabins } from "../_lib/data-service";
import CabinCard from "../components/CabinCard";
import { unstable_noStore } from "next/cache";
import Pagination from "./Pagination";
import React from "react";

export default async function CabinList({ filter, searchParams }) {
  unstable_noStore();

  const cabins = await getCabins();

  let displayedCabins;

  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  if (filter === "large")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12,
    );

  const { validPage, totalPages, paginatedCabins } = paginationLogic(
    searchParams,
    displayedCabins,
  );

  if (!displayedCabins.length) {
    return <h1 className="Rooms-empty">No rooms found for this category</h1>;
  }

  return (
    <>
      <div className="Rooms-container">
        {paginatedCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>

      <Pagination
        currentPage={validPage}
        totalPages={totalPages}
        filter={filter}
      />
    </>
  );
}
