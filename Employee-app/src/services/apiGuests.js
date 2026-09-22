import supabase from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase
    .from("guests")
    .select("id,fullName,email,nationalID,nationality");

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }
  return data;
}

export async function editGuest({ editedGuest, editId }) {
  let query = supabase.from("guests");

  query = query.update({ ...editedGuest }).eq("id", editId);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be edited");
  }

  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("guest could not be deleted");
  }
  return data;
}
