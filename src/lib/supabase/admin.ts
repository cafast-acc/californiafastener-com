import "server-only";
import { createClient } from "@supabase/supabase-js";
import { readSupabaseEnv } from "./env";

function readServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY not set — required for admin user management.",
    );
  }
  return key;
}

export function createSupabaseAdminClient() {
  const env = readSupabaseEnv();
  if (!env) {
    throw new Error("Supabase URL / anon key not configured.");
  }
  const serviceKey = readServiceRoleKey();
  return createClient(env.url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
