// Server-only Supabase clients. `.server.ts` → tree-shaken from the client.
//
// Created PER REQUEST (never module scope): on Cloudflare Workers the module
// scope is shared across requests in an isolate, so a shared client would leak
// one user's session into another's request. The cookie-bound client closes
// over the ambient request via getCookies/setCookie.

import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getRequest } from "@tanstack/react-start/server";
import { getCookies, setCookie, getWebRequest } from "@tanstack/react-start/server";

import { getServerConfig } from "../config.server";

/** Cookie-bound client carrying the signed-in user's JWT — RLS applies. */
export function getSupabaseServerClient(): SupabaseClient {
  const { supabaseUrl, supabaseAnonKey } = getServerConfig();
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)");
  }

  const authorization = getRequest().headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authorization,
        },
      },
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  const request = getWebRequest();
  const authHeader = request?.headers.get("Authorization");

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: authHeader ? { Authorization: authHeader } : {},
    },
    cookies: {
      getAll() {
        return Object.entries(getCookies()).map(([name, value]) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          setCookie(name, value, options as Parameters<typeof setCookie>[2]);
        }
      },
    },
  });
}

/** Resolve the verified signed-in user, or throw. RLS still scopes all queries. */
export async function requireUser(
  supabase: SupabaseClient,
): Promise<{ id: string; email: string | null }> {
  // With persistSession:false the client has no internal session, so
  // getUser() (no-arg) returns null. Pull the bearer token from the request
  // and pass it explicitly so the Auth server validates it.
  const authorization = getRequest().headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : undefined;
  const { data } = token ? await supabase.auth.getUser(token) : await supabase.auth.getUser();
  if (!data.user) throw new Error("Not authenticated");
  return { id: data.user.id, email: data.user.email ?? null };
}

/** Service-role client that bypasses RLS — use only for trusted maintenance. */
export function getSupabaseAdminClient(): SupabaseClient {
  const { supabaseUrl, supabaseServiceRoleKey } = getServerConfig();
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase admin is not configured (SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
