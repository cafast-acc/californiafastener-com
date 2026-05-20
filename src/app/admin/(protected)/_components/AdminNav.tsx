import { SignOutButton } from "./SignOutButton";

export function AdminNav({ email }: { email: string }) {
  return (
    <header className="cf-admin-nav">
      <div className="cf-admin-nav__brand">
        <span className="cf-t-kicker">California Fastener</span>
        <span className="cf-admin-nav__title">Admin</span>
      </div>
      <div className="cf-admin-nav__meta">
        <span className="cf-t-small">{email}</span>
        <SignOutButton />
      </div>
    </header>
  );
}
