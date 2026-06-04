import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudio } from "@/lib/studio/store";

export function SessionList() {
  const { state, dispatch } = useStudio();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-3">
        <span className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
          Sessions
        </span>
        <Button size="sm" variant="outline" onClick={() => dispatch({ type: "NEW_SESSION" })}>
          <Plus /> New
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-2 pb-2">
          {state.sessions.map((session) => {
            const active = session.id === state.activeId;
            const turns = session.messages.filter((m) => m.role === "user").length;
            return (
              <button
                key={session.id}
                type="button"
                onClick={() => dispatch({ type: "SELECT_SESSION", id: session.id })}
                className={`w-full rounded-md px-3 py-2 text-left transition-colors ${
                  active ? "bg-primary/10" : "hover:bg-accent"
                }`}
              >
                <span className="block truncate text-sm font-medium">{session.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {turns} {turns === 1 ? "turn" : "turns"}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
