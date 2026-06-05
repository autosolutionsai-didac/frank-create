import { useState } from "react";
import { Brush, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { EDIT_MODEL_ORDER, getCapability, MODEL_CAPABILITIES } from "@/lib/providers/capabilities";
import type { ModelKey } from "@/lib/providers/types";
import { useStudio } from "@/lib/studio/store";
import { MaskCanvas } from "./MaskCanvas";
import { ReferenceUploader } from "./ReferenceUploader";

export function PromptComposer() {
  const {
    prompt,
    setPrompt,
    editParent,
    exitEdit,
    editModelKey,
    setEditModel,
    editMask,
    setEditMask,
    batchMode,
    setBatchMode,
    submit,
    isGenerating,
  } = useStudio();
  const editing = editParent !== null;
  const [maskOpen, setMaskOpen] = useState(false);
  const canMask = editing && !!(editModelKey && getCapability(editModelKey).supportsMask);

  return (
    <div className="border-t bg-card/50 p-3">
      {editing && editParent && (
        <div className="mb-2 space-y-2 rounded-md bg-primary/10 p-3">
          <div className="flex items-center gap-2 text-sm">
            <img src={editParent.url} alt="Editing" className="size-8 rounded object-cover" />
            <span className="flex-1">Editing this image — describe what to change.</span>
            <Button variant="ghost" size="icon" onClick={exitEdit}>
              <X />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
              Edit with
            </span>
            <Select
              value={editModelKey ?? undefined}
              onValueChange={(v) => setEditModel(v as ModelKey)}
            >
              <SelectTrigger className="h-7 w-48">
                <SelectValue placeholder="Edit model" />
              </SelectTrigger>
              <SelectContent>
                {EDIT_MODEL_ORDER.map((k) => {
                  const cap = MODEL_CAPABILITIES[k];
                  const soon = cap.status === "coming-soon";
                  return (
                    <SelectItem key={k} value={k} disabled={soon}>
                      {cap.label}
                      {soon ? " · soon" : ""}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {canMask && (
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setMaskOpen(true)}>
                <Brush /> {editMask ? "Edit mask" : "Paint area"}
              </Button>
              {editMask && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  Mask applied
                  <button
                    type="button"
                    onClick={() => setEditMask(null)}
                    aria-label="Clear mask"
                    className="rounded p-0.5 hover:bg-accent"
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              )}
            </div>
          )}
          <MaskCanvas
            open={maskOpen}
            imageUrl={editParent.url}
            onClose={() => setMaskOpen(false)}
            onApply={setEditMask}
          />
        </div>
      )}

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
        }}
        placeholder={
          editing
            ? "Describe what to change…"
            : batchMode
              ? "One prompt per line — each line makes its own image set…"
              : "Describe your image…"
        }
        className="min-h-20 resize-none"
      />

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <ReferenceUploader mode={editing ? "edit" : "generate"} />
          {!editing && (
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
              <Switch checked={batchMode} onCheckedChange={setBatchMode} />
              Batch
            </label>
          )}
        </div>
        <Button onClick={submit} disabled={isGenerating || !prompt.trim()}>
          <Sparkles /> {isGenerating ? "Generating…" : editing ? "Update" : "Generate"}
        </Button>
      </div>
    </div>
  );
}
