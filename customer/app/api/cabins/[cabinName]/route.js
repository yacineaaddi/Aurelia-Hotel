import { getCabin, getBookedDatesByCabinName } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinName } = params;

  const [cabin, bookedDates] = await Promise.all([
    getCabin(cabinName),
    getBookedDatesByCabinName(cabinName),
  ]);

  return Response.json({
    cabin,
    bookedDates,
  });
}
