// Presets data layer: the shared brand library from Supabase, with create/edit/
// delete. Falls back to the code defaults (src/lib/presets.ts) while loading or
// if the DB isn't reachable/seeded yet, so the UI is never empty.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deletePreset, listPresets, upsertPreset } from "../api/preset.functions";
import { FRANK_BODY_PRESETS, type Preset } from "../presets";

export interface PresetInput {
  id?: string;
  name: string;
  emoji?: string;
  purpose?: string;
  prompt: string;
}

export function usePresets() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["presets"], queryFn: () => listPresets() });

  const presets: Preset[] = query.data && query.data.length > 0 ? query.data : FRANK_BODY_PRESETS;

  const saveMut = useMutation({
    mutationFn: (input: PresetInput) => upsertPreset({ data: input }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["presets"] }),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => deletePreset({ data: { id } }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["presets"] }),
  });

  return {
    presets,
    savePreset: saveMut.mutateAsync,
    deletePreset: deleteMut.mutateAsync,
    isSaving: saveMut.isPending || deleteMut.isPending,
  };
}
