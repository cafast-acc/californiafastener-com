type DataLayerEntry = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

export function pushEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...(payload ?? {}) });
}
