import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

//insert and upadte function
export async function createEditCabin(newCabin, cabinId) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //creating cabin
  let query = supabase.from("cabins");
  if (!cabinId) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (cabinId)
    query = query.update({ ...newCabin, image: imagePath }).eq("id", cabinId);
  const { data, error } = await query.select();
  if (error) {
    console.error(error);
    throw new Error("cabins could not be inserted");
  }

  if (hasImagePath) return data;

  //upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //error of img uploading
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabins could not be inserted and there is problem with the image uploading"
    );
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }

  return data;
}
