"use client";

import { useState, useTransition } from "react";
import { inviteAdmin } from "./actions";

export function InviteAdminForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await inviteAdmin(formData);
      if (result.ok) {
        setMessage({ kind: "ok", text: `Invite sent to ${email}. They'll receive an email from Supabase to set a password.` });
        setEmail("");
      } else {
        const text =
          result.error === "invalid_email"
            ? "That doesn't look like a valid email."
            : result.error === "config_missing"
              ? "Service role key not configured in Vercel."
              : result.error === "invite_failed"
                ? "Supabase rejected the invite — likely already a user with that email."
                : "Couldn't promote them to admin. Check the server logs.";
        setMessage({ kind: "err", text });
      }
    });
  }

  return (
    <form action={handleSubmit} className="cf-admin-form cf-admin-form--inline">
      <label className="cf-admin-field cf-admin-field--grow">
        <span>Invite a new admin</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teammate@californiafastener.com"
          required
          autoComplete="off"
        />
      </label>
      <button
        type="submit"
        className="cf-admin-btn cf-admin-btn--primary"
        disabled={isPending}
      >
        {isPending ? "Sending…" : "Send invite"}
      </button>
      {message && (
        <div
          className={message.kind === "ok" ? "cf-admin-notice" : "cf-admin-error"}
          role="status"
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
