"use client";

import { useState, useTransition } from "react";
import { refreshCache } from "./actions";

export function RefreshCacheButton() {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  function handleClick() {
    setDone(false);
    startTransition(async () => {
      await refreshCache();
      setDone(true);
    });
  }

  return (
    <div className="cf-admin-form cf-admin-form--inline">
      <button
        type="button"
        className="cf-admin-btn cf-admin-btn--ghost"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? "Refreshing…" : "Refresh data cache"}
      </button>
      {done && <span className="cf-t-small">Caches cleared. Next dashboard load hits live APIs.</span>}
    </div>
  );
}
