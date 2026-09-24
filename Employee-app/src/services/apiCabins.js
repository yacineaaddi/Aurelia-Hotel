import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw error;
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
  console.log(data);
  return data;
}

export async function createEditCabin(newCabin, id) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1- Upload new image if necessary

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error("Images could not be uploaded");
      throw storageError;
    }
  }

  //2 - Create/edit cabin

  let query = supabase.from("cabins");

  // A - Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // B - Edit
  else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}
