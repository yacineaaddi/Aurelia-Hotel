import { getCabins } from "../_lib/data-service";
import paginationLogic from "../utils/PaginationLogic";
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
    return (
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-accent-400 font-medium font-glida text-center">
        No rooms found for this category
      </h1>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
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
