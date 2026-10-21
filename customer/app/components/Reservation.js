import { getBookedDatesByCabinName } from "@/app/_lib/data-service";
import { getSettings } from "@/app/_lib/data-service";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import DateSelector from "./DateSelector";
import { auth } from "../_lib/auth";
import UpdateId from "./UpdateId";
import React from "react";

export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinName(cabin.name),
  ]);

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />

      {!!session?.user?.nationalID ? (
        session?.user ? (
          <ReservationForm cabin={cabin} user={session.user} />
        ) : (
          <LoginMessage />
        )
      ) : (
        <UpdateId />
      )}
    </div>
  );
}
