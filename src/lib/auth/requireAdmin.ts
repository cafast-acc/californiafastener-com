import "server-only";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminRole = "user" | "admin";

export type Profile = {
  id: string;
  email: string;
  role: AdminRole;
};

export type SessionContext = {
  user: User;
  profile: Profile;
};

export async function getCurrentUserAndProfile(): Promise<SessionContext | null> {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", user.id)
    .single<Profile>();
  if (error || !profile) return null;

  return { user, profile };
}

export async function requireAdmin(): Promise<SessionContext> {
  const session = await getCurrentUserAndProfile();
  if (!session) redirect("/admin/login");
  if (session.profile.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }
  return session;
}
