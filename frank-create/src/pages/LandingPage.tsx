import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col">
      <header className="flex items-center justify-between p-6">
        <div className="font-display text-2xl">Frank Create</div>
        <Link to="/auth" className="btn">Sign in</Link>
      </header>

      <main className="flex-1 grid place-items-center px-6">
        <div className="text-center" style={{ maxWidth: 720 }}>
          <div className="chip" style={{ marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: "var(--accent)" }} />
            Powered by Lovable AI
          </div>
          <h1 className="font-display text-6xl" style={{ lineHeight: 1.05, marginBottom: 24 }}>
            An image studio that thinks in <em style={{ color: "var(--accent)" }}>frames</em>,
            not files.
          </h1>
          <p className="text-lg text-muted" style={{ marginBottom: 32 }}>
            Generate, edit, and iterate with Nano Banana Pro, Nano Banana 2, and GPT-Image-2 —
            in one calm canvas, with your prompts saved as you go.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/auth" className="btn btn-primary">Start creating</Link>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-muted uppercase tracking-widest">
        Built on Lovable Cloud
      </footer>
    </div>
  );
}
