import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id,created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" },
    );

  if (filter) query = query.eq(filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function createEditBooking(newBooking, id) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const hasImagePath = newBooking.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newBooking.image
    : `${Math.random()}-${newBooking.image.name}`.replaceAll("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1 - Create/edit cabin

  let query = supabase.from("cabins");

  // A - Create
  if (!id) query = query.insert([{ ...newBooking, image: imagePath }]);

  // B - Edit
  if (id)
    query = query.update({ ...newBooking, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newBooking.image);

  if (storageError) {
    await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id); /*BUG: data is not defined*/

    console.log("Cabins could not be uploaded and the cabin was not created");
  }
  return data;
}
