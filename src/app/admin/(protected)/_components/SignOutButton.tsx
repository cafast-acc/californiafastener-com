"use client";

import { useFormStatus } from "react-dom";
import { signOut } from "./actions";

function SignOutSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="cf-admin-btn cf-admin-btn--ghost"
      disabled={pending}
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}

export function SignOutButton() {
  return (
    <form action={signOut}>
      <SignOutSubmit />
    </form>
  );
}
