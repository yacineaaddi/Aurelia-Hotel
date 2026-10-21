import background from "@/public/background.jpg";
import Image from "next/image";
import Link from "next/link";
import bg3 from "@/public/bg3.jpg";

export default function Page() {
  return (
    <main className="flex min-h-[calc(80dvh)] items-center justify-center">
      <Image
        src={bg3}
        fill
        priority
        sizes="100vw"
        quality={80}
        placeholder="blur"
        className="object-cover"
        alt="Mountains and forests with two cabins"
      />

      {/* Optional overlay for text legibility on small screens */}
      <div className="absolute inset-0 bg-primary-950/10" />

      <div className="relative text-center">
        <h1 className="mb-6 text-4xl font-normal tracking-tight text-primary-50 sm:text-6xl md:mb-10 lg:text-8xl">
          Welcome to paradise
        </h1>
        <Link
          href="/cabins"
          className="inline-block text-base px-6 py-4 font-semibold transition bg-white bg-opacity-35 hover:bg-opacity-50 backdrop-blur-md md:px-12 md:py-6 md:text-lg rounded-full text-white duration-300"
        >
          Explore luxury rooms
        </Link>
        {/*inline-block mt-4 text-base bg-accent-500 px-8 py-5 text-primary-800 rounded-full font-semibold hover:bg-accent-600 transition-all duration-300*/}
      </div>
    </main>
  );
}
