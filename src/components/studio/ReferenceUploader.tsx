import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fileToDownscaledBase64, toDataUrl } from "@/lib/image-utils";
import { useStudio } from "@/lib/studio/store";

export function ReferenceUploader() {
  const { references, addReferences, removeReference, capability } = useStudio();
  const inputRef = useRef<HTMLInputElement>(null);

  const max = capability.maxReferenceImages;
  const count = references.length;
  const full = count >= max;

  if (!capability.supportsMultiReference || max === 0) return null;

  async function onFiles(files: FileList | null) {
    if (!files) return;
    const room = max - count;
    const chosen = Array.from(files).slice(0, Math.max(0, room));
    const encoded = await Promise.all(
      chosen.map(async (f) => ({
        id: crypto.randomUUID(),
        ...(await fileToDownscaledBase64(f)),
      })),
    );
    addReferences(encoded);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => void onFiles(e.target.files)}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={full}
        onClick={() => inputRef.current?.click()}
      >
        <ImagePlus /> Image Reference
      </Button>
      <span className="text-xs text-muted-foreground">
        {count}/{max}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {references.map((ref) => (
          <div key={ref.id} className="group relative h-9 w-9 overflow-hidden rounded-md border">
            <img src={toDataUrl(ref)} alt="reference" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeReference(ref.id)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove reference"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
