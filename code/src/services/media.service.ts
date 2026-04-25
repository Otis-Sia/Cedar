import { supabase, supabaseConfigError } from "@/lib/supabaseClient";

export const uploadFile = async (file: File, userId: string): Promise<string> => {
  if (!supabase) throw new Error(supabaseConfigError);

  // Debug check: ensure userId is present for RLS policies
  console.log("Supabase Upload userId:", userId);

  const filePath = `${userId}/${file.name}`;

  const { data, error } = await supabase.storage
    .from("portfolio-assets")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  return data.path;
};

export const saveMediaAsset = async (
  userId: string,
  portfolioId: string | null,
  fileData: {
    path: string;
    type: string;
    name: string;
    size: number;
  }
) => {
  if (!supabase) return { data: null, error: { message: supabaseConfigError } };

  const { data, error } = await supabase
    .from("media_assets")
    .insert({
      user_id: userId,
      portfolio_id: portfolioId,
      file_url: fileData.path,
      file_type: fileData.type,
      file_name: fileData.name,
      file_size: fileData.size,
    })
    .select()
    .maybeSingle();

  return { data, error };
};

export const getUserAssets = async (userId: string) => {
  if (!supabase) return { data: [], error: { message: supabaseConfigError } };

  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data: data ?? [], error };
};

export const getMediaAssets = async (portfolioId: string) => {
  if (!supabase) return { data: [], error: { message: supabaseConfigError } };

  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("created_at", { ascending: true });

  return { data: data ?? [], error };
};

export const getPublicUrl = (path: string): string => {
  if (!supabase) return "";

  const { data } = supabase.storage
    .from("portfolio-assets")
    .getPublicUrl(path);

  return data.publicUrl;
};
