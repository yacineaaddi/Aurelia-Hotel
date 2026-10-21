import { getCabins } from "../_lib/data-service";
import CabinCard from "../components/CabinCard";
import { unstable_noStore } from "next/cache";
import React from "react";

export default async function CabinList({ filter }) {
  unstable_noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

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

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
