"use client";

import { useFormStatus } from "react-dom";
import { signIn } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="cf-admin-btn cf-admin-btn--primary"
      disabled={pending}
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Invalid email or password.",
  forbidden: "This account is not authorized for admin access.",
  config: "Authentication is not configured. Contact the site administrator.",
  missing: "Email and password are required.",
};

export function LoginForm({ error }: { error?: string }) {
  const message = error ? ERROR_MESSAGES[error] : null;

  return (
    <form action={signIn} className="cf-admin-form" noValidate>
      <h1 className="cf-t-h3">Admin sign in</h1>
      <p className="cf-t-body">California Fastener internal dashboard.</p>

      {message ? (
        <div className="cf-admin-error" role="alert">
          {message}
        </div>
      ) : null}

      <label className="cf-admin-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          inputMode="email"
        />
      </label>

      <label className="cf-admin-field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </label>

      <SubmitButton />
    </form>
  );
}
