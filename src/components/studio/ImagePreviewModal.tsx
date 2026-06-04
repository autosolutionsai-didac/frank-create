import { Download, Pencil } from "lucide-react";

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

export function ImagePreviewModal({ image, onClose }: Props) {
  const { enterEdit } = useStudio();

  async function download() {
    if (!image) return;
    try {
      const res = await fetch(image.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `frank-body-${image.id.slice(0, 8)}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(image.url, "_blank");
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
