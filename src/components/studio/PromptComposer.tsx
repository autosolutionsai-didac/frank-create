import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toDataUrl } from "@/lib/image-utils";
import { generateImage } from "@/lib/api/image.functions";
import { useStudio, type StudioImage } from "@/lib/studio/store";
import { ReferenceUploader } from "./ReferenceUploader";

export function PromptComposer() {
  const { state, dispatch, activeSession } = useStudio();
  const [busy, setBusy] = useState(false);
  const editing = state.editParent !== null;

  async function submit() {
    const prompt = state.prompt.trim();
    if (!prompt || busy) return;

    const refs = state.references;
    const editParent = state.editParent;
    const { modelKey, presetId, settings } = activeSession;
    const assistantId = crypto.randomUUID();

    dispatch({ type: "BEGIN_TURN", assistantId });
    setBusy(true);
    try {
      const res = await generateImage({
        data: {
          modelKey,
          prompt,
          presetId: presetId ?? undefined,
          settings: {
            aspectRatio: settings.aspectRatio,
            imageSize: settings.imageSize,
            numImages: settings.numImages,
            thinkingLevel: settings.thinkingLevel,
          },
          referenceImages: refs.map((r) => ({ mimeType: r.mimeType, dataBase64: r.dataBase64 })),
          editParentImage: editParent
            ? { mimeType: editParent.mimeType, dataBase64: editParent.dataBase64 }
            : undefined,
        },
      });
      const images: StudioImage[] = res.images.map((img) => ({
        id: crypto.randomUUID(),
        mimeType: img.mimeType,
        dataBase64: img.dataBase64,
        parentId: editParent?.id,
      }));
      dispatch({ type: "TURN_SUCCESS", assistantId, images });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Generation failed";
      dispatch({ type: "TURN_ERROR", assistantId, error: msg });
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border-t bg-card/50 p-3">
      {editing && state.editParent && (
        <div className="mb-2 flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm">
          <img
            src={toDataUrl(state.editParent)}
            alt="Editing"
            className="size-8 rounded object-cover"
          />
          <span className="flex-1">Editing this image — describe what to change.</span>
          <Button variant="ghost" size="icon" onClick={() => dispatch({ type: "EXIT_EDIT" })}>
            <X />
          </Button>
        </div>
      )}

      <Textarea
        value={state.prompt}
        onChange={(e) => dispatch({ type: "SET_PROMPT", prompt: e.target.value })}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") void submit();
        }}
        placeholder={editing ? "Describe what to change…" : "Describe your image…"}
        className="min-h-20 resize-none"
      />

      <div className="mt-2 flex items-center justify-between gap-2">
        <ReferenceUploader />
        <Button onClick={() => void submit()} disabled={busy || !state.prompt.trim()}>
          <Sparkles /> {busy ? "Generating…" : editing ? "Update" : "Generate"}
        </Button>
      </div>
    </div>
  );
}
