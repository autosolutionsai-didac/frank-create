import React, { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isAllowedEmail, ALLOWED_EMAIL_DOMAINS } from "./lib/supabaseClient";
import { lovable } from "./lib/lovableAuth";

type Status = "loading" | "signed-out" | "denied" | "ready";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const evaluate = async (s: Session | null) => {
      if (!mounted) return;
      setSession(s);
      if (!s) return setStatus("signed-out");
      const email = s.user?.email;
      if (!isAllowedEmail(email)) {
        await supabase.auth.signOut();
        setError(`Access is restricted to ${ALLOWED_EMAIL_DOMAINS.map((d) => "@" + d).join(" and ")} accounts. (${email ?? "no email"})`);
        return setStatus("denied");
      }
      setStatus("ready");
    };

    supabase.auth.getSession().then(({ data }) => evaluate(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => evaluate(s));
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    setError(null);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
      extraParams: { prompt: "select_account" },
    });
    if (res.error) setError(res.error.message || "Sign-in failed");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (status === "ready" && session) return <>{children}</>;

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-lockup" aria-label="art-ificial studio">
          <span>art-ificial</span> <span>studio</span>
        </div>
        <p className="auth-sub">
          Sign in with your Frank Body or Autosolutions Google account to continue.
        </p>
        {status === "loading" && <p className="auth-muted">Checking session…</p>}
        {(status === "signed-out" || status === "denied") && (
          <button onClick={signIn} className="auth-button">
            Continue with Google
          </button>
        )}
        {status === "denied" && (
          <button onClick={signOut} className="auth-alt">
            Use a different account
          </button>
        )}
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-foot">
          Allowed domains: {ALLOWED_EMAIL_DOMAINS.map((d) => "@" + d).join(", ")}
        </p>
      </div>
    </div>
  );
}
