const LINKS = [
  { label: "GA4", href: "https://analytics.google.com/" },
  { label: "Ads", href: "https://ads.google.com/" },
  { label: "GTM", href: "https://tagmanager.google.com/" },
  { label: "WhatConverts", href: "https://app.whatconverts.com/" },
  { label: "Jotform", href: "https://www.jotform.com/myforms/" },
] as const;

export function QuickLinks() {
  return (
    <nav className="cf-admin-quick-links" aria-label="External tools">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="cf-admin-quick-links__link"
        >
          {link.label}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </nav>
  );
}
