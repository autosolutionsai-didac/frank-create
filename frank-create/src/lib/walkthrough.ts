// Guided walkthrough data + types extracted from App.tsx.
import type { CSSProperties } from "react";

export type WalkthroughTarget =
  | "app-header"
  | "composer"
  | "output-thread"
  | "model-settings"
  | "model-settings-drawer"
  | "model-output-controls"
  | "frank-mode-toggle"
  | "review-panel"
  | "review-actions"
  | "review-metadata"
  | "variant-controls"
  | "edit-controls"
  | "export-controls"
  | "handoff-pack"
  | "advanced-tools";

export interface WalkthroughStep {
  title: string;
  detail: string;
  points?: string[];
  target: WalkthroughTarget;
  openSettings?: boolean;
  openAdvanced?: boolean;
  selectOutput?: boolean;
}

export interface WalkthroughAnchor {
  highlightStyle: CSSProperties;
  popoverStyle: CSSProperties;
  placement: "above" | "below";
}

export const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    title: "Sessions and demo controls",
    detail: "This header is the control strip for the call: switch sessions, start fresh, launch this walkthrough, or open Advanced when someone technical asks.",
    points: ["Session keeps each creative thread separate.", "New session starts another brief without touching the current one.", "Advanced stays hidden during the normal creative flow."],
    target: "app-header"
  },
  {
    title: "Brief and references",
    detail: "This is the working brief. Add product references, write the ask in plain English, choose the job type, and press Generate when the direction is clear.",
    points: ["References are selectable, so a round can use all refs, some refs, or prompt-only.", "Brief remix gives alternate prompt directions without leaving the Studio.", "Cancel session archives the current scratch brief without deleting generated files."],
    target: "composer"
  },
  {
    title: "Workflow chips and prompt",
    detail: "The chips are workflow shortcuts, not separate apps. Product Shot Lab, Video Lab, and Approved only change the current task/filter while keeping one thread.",
    points: ["Product Shot Lab loads product-focused presets.", "Video Lab briefs a storyboard-style round.", "Approved only filters the thread to keepers."],
    target: "composer"
  },
  {
    title: "Generated rounds",
    detail: "Every generate or edit run lands here as a round. The card keeps the prompt, model, status, Frank Body Mode, and reference count attached to the output.",
    points: ["Click an image to open the review desk on the right.", "Rounds stay in order, so the creative conversation remains explainable.", "Approved only can filter this thread when the team wants the shortlist."],
    target: "output-thread"
  },
  {
    title: "Model summary",
    detail: "The right panel starts with the active model, aspect ratio, image size, and number of picks. This is the quick confidence check before spending an API call.",
    points: ["Nano Banana Pro is the recommended live proof.", "Local Comfy stays as the clearly labelled fallback.", "Change model opens the full drawer."],
    target: "model-settings"
  },
  {
    title: "Model drawer",
    detail: "This drawer is where you choose between Gemini, Replicate, OpenAI, or local fallback. It also shows cost labels and readiness badges.",
    points: ["Missing keys stay out of the first screen but are still visible here.", "Model choice changes what sizes, refs, and edit modes are available.", "Use this before a live client-proof generation."],
    target: "model-settings-drawer",
    openSettings: true
  },
  {
    title: "Output controls",
    detail: "Aspect, size, and count control the next round. The app limits choices to what the selected model actually supports.",
    points: ["Aspect is the canvas shape.", "Size is the provider output target.", "Count is how many variants come back in the round."],
    target: "model-output-controls",
    openSettings: true
  },
  {
    title: "Frank Body Mode",
    detail: "This toggle is the brand brain. Off means the app sends only the user prompt. On adds Frank Body style guidance, guardrails, and preset structure.",
    points: ["Leave it off for neutral model tests.", "Turn it on for Frank Body campaign/product work.", "The mode is stored with the run metadata."],
    target: "frank-mode-toggle",
    openSettings: true
  },
  {
    title: "Review desk",
    detail: "After a result is selected, this panel becomes the review desk. It shows the chosen image and all actions for deciding what happens next.",
    points: ["Open selected asset for a larger view.", "Review controls stay beside the image.", "Nothing needs the raw Comfy graph for normal review."],
    target: "review-panel",
    selectOutput: true
  },
  {
    title: "Approve or reject",
    detail: "These are the fast creative-director decisions: favorite, approve, or reject. Approved picks feed the handoff/export flow.",
    points: ["Approve marks the keeper.", "Favorite is a softer shortlist.", "Reject keeps the record without presenting it as a candidate."],
    target: "review-actions",
    selectOutput: true
  },
  {
    title: "Run metadata",
    detail: "This section explains where the image came from. It keeps model, settings, dimensions, source image, workflow, references, and prompt together.",
    points: ["Useful for client notes and repeats.", "Workflow JSON can be downloaded later.", "This is the audit trail for FrankHub or a DAM sync."],
    target: "review-metadata",
    selectOutput: true
  },
  {
    title: "Make another round",
    detail: "These buttons turn a selected result into the next brief. More like this, clean it up, and campaign remix are shortcuts for fast iteration.",
    points: ["They set up edit mode from the selected asset.", "The prompt updates automatically.", "You can still change the model before generating."],
    target: "variant-controls",
    selectOutput: true
  },
  {
    title: "Edit, mask, and reuse",
    detail: "These controls are the production tools: copy the brief, download workflow JSON, open Comfy, edit with the selected model, paint a mask, or reuse a pick as a reference.",
    points: ["Edit with selected model starts image-to-image.", "Paint edit mask appears when the model supports masked edit.", "Use as reference turns a good pick into guidance for the next round."],
    target: "edit-controls",
    selectOutput: true
  },
  {
    title: "Exports",
    detail: "Export controls appear once a pick is selected. Use the channel set for a complete package, or export one format at a time.",
    points: ["Channel set creates the ready-to-share pack.", "Individual presets cover PDP, social, email, transparent PNG, and master files.", "Download original keeps the untouched provider result."],
    target: "export-controls",
    selectOutput: true
  },
  {
    title: "Cliff Pack handoff",
    detail: "This package area collects approved picks, references, prompts, notes, metadata, and channel exports into one handoff route.",
    points: ["Export Cliff Pack is the call-day deliverable.", "Review board gives a visual summary.", "Sync manifest is the future FrankHub/DAM bridge."],
    target: "handoff-pack",
    selectOutput: true
  },
  {
    title: "Advanced tools",
    detail: "Advanced is for setup, diagnostics, raw Comfy access, provider keys, Demo Doctor, readiness packs, and proof receipts. It is intentionally outside the normal creative path.",
    points: ["Provider keys are only Gemini, Replicate, and OpenAI.", "Demo Doctor checks call readiness.", "Workflow Map and raw Comfy are escape hatches for power users."],
    target: "advanced-tools",
    openAdvanced: true
  }
];
