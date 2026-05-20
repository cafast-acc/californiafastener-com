import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { AdminNav } from "./_components/AdminNav";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Auth-gated — never cache, always re-evaluate the session per request.
export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { profile } = await requireAdmin();
  return (
    <div className="cf-admin-shell">
      <AdminNav email={profile.email} />
      <main className="cf-admin-main">{children}</main>
    </div>
  );
}
