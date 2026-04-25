/**
 * Server-only Supabase admin client that uses the service role key.
 * This bypasses Row Level Security (RLS) and should NEVER be imported
 * in client components or exposed to the browser.
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// Service role key bypasses RLS — keep this server-side only
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Returns a Supabase admin client if the service role key is configured.
 * Falls back to the anon client if the key is missing (works as long as
 * your RLS policies allow the query).
 */
export function getAdminClient() {
  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }
  // Fallback to anon — role queries may fail if RLS blocks them
  const { supabase } = require("@/lib/supabaseClient") as { supabase: ReturnType<typeof createClient> };
  return supabase;
}
