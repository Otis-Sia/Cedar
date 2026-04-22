import { supabase } from "@/lib/supabaseClient";

export const getSections = async (portfolioId: string) => {
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("order_index");

  return { data: data ?? [], error };
};

export const addSection = async (
  portfolioId: string,
  type = "about",
  orderIndex = 1
) => {
  const { data, error } = await supabase
    .from("sections")
    .insert({
      portfolio_id: portfolioId,
      type,
      content: { text: "" },
      order_index: orderIndex,
    })
    .select()
    .single();

  return { data, error };
};
