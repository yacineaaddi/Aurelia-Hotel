import AvailableCabinList from "../components/AvailableCabinList";
import Spinner from "../components/Spinner";
import { notFound } from "next/navigation";
import Footer from "../components/Footer";
import { Suspense } from "react";

export const metadata = { title: "Aurelia Hotel | Rooms" };

export default function Page({ searchParams }) {
  const { startDate, endDate, numGuests } = searchParams;

  if (!startDate || !endDate || !numGuests) {
    notFound();
  }

  return (
    <>
      <div className="w-10/12 mx-auto mt-14 mb-24 flex flex-col gap-7 justify-center">
        <Suspense fallback={<Spinner />}>
          <AvailableCabinList searchParams={searchParams} />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
