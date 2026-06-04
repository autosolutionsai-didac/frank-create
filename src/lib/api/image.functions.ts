// Image generation/editing server function. Holds the secret API keys, proxies
// the provider, persists results to Supabase Storage + DB, and tracks edit
// lineage via parent_asset_id. RLS scopes every write to the signed-in user.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getCapability } from "../providers/capabilities";
import { composeSystemInstruction, getPreset } from "../presets";
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
  presetId: z.string().nullable().optional(),
  settings: settingsSchema,
  referenceImages: z.array(refImageSchema).optional(),
  /** Set for edits — the generated asset being revised. */
  parentAssetId: z.string().optional(),
});

export const generateImage = createServerFn({ method: "POST" })
  .inputValidator(generateSchema)
  .handler(async ({ data }): Promise<{ ok: true; count: number }> => {
    const { getSupabaseServerClient, requireUser } = await import("../supabase/supabase.server");
    const { getProvider } = await import("../providers/index.server");
    const { uploadImageBytes, downloadImageBase64, storagePath } =
      await import("../supabase/storage.server");

    const supabase = getSupabaseServerClient();
    const user = await requireUser(supabase);
    const cap = getCapability(data.modelKey);

    const refs = data.referenceImages ?? [];
    if (refs.length > cap.maxReferenceImages) {
      throw new Error(`${cap.label} supports at most ${cap.maxReferenceImages} reference images`);
    }
    const isEdit = !!data.parentAssetId;
    if (isEdit && !cap.supportsEditing) {
      throw new Error(`${cap.label} does not support editing`);
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
    const preset = getPreset(data.presetId);
    const input: GenerateInput = {
      modelKey: cap.modelKey,
      prompt: data.prompt,
      systemInstruction: preset ? composeSystemInstruction(preset) : undefined,
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
        user_id: user.id,
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
      const path = storagePath(user.id, data.sessionId, "reference", assetId);
      await uploadImageBytes(supabase, path, ref);
      await supabase.from("assets").insert({
        id: assetId,
        session_id: data.sessionId,
        message_id: userMessageId,
        user_id: user.id,
        asset_type: "reference",
        storage_path: path,
      });
    }

    // 2) assistant message + generated assets
    const { data: aiMsg, error: aiErr } = await supabase
      .from("messages")
      .insert({
        session_id: data.sessionId,
        user_id: user.id,
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
      const path = storagePath(user.id, data.sessionId, "generated", assetId);
      await uploadImageBytes(supabase, path, image);
      await supabase.from("assets").insert({
        id: assetId,
        session_id: data.sessionId,
        message_id: aiMessageId,
        user_id: user.id,
        asset_type: isEdit ? "edited" : "generated",
        storage_path: path,
        parent_asset_id: data.parentAssetId ?? null,
        model_key: cap.modelKey,
        prompt_snapshot: data.prompt,
        metadata_json: data.settings,
      });
    }

    // 4) persist controls + title + bump updated_at
    await supabase
      .from("sessions")
      .update({
        active_model_key: data.modelKey,
        active_preset_id: data.presetId ?? null,
        settings_json: data.settings,
        title: session.title === "Untitled" ? data.prompt.slice(0, 48) : session.title,
      })
      .eq("id", data.sessionId);

    return { ok: true, count: result.images.length };
  });
