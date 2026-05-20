import type { ReactNode } from "react";

export default function AdminPublicLayout({ children }: { children: ReactNode }) {
  return <main className="cf-admin-auth-shell">{children}</main>;
}
