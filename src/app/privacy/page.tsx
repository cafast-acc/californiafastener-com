import type { Metadata } from "next";
import "@/styles/cf-legal.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How California Fastener collects and uses the contact information you share through our quote and contact forms. We use it only to respond to your inquiry — we don't sell data.",
};

const LAST_UPDATED = "November 10, 2026";

export default function PrivacyPage() {
  return (
    <>
      <CfNav />

      {/* MASTHEAD */}
      <section className="legal-hero">
        <div className="legal-hero-kicker">Legal</div>
        <h1>Privacy Policy</h1>
        <p>
          What we collect, how we use it, and what we&rsquo;ll never do with it. Updated{" "}
          {LAST_UPDATED}.
        </p>
      </section>

      {/* CARD GRID */}
      <main className="legal-grid">
        <article className="legal-card">
          <div className="legal-chip">What we collect</div>
          <h2>Just enough to reply</h2>
          <ul>
            <li>
              <strong>Contact information</strong> — name, company, email, and phone number.
            </li>
            <li>
              <strong>Inquiry details</strong> — the parts, specs, quantities, or questions you
              include.
            </li>
          </ul>
          <p>
            Collected through our quote-request (RFQ) and contact forms, which are hosted and
            processed by JotForm.
          </p>
        </article>

        <article className="legal-card">
          <div className="legal-chip">How we use it</div>
          <h2>To respond to you</h2>
          <p>
            We use your details to answer your inquiry, prepare a quote, and follow up about your
            request. With your permission, we also measure which ads or searches led to your
            inquiry (see Cookies &amp; analytics).
          </p>
          <p>
            We don&rsquo;t use the contact information you send us for advertising, and we
            won&rsquo;t add you to marketing lists without your consent.
          </p>
        </article>

        <article className="legal-card legal-card--wide legal-card--accent">
          <div className="legal-chip">What we don&rsquo;t do</div>
          <h2>No selling. No storefront. No payment data.</h2>
          <p>
            We do not sell, rent, or trade your personal information. We don&rsquo;t run e-commerce
            or process payments on this site, and we never collect payment or credit-card data.
          </p>
        </article>

        <article className="legal-card">
          <div className="legal-chip">Sharing</div>
          <h2>Only with providers who help us operate</h2>
          <p>
            We share your information only with service providers such as JotForm, which processes
            our form submissions, our email provider, and the analytics and advertising tools
            listed under Cookies &amp; analytics. They may use it only to provide their service to
            us.
          </p>
          <p>We may also disclose information if required by law or to protect our rights.</p>
        </article>

        <article className="legal-card">
          <div className="legal-chip">Cookies &amp; analytics</div>
          <h2>Only with your OK</h2>
          <p>
            With your permission, we use Google Analytics, Google Ads, Microsoft Clarity (including
            session recordings), and WhatConverts (call and form tracking) to see how our site is
            used and which ads bring in inquiries. Google may also use cookies to show you our ads
            on other sites; you can opt out at{" "}
            <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer">
              Google&rsquo;s My Ad Center
            </a>
            . Decline, and none of them run. Change your choice anytime under &ldquo;Cookie
            settings.&rdquo; We don&rsquo;t respond to &ldquo;Do Not Track&rdquo; signals, since
            there&rsquo;s no common standard for them.
          </p>
        </article>

        <article className="legal-card">
          <div className="legal-chip">Retention &amp; security</div>
          <h2>Kept while needed, then deleted</h2>
          <p>
            We keep what you send us only as long as needed to respond and maintain our business
            relationship, plus any period required for our records.
          </p>
          <p>
            We take reasonable measures to protect it, though no method of transmission or storage
            is completely secure.
          </p>
        </article>

        <article className="legal-card">
          <div className="legal-chip">Your choices</div>
          <h2>Access, correct, or delete</h2>
          <p>
            Email us anytime to access, correct, or delete the contact information we hold about you
            — or to ask a question about this policy. We&rsquo;ll respond promptly.
          </p>
          <p>
            Our site and services are intended for businesses; we don&rsquo;t knowingly collect
            information from anyone under 16.
          </p>
        </article>

        <article className="legal-card legal-card--wide legal-card--contact">
          <div className="legal-chip">Contact</div>
          <h2>Questions? Get in touch.</h2>
          <p>
            <strong>California Fastener &middot; CA Fast LLC</strong>
            <br />
            <a href="mailto:info@californiafastener.com">info@californiafastener.com</a> &middot;{" "}
            <a href="tel:+18885817077" className="no-swap">707.741.3277</a> &middot; Benicia, California
          </p>
        </article>
      </main>

      <div className="legal-meta">
        We may update this policy from time to time; when we do, we&rsquo;ll revise the date above.
      </div>

      <CfFooter />
    </>
  );
}
