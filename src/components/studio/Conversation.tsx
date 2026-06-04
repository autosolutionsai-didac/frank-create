import { Image as ImageIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudio, type StudioMessage } from "@/lib/studio/store";
import { ImageGrid } from "./ImageGrid";

function Message({ message }: { message: StudioMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-lg bg-primary/10 px-3 py-2 text-sm">
          {message.type === "edit" && (
            <span className="mr-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Edit ·{" "}
            </span>
          )}
          {message.promptText}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {message.pending && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-md" />
          ))}
        </div>
      )}
      {message.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {message.error}
        </p>
      )}
      {message.images && message.images.length > 0 && <ImageGrid images={message.images} />}
    </div>
  );
}

export function Conversation() {
  const { activeSession } = useStudio();

  if (activeSession.messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
        <ImageIcon className="size-10 opacity-40" />
        <div>
          <p className="text-sm font-medium">Start creating</p>
          <p className="text-xs">Describe an image below, or pick a Frank Body preset.</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        {activeSession.messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </div>
    </ScrollArea>
  );
}
