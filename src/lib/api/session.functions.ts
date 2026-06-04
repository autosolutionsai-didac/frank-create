// Session/conversation server functions. RLS scopes every query to the
// signed-in user; we still pass user_id on insert to satisfy the WITH CHECK.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { AssetRow, MessageRow, SessionRow } from "../supabase/types";

export interface SessionSummary {
  id: string;
  title: string;
  updatedAt: string;
}

export interface AssetView {
  id: string;
  assetType: "reference" | "generated" | "edited";
  url: string;
  parentAssetId: string | null;
}

export interface MessageView {
  id: string;
  seq: number;
  role: "user" | "assistant";
  messageType: "generate" | "edit";
  promptText: string | null;
  images: AssetView[];
  createdAt: string;
}

/** Persisted control values (serializable — no `unknown`). */
export interface SessionSettings {
  aspectRatio?: string;
  imageSize?: string;
  numImages?: number;
  thinkingLevel?: string;
}

export interface SessionDetail {
  id: string;
  title: string;
  activeModelKey: string;
  activePresetId: string | null;
  settings: SessionSettings;
  messages: MessageView[];
}

export const listSessions = createServerFn({ method: "GET" }).handler(
  async (): Promise<SessionSummary[]> => {
    const { getSupabaseServerClient, requireUser } = await import("../supabase/supabase.server");
    const supabase = getSupabaseServerClient();
    await requireUser(supabase);

    const { data, error } = await supabase
      .from("sessions")
      .select("id, title, updated_at")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);

    return ((data ?? []) as Pick<SessionRow, "id" | "title" | "updated_at">[]).map((s) => ({
      id: s.id,
      title: s.title,
      updatedAt: s.updated_at,
    }));
  },
);

export const getSession = createServerFn({ method: "GET" })
  .inputValidator(z.object({ sessionId: z.string() }))
  .handler(async ({ data }): Promise<SessionDetail | null> => {
    const { getSupabaseServerClient, requireUser } = await import("../supabase/supabase.server");
    const { signedUrlMap } = await import("../supabase/storage.server");
    const supabase = getSupabaseServerClient();
    await requireUser(supabase);

    const { data: sessionData } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", data.sessionId)
      .maybeSingle();
    const session = sessionData as SessionRow | null;
    if (!session) return null;

    const [{ data: msgData }, { data: assetData }] = await Promise.all([
      supabase.from("messages").select("*").eq("session_id", data.sessionId).order("seq"),
      supabase.from("assets").select("*").eq("session_id", data.sessionId).order("created_at"),
    ]);

    const messages = (msgData ?? []) as MessageRow[];
    const assets = (assetData ?? []) as AssetRow[];

    const urls = await signedUrlMap(
      supabase,
      assets.map((a) => a.storage_path),
    );

    const assetsByMessage = new Map<string, AssetView[]>();
    for (const a of assets) {
      if (!a.message_id) continue;
      const view: AssetView = {
        id: a.id,
        assetType: a.asset_type,
        url: urls.get(a.storage_path) ?? "",
        parentAssetId: a.parent_asset_id,
      };
      const list = assetsByMessage.get(a.message_id) ?? [];
      list.push(view);
      assetsByMessage.set(a.message_id, list);
    }

    return {
      id: session.id,
      title: session.title,
      activeModelKey: session.active_model_key,
      activePresetId: session.active_preset_id,
      settings: session.settings_json as SessionSettings,
      messages: messages.map((m) => ({
        id: m.id,
        seq: m.seq,
        role: m.role,
        messageType: m.message_type,
        promptText: m.prompt_text,
        images: assetsByMessage.get(m.id) ?? [],
        createdAt: m.created_at,
      })),
    };
  });

export const createSession = createServerFn({ method: "POST" })
  .inputValidator(z.object({ title: z.string().optional(), modelKey: z.string().optional() }))
  .handler(async ({ data }): Promise<SessionSummary> => {
    const { getSupabaseServerClient, requireUser } = await import("../supabase/supabase.server");
    const supabase = getSupabaseServerClient();
    const user = await requireUser(supabase);

    const { data: row, error } = await supabase
      .from("sessions")
      .insert({
        user_id: user.id,
        title: data.title ?? "Untitled",
        active_model_key: data.modelKey ?? "nano-banana-pro",
      })
      .select("id, title, updated_at")
      .single();
    if (error || !row) throw new Error(error?.message ?? "Failed to create session");
    const s = row as Pick<SessionRow, "id" | "title" | "updated_at">;
    return { id: s.id, title: s.title, updatedAt: s.updated_at };
  });

export const updateSession = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      sessionId: z.string(),
      title: z.string().optional(),
      activeModelKey: z.string().optional(),
      activePresetId: z.string().nullable().optional(),
      settingsJson: z.record(z.string(), z.unknown()).optional(),
    }),
  )
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const { getSupabaseServerClient, requireUser } = await import("../supabase/supabase.server");
    const supabase = getSupabaseServerClient();
    await requireUser(supabase);

    const patch: Record<string, unknown> = {};
    if (data.title !== undefined) patch.title = data.title;
    if (data.activeModelKey !== undefined) patch.active_model_key = data.activeModelKey;
    if (data.activePresetId !== undefined) patch.active_preset_id = data.activePresetId;
    if (data.settingsJson !== undefined) patch.settings_json = data.settingsJson;

    if (Object.keys(patch).length > 0) {
      const { error } = await supabase.from("sessions").update(patch).eq("id", data.sessionId);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteSession = createServerFn({ method: "POST" })
  .inputValidator(z.object({ sessionId: z.string() }))
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const { getSupabaseServerClient, requireUser } = await import("../supabase/supabase.server");
    const { removeSessionObjects } = await import("../supabase/storage.server");
    const supabase = getSupabaseServerClient();
    const user = await requireUser(supabase);

    await removeSessionObjects(supabase, user.id, data.sessionId);
    const { error } = await supabase.from("sessions").delete().eq("id", data.sessionId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
