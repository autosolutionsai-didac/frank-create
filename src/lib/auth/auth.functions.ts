// Auth server functions: read the current user, complete the OAuth code
// exchange, and sign out. Access is restricted to @frankbody.com (plus an
// optional explicit allow-list).

import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface StudioUser {
  id: string;
  email: string;
}

const ALLOWED_DOMAIN = "frankbody.com";
const ALLOWLIST = new Set<string>([
  // Add explicit non-domain emails here, e.g. "contractor@gmail.com"
]);

function emailAllowed(email: string | null | undefined): boolean {
  const e = (email ?? "").toLowerCase();
  return e.endsWith(`@${ALLOWED_DOMAIN}`) || ALLOWLIST.has(e);
}

/** Verified current user (JWT-checked), or null. Used by the route guard. */
export const fetchUser = createServerFn({ method: "GET" }).handler(
  async (): Promise<StudioUser | null> => {
    const { getSupabaseServerClient } = await import("../supabase/supabase.server");
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user?.email || !emailAllowed(user.email)) return null;
    return { id: user.id, email: user.email };
  },
);

/** Exchange the OAuth `?code=` for a session (sets cookies), then redirect. */
export const exchangeOAuthCode = createServerFn({ method: "GET" })
  .inputValidator(z.object({ code: z.string() }))
  .handler(async ({ data }) => {
    const { getSupabaseServerClient } = await import("../supabase/supabase.server");
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.auth.exchangeCodeForSession(data.code);
    if (error) throw redirect({ to: "/login", search: { error: "auth" } });

    const { data: u } = await supabase.auth.getUser();
    if (!emailAllowed(u.user?.email)) {
      await supabase.auth.signOut();
      throw redirect({ to: "/login", search: { error: "domain" } });
    }
    throw redirect({ to: "/" });
  });

/** Clear the session server-side, then bounce to login. */
export const signOutFn = createServerFn({ method: "POST" }).handler(async () => {
  const { getSupabaseServerClient } = await import("../supabase/supabase.server");
  const supabase = getSupabaseServerClient();
  await supabase.auth.signOut();
  throw redirect({ to: "/login", search: { error: undefined } });
});
