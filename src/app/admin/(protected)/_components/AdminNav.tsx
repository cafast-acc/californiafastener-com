import Link from "next/link";
import { SignOutButton } from "./SignOutButton";
import { QuickLinks } from "./QuickLinks";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/traffic", label: "Traffic" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/ads", label: "Ads" },
  { href: "/admin/settings", label: "Settings" },
] as const;

export function AdminNav({ email }: { email: string }) {
  return (
    <header className="cf-admin-nav">
      <div className="cf-admin-nav__top">
        <div className="cf-admin-nav__brand">
          <span className="cf-t-kicker">California Fastener</span>
          <span className="cf-admin-nav__title">Admin</span>
        </div>
        <nav className="cf-admin-nav__links" aria-label="Admin sections">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="cf-admin-nav__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="cf-admin-nav__meta">
          <span className="cf-t-small">{email}</span>
          <SignOutButton />
        </div>
      </div>
      <div className="cf-admin-nav__bottom">
        <QuickLinks />
      </div>
    </header>
  );
}
