import { getCabins } from "@/app/_lib/data-service";

import bg1 from "@/public/bg1.jpg";
import bg8 from "@/public/bg8.jpg";
import Image from "next/image";

export const revalidate = 100;

export const metadata = { title: "Aurelia Hotel | About" };

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="w-10/12 mx-auto my-14 grid grid-cols-1 md:grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="grid-cols-1 md:col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to Aurelia hotel
        </h1>

        <div className="space-y-8">
          <p>
            Aurelia Hotel offers a welcoming retreat where comfort meets
            contemporary elegance. Designed for guests seeking a relaxing and
            memorable stay, our hotel combines a refined atmosphere with
            thoughtful details to make every visit feel special.
          </p>
          <p>
            With just {cabins.length} carefully designed rooms, Aurelia Hotel
            offers a more intimate and peaceful experience. Whether you're
            traveling for business or leisure, each stay is an opportunity to
            unwind, recharge, and enjoy your time away.
          </p>
          <p>
            Discover a place where every detail matters, from the inviting
            ambiance to the comfort of your stay. At Aurelia Hotel, we strive to
            make your reservation effortless and your experience truly
            unforgettable.
          </p>
        </div>
      </div>

      <div className="grid-cols-1 md:col-span-2">
        <Image
          src={bg8}
          alt="Family sitting around a fire pit in front of cabin"
          className="rounded-xl"
        />
      </div>

      <div className="grid-cols-1 md:col-span-2 ">
        <Image
          src={bg1}
          alt="Family that manages The Wild Oasis"
          className="rounded-xl"
        />
      </div>

      <div className="grid-cols-1 md:col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, Aurelia Hotel has welcomed guests with a tradition of
            hospitality, comfort, and timeless elegance. Built on a legacy of
            care and dedication, our hotel brings together the charm of its
            heritage and the comforts of a memorable stay.
          </p>
          <p>
            More than a place to stay, Aurelia Hotel is a legacy passed down
            through generations. From your arrival to your departure, we invite
            you to become part of our story and experience hospitality that has
            stood the test of time.
          </p>
        </div>
      </div>

      <div className="col-span-1 md:col-span-5 flex justify-center">
        <a
          href="/cabins"
          className="inline-block text-base bg-accent-500 px-8 py-5 text-primary-800 rounded-full font-semibold hover:bg-accent-600 transition-all duration-300"
        >
          Explore our luxury cabins
        </a>
      </div>
    </div>
  );
}
