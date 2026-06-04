// Server-only Storage helpers for the private studio-images bucket.

import type { SupabaseClient } from "@supabase/supabase-js";

import type { GeneratedImage, RefImage } from "../providers/types";
import { STUDIO_BUCKET } from "./types";

const SIGNED_URL_TTL = 60 * 60; // 1 hour

export type AssetKind = "reference" | "generated";

export function storagePath(
  userId: string,
  sessionId: string,
  kind: AssetKind,
  assetId: string,
): string {
  return `${userId}/${sessionId}/${kind}/${assetId}.png`;
}

/** Upload base64 image bytes to the bucket. Returns the storage path. */
export async function uploadImageBytes(
  supabase: SupabaseClient,
  path: string,
  image: GeneratedImage | RefImage,
): Promise<void> {
  const bytes = Buffer.from(image.dataBase64, "base64");
  const { error } = await supabase.storage.from(STUDIO_BUCKET).upload(path, bytes, {
    contentType: image.mimeType,
    upsert: true,
  });
  if (error) throw new Error(`Storage upload failed: ${error.message}`);
}

/** Download a stored object and return it as base64 (for editing). */
export async function downloadImageBase64(
  supabase: SupabaseClient,
  path: string,
): Promise<RefImage> {
  const { data, error } = await supabase.storage.from(STUDIO_BUCKET).download(path);
  if (error || !data) throw new Error(`Storage download failed: ${error?.message ?? path}`);
  const buf = Buffer.from(await data.arrayBuffer());
  return { mimeType: data.type || "image/png", dataBase64: buf.toString("base64") };
}

/** Batch-create signed URLs. Returns a path -> URL map. */
export async function signedUrlMap(
  supabase: SupabaseClient,
  paths: string[],
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (paths.length === 0) return map;
  const { data, error } = await supabase.storage
    .from(STUDIO_BUCKET)
    .createSignedUrls(paths, SIGNED_URL_TTL);
  if (error) throw new Error(`Signed URL creation failed: ${error.message}`);
  for (const entry of data ?? []) {
    if (entry.signedUrl && entry.path) map.set(entry.path, entry.signedUrl);
  }
  return map;
}

/** Best-effort removal of every object under a session's folder. */
export async function removeSessionObjects(
  supabase: SupabaseClient,
  userId: string,
  sessionId: string,
): Promise<void> {
  const prefix = `${userId}/${sessionId}`;
  for (const kind of ["reference", "generated"] as const) {
    const { data } = await supabase.storage.from(STUDIO_BUCKET).list(`${prefix}/${kind}`);
    const paths = (data ?? []).map((f) => `${prefix}/${kind}/${f.name}`);
    if (paths.length) await supabase.storage.from(STUDIO_BUCKET).remove(paths);
  }
}
