import BookingBar from "./components/BookingBar";
import { getCabins } from "./_lib/data-service";
import bg8 from "@/public/bg8.jpg";
import Image from "next/image";

export default async function Page() {
  const cabinsData = await getCabins();
  const cabinMaxCapacity = cabinsData.map((cabin) => cabin.maxCapacity);
  const numberofguests = Math.max(...cabinMaxCapacity);

  return (
    <main className="homepage">
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

      <div className="homepage-overlay" />

      <div className="homepage-container flex-style">
        <h1 className="homepage-header">
          Where the city <span className="text-accent-500">meets serenity</span>
        </h1>
        <p className="homepage-text">
          Wake with the most iconic view, with thoughtful service at every turn
        </p>

        <BookingBar numberofguests={numberofguests} />
      </div>
    </main>
  );
}
