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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MODEL_CAPABILITIES, MODEL_ORDER } from "@/lib/providers/capabilities";
import type { AspectRatio, ImageSize, ModelKey } from "@/lib/providers/types";
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
  const { activeSession, capability, dispatch } = useStudio();
  const { settings, presetId } = activeSession;

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      {/* Model */}
      <section className="space-y-2">
        <SectionLabel>Model</SectionLabel>
        <div className="grid gap-1.5">
          {MODEL_ORDER.map((key) => {
            const cap = MODEL_CAPABILITIES[key];
            const active = key === activeSession.modelKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => dispatch({ type: "SET_MODEL", modelKey: key as ModelKey })}
                className={`rounded-md border px-3 py-2 text-left transition-colors ${
                  active ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                }`}
              >
                <span className="block text-sm font-medium">{cap.label}</span>
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
            onValueChange={(v) =>
              v &&
              dispatch({ type: "SET_SETTINGS", settings: { thinkingLevel: v as "Low" | "High" } })
            }
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
            onValueChange={(v) =>
              dispatch({ type: "SET_SETTINGS", settings: { aspectRatio: v as AspectRatio } })
            }
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
            onValueChange={(v) =>
              dispatch({ type: "SET_SETTINGS", settings: { imageSize: v as ImageSize } })
            }
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
            onValueChange={([v]) => dispatch({ type: "SET_SETTINGS", settings: { numImages: v } })}
          />
        </div>
      </section>

      {/* Presets */}
      <section className="space-y-2">
        <SectionLabel>Frank Body Presets</SectionLabel>
        <div className="grid gap-1.5">
          {FRANK_BODY_PRESETS.map((preset) => {
            const active = preset.id === presetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  dispatch({ type: "SET_PRESET", presetId: active ? null : preset.id })
                }
                className={`rounded-md border px-3 py-2 text-left transition-colors ${
                  active ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                }`}
              >
                <span className="block text-sm font-medium">{preset.name}</span>
                <span className="block text-xs text-muted-foreground">{preset.category}</span>
              </button>
            );
          })}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="justify-start text-muted-foreground"
            onClick={() => dispatch({ type: "SET_PRESET", presetId: null })}
          >
            <Eraser /> Clear All
          </Button>
        </div>
      </section>
    </div>
  );
}
