"use client";

import { useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Field Notes newsletter signup. Submits to Mailchimp's list-manage JSONP
 * endpoint — no API key or backend needed, since the u/id/f_id are the public
 * embed values. JSONP (rather than a no-cors POST) lets us read Mailchimp's
 * response and show real success/error feedback inline, including the
 * double-opt-in "check your inbox" prompt. Audience: californiafastener,
 * us14 / list 979173355a. Regenerate these IDs from the Mailchimp embed code
 * if the audience changes.
 */
const MC_ENDPOINT =
  "https://californiafastener.us14.list-manage.com/subscribe/post-json?u=03c6b099f722cd2e8a54dda56&id=979173355a&f_id=000d9de1f0";
const MC_HONEYPOT = "b_03c6b099f722cd2e8a54dda56_979173355a";

type Status = "idle" | "submitting" | "success" | "error";

type McResult = { result: "success" | "error"; msg: string };

/** JSONP call — Mailchimp's post-json endpoint has no CORS headers. */
function mcSubscribe(email: string): Promise<McResult> {
  return new Promise((resolve, reject) => {
    const cb = `__mc_cb_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const params = new URLSearchParams({ EMAIL: email, [MC_HONEYPOT]: "", c: cb });
    const script = document.createElement("script");
    let settled = false;
    const w = window as unknown as Record<string, unknown>;
    const cleanup = () => {
      delete w[cb];
      script.remove();
    };
    w[cb] = (data: McResult) => {
      settled = true;
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("network"));
    };
    script.src = `${MC_ENDPOINT}&${params.toString()}`;
    document.body.appendChild(script);
    window.setTimeout(() => {
      if (!settled) {
        cleanup();
        reject(new Error("timeout"));
      }
    }, 10000);
  });
}

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const busy = status === "submitting" || status === "success";

  return (
    <form
      className="bl-newsletter-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const email = String(new FormData(event.currentTarget).get("EMAIL") ?? "").trim();
        if (!email) return;
        setStatus("submitting");
        setMessage("");
        try {
          const data = await mcSubscribe(email);
          if (data.result === "success") {
            setStatus("success");
            setMessage("Almost there — check your inbox to confirm your subscription.");
            sendGTMEvent({ event: "form_submit", form_name: "newsletter" });
          } else {
            setStatus("error");
            // Strip Mailchimp's HTML and leading "0 - " error code.
            setMessage(
              data.msg?.replace(/<[^>]*>/g, "").replace(/^\d+\s*-\s*/, "").trim() ||
                "Something went wrong — please try again.",
            );
          }
        } catch {
          setStatus("error");
          setMessage("Couldn't reach the server — please try again.");
        }
      }}
    >
      <input
        type="email"
        name="EMAIL"
        placeholder="you@company.com"
        required
        aria-label="Email address"
        disabled={busy}
      />
      <button type="submit" disabled={busy}>
        {status === "success" ? "Subscribed ✓" : status === "submitting" ? "Subscribing…" : "Subscribe"}
      </button>
      {message && (
        <p className="bl-newsletter-msg" data-status={status} role="status">
          {message}
        </p>
      )}
    </form>
  );
}
