import { NextResponse } from "next/server";
import { getCurrentUserAndProfile } from "@/lib/auth/requireAdmin";
import { getGa4Snapshot } from "@/lib/ga4";

export const runtime = "nodejs";

export async function GET() {
  const session = await getCurrentUserAndProfile();
  if (!session || session.profile.role !== "admin") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await getGa4Snapshot();
    return NextResponse.json(snapshot);
  } catch (err) {
    console.error("[api/admin/ga4]", err);
    return NextResponse.json({ error: "ga4_failed" }, { status: 502 });
  }
}
