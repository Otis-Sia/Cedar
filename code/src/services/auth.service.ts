import { supabase, supabaseConfigError } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";

const missingSupabaseError = { message: supabaseConfigError };


export const checkStudent = async (email: string) => {
  if (!supabase) {
    return false;
  }

  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("student_domains")
      .select("domain")
      .eq("domain", domain)
      .maybeSingle();

    if (error) {
      logger.warn("Student domain lookup failed", { error, domain });
      return false;
    }

    return Boolean(data);
  } catch (err) {
    logger.error("Error in checkStudent", { err, domain });
    return false;
  }
};

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
  displayName = "New User",
  studentEmail?: string,
  isStudent = false
) => {
  if (!supabase) {
    return { data: null, error: missingSupabaseError };
  }

  const normalizedStudentEmail = studentEmail?.trim() || null;
  
  // Verify student status:
  // 1. If isStudent is already true (passed from primary email check)
  // 2. Or if normalizedStudentEmail is provided and its domain is whitelisted
  let effectiveIsStudent = isStudent;
  if (!effectiveIsStudent && normalizedStudentEmail) {
    effectiveIsStudent = await checkStudent(normalizedStudentEmail);
  }

  const plan = effectiveIsStudent ? "student" : "free";
  const effectiveStudentEmail = normalizedStudentEmail || (effectiveIsStudent ? user.email ?? null : null);

  logger.db("Supabase upsert user profile", {
    id: user.id,
    plan,
    hasStudentEmail: Boolean(normalizedStudentEmail),
    isStudent: effectiveIsStudent,
  });

  const { data, error } = await supabase
    .from("users")
    .upsert({
      id: user.id,
      email: user.email,
      display_name: displayName,
      student_email: effectiveStudentEmail,
      is_student: effectiveIsStudent,
      plan,
    })
    .select()
    .maybeSingle();

  if (error) logger.error("Supabase upsert user profile failed", { error });
  else logger.info("Supabase upsert user profile succeeded", { id: data?.id });

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
