import { NextResponse } from "next/server";
import { getCurrentUserAndProfile } from "@/lib/auth/requireAdmin";
import { getJotformSnapshot } from "@/lib/jotform";

export const runtime = "nodejs";

export async function GET() {
  const session = await getCurrentUserAndProfile();
  if (!session || session.profile.role !== "admin") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await getJotformSnapshot();
    return NextResponse.json(snapshot);
  } catch (err) {
    console.error("[api/admin/jotform]", err);
    return NextResponse.json({ error: "jotform_failed" }, { status: 502 });
  }
}
