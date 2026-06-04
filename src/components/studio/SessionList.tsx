import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudio } from "@/lib/studio/store";

export function SessionList() {
  const {
    sessions,
    isLoadingSessions,
    activeSessionId,
    selectSession,
    newSession,
    renameSession,
    removeSession,
  } = useStudio();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-3">
        <span className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
          Sessions
        </span>
        <Button size="sm" variant="outline" onClick={newSession}>
          <Plus /> New
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-2 pb-2">
          {isLoadingSessions && <p className="px-3 py-2 text-xs text-muted-foreground">Loading…</p>}
          {!isLoadingSessions && sessions.length === 0 && (
            <p className="px-3 py-2 text-xs text-muted-foreground">No sessions yet.</p>
          )}
          {sessions.map((session) => {
            const active = session.id === activeSessionId;
            return (
              <div
                key={session.id}
                className={`group flex items-center gap-1 rounded-md transition-colors ${
                  active ? "bg-primary/10" : "hover:bg-accent"
                }`}
              >
                <button
                  type="button"
                  onClick={() => selectSession(session.id)}
                  onDoubleClick={() => {
                    const title = window.prompt("Rename session", session.title);
                    if (title && title.trim()) renameSession(session.id, title.trim());
                  }}
                  className="min-w-0 flex-1 px-3 py-2 text-left"
                  title="Double-click to rename"
                >
                  <span className="block truncate text-sm font-medium">{session.title}</span>
                </button>
                <button
                  type="button"
                  aria-label="Delete session"
                  onClick={() => {
                    if (window.confirm("Delete this session and its images?"))
                      removeSession(session.id);
                  }}
                  className="mr-1 hidden rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive group-hover:block"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
