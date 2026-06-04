import { useState } from "react";

import type { AssetView } from "@/lib/api/session.functions";
import { ImagePreviewModal } from "./ImagePreviewModal";

export function ImageGrid({ images }: { images: AssetView[] }) {
  const [selected, setSelected] = useState<AssetView | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setSelected(img)}
            className="overflow-hidden rounded-md border transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={img.url}
              alt="Generated result"
              className="aspect-square w-full object-cover"
            />
          </button>
        ))}
      </div>
      <ImagePreviewModal image={selected} onClose={() => setSelected(null)} />
    </>
  );
}
