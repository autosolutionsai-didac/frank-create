import { Download, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { toDataUrl } from "@/lib/image-utils";
import { useStudio, type StudioImage } from "@/lib/studio/store";

interface Props {
  image: StudioImage | null;
  onClose: () => void;
}

export function ImagePreviewModal({ image, onClose }: Props) {
  const { dispatch } = useStudio();

  function download() {
    if (!image) return;
    const a = document.createElement("a");
    a.href = toDataUrl(image);
    a.download = `frank-body-${image.id.slice(0, 8)}.png`;
    a.click();
  }

  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="sr-only">Image preview</DialogTitle>
        {image && (
          <img
            src={toDataUrl(image)}
            alt="Generated"
            className="max-h-[70vh] w-full rounded-md object-contain"
          />
        )}
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={() => {
              if (image) dispatch({ type: "ENTER_EDIT", parent: image });
              onClose();
            }}
          >
            <Pencil /> Edit this
          </Button>
          <Button variant="outline" onClick={download}>
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
