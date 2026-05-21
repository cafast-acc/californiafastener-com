import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUserAndProfile } from "@/lib/auth/requireAdmin";
import { getJotformSnapshot } from "@/lib/jotform";
import { parseRange } from "@/lib/dateRange";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = await getCurrentUserAndProfile();
  if (!session || session.profile.role !== "admin") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const params: Record<string, string> = {};
  request.nextUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  const range = parseRange(params);

  try {
    const snapshot = await getJotformSnapshot(range);
    return NextResponse.json(snapshot);
  } catch (err) {
    console.error("[api/admin/jotform]", err);
    return NextResponse.json({ error: "jotform_failed" }, { status: 502 });
  }
}
