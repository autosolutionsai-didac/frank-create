export type ApprovalStatus = "review" | "approved" | "rejected";

export interface FrankTask {
  key: string;
  label: string;
  description: string;
  providers: string[];
}

export interface FrankProvider {
  key: string;
  label: string;
  type: "local" | "api";
  status: "ready" | "curated" | "later";
}

export interface ExportPreset {
  key: string;
  label: string;
  size: string;
  format: string;
  media_types?: Array<"image" | "video">;
}

export interface StudioCapabilities {
  generation: boolean;
  edit: boolean;
  masked_edit: boolean;
  video: boolean;
}

export interface StudioModel {
  id: string;
  label: string;
  short_label?: string;
  provider: string;
  provider_model?: string;
  provider_api_version?: string;
  provider_video_model?: string;
  env_vars?: string[];
  status: "ready" | "disabled" | "experimental";
  badge: string;
  max_resolution_label: string;
  description?: string;
  capabilities: StudioCapabilities;
  allowed_aspect_ratios: string[];
  allowed_image_sizes: string[];
  reference_image_limit: number;
  cost_label: string;
  configured?: boolean;
  configured_env_var?: string;
  missing_env_vars?: string[];
  lora_candidate?: boolean;
}

export interface PromptPreset {
  key: string;
  label: string;
  description: string;
  prompt: string;
}

export interface PromptRemixVariant {
  key: string;
  label: string;
  prompt: string;
}

export interface BrandKit {
  style_guidance: string;
  negative_prompt: string;
  reference_notes: string;
  sync_status?: string;
  remote_id?: string | null;
  updated_at?: string;
}

export interface FrankConfig {
  tasks: FrankTask[];
  providers: FrankProvider[];
  exportPresets: ExportPreset[];
  models: StudioModel[];
  backlogModels: StudioModel[];
  promptPresets: PromptPreset[];
  voice: {
    appTitle: string;
    labTitle: string;
    primaryAction: string;
    emptyState: string;
    approved: string;
  };
}

export interface ProviderReadiness {
  summary: {
    modelCount: number;
    readyModels: number;
    waitingModels: number;
    configuredEnvVars: string[];
    missingEnvVars: string[];
  };
  providers: Array<{
    provider: string;
    configured: boolean;
    model_count: number;
    ready_model_count: number;
    waiting_model_count: number;
    configured_env_vars: string[];
    missing_env_vars: string[];
    models: string[];
  }>;
  models: StudioModel[];
  notes: string[];
}

export interface ActivationChecklist {
  title: string;
  status: "ready" | "action_needed";
  summary: {
    ready_provider_models: number;
    provider_model_count: number;
    waiting_provider_models: number;
    diffusion_ready: boolean;
    checkpoint_count: number;
    server_key_file: string;
    configured_env_vars: string[];
    missing_env_vars: string[];
  };
  steps: Array<{
    key: string;
    label: string;
    status: "ready" | "action_needed" | "recommended";
    detail: string;
    action: string;
    env_vars?: string[];
    path?: string;
    minimum_checkpoint_mb?: number;
  }>;
  notes: string[];
}

export interface ProviderEnvStatus {
  filePath: string;
  fileExists: boolean;
  envVars: string[];
  configuredEnvVars: string[];
  missingEnvVars: string[];
  notes: string[];
  created?: boolean;
  loadedEnvVars?: string[];
  savedEnvVars?: string[];
  ignoredEnvVars?: string[];
  ignoredPlaceholderEnvVars?: string[];
  readiness?: ProviderReadiness;
}

export interface ProviderAdapterAudit {
  title: string;
  generated_at: string;
  summary: {
    model_count: number;
    runner_registered: number;
    missing_runners: number;
    ready_models: number;
    waiting_for_key: number;
    preview_failures: number;
    operation_preview_count?: number;
    operation_preview_failures?: number;
    no_spend: boolean;
    secret_values_returned: boolean;
  };
  models: Array<{
    model_id: string;
    label: string;
    provider: string;
    provider_model?: string;
    badge?: string;
    status: "ready" | "waiting_for_key" | "adapter_missing" | "preview_failed";
    configured: boolean;
    configured_env_var?: string;
    missing_env_vars: string[];
    runner_registered: boolean;
    operation_kinds: string[];
    capabilities: StudioCapabilities;
    reference_limit: number;
    allowed_aspect_ratios: string[];
    allowed_image_sizes: string[];
    request_preview?: {
      method?: string;
      endpoint?: string;
      fallback_endpoint?: string;
      auth?: string;
      content_type?: string;
      body_preview?: Record<string, unknown>;
    };
    request_preview_error?: string;
    request_previews?: Record<
      string,
      {
        method?: string;
        endpoint?: string;
        fallback_endpoint?: string;
        auth?: string;
        content_type?: string;
        body_preview?: Record<string, unknown>;
      }
    >;
    request_preview_errors?: Record<string, string>;
  }>;
  notes: string[];
}

export interface DemoDoctorStatus {
  status: "ready" | "ready_with_warnings" | "needs_attention";
  readyForDemo: boolean;
  headline: string;
  summary: {
    activeSessionCount: number;
    outputAssetCount: number;
    imageOutputAssetCount?: number;
    approvedAssetCount: number;
    referenceAssetCount: number;
    videoAssetCount?: number;
    demoCurated?: boolean;
    workflowSmokeOk?: boolean;
    workflowSmokeAt?: string;
    workflowSmokeMediaFileCount?: number;
    workflowSmokeChannelExportFileCount?: number;
    secretIssueCount?: number;
    graphBrandingReady?: boolean;
    providerAdapterCount?: number;
    missingProviderAdapterCount?: number;
    readyProviderModels: number;
    waitingProviderModels: number;
    diffusionReady?: boolean;
    checkpointCount?: number;
    maskedEditReady?: boolean;
    editProofReady?: boolean;
  };
  checks: Array<{
    key: string;
    label: string;
    status: "ready" | "warning" | "fail";
    detail: string;
    action?: string;
  }>;
  notes: string[];
}

export interface Project {
  id: string;
  name: string;
  client?: string;
  status: string;
  sync_status?: string;
  remote_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Brief {
  id: string;
  project_id: string;
  title: string;
  product_name?: string;
  task_type: string;
  channel?: string;
  tone?: string;
  prompt?: string;
  negative_prompt?: string;
  reference_image_path?: string;
  status: string;
  sync_status?: string;
  remote_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Run {
  id: string;
  brief_id: string;
  workflow_key: string;
  provider: string;
  prompt_id?: string;
  status: string;
  notes?: string;
  sync_status?: string;
  remote_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudioSession {
  id: string;
  project_id?: string | null;
  name: string;
  mode: string;
  status: string;
  summary?: string | null;
  sync_status?: string;
  remote_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudioTurn {
  id: string;
  session_id: string;
  kind: "generate" | "edit" | "masked_edit" | "video";
  provider?: string;
  model: string;
  prompt: string;
  settings_json?: string;
  source_asset_id?: string | null;
  reference_asset_ids_json?: string;
  output_asset_ids_json?: string;
  frank_body_mode: boolean;
  preset_key?: string | null;
  status: "queued" | "running" | "complete" | "blocked" | "failed" | "review";
  error_json?: string | null;
  sync_status?: string;
  remote_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  run_id?: string;
  brief_id?: string;
  session_id?: string;
  turn_id?: string;
  kind: string;
  title: string;
  media_type?: "image" | "video";
  provider?: string;
  model?: string;
  prompt?: string;
  settings_json?: string;
  source_asset_id?: string;
  reference_asset_ids_json?: string;
  file_path?: string;
  preview_url?: string;
  width?: number;
  height?: number;
  favorite: boolean;
  approval_status: ApprovalStatus;
  notes?: string;
  sync_status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExportRecord {
  id: string;
  asset_id: string;
  preset: string;
  file_path: string;
  download_url?: string;
  metadata_json: string;
  sync_status?: string;
  remote_id?: string;
  created_at: string;
}

export interface BriefFormState {
  title: string;
  productName: string;
  taskType: string;
  channel: string;
  tone: string;
  prompt: string;
  negativePrompt: string;
}

export interface UploadedImage {
  name: string;
  storage_path: string;
  preview_url: string;
}

export interface StudioSettings {
  aspect_ratio: string;
  image_size: string;
  count: number;
}

export interface TurnRequest {
  session_id?: string;
  kind: "generate" | "edit" | "masked_edit";
  model: string;
  prompt: string;
  frank_body_mode: boolean;
  preset_key?: string;
  settings: StudioSettings;
  reference_asset_ids: string[];
  edit_source_asset_id?: string;
  mask_asset_id?: string;
}

export interface VideoRequest {
  session_id?: string;
  model?: string;
  prompt: string;
  settings: StudioSettings;
  source_asset_id?: string;
  reference_asset_ids: string[];
}
