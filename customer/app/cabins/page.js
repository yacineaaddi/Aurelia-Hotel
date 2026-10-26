import CabinList from "../components/CabinList";
import Spinner from "../components/Spinner";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import { Suspense } from "react";

export const metadata = { title: "Aurelia Hotel | Rooms" };

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <>
      <div className="w-10/12 mx-auto mt-14 mb-24 flex flex-col gap-8">
        <h1 className="text-4xl text-accent-400 font-medium font-glida">
          Our Luxury Rooms
        </h1>
        <p className="text-primary-200 text-lg">
          Experience comfort and luxury in the heart of Singapore. Discover
          vibrant city life, stunning skyline views, all just moments away.
        </p>
        <div className="flex justify-center flex-wrap gap-2 mb-2">
          <Filter />
        </div>
        <Suspense fallback={<Spinner />} key={filter}>
          <CabinList filter={filter} searchParams={searchParams} />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
