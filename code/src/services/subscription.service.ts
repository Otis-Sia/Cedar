import { supabase } from "@/lib/supabaseClient";

export const getActiveSubscription = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  return { data, error };
};
