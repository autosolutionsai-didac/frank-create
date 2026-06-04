import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Preset } from "@/lib/presets";
import { usePresets } from "@/lib/studio/use-presets";
import { useStudio } from "@/lib/studio/store";

interface Props {
  /** Preset to edit, or null for a new preset. */
  preset: Preset | null;
  open: boolean;
  onClose: () => void;
}

export function PresetEditorModal({ preset, open, onClose }: Props) {
  const { savePreset, deletePreset, isSaving } = usePresets();
  const { setPrompt } = useStudio();
  const isNew = !preset;

  const [emoji, setEmoji] = useState("✨");
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [prompt, setPromptText] = useState("");

  useEffect(() => {
    if (!open) return;
    setEmoji(preset?.emoji ?? "✨");
    setName(preset?.name ?? "");
    setPurpose(preset?.purpose ?? "");
    setPromptText(preset?.prompt ?? "");
  }, [open, preset]);

  async function save() {
    if (!name.trim() || !prompt.trim()) {
      toast.error("Name and prompt are required");
      return;
    }
    try {
      await savePreset({
        id: preset?.id,
        name: name.trim(),
        emoji: emoji.trim() || "✨",
        purpose: purpose.trim(),
        prompt: prompt.trim(),
      });
      toast.success(isNew ? "Preset created" : "Preset saved");
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save preset");
    }
  }

  async function remove() {
    if (!preset) return;
    if (!window.confirm(`Delete the "${preset.name}" preset?`)) return;
    try {
      await deletePreset(preset.id);
      toast.success("Preset deleted");
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete preset");
    }
  }

  function usePrompt() {
    setPrompt(prompt);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isNew ? "New preset" : "Edit preset"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="w-16 space-y-1.5">
              <Label className="text-xs">Emoji</Label>
              <Input value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={4} />
            </div>
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Clean Ecom"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Purpose</Label>
            <Input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="PDP hero for DTC and retailer portals"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Prompt</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPromptText(e.target.value)}
              className="min-h-40"
              placeholder="The full prompt that gets pasted into the composer when this preset is used…"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <div>
            {!isNew && (
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => void remove()}
                disabled={isSaving}
              >
                <Trash2 /> Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={usePrompt} disabled={!prompt.trim()}>
              Use prompt
            </Button>
            <Button onClick={() => void save()} disabled={isSaving}>
              {isSaving ? "Saving…" : isNew ? "Create" : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
