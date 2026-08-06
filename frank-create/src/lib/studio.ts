import type { StudioModel, StudioSettings, TurnRequest } from "./types";

export interface BuildTurnRequestInput {
  sessionId?: string;
  modelId: string;
  prompt: string;
  promptMode: "generate" | "edit" | "masked_edit";
  frankBodyMode?: boolean;
  presetKey?: string;
  settings: StudioSettings;
  referenceAssetIds?: string[];
  editSourceAssetId?: string;
  maskAssetId?: string;
}

export function buildTurnRequest(input: BuildTurnRequestInput): TurnRequest {
  return {
    session_id: input.sessionId,
    kind: input.promptMode,
    model: input.modelId,
    prompt: input.prompt.trim(),
    frank_body_mode: input.frankBodyMode ?? false,
    preset_key: input.presetKey,
    settings: input.settings,
    reference_asset_ids: input.referenceAssetIds ?? [],
    edit_source_asset_id: input.editSourceAssetId,
    mask_asset_id: input.maskAssetId
  };
}

export function selectModelOptions(models: StudioModel[], selectedId: string) {
  const selectedModel = models.find((model) => model.id === selectedId) ?? models[0];

  return {
    model: selectedModel,
    allowedImageSizes: selectedModel?.allowed_image_sizes ?? [],
    allowedAspectRatios: selectedModel?.allowed_aspect_ratios ?? [],
    resolutionBadge: selectedModel?.badge ?? "",
    referenceLimit: selectedModel?.reference_image_limit ?? 0,
    canEdit: Boolean(selectedModel?.capabilities.edit),
    canMaskedEdit: Boolean(selectedModel?.capabilities.masked_edit),
    canVideo: Boolean(selectedModel?.capabilities.video)
  };
}

export function inferenceStatusCopy(result: {
  status: "queued" | "running" | "blocked" | "failed" | "complete";
  assetCount?: number;
  localEngine?: "fallback" | "frank_renderer";
  fallbackReason?: string;
}) {
  if (result.status === "blocked") {
    return "Server key needed.";
  }
  if (result.status === "failed") {
    return "Provider returned no usable image. Check the turn details or try the local renderer.";
  }
  if (result.status === "complete" && result.assetCount) {
    if (result.localEngine === "fallback") {
      return "The provider was unavailable, so the fallback renderer made this round.";
    }
    if (result.localEngine === "frank_renderer") {
      return "Frank masked edit is on the wall.";
    }
    return "Round is on the wall.";
  }
  return "Round queued. Adapter handoff is ready.";
}

export function aspectRatioValue(aspect: string): number | null {
  const match = /^(\d+(?:\.\d+)?)[:x](\d+(?:\.\d+)?)$/i.exec(aspect.trim());
  if (!match) return null;
  const w = Number(match[1]);
  const h = Number(match[2]);
  if (!w || !h) return null;
  return w / h;
}

export function sizeMatchesAspect(size: string, aspect: string): boolean {
  // Only filter when size encodes explicit pixel dimensions like "1024x1536".
  const sizeRatio = aspectRatioValue(size);
  if (sizeRatio === null) return true; // tier-style sizes (1K, 2K, 4MP) apply to any aspect
  const aspectRatio = aspectRatioValue(aspect);
  if (aspectRatio === null) return true;
  return Math.abs(sizeRatio - aspectRatio) / aspectRatio < 0.05;
}

export function filterSizesForAspect(sizes: string[], aspect: string): string[] {
  const filtered = sizes.filter((s) => sizeMatchesAspect(s, aspect));
  return filtered.length ? filtered : sizes;
}

export function normalizeStudioSettingsForModel(settings: StudioSettings, model: StudioModel): StudioSettings {
  const count = Number.isFinite(settings.count) ? Math.trunc(settings.count) : 1;
  const aspect = model.allowed_aspect_ratios.includes(settings.aspect_ratio)
    ? settings.aspect_ratio
    : model.allowed_aspect_ratios[0] ?? "1:1";
  const sizesForAspect = filterSizesForAspect(model.allowed_image_sizes, aspect);

  return {
    aspect_ratio: aspect,
    image_size: sizesForAspect.includes(settings.image_size)
      ? settings.image_size
      : sizesForAspect[sizesForAspect.length - 1] ?? "1K",
    count: Math.min(Math.max(count, 1), 4)
  };
}


export function parseJsonList(value?: string) {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function defaultStudioSettings(model: StudioModel): StudioSettings {
  return {
    aspect_ratio: model.allowed_aspect_ratios[0] ?? "1:1",
    image_size: model.allowed_image_sizes[model.allowed_image_sizes.length - 1] ?? "1K",
    count: 4
  };
}

export function makeLocalId(prefix: string) {
  if ("crypto" in window && "randomUUID" in window.crypto) {
    return `${prefix}_${window.crypto.randomUUID().replace(/-/g, "")}`;
  }
  return `${prefix}_${Date.now()}`;
}
