// Hand-written row shapes for the Image Studio tables (mirror 0001_init.sql).
// Lint here is not type-aware, so we keep the Supabase client loosely typed and
// cast `.data` to these interfaces at each query site.

export interface SessionRow {
  id: string;
  user_id: string;
  title: string;
  active_preset_id: string | null;
  active_model_key: string;
  settings_json: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface MessageRow {
  id: string;
  seq: number;
  session_id: string;
  user_id: string;
  role: "user" | "assistant";
  message_type: "generate" | "edit";
  prompt_text: string | null;
  settings_snapshot_json: Record<string, unknown>;
  created_at: string;
}

export interface AssetRow {
  id: string;
  session_id: string;
  message_id: string | null;
  user_id: string;
  asset_type: "reference" | "generated" | "edited";
  storage_path: string;
  parent_asset_id: string | null;
  model_key: string | null;
  prompt_snapshot: string | null;
  metadata_json: Record<string, unknown>;
  created_at: string;
}

export const STUDIO_BUCKET = "studio-images";
