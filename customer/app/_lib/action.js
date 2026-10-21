"use server";

import { signIn, signOut, auth } from "./auth";
import { getBookings } from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import supabase from "./supabase";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be signed in");

  const nationalID = formData.get("nationalID");

  const fullName = formData.get("fullName");

  let [nationality] = formData.get("nationality").split("%");

  /*if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");*/

  const updateData = { nationality, nationalID, fullName };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    if (error.code === "23503") {
      throw new Error(
        "You cannot change your National ID because it is linked to an existing booking",
      );
    }

    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("You must be signed in");

  if (!session.user.nationalID)
    throw new Error("You must update your National ID");

  const newBooking = {
    ...bookingData,
    nationalID: session.user.nationalID || null,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    if (error.code === "23502") {
      throw new Error("You must update your National ID");
    }

    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be signed in");

  const guestBookings = await getBookings(session.user.nationalID);
  const guestBookingIds = guestBookings.filter(
    (booking) => booking.id === bookingId,
  );

  if (!guestBookingIds.some((booking) => bookingId === booking.id))
    throw new ErrorEvent("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw error;
  }
  revalidatePath(`/account/reservations`);
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));
  const startDate = formData.get("range-from");
  const endDate = formData.get("range-to");

  const session = await auth();

  if (!session) throw new Error("You must be signed in");

  const guestBookings = await getBookings(session.user.nationalID);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    hasBreakfast: formData.get("hasBreakfast"),
    startDate: new Date(startDate).toISOString(),
    endDate: new Date(endDate).toISOString(),
    cabinName: formData.get("cabinName"),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}
