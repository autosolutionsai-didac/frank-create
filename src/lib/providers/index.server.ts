// Provider factory. Server-only. Callers look up the provider for a model via
// the capability registry and dispatch here — the UI never touches an SDK.

import { getLovableProvider } from "./lovable.server";
import { getReplicateProvider } from "./replicate.server";
import { getOpenAIProvider } from "./openai.server";
import type { ImageProvider, ProviderId } from "./types";

export function getProvider(id: ProviderId): ImageProvider {
  switch (id) {
    case "lovable":
      return getLovableProvider();
    case "replicate":
      return getReplicateProvider();
    case "openai":
      return getOpenAIProvider();
    case "microsoft":
      throw new Error("This model isn't available yet.");
    default:
      throw new Error(`Unknown provider: ${id as string}`);
  }
}
