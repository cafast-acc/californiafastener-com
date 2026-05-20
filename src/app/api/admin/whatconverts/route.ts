import { NextResponse } from "next/server";
import { getCurrentUserAndProfile } from "@/lib/auth/requireAdmin";
import { getWhatConvertsSnapshot } from "@/lib/whatconverts";

export const runtime = "nodejs";

export async function GET() {
  const session = await getCurrentUserAndProfile();
  if (!session || session.profile.role !== "admin") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await getWhatConvertsSnapshot();
    return NextResponse.json(snapshot);
  } catch (err) {
    console.error("[api/admin/whatconverts]", err);
    return NextResponse.json({ error: "whatconverts_failed" }, { status: 502 });
  }
}
