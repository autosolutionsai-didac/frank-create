// Image generation/editing server function. Holds the secret API keys, proxies
// the provider, persists results to Supabase Storage + DB, and tracks edit
// lineage via parent_asset_id. Auth + RLS come from Lovable's
// `requireSupabaseAuth` middleware (Bearer token → context.supabase + userId).

import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getCapability } from "../providers/capabilities";
import { composeFrankBodySystem } from "../frank-body";
import { assertAllowedEmail } from "../auth/guard";
import type { GenerateInput } from "../providers/types";
import type { AssetRow } from "../supabase/types";

const refImageSchema = z.object({ mimeType: z.string(), dataBase64: z.string() });

const settingsSchema = z.object({
  aspectRatio: z.string(),
  imageSize: z.enum(["1K", "2K", "4K"]),
  numImages: z.number().int().min(1).max(8),
  thinkingLevel: z.enum(["Low", "High"]).optional(),
});

const generateSchema = z.object({
  sessionId: z.string(),
  modelKey: z.string(),
  prompt: z.string().min(1, "A prompt is required"),
  /** Frank Body Mode (Layer-1 style system), opt-in. */
  frankBodyMode: z.boolean().optional(),
  settings: settingsSchema,
  referenceImages: z.array(refImageSchema).optional(),
  /** Set for edits — the generated asset being revised. */
  parentAssetId: z.string().optional(),
  /** Edit model (may differ from the generation model/provider). */
  editModelKey: z.string().optional(),
  /** References attached to an edit (separate from generation references). */
  editReferenceImages: z.array(refImageSchema).optional(),
});

export const generateImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(generateSchema)
  .handler(async ({ data, context }): Promise<{ ok: true; count: number }> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;
    const userId = context.userId;

    const { getProvider } = await import("../providers/index.server");
    const { uploadImageBytes, downloadImageBase64, storagePath } =
      await import("../supabase/storage.server");

    const isEdit = !!data.parentAssetId;
    const genCap = getCapability(data.modelKey);
    // Edits dispatch to the chosen edit model (may be a different provider).
    const cap = isEdit && data.editModelKey ? getCapability(data.editModelKey) : genCap;
    if (cap.status === "coming-soon") throw new Error(`${cap.label} isn't available yet.`);
    if (isEdit && !cap.editCapable) {
      throw new Error(`${cap.label} can't be used to edit.`);
    }

    // Active references this turn: edit refs when editing, else generation refs.
    const refs = isEdit ? (data.editReferenceImages ?? []) : (data.referenceImages ?? []);
    if (refs.length > cap.maxReferenceImages) {
      throw new Error(`${cap.label} supports at most ${cap.maxReferenceImages} reference images`);
    }

    // Confirm the session belongs to the user (RLS also enforces this).
    const { data: sessionRow } = await supabase
      .from("sessions")
      .select("id, title")
      .eq("id", data.sessionId)
      .maybeSingle();
    if (!sessionRow) throw new Error("Session not found");
    const session = sessionRow as { id: string; title: string };

    // Resolve the parent image bytes for an edit (read-only).
    let editParentImage: GenerateInput["editParentImage"];
    if (data.parentAssetId) {
      const { data: parent } = await supabase
        .from("assets")
        .select("storage_path")
        .eq("id", data.parentAssetId)
        .maybeSingle();
      const parentRow = parent as Pick<AssetRow, "storage_path"> | null;
      if (!parentRow) throw new Error("Parent image not found");
      editParentImage = await downloadImageBase64(supabase, parentRow.storage_path);
    }

    // Generate FIRST — if the provider throws, nothing is persisted, so we never
    // leave an orphaned user turn or stray Storage objects behind.
    const input: GenerateInput = {
      modelKey: cap.modelKey,
      prompt: data.prompt,
      systemInstruction: data.frankBodyMode ? composeFrankBodySystem() : undefined,
      settings: {
        aspectRatio: data.settings.aspectRatio as GenerateInput["settings"]["aspectRatio"],
        imageSize: data.settings.imageSize,
        numImages: data.settings.numImages,
        thinkingLevel: data.settings.thinkingLevel,
      },
      referenceImages: refs,
      editParentImage,
    };
    const result = await getProvider(cap.provider).generate(input);

    // 1) user message (persist only after a successful generation)
    const { data: userMsg, error: userErr } = await supabase
      .from("messages")
      .insert({
        session_id: data.sessionId,
        user_id: userId,
        role: "user",
        message_type: isEdit ? "edit" : "generate",
        prompt_text: data.prompt,
        settings_snapshot_json: data.settings,
      })
      .select("id")
      .single();
    if (userErr || !userMsg) throw new Error(userErr?.message ?? "Failed to record prompt");
    const userMessageId = (userMsg as { id: string }).id;

    // Persist reference images as assets on the user message.
    for (const ref of refs) {
      const assetId = crypto.randomUUID();
      const path = storagePath(userId, data.sessionId, "reference", assetId);
      await uploadImageBytes(supabase, path, ref);
      await supabase.from("assets").insert({
        id: assetId,
        session_id: data.sessionId,
        message_id: userMessageId,
        user_id: userId,
        asset_type: "reference",
        storage_path: path,
      });
    }

    // 2) assistant message + generated assets
    const { data: aiMsg, error: aiErr } = await supabase
      .from("messages")
      .insert({
        session_id: data.sessionId,
        user_id: userId,
        role: "assistant",
        message_type: isEdit ? "edit" : "generate",
        prompt_text: result.thoughts ?? null,
        settings_snapshot_json: data.settings,
      })
      .select("id")
      .single();
    if (aiErr || !aiMsg) throw new Error(aiErr?.message ?? "Failed to record result");
    const aiMessageId = (aiMsg as { id: string }).id;

    for (const image of result.images) {
      const assetId = crypto.randomUUID();
      const path = storagePath(userId, data.sessionId, "generated", assetId);
      await uploadImageBytes(supabase, path, image);
      await supabase.from("assets").insert({
        id: assetId,
        session_id: data.sessionId,
        message_id: aiMessageId,
        user_id: userId,
        asset_type: isEdit ? "edited" : "generated",
        storage_path: path,
        parent_asset_id: data.parentAssetId ?? null,
        model_key: cap.modelKey,
        prompt_snapshot: data.prompt,
        metadata_json: data.settings,
      });
    }

    // 3) persist controls + title + bump updated_at
    await supabase
      .from("sessions")
      .update({
        active_model_key: data.modelKey,
        active_preset_id: null, // legacy column; presets are now client-side prompts
        settings_json: { ...data.settings, frankBodyMode: data.frankBodyMode ?? false },
        title: session.title === "Untitled" ? data.prompt.slice(0, 48) : session.title,
      })
      .eq("id", data.sessionId);

    return { ok: true, count: result.images.length };
  });
