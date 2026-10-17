import ReservationCabinSelector from "./ReservationCabinSelector";
import SubmitButton from "@/app/components/SubmitButton";
import { updateBooking } from "@/app/_lib/action";
import {
  getBooking,
  getCabin,
  getCabins,
  getBookedDatesByCabinName,
  getSettings,
} from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;

  const booking = await getBooking(bookingId);

  const {
    numGuests,
    observations,
    startDate,
    endDate,
    cabinName,
    hasBreakfast,
  } = booking;

  const [settings, bookedDates, cabin, cabinData] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinName(cabinName),
    getCabin(cabinName),
    getCabins(),
  ]);

  const cabinsNames = cabinData?.map((cabin) => cabin.name);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" value={bookingId} name="bookingId" />

        <ReservationCabinSelector
          cabins={cabinsNames}
          cabinName={cabinName}
          bookedDates={bookedDates}
          cabin={cabin}
          settings={settings}
          startDate={startDate}
          endDate={endDate}
          hasBreakfast={hasBreakfast}
          numGuests={numGuests}
        />

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>

          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
