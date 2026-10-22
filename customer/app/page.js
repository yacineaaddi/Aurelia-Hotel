import bg8 from "@/public/bg8.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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

      <div className="w-10/12 mx-auto flex flex-col gap-9 relative items-center justify-center">
        <h1 className="text-6xl font-medium  text-primary-50 sm:text-7xl lg:text-7xl font-glida text-wrap text-center leading-12">
          Where the city <span className="text-accent-500">meets serenity</span>
        </h1>
        <p className="w-9/12 text-xl font-medium lg:text-xl text-wrap text-center leading-12">
          Wake with the most iconic view, with thoughtful service at every turn
        </p>
        <Link
          href="/cabins"
          className="w-fit inline-block text-base px-6 py-4 font-semibold transition bg-white bg-opacity-35 hover:bg-opacity-50 backdrop-blur-md md:px-12 md:py-6 md:text-lg rounded-full text-white duration-300"
        >
          Explore luxury rooms
        </Link>
        {/*inline-block mt-4 text-base bg-accent-500 px-8 py-5 text-primary-800 rounded-full font-semibold hover:bg-accent-600 transition-all duration-300*/}
      </div>
    </main>
  );
}
