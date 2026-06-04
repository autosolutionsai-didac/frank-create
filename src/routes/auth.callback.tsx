import { createFileRoute, redirect } from "@tanstack/react-router";

import { exchangeOAuthCode } from "@/lib/auth/auth.functions";

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search): { code?: string } => ({
    code: typeof search.code === "string" ? search.code : undefined,
  }),
  beforeLoad: async ({ search }) => {
    if (search.code) {
      // Exchanges the code, sets auth cookies, and throws a redirect.
      await exchangeOAuthCode({ data: { code: search.code } });
    }
    throw redirect({ to: "/login", search: { error: "auth" } });
  },
  component: () => null,
});
