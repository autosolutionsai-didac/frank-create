import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { lovable } from "../lib/lovable";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/studio` },
        });
        if (error) throw error;
      }
      nav("/studio");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setError(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      // If redirected, the browser will already be navigating; otherwise session set.
      nav("/studio");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-fg grid place-items-center p-6">
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div className="text-center" style={{ marginBottom: 32 }}>
          <div className="font-display text-4xl">Frank Create</div>
          <div className="text-sm text-muted" style={{ marginTop: 8 }}>
            {mode === "signin" ? "Welcome back." : "Make an account."}
          </div>
        </div>

        <button className="btn w-full" onClick={handleGoogle} disabled={busy}>
          Continue with Google
        </button>

        <div className="flex items-center gap-3" style={{ margin: "24px 0" }}>
          <div className="divider flex-1" />
          <span className="text-xs text-muted uppercase tracking-widest">or</span>
          <div className="divider flex-1" />
        </div>

        <form onSubmit={handleEmail} className="space-y-4">
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {error && <div className="text-sm" style={{ color: "var(--danger)" }}>{error}</div>}
          <button className="btn btn-primary w-full" type="submit" disabled={busy}>
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="text-center text-sm text-muted" style={{ marginTop: 20 }}>
          {mode === "signin" ? (
            <button
              type="button"
              className="btn-ghost btn"
              onClick={() => setMode("signup")}
            >
              Need an account? Sign up
            </button>
          ) : (
            <button
              type="button"
              className="btn-ghost btn"
              onClick={() => setMode("signin")}
            >
              Already have an account? Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
