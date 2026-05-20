import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { readSupabaseEnv } from "./env";

type UpdateSessionResult = {
  response: NextResponse;
  user: User | null;
};

let warnedMissingEnv = false;

export async function updateSession(
  request: NextRequest,
): Promise<UpdateSessionResult> {
  const env = readSupabaseEnv();
  if (!env) {
    if (!warnedMissingEnv) {
      warnedMissingEnv = true;
      console.warn(
        "[supabase/middleware] Supabase env vars missing — auth disabled, /admin will redirect to /admin/login.",
      );
    }
    return { response: NextResponse.next({ request }), user: null };
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        for (const [key, value] of Object.entries(headers)) {
          response.headers.set(key, value);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
