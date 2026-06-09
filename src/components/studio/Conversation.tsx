import { Image as ImageIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { MessageView } from "@/lib/api/session.functions";
import { useStudio } from "@/lib/studio/store";
import { ImageGrid } from "./ImageGrid";

function PendingGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {Array.from({ length: Math.max(1, count) }).map((_, i) => (
        <Skeleton key={i} className="aspect-square w-full rounded-md" />
      ))}
    </div>
  );
}

function UserBubble({ promptText, isEdit }: { promptText: string | null; isEdit: boolean }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-lg bg-primary/10 px-3 py-2 text-sm">
        {isEdit && (
          <span className="mr-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Edit ·{" "}
          </span>
        )}
        {promptText}
      </div>
    </div>
  );
}

function Message({ message }: { message: MessageView }) {
  if (message.role === "user") {
    const refs = message.images.filter((i) => i.assetType === "reference");
    return (
      <div className="space-y-2">
        <UserBubble promptText={message.promptText} isEdit={message.messageType === "edit"} />
        {refs.length > 0 && (
          <div className="flex justify-end gap-1.5">
            {refs.map((r) => (
              <img
                key={r.id}
                src={r.url}
                alt="reference"
                className="size-12 rounded-md border object-cover"
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const results = message.images.filter((i) => i.assetType !== "reference");
  if (results.length === 0) return null;
  return (
    <div className="space-y-2">
      {message.promptText && (
        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer select-none">Model thoughts</summary>
          <p className="mt-1 whitespace-pre-wrap">{message.promptText}</p>
        </details>
      )}
      <ImageGrid images={results} />
    </div>
  );
}

export function Conversation() {
  const { session, isLoadingSession, pendingTurn } = useStudio();
  const messages = session?.messages ?? [];
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keep the latest turn in view as messages arrive or a generation starts.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, pendingTurn]);

  if (isLoadingSession && messages.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 p-4">
        <PendingGrid count={4} />
      </div>
    );
  }

  if (!isLoadingSession && messages.length === 0 && !pendingTurn) {
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
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
        {pendingTurn && (
          <div className="space-y-2">
            <UserBubble promptText={pendingTurn.promptText} isEdit={pendingTurn.type === "edit"} />
            <PendingGrid count={pendingTurn.numImages} />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
