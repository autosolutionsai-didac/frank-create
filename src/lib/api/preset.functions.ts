// Preset CRUD server functions. Presets are a SHARED brand library (any
// signed-in user can manage them) — see migration 0004. Auth + RLS come from
// Lovable's requireSupabaseAuth middleware.

import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAllowedEmail } from "../auth/guard";
import type { Preset } from "../presets";

interface PresetRow {
  id: string;
  name: string;
  emoji: string | null;
  category: string | null;
  prompt: string | null;
}

export const listPresets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Preset[]> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;
    const { data, error } = await supabase
      .from("presets")
      .select("id, name, emoji, category, prompt")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return ((data ?? []) as PresetRow[])
      .filter((p) => !!p.prompt)
      .map((p) => ({
        id: p.id,
        name: p.name,
        emoji: p.emoji ?? "✨",
        purpose: p.category ?? "",
        prompt: p.prompt ?? "",
      }));
  });

const presetInput = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  emoji: z.string().optional(),
  purpose: z.string().optional(),
  prompt: z.string().min(1, "Prompt is required"),
});

export const upsertPreset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(presetInput)
  .handler(async ({ data, context }): Promise<{ id: string }> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;
    const id = data.id && data.id.length > 0 ? data.id : crypto.randomUUID();
    const { error } = await supabase.from("presets").upsert({
      id,
      name: data.name,
      emoji: data.emoji ?? "✨",
      category: data.purpose ?? null,
      prompt: data.prompt,
      system_prompt: null,
      is_active: true,
    });
    if (error) throw new Error(error.message);
    return { id };
  });

export const deletePreset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    assertAllowedEmail(context.claims);
    const supabase = context.supabase as unknown as SupabaseClient;
    const { error } = await supabase.from("presets").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
