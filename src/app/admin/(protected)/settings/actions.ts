"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type ActionResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function inviteAdmin(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "invalid_email" };
  }

  let supabase;
  try {
    supabase = createSupabaseAdminClient();
  } catch (err) {
    console.error("[settings/inviteAdmin] admin client", err);
    return { ok: false, error: "config_missing" };
  }

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
  if (error || !data.user) {
    console.error("[settings/inviteAdmin] invite", error);
    return { ok: false, error: "invite_failed" };
  }

  // Phase 1's handle_new_user trigger has already inserted a profile row
  // (role='user') by the time invite returns. Promote to admin.
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ role: "admin" })
    .eq("id", data.user.id);
  if (updateError) {
    console.error("[settings/inviteAdmin] promote", updateError);
    return { ok: false, error: "promote_failed" };
  }

  revalidatePath("/admin/settings");
  return { ok: true };
}

// `<form action={demoteAdmin}>` requires a void-returning action.
// Errors are surfaced via revalidatePath + logged; the table re-renders
// without the row on success.
export async function demoteAdmin(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!userId || userId === session.user.id) return;

  let supabase;
  try {
    supabase = createSupabaseAdminClient();
  } catch (err) {
    console.error("[settings/demoteAdmin] config", err);
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role: "user" })
    .eq("id", userId);
  if (error) console.error("[settings/demoteAdmin]", error);
  revalidatePath("/admin/settings");
}

export async function removeUser(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!userId || userId === session.user.id) return;

  let supabase;
  try {
    supabase = createSupabaseAdminClient();
  } catch (err) {
    console.error("[settings/removeUser] config", err);
    return;
  }

  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) console.error("[settings/removeUser]", error);
  revalidatePath("/admin/settings");
}

export async function refreshCache(): Promise<ActionResult> {
  await requireAdmin();
  updateTag("admin:ga4");
  updateTag("admin:whatconverts");
  updateTag("admin:jotform");
  revalidatePath("/admin");
  revalidatePath("/admin/traffic");
  revalidatePath("/admin/leads");
  return { ok: true };
}
