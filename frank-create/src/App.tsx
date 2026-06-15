import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import AuthPage from "./pages/AuthPage";
import StudioPage from "./pages/StudioPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-bg text-fg">
        <div className="text-sm tracking-widest uppercase opacity-50">Loading studio</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={session ? <Navigate to="/studio" replace /> : <LandingPage />} />
        <Route path="/auth" element={session ? <Navigate to="/studio" replace /> : <AuthPage />} />
        <Route
          path="/studio"
          element={session ? <StudioPage session={session} /> : <Navigate to="/auth" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen grid place-items-center bg-bg text-fg">
      <div className="text-center space-y-4">
        <div className="font-display text-6xl">404</div>
        <button onClick={() => nav("/")} className="btn-primary">Back home</button>
      </div>
    </div>
  );
}
