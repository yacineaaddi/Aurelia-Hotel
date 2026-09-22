import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function getCabin(cabinName) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("name", cabinName)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin not found");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1 - Create/edit cabin

  let query = supabase.from("cabins");

  // A - Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // B - Edit
  else {
    query = query.update({ ...newCabin }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id); /*BUG: data is not defined*/

    console.log("Cabins could not be uploaded and the cabin was not created");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
