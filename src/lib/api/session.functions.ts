// Session/conversation server functions. Auth + RLS come from Lovable's
// `requireSupabaseAuth` middleware (context.supabase is the user-scoped client,
// context.userId the verified user id). We still pass user_id on insert to
// satisfy the WITH CHECK policy.

import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAllowedEmail } from "../auth/guard";
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
  frankBodyMode?: boolean;
}

export interface SessionDetail {
  id: string;
  title: string;
  activeModelKey: string;
  activePresetId: string | null;
  settings: SessionSettings;
  messages: MessageView[];
}

export const listSessions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SessionSummary[]> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;

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
  });

export const getSession = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ sessionId: z.string() }))
  .handler(async ({ data, context }): Promise<SessionDetail | null> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;
    const { signedUrlMap } = await import("../supabase/storage.server");

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
      const url = urls.get(a.storage_path);
      if (!url) continue; // skip if signing failed rather than render a broken image
      const view: AssetView = {
        id: a.id,
        assetType: a.asset_type,
        url,
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
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ title: z.string().optional(), modelKey: z.string().optional() }))
  .handler(async ({ data, context }): Promise<SessionSummary> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;

    const { data: row, error } = await supabase
      .from("sessions")
      .insert({
        user_id: context.userId,
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
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      sessionId: z.string(),
      title: z.string().optional(),
      activeModelKey: z.string().optional(),
      activePresetId: z.string().nullable().optional(),
      settingsJson: z.record(z.string(), z.unknown()).optional(),
    }),
  )
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;

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
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ sessionId: z.string() }))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;
    const { removeSessionObjects } = await import("../supabase/storage.server");

    await removeSessionObjects(supabase, context.userId, data.sessionId);
    const { error } = await supabase.from("sessions").delete().eq("id", data.sessionId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
