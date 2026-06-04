import { Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EDIT_MODEL_ORDER, MODEL_CAPABILITIES } from "@/lib/providers/capabilities";
import type { ModelKey } from "@/lib/providers/types";
import { useStudio } from "@/lib/studio/store";
import { ReferenceUploader } from "./ReferenceUploader";

export function PromptComposer() {
  const {
    prompt,
    setPrompt,
    editParent,
    exitEdit,
    editModelKey,
    setEditModel,
    submit,
    isGenerating,
  } = useStudio();
  const editing = editParent !== null;

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
        </div>
      )}

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
        }}
        placeholder={editing ? "Describe what to change…" : "Describe your image…"}
        className="min-h-20 resize-none"
      />

      <div className="mt-2 flex items-center justify-between gap-2">
        <ReferenceUploader mode={editing ? "edit" : "generate"} />
        <Button onClick={submit} disabled={isGenerating || !prompt.trim()}>
          <Sparkles /> {isGenerating ? "Generating…" : editing ? "Update" : "Generate"}
        </Button>
      </div>
    </div>
  );
}
