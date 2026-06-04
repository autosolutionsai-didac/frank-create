import { Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStudio } from "@/lib/studio/store";
import { ReferenceUploader } from "./ReferenceUploader";

export function PromptComposer() {
  const { prompt, setPrompt, editParent, exitEdit, submit, isGenerating } = useStudio();
  const editing = editParent !== null;

  return (
    <div className="border-t bg-card/50 p-3">
      {editing && editParent && (
        <div className="mb-2 flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm">
          <img src={editParent.url} alt="Editing" className="size-8 rounded object-cover" />
          <span className="flex-1">Editing this image — describe what to change.</span>
          <Button variant="ghost" size="icon" onClick={exitEdit}>
            <X />
          </Button>
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
        <ReferenceUploader />
        <Button onClick={submit} disabled={isGenerating || !prompt.trim()}>
          <Sparkles /> {isGenerating ? "Generating…" : editing ? "Update" : "Generate"}
        </Button>
      </div>
    </div>
  );
}
