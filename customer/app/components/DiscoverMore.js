import Link from "next/link";
import React from "react";

export default function DiscoverMore() {
  return (
    <div className="my-28 lg:my-20">
      <div className="my-12 h-px bg-primary-800 lg:my-16" />
      <div className="text-center space-y-6 md:space-y-8 px-5 ">
        <p className="font-[var(--font-gilda)] text-2xl leading-relaxed sm:text-3xl">
          Your next memorable stay begins here
        </p>
        <Link
          href="/cabins"
          className="mt-5 rounded-xl inline-flex items-center justify-center border border-accent-400 px-7 py-3 text-xs uppercase tracking-[0.2em] text-accent-400 transition-colors duration-300 hover:bg-accent-400 hover:text-primary-950"
        >
          Discover Our Rooms
        </Link>
      </div>
    </div>
  );
}
