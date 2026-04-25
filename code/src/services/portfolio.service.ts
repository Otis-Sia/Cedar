import { supabase } from "@/lib/supabaseClient";

export const createPortfolio = async (userId: string) => {
  const { data, error } = await supabase
    .from("portfolios")
    .insert({
      user_id: userId,
      slug: `user-${Date.now()}`,
      is_published: false,
    })
    .select()
    .maybeSingle();

  return { data, error };
};

export const getUserPortfolios = async (userId: string) => {
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data: data ?? [], error };
};

export const getPublicPortfolioBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  return { data, error };
};

export const getPortfolioProjects = async (portfolioId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("created_at", { ascending: true });

  return { data: data ?? [], error };
};
