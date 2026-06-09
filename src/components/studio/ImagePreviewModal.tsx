import { useQueryClient } from "@tanstack/react-query";
import { Download, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AssetView } from "@/lib/api/session.functions";
import { useStudio } from "@/lib/studio/store";

interface Props {
  image: AssetView | null;
  onClose: () => void;
}

function extFromType(type: string): string {
  if (type === "image/jpeg" || type === "image/jpg") return "jpg";
  if (type === "image/webp") return "webp";
  return "png";
}

export function ImagePreviewModal({ image, onClose }: Props) {
  const { enterEdit, activeSessionId } = useStudio();
  const qc = useQueryClient();

  async function download() {
    if (!image) return;
    try {
      const res = await fetch(image.url);
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `frank-body-${image.id.slice(0, 8)}.${extFromType(blob.type)}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // The signed URL likely expired — refresh it and ask the user to retry,
      // rather than opening a dead link.
      void qc.invalidateQueries({ queryKey: ["session", activeSessionId] });
      toast.error("Couldn't download — the image link was refreshed. Please try again.");
    }
  }

  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="sr-only">Image preview</DialogTitle>
        {image && (
          <img
            src={image.url}
            alt="Generated"
            className="max-h-[70vh] w-full rounded-md object-contain"
          />
        )}
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={() => {
              if (image) enterEdit({ assetId: image.id, url: image.url });
              onClose();
            }}
          >
            <Pencil /> Edit this
          </Button>
          <Button variant="outline" onClick={() => void download()}>
            <Download /> Download
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
