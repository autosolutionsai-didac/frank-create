// Client-side image helpers. Downscale references before upload so payloads
// stay well under the Cloudflare Workers body limit.

import type { RefImage } from "./providers/types";

export async function fileToDownscaledBase64(file: File, maxEdge = 1536): Promise<RefImage> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
  const dataUrl = canvas.toDataURL(mimeType, 0.92);
  return { mimeType, dataBase64: dataUrl.split(",")[1] ?? "" };
}

export function toDataUrl(img: { mimeType: string; dataBase64: string }): string {
  return `data:${img.mimeType};base64,${img.dataBase64}`;
}
