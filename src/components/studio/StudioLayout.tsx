import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { StudioProvider } from "@/lib/studio/store";
import { Conversation } from "./Conversation";
import { ControlPanel } from "./ControlPanel";
import { PromptComposer } from "./PromptComposer";
import { SessionList } from "./SessionList";

function Header() {
  return (
    <header className="flex items-center gap-3 border-b bg-[var(--brand-coral)] px-4 py-2 text-[var(--brand-coral-foreground)]">
      <span className="rounded-sm border border-current/40 px-2 py-0.5 font-mono text-sm font-semibold tracking-tight">
        frank | body
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.25em]">Image Studio</span>
    </header>
  );
}

export function StudioLayout() {
  return (
    <StudioProvider>
      <div className="flex h-screen flex-col bg-background text-foreground">
        <Header />
        <ResizablePanelGroup orientation="horizontal" className="flex-1">
          <ResizablePanel defaultSize={18} minSize={14} className="border-r">
            <SessionList />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={56} minSize={40}>
            <div className="flex h-full flex-col">
              <Conversation />
              <PromptComposer />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={26} minSize={20} className="border-l">
            <ControlPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </StudioProvider>
  );
}
