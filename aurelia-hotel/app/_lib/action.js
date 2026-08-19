"use server";
import supabase from "./supabase";
import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";

export async function updateGuest(formData) {
  //console.log("server action");
  const session = await auth();
  if (!session) throw new Error("You must be signed in");

  const nationalID = formData.length("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");

    revalidatePath("/account/profile");
  }
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
