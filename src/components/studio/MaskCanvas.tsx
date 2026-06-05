import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { EditMask } from "@/lib/studio/store";

const MAX_EDGE = 1024;

interface Props {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
  onApply: (mask: EditMask) => void;
}

/**
 * Brush a mask over the image being edited. The painted region becomes the
 * transparent area of the exported mask (OpenAI: transparent = edit region).
 * The image is fetched as a blob (not a cross-origin <img>) so the canvas isn't
 * tainted and toDataURL works. Parent + mask are exported at the same dims.
 */
export function MaskCanvas({ open, imageUrl, onClose, onApply }: Props) {
  const imgCanvas = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<HTMLCanvasElement>(null);
  const bitmap = useRef<ImageBitmap | null>(null);
  const drawing = useRef(false);
  const [brush, setBrush] = useState(48);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setReady(false);
    setPainted(false);
    void (async () => {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const bmp = await createImageBitmap(blob);
        if (cancelled) return;
        const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
        bitmap.current = bmp;
        setDims({ w: Math.round(bmp.width * scale), h: Math.round(bmp.height * scale) });
        setReady(true);
      } catch {
        if (!cancelled) setReady(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, imageUrl]);

  useEffect(() => {
    if (!ready || !dims.w || !bitmap.current) return;
    const c = imgCanvas.current;
    const o = overlay.current;
    if (!c || !o) return;
    c.width = o.width = dims.w;
    c.height = o.height = dims.h;
    c.getContext("2d")?.drawImage(bitmap.current, 0, 0, dims.w, dims.h);
    o.getContext("2d")?.clearRect(0, 0, dims.w, dims.h);
  }, [ready, dims]);

  function point(e: React.PointerEvent) {
    const o = overlay.current!;
    const rect = o.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (o.width / rect.width),
      y: (e.clientY - rect.top) * (o.height / rect.height),
    };
  }

  function start(e: React.PointerEvent) {
    const ctx = overlay.current?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    setPainted(true);
    const p = point(e);
    ctx.strokeStyle = "rgba(244,114,90,0.55)";
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = brush;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.arc(p.x, p.y, brush / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = overlay.current?.getContext("2d");
    if (!ctx) return;
    const p = point(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function clear() {
    overlay.current?.getContext("2d")?.clearRect(0, 0, dims.w, dims.h);
    setPainted(false);
  }

  function apply() {
    const c = imgCanvas.current;
    const o = overlay.current;
    if (!c || !o) return;
    const parent = c.toDataURL("image/png").split(",")[1] ?? "";

    const m = document.createElement("canvas");
    m.width = dims.w;
    m.height = dims.h;
    const mctx = m.getContext("2d");
    const octx = o.getContext("2d");
    if (!mctx || !octx) return;
    mctx.fillStyle = "#000";
    mctx.fillRect(0, 0, dims.w, dims.h);
    const painted = octx.getImageData(0, 0, dims.w, dims.h).data;
    const out = mctx.getImageData(0, 0, dims.w, dims.h);
    for (let i = 0; i < painted.length; i += 4) {
      if (painted[i + 3] > 0) out.data[i + 3] = 0; // painted → transparent (editable)
    }
    mctx.putImageData(out, 0, 0);
    const mask = m.toDataURL("image/png").split(",")[1] ?? "";

    onApply({
      parent: { mimeType: "image/png", dataBase64: parent },
      mask: { mimeType: "image/png", dataBase64: mask },
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(x) => !x && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Paint the area to change</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-muted-foreground">
          Brush over the part you want the model to edit — everything else stays.
        </p>
        <div className="relative mx-auto max-h-[60vh] w-full overflow-auto rounded-md border">
          <canvas ref={imgCanvas} className="block w-full" />
          <canvas
            ref={overlay}
            className="absolute left-0 top-0 w-full cursor-crosshair touch-none"
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={() => (drawing.current = false)}
            onPointerLeave={() => (drawing.current = false)}
          />
          {!ready && (
            <p className="p-6 text-center text-sm text-muted-foreground">Loading image…</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-xs">Brush</Label>
          <Slider
            min={8}
            max={120}
            step={4}
            value={[brush]}
            onValueChange={([v]) => setBrush(v)}
            className="w-40"
          />
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={apply} disabled={!ready || !painted}>
            Apply mask
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
