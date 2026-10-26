import { getAvailableCabins } from "../_lib/data-service";
import CabinCard from "../components/CabinCard";
import paginationLogic from "../utils/PaginationLogic";
import { unstable_noStore } from "next/cache";
import Pagination from "./Pagination";

import React from "react";

export default async function AvailableCabinList({ searchParams }) {
  unstable_noStore();

  const startDate = searchParams.startDate;
  const endDate = searchParams.endDate;
  const numGuests = Number(searchParams.numGuests);

  const cabinsData = await getAvailableCabins(startDate, endDate, numGuests);

  const { validPage, totalPages, paginatedCabins } = paginationLogic(
    searchParams,
    cabinsData,
  );

  if (!cabinsData.length)
    return (
      <>
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-accent-400 font-medium font-glida text-center">
          No available rooms found for your selected dates
        </h1>
        <p className="text-primary-300 text-lg md:text-xl text-center align-baseline">
          We’re sorry, but all our rooms are fully booked for your selected
          dates. we sincerely apologize for the inconvenience. We invite you to
          try different dates or check back soon for new availability. We hope
          to welcome you in and make your stay a memorable one. Thank you for
          your understanding!
        </p>
        <div>
          <a
            href="/"
            className="inline-block text-base bg-accent-500 px-6 py-3 md:px-8 md:py-5 text-primary-800 rounded-full font-semibold hover:bg-accent-600 transition-all duration-300"
          >
            Try different dates
          </a>
        </div>
      </>
    );

  return (
    <>
      <h1 className="text-4xl text-accent-400 font-medium font-glida">
        Our Available Rooms
      </h1>
      <p className="text-primary-200 text-lg">
        Discover our available rooms, where timeless elegance meets comfort and
        relaxation. Find the perfect space for your stay, enjoy thoughtful
        amenities, and wake up refreshed, ready to explore and experience
        unforgettable moments at Aurelia Hotel.
      </p>
      <div className="w-full grid sm:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {paginatedCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
      <Pagination currentPage={validPage} totalPages={totalPages} />
    </>
  );
}
