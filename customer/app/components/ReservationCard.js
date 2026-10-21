import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete, disabled }) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabinName: { name, image },
  } = booking;

  return (
    /* <div className="flex flex-col md:flex-row border border-primary-800">
      <div className="flex flex-row flex-1 gap-5">
        <div className="relative h-32 aspect-square">
          <Image
            fill
            src={image}
            alt={`Cabin ${name}`}
            className="object-cover border-r border-primary-800"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {numNights} nights in Room {name}
            </h3>
            {isPast(new Date(startDate)) ? (
              <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                past
              </span>
            ) : (
              <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                upcoming
              </span>
            )}
          </div>

          <p className="text-lg text-primary-300">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>

          <div className="flex gap-5 mt-auto items-baseline">
            <p className="text-xl font-semibold text-accent-400">
              ${totalPrice}
            </p>
            <p className="text-primary-300">&bull;</p>
            <p className="text-lg text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
            <p className="ml-auto text-sm text-primary-400">
              Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row md:flex-col md:justify-between border-l border-primary-800 w-full md:w-auto border-2 border-red-500">
        {!isPast(startDate) ? (
          <a
            href={`/account/reservations/edit/${id}`}
            className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Edit</span>
          </a>
        ) : null}

        <DeleteReservation
          bookingId={id}
          onDelete={onDelete}
          disabled={disabled}
        />
      </div>
    </div>*/

    <div className="flex flex-col lg:flex-row border border-primary-800 rounded-xl overflow-hidden p-3 gap-3">
      {/* Reservation details */}
      <div className="flex flex-1 min-w-0 flex-col sm:flex-row gap-4 sm:gap-5">
        {/* Room image */}
        <div className="relative w-full h-48 sm:h-32 sm:w-32 sm:shrink-0">
          <Image
            fill
            src={image}
            alt={`Cabin ${name}`}
            className="object-cover sm:border-r border-primary-800 rounded-2xl"
          />
        </div>

        {/* Reservation information */}
        <div className="flex flex-1 min-w-0 flex-col gap-3 p-3 sm:py-2 sm:pr-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-semibold">
              {numNights} nights in Room {name}
            </h3>

            {isPast(new Date(startDate)) ? (
              <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                past
              </span>
            ) : (
              <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                upcoming
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-primary-300">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>

          {/* Price, guests and booking date */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 mt-2 sm:mt-auto">
            <p className="text-lg sm:text-xl font-semibold text-accent-400">
              ${totalPrice}
            </p>

            <p className="text-primary-300">&bull;</p>

            <p className="text-sm sm:text-base text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>

            <p className="w-full text-xs sm:text-sm text-primary-400 sm:ml-auto sm:w-auto">
              Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-row min-w-[15%] lg:flex-col lg:justify-between lg:w-16 border-t lg:border-t-0 lg:border-l border-primary-800">
        {!isPast(startDate) ? (
          <a
            href={`/account/reservations/edit/${id}`}
            className="group flex flex-1 lg:flex-none  items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 px-3 py-3 lg:py-5 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span>Edit</span>
          </a>
        ) : null}

        <div className="flex flex-1 lg:flex-none items-center justify-center border-l lg:border-l-0 lg:border-t border-primary-800 px-3 py-3 lg:py-5">
          <DeleteReservation
            bookingId={id}
            onDelete={onDelete}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
