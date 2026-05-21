import { requireAdmin } from "@/lib/auth/requireAdmin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { AdminsTable, type AdminRow } from "./AdminsTable";
import { InviteAdminForm } from "./InviteAdminForm";
import { RefreshCacheButton } from "./RefreshCacheButton";

export const metadata = {
  title: "Settings · Admin",
  robots: { index: false, follow: false },
};

async function loadUsers(): Promise<{ rows: AdminRow[]; error: string | null }> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, role, created_at")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[settings] list profiles", error);
      return { rows: [], error: "list_failed" };
    }
    return { rows: (data ?? []) as AdminRow[], error: null };
  } catch (err) {
    console.error("[settings] admin client", err);
    return { rows: [], error: "config_missing" };
  }
}

export default async function AdminSettingsPage() {
  const session = await requireAdmin();
  const { rows, error } = await loadUsers();

  return (
    <div className="cf-admin-stack">
      <header className="cf-admin-page-head">
        <div>
          <h1 className="cf-t-h3">Settings</h1>
          <p className="cf-t-small">Admin management, cache controls.</p>
        </div>
      </header>

      {error === "config_missing" && (
        <div className="cf-admin-banner">
          <code>SUPABASE_SERVICE_ROLE_KEY</code> isn&apos;t set, so admin
          management is read-only. Set it in Vercel to enable invites + removal.
        </div>
      )}

      <section className="cf-admin-section">
        <header className="cf-admin-section__head">
          <h2 className="cf-t-h3">Admins &amp; users</h2>
          <p className="cf-t-small">
            Anyone with role <code>admin</code> can access /admin. Promote via the
            invite form below; demote or remove from the table.
          </p>
        </header>
        <InviteAdminForm />
      </section>

      <section className="cf-admin-section">
        <AdminsTable rows={rows} currentUserId={session.user.id} />
      </section>

      <section className="cf-admin-section">
        <header className="cf-admin-section__head">
          <h2 className="cf-t-h3">Data cache</h2>
          <p className="cf-t-small">
            Force the dashboard widgets to skip their 10-minute cache on the next
            load. Useful after wiring a new integration.
          </p>
        </header>
        <RefreshCacheButton />
      </section>
    </div>
  );
}
