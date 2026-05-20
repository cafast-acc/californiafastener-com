import type { ReactNode } from "react";
import { GtmScript } from "@/components/tracking/GtmScript";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <>
      {gtmId ? <GtmScript containerId={gtmId} /> : null}
      {children}
    </>
  );
}
