import BookingBar from "./components/BookingBar";
import { getCabins } from "./_lib/data-service";
import bg8 from "@/public/bg8.jpg";
import Image from "next/image";

export default async function Page() {
  const cabinsData = await getCabins();
  const cabinMaxCapacity = cabinsData.map((cabin) => cabin.maxCapacity);
  const numberofguests = Math.max(...cabinMaxCapacity);

  return (
    <main className="flex min-h-[calc(80dvh)] items-center justify-center">
      <Image
        src={bg8}
        fill
        priority
        sizes="100vw"
        quality={80}
        placeholder="blur"
        className="object-cover"
        alt="Aurelia Hotel"
      />

      {/* Optional overlay for text legibility on small screens */}
      <div className="absolute inset-0 bg-primary-950/60" />

      <div className="w-10/12 my-14 mx-auto flex flex-col gap-7 lg:gap-8 relative items-center justify-center">
        <h1 className="text-4xl font-medium  text-primary-50 sm:text-5xl lg:text-6xl font-glida text-wrap text-center leading-12">
          Where the city <span className="text-accent-500">meets serenity</span>
        </h1>
        <p className="w-9/12 text-md sm:text-lg font-medium lg:text-xl text-wrap text-center leading-12">
          Wake with the most iconic view, with thoughtful service at every turn
        </p>

        <BookingBar numberofguests={numberofguests} />
      </div>
    </main>
  );
}
