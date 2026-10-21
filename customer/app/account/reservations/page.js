import ReservationList from "@/app/components/ReservationList";
import { getBookings } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";

export const metadata = { title: "Aurelia Hotel | Reservations" };

export default async function Page() {
  const session = await auth();

  const bookings = await getBookings(session.user.nationalID);

  return (
    <div>
      {bookings?.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
