import { supabase, supabaseConfigError } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";

const missingSupabaseError = { message: supabaseConfigError };

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  if (!supabase) {
    return { data: null, error: missingSupabaseError };
  }

  const name = `${firstName} ${lastName}`.trim();
  logger.db("Supabase auth signUp", { email, name });
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        display_name: name,
      },
    },
  });

  if (error) logger.error("Supabase auth signUp failed", { error });
  else logger.info("Supabase auth signUp succeeded", { userId: data?.user?.id });

  return { data, error };
};

export const createUserProfile = async (
  user: { id: string; email?: string | null },
  displayName = "New User"
) => {
  if (!supabase) {
    return { data: null, error: missingSupabaseError };
  }

  logger.db("Supabase insert user profile", { id: user.id });
  const { data, error } = await supabase
    .from("users")
    .insert({
      id: user.id,
      email: user.email,
      display_name: displayName,
    })
    .select()
    .maybeSingle();

  if (error) logger.error("Supabase insert user profile failed", { error });
  else logger.info("Supabase insert user profile succeeded", { id: data?.id });

  return { data, error };
};

export const getUserProfile = async (userId: string) => {
  if (!supabase) {
    return { data: null, error: missingSupabaseError };
  }

  logger.db("Supabase get user profile", { userId });
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) logger.error("Supabase get user profile failed", { error });
  else if (!data) logger.warn("Supabase get user profile not found", { userId });
  else logger.info("Supabase get user profile succeeded", { id: data.id });

  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  if (!supabase) {
    return { data: null, error: missingSupabaseError };
  }

  logger.db("Supabase auth signIn", { email });
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) logger.error("Supabase auth signIn failed", { error });
  else logger.info("Supabase auth signIn succeeded", { userId: data?.user?.id });

  return { data, error };
};

export const signOut = async () => {
  if (!supabase) {
    return { error: missingSupabaseError };
  }

  logger.db("Supabase auth signOut");
  const { error } = await supabase.auth.signOut();

  if (error) logger.error("Supabase auth signOut failed", { error });
  else logger.info("Supabase auth signOut succeeded");

  return { error };
};

export const updateUserProfile = async (
  userId: string,
  updates: {
    display_name?: string;
    bio?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    avatar_url?: string;
    profile_picture_url?: string;
  }
) => {
  if (!supabase) {
    return { data: null, error: missingSupabaseError };
  }

  logger.db("Supabase update user profile", { userId, updates });
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .maybeSingle();

  if (error) logger.error("Supabase update user profile failed", { error });
  else logger.info("Supabase update user profile succeeded", { id: data?.id });

  return { data, error };
};
