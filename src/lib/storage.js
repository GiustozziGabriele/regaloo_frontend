import { supabase } from "./supabase"

export async function uploadImage(file, bucket) {
  const fileName = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)

  if (error) throw error

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return publicUrl.publicUrl
}