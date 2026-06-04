// Provider factory. Server-only. Callers look up the provider for a model via
// the capability registry and dispatch here — the UI never touches an SDK.

import { getGeminiProvider } from "./gemini.server";
import { getReplicateProvider } from "./replicate.server";
import type { ImageProvider, ProviderId } from "./types";

export function getProvider(id: ProviderId): ImageProvider {
  switch (id) {
    case "gemini":
      return getGeminiProvider();
    case "replicate":
      return getReplicateProvider();
    case "openai":
      throw new Error("OpenAI provider not wired yet (Phase 3)");
    default:
      throw new Error(`Unknown provider: ${id as string}`);
  }
}
