"use client";

import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

export default function Cabin({ cabin }) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 border border-primary-800 py-8 px-10 mb-10 lg:mb-16 rounded-2xl">
      <div>
        <h3 className="text-accent-500 font-black text-4xl mb-5  bg-primary-950 md:bg-none w-fit rounded-2xl font-glida">
          Room {name}
        </h3>

        {description && (
          <p className="text-lg text-primary-300 mb-10">{description}</p>
        )}

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Singapore</span>
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
      <div className="relative w-full aspect-[4/3] md:aspect-[5/4] ">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
