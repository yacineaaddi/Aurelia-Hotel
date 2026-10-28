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
      <div className="Rooms">
        <h1 className="Rooms-heading">Our Luxury Rooms</h1>
        <p className="Rooms-text">
          Experience comfort and luxury in the heart of Singapore. Discover
          vibrant city life, stunning skyline views, all just moments away.
        </p>
        <div className="Rooms-filter">
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
