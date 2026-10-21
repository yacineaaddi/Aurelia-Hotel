import CabinList from "../components/CabinList";
import Spinner from "../components/Spinner";
import Filter from "../components/Filter";
import { Suspense } from "react";

export const metadata = { title: "Aurelia Hotel | Rooms" };

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div className="w-10/12 mx-auto my-14 flex flex-col gap-7">
      <h1 className="text-4xl text-accent-400 font-medium">Our Luxury Rooms</h1>
      <p className="text-primary-200 text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="flex justify-center flex-wrap gap-2">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
