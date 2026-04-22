import { supabase } from "@/lib/supabaseClient";

export const uploadFile = async (file: File) => {
  const filePath = `public/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("portfolio-assets")
    .upload(filePath, file);

  return { data, error };
};

export const saveMediaAsset = async (
  portfolioId: string,
  fileData: {
    path: string;
    type: string;
    name: string;
  }
) => {
  const { data, error } = await supabase
    .from("media_assets")
    .insert({
      portfolio_id: portfolioId,
      file_url: fileData.path,
      file_type: fileData.type,
      file_name: fileData.name,
    })
    .select()
    .single();

  return { data, error };
};

export const getMediaAssets = async (portfolioId: string) => {
  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("created_at", { ascending: true });

  return { data: data ?? [], error };
};
