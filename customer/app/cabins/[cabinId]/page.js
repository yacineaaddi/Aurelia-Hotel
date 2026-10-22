import ReservationReminder from "@/app/components/ReservationReminder";
import { unstable_noStore as noStore } from "next/cache";
import Reservation from "@/app/components/Reservation";
import { getCabins } from "@/app/_lib/data-service";
import { getCabin } from "@/app/_lib/data-service";
import Spinner from "@/app/components/Spinner";
import Cabin from "@/app/components/Cabin";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  noStore();

  const cabin = await getCabin(params.cabinId);

  return (
    <div className="w-10/12 mx-auto">
      <div className="max-w-6xl mx-auto mt-8">
        <Cabin cabin={cabin} />
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
          <ReservationReminder />
        </Suspense>
      </div>
    </div>
  );
}
