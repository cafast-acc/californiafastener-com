export const metadata = {
  title: "Google Ads · Admin",
  robots: { index: false, follow: false },
};

export default function AdminAdsPage() {
  const embedUrl = process.env.LOOKER_STUDIO_REPORT_URL;

  return (
    <div className="cf-admin-stack">
      <section className="cf-admin-section">
        <header className="cf-admin-section__head">
          <h1 className="cf-t-h3">Google Ads — Looker Studio</h1>
          <p className="cf-t-small">
            Live spend, clicks, impressions, conversions, and top campaigns from
            the linked Google Ads account.
          </p>
        </header>

        {embedUrl ? (
          <div className="cf-admin-embed">
            <iframe
              src={embedUrl}
              title="Google Ads — Looker Studio report"
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        ) : (
          <div className="cf-admin-banner">
            Build a Looker Studio report against the Google Ads account, copy its
            embed URL, and set <code>LOOKER_STUDIO_REPORT_URL</code> in Vercel.
          </div>
        )}
      </section>
    </div>
  );
}
