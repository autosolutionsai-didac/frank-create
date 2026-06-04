import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  validateSearch: (search): { error?: string; redirect?: string } => ({
    error: typeof search.error === "string" ? search.error : undefined,
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { error } = Route.useSearch();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void supabase.auth.getUser().then(({ data }) => {
      if (cancelled || !data.user) return;
      void navigate({ to: "/", replace: true });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) return;
      void navigate({ to: "/", replace: true });
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function signIn() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      return;
    }

    if (result.redirected) return;

    const { data } = await supabase.auth.getUser();
    if (data.user) {
      await navigate({ to: "/", replace: true });
      return;
    }

    setBusy(false);
  }

  const message =
    error === "domain"
      ? "Only @frankbody.com accounts can sign in."
      : error === "auth"
        ? "Sign-in failed. Please try again."
        : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border bg-card p-8 text-center shadow-sm">
        <span className="inline-block rounded-sm border border-foreground/30 px-2 py-0.5 font-mono text-sm font-semibold">
          frank | body
        </span>
        <h1 className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Image Studio
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Sign in with your Frank Body Google account.
        </p>
        {message && <p className="mt-3 text-sm text-destructive">{message}</p>}
        <Button className="mt-6 w-full" onClick={() => void signIn()} disabled={busy}>
          {busy ? "Redirecting…" : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
}
