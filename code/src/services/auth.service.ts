import { supabase, supabaseConfigError } from "@/lib/supabaseClient";

const missingSupabaseError = { message: supabaseConfigError };

export const signUp = async (email: string, password: string, name?: string) => {
  if (!supabase) {
    return { data: null, error: missingSupabaseError };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  return { data, error };
};

export const createUserProfile = async (
  user: { id: string; email?: string | null },
  displayName = "New User"
) => {
  if (!supabase) {
    return { data: null, error: missingSupabaseError };
  }

  const { data, error } = await supabase
    .from("users")
    .insert({
      id: user.id,
      email: user.email,
      display_name: displayName,
    })
    .select()
    .single();

  return { data, error };
};
