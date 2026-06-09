import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudio } from "@/lib/studio/store";

interface Target {
  id: string;
  title: string;
}

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

  const [renameTarget, setRenameTarget] = useState<Target | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Target | null>(null);

  function openRename(t: Target) {
    setRenameTarget(t);
    setRenameValue(t.title);
  }
  function confirmRename() {
    const v = renameValue.trim();
    if (renameTarget && v) renameSession(renameTarget.id, v);
    setRenameTarget(null);
  }

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
                  onDoubleClick={() => openRename({ id: session.id, title: session.title })}
                  className="min-w-0 flex-1 px-3 py-2 text-left"
                  title="Double-click to rename"
                >
                  <span className="block truncate text-sm font-medium">{session.title}</span>
                </button>
                <button
                  type="button"
                  aria-label="Rename session"
                  onClick={() => openRename({ id: session.id, title: session.title })}
                  className="hidden rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground group-hover:block"
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Delete session"
                  onClick={() => setDeleteTarget({ id: session.id, title: session.title })}
                  className="mr-1 hidden rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive group-hover:block"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <Dialog open={!!renameTarget} onOpenChange={(o) => !o && setRenameTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename session</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") confirmRename();
            }}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRenameTarget(null)}>
              Cancel
            </Button>
            <Button onClick={confirmRename} disabled={!renameValue.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this session?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deleteTarget?.title}” and all of its images will be permanently removed. This can’t
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteTarget) removeSession(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
