import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { streamImage } from "../lib/streamImage";

type Db = {
  sessions: {
    id: string;
    title: string;
    user_id: string;
    active_model_key: string;
    created_at: string;
    updated_at: string;
  };
  messages: {
    id: string;
    session_id: string;
    user_id: string;
    role: string;
    message_type: string;
    prompt_text: string | null;
    settings_snapshot_json: Record<string, unknown>;
    created_at: string;
    seq: number;
  };
  assets: {
    id: string;
    session_id: string;
    message_id: string | null;
    user_id: string;
    storage_path: string;
    asset_type: string;
    prompt_snapshot: string | null;
    model_key: string | null;
    metadata_json: Record<string, unknown>;
    created_at: string;
  };
};

const MODELS = [
  { key: "nano-banana-pro", label: "Nano Banana Pro", blurb: "Highest quality" },
  { key: "nano-banana-2", label: "Nano Banana 2", blurb: "Fast & sharp" },
  { key: "gpt-image-2", label: "GPT-Image-2", blurb: "Great with text" },
] as const;

type ModelKey = (typeof MODELS)[number]["key"];

export default function StudioPage({ session }: { session: Session }) {
  const userId = session.user.id;
  const nav = useNavigate();
  const [sessions, setSessions] = useState<Db["sessions"][]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Db["messages"][]>([]);
  const [assetsByMsg, setAssetsByMsg] = useState<Record<string, Db["assets"][]>>({});
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<ModelKey>("nano-banana-pro");
  const [busy, setBusy] = useState(false);
  const [streamFrame, setStreamFrame] = useState<{ url: string; final: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeId) ?? null,
    [sessions, activeId],
  );

  // Load sessions
  const loadSessions = useCallback(async () => {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      setError(error.message);
      return;
    }
    setSessions((data ?? []) as Db["sessions"][]);
    if (!activeId && data && data.length > 0) {
      setActiveId(data[0].id);
    }
  }, [activeId]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // Load messages + assets for active session
  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      setAssetsByMsg({});
      return;
    }
    let cancelled = false;
    (async () => {
      const [msgRes, assetRes] = await Promise.all([
        supabase
          .from("messages")
          .select("*")
          .eq("session_id", activeId)
          .order("seq", { ascending: true }),
        supabase.from("assets").select("*").eq("session_id", activeId),
      ]);
      if (cancelled) return;
      if (msgRes.error) {
        setError(msgRes.error.message);
        return;
      }
      if (assetRes.error) {
        setError(assetRes.error.message);
        return;
      }
      setMessages((msgRes.data ?? []) as Db["messages"][]);
      const grouped: Record<string, Db["assets"][]> = {};
      for (const a of (assetRes.data ?? []) as Db["assets"][]) {
        const k = a.message_id ?? "_";
        (grouped[k] ||= []).push(a);
      }
      setAssetsByMsg(grouped);
      const m = activeId;
      if (m === activeId) {
        setModel((sessions.find((s) => s.id === activeId)?.active_model_key as ModelKey) ?? model);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeId, sessions]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamFrame]);

  async function createSession() {
    const { data, error } = await supabase
      .from("sessions")
      .insert({ user_id: userId, title: "New session", active_model_key: model })
      .select()
      .single();
    if (error) {
      setError(error.message);
      return null;
    }
    setSessions((s) => [data as Db["sessions"], ...s]);
    setActiveId(data.id);
    return data.id as string;
  }

  async function renameSession(id: string, title: string) {
    const { error } = await supabase.from("sessions").update({ title }).eq("id", id);
    if (error) return setError(error.message);
    setSessions((s) => s.map((x) => (x.id === id ? { ...x, title } : x)));
  }

  async function deleteSession(id: string) {
    if (!confirm("Delete this session and all its images?")) return;
    const { error } = await supabase.from("sessions").delete().eq("id", id);
    if (error) return setError(error.message);
    setSessions((s) => s.filter((x) => x.id !== id));
    if (activeId === id) setActiveId(null);
  }

  async function setSessionModel(m: ModelKey) {
    setModel(m);
    if (activeId) {
      await supabase.from("sessions").update({ active_model_key: m }).eq("id", activeId);
    }
  }

  async function nextSeq(sessionId: string): Promise<number> {
    const { data } = await supabase
      .from("messages")
      .select("seq")
      .eq("session_id", sessionId)
      .order("seq", { ascending: false })
      .limit(1)
      .maybeSingle();
    return ((data?.seq as number | undefined) ?? 0) + 1;
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || busy) return;
    setError(null);

    let sid = activeId;
    if (!sid) {
      sid = await createSession();
      if (!sid) return;
    }
    const trimmedPrompt = prompt.trim();
    setBusy(true);
    setStreamFrame(null);

    try {
      // 1. Insert user message
      const seq1 = await nextSeq(sid);
      const { data: userMsg, error: e1 } = await supabase
        .from("messages")
        .insert({
          session_id: sid,
          user_id: userId,
          role: "user",
          message_type: "prompt",
          prompt_text: trimmedPrompt,
          settings_snapshot_json: { model },
          seq: seq1,
        })
        .select()
        .single();
      if (e1) throw e1;

      setMessages((m) => [...m, userMsg as Db["messages"]]);
      setPrompt("");

      // 2. Stream the image
      let finalDataUrl: string | null = null;
      await streamImage({ prompt: trimmedPrompt, model }, (frame) => {
        setStreamFrame({ url: frame.dataUrl, final: frame.isFinal });
        if (frame.isFinal) finalDataUrl = frame.dataUrl;
      });
      if (!finalDataUrl) throw new Error("No image produced");

      // 3. Upload to storage
      const blob = await (await fetch(finalDataUrl)).blob();
      const assetId = crypto.randomUUID();
      const storagePath = `${userId}/${sid}/${assetId}.png`;
      const { error: upErr } = await supabase.storage
        .from("studio-images")
        .upload(storagePath, blob, { contentType: "image/png", upsert: false });
      if (upErr) throw upErr;

      // 4. Insert assistant message + asset
      const seq2 = await nextSeq(sid);
      const { data: aiMsg, error: e2 } = await supabase
        .from("messages")
        .insert({
          session_id: sid,
          user_id: userId,
          role: "assistant",
          message_type: "image",
          prompt_text: null,
          settings_snapshot_json: { model },
          seq: seq2,
        })
        .select()
        .single();
      if (e2) throw e2;

      const { data: assetRow, error: e3 } = await supabase
        .from("assets")
        .insert({
          id: assetId,
          session_id: sid,
          user_id: userId,
          message_id: (aiMsg as Db["messages"]).id,
          storage_path: storagePath,
          asset_type: "image",
          prompt_snapshot: trimmedPrompt,
          model_key: model,
        })
        .select()
        .single();
      if (e3) throw e3;

      setMessages((m) => [...m, aiMsg as Db["messages"]]);
      setAssetsByMsg((a) => ({
        ...a,
        [(aiMsg as Db["messages"]).id]: [assetRow as Db["assets"]],
      }));

      // Auto-title the session from the first prompt
      const isFirst = messages.length === 0;
      if (isFirst && activeSession) {
        const title = trimmedPrompt.slice(0, 60);
        await renameSession(sid, title);
      }
      await supabase.from("sessions").update({ updated_at: new Date().toISOString() }).eq("id", sid);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
      setStreamFrame(null);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    nav("/");
  }

  return (
    <div className="min-h-screen bg-bg text-fg" style={{ display: "grid", gridTemplateColumns: "260px 1fr" }}>
      {/* Sidebar */}
      <aside className="border-r flex flex-col" style={{ background: "var(--panel)", height: "100vh" }}>
        <div className="p-4 flex items-center justify-between">
          <div className="font-display text-xl">Frank Create</div>
        </div>
        <div className="px-3" style={{ marginBottom: 8 }}>
          <button className="btn btn-primary w-full" onClick={() => createSession()}>
            + New session
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`session-row ${activeId === s.id ? "active" : ""}`}
              onClick={() => setActiveId(s.id)}
              onDoubleClick={() => {
                const t = window.prompt("Rename session", s.title);
                if (t && t.trim()) renameSession(s.id, t.trim());
              }}
              title="Double-click to rename"
            >
              {s.title || "Untitled"}
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="text-xs text-muted p-3">No sessions yet.</div>
          )}
        </div>
        <div className="border-t p-3 text-xs text-muted">
          <div style={{ marginBottom: 6 }}>{session.user.email}</div>
          <button className="btn-ghost btn" style={{ padding: "4px 8px", fontSize: 12 }} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main canvas */}
      <main className="flex flex-col" style={{ height: "100vh" }}>
        <header className="border-b flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="font-display text-lg">{activeSession?.title ?? "New session"}</div>
            {activeSession && (
              <button
                className="btn-ghost btn"
                style={{ padding: "2px 8px", fontSize: 11 }}
                onClick={() => deleteSession(activeSession.id)}
              >
                Delete
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {MODELS.map((m) => (
              <button
                key={m.key}
                className={`model-pill ${model === m.key ? "active" : ""}`}
                onClick={() => setSessionModel(m.key)}
                title={m.blurb}
              >
                {m.label}
              </button>
            ))}
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8">
          <div style={{ maxWidth: 880, margin: "0 auto" }} className="space-y-8">
            {messages.length === 0 && !streamFrame && (
              <EmptyState />
            )}

            {messages.map((m) => (
              <MessageRow key={m.id} message={m} assets={assetsByMsg[m.id] ?? []} />
            ))}

            {streamFrame && (
              <div className="preview-frame">
                <img
                  src={streamFrame.url}
                  alt="Generating…"
                  className={streamFrame.final ? "final" : "partial"}
                />
                {!streamFrame.final && (
                  <div className="absolute" style={{ bottom: 16, left: 16 }}>
                    <span className="chip">Rendering…</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleGenerate} className="border-t p-6">
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            {error && (
              <div
                className="text-sm"
                style={{ color: "var(--danger)", marginBottom: 8 }}
              >
                {error}
              </div>
            )}
            <textarea
              className="textarea"
              placeholder="Describe the image you want to create…"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleGenerate(e as unknown as React.FormEvent);
                }
              }}
              disabled={busy}
            />
            <div className="flex items-center justify-between" style={{ marginTop: 12 }}>
              <div className="text-xs text-muted">
                ⌘/Ctrl + Enter to generate · model: <span style={{ color: "var(--accent)" }}>{MODELS.find((m) => m.key === model)?.label}</span>
              </div>
              <button className="btn btn-primary" type="submit" disabled={busy || !prompt.trim()}>
                {busy ? "Generating…" : "Generate"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center" style={{ paddingTop: 80 }}>
      <div className="font-display text-4xl" style={{ marginBottom: 12 }}>
        A blank frame.
      </div>
      <div className="text-muted">Describe what you want and Frank Create will render it.</div>
    </div>
  );
}

function MessageRow({ message, assets }: { message: Db["messages"]; assets: Db["assets"][] }) {
  if (message.role === "user") {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-muted" style={{ marginBottom: 6 }}>
          You
        </div>
        <div
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 18px",
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
          }}
        >
          {message.prompt_text}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted" style={{ marginBottom: 6 }}>
        Frank
      </div>
      <div className="gallery-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {assets.map((a) => (
          <AssetTile key={a.id} asset={a} />
        ))}
      </div>
    </div>
  );
}

function AssetTile({ asset }: { asset: Db["assets"] }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.storage
        .from("studio-images")
        .createSignedUrl(asset.storage_path, 60 * 60);
      if (!cancelled && !error) setUrl(data.signedUrl);
    })();
    return () => {
      cancelled = true;
    };
  }, [asset.storage_path]);
  return (
    <div
      style={{
        aspectRatio: "1 / 1",
        background: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {url ? (
        <img src={url} alt={asset.prompt_snapshot ?? ""} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : (
        <div className="grid place-items-center h-full text-xs text-muted">Loading…</div>
      )}
    </div>
  );
}
