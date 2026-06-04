import { Eraser } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MODEL_CAPABILITIES, MODEL_ORDER } from "@/lib/providers/capabilities";
import type { AspectRatio, ImageSize } from "@/lib/providers/types";
import { FRANK_BODY_PRESETS } from "@/lib/presets";
import { useStudio } from "@/lib/studio/store";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

export function ControlPanel() {
  const {
    modelKey,
    settings,
    capability,
    setModel,
    setSettings,
    frankBodyMode,
    setFrankBodyMode,
    setPrompt,
  } = useStudio();

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      {/* Frank Body Mode — global, opt-in, off by default (not a preset) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <SectionLabel>Frank Body Mode</SectionLabel>
          <Switch checked={frankBodyMode} onCheckedChange={setFrankBodyMode} />
        </div>
        <p className="text-xs text-muted-foreground">
          Layers the Frank Body style + negative-prompt system onto every prompt, on any model.
        </p>
      </section>

      {/* Model */}
      <section className="space-y-2">
        <SectionLabel>Model</SectionLabel>
        <div className="grid gap-1.5">
          {MODEL_ORDER.map((key) => {
            const cap = MODEL_CAPABILITIES[key];
            const active = key === modelKey;
            const soon = cap.status === "coming-soon";
            return (
              <button
                key={key}
                type="button"
                disabled={soon}
                onClick={() => setModel(key)}
                className={`rounded-md border px-3 py-2 text-left transition-colors ${
                  active ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                } ${soon ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""}`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{cap.label}</span>
                  {soon && (
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[0.6rem] font-medium uppercase text-muted-foreground">
                      Soon
                    </span>
                  )}
                </span>
                <span className="block text-xs text-muted-foreground">{cap.blurb}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Thinking mode */}
      {capability.supportsThinking && (
        <section className="space-y-2">
          <SectionLabel>Thinking Mode</SectionLabel>
          <ToggleGroup
            type="single"
            value={settings.thinkingLevel ?? "Low"}
            onValueChange={(v) => v && setSettings({ thinkingLevel: v as "Low" | "High" })}
            className="justify-start"
          >
            <ToggleGroupItem value="Low">Low</ToggleGroupItem>
            <ToggleGroupItem value="High">High</ToggleGroupItem>
          </ToggleGroup>
        </section>
      )}

      {/* Output settings */}
      <section className="space-y-3">
        <SectionLabel>Output Settings</SectionLabel>

        <div className="space-y-1.5">
          <Label className="text-xs">Aspect Ratio</Label>
          <Select
            value={settings.aspectRatio}
            onValueChange={(v) => setSettings({ aspectRatio: v as AspectRatio })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {capability.supportedAspectRatios.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Image Size</Label>
          <Select
            value={settings.imageSize}
            onValueChange={(v) => setSettings({ imageSize: v as ImageSize })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {capability.supportedResolutions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Images</Label>
            <span className="text-xs text-muted-foreground">{settings.numImages}</span>
          </div>
          <Slider
            min={1}
            max={8}
            step={1}
            value={[settings.numImages]}
            onValueChange={([v]) => setSettings({ numImages: v })}
          />
        </div>
      </section>

      {/* Presets — paste an editable prompt into the composer */}
      <section className="space-y-2">
        <SectionLabel>Frank Body Presets</SectionLabel>
        <div className="grid gap-1.5">
          {FRANK_BODY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setPrompt(preset.prompt)}
              className="rounded-md border border-border px-3 py-2 text-left transition-colors hover:bg-accent"
            >
              <span className="block text-sm font-medium">
                {preset.emoji} {preset.name}
              </span>
              <span className="block text-xs text-muted-foreground">{preset.purpose}</span>
            </button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="justify-start text-muted-foreground"
            onClick={() => setPrompt("")}
          >
            <Eraser /> Clear prompt
          </Button>
        </div>
      </section>
    </div>
  );
}
