// SSR user fetch as a server function so __root (client-reachable) never imports
// the server-only Supabase module directly. Returns null (not throw) when there
// is no session, so the route guard can redirect to /login.

import { createServerFn } from "@tanstack/react-start";

export const fetchUserServer = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ id: string; email: string } | null> => {
    try {
      const { getSupabaseServerClient } = await import("../supabase/supabase.server");
      const supabase = getSupabaseServerClient();
      const { data } = await supabase.auth.getUser();
      return data.user ? { id: data.user.id, email: data.user.email ?? "" } : null;
    } catch {
      return null;
    }
  },
);
