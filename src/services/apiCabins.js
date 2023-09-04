import supabase, { supabaseUrl } from './supabase';

export const getAllCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error(`Couldn't fetch cabins`);
  }

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImgPath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImgPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  //A) Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) Edit Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Couldn't create a cabin`);
  }

  //2. upload image
  if (hasImgPath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3. Delete cabin if image didn't upload
  if (storageError) {
    console.error(storageError, data);

    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      `Cabin image was not uploaded and the cabin could not be created.`
    );
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(`Couldn't delete cabin`);
  }
};
