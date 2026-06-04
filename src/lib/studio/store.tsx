// Client-side Image Studio state (Phase 0: in-memory; Phase 1 swaps this for
// Supabase-backed React Query data). Holds sessions, the active conversation,
// the per-session controls, and transient composer state (prompt, references,
// edit target).

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

import { getCapability, MODEL_ORDER, type ModelCapability } from "../providers/capabilities";
import { getPreset } from "../presets";
import type { GenerationSettings, ModelKey, RefImage } from "../providers/types";

export interface StudioImage extends RefImage {
  id: string;
  parentId?: string;
}

export interface StudioMessage {
  id: string;
  role: "user" | "assistant";
  type: "generate" | "edit";
  promptText?: string;
  images?: StudioImage[];
  pending?: boolean;
  error?: string;
}

export interface StudioSession {
  id: string;
  title: string;
  modelKey: ModelKey;
  presetId: string | null;
  settings: GenerationSettings;
  messages: StudioMessage[];
}

export interface PendingRef extends RefImage {
  id: string;
}

interface State {
  sessions: StudioSession[];
  activeId: string;
  prompt: string;
  references: PendingRef[];
  editParent: StudioImage | null;
}

type Action =
  | { type: "NEW_SESSION" }
  | { type: "SELECT_SESSION"; id: string }
  | { type: "SET_MODEL"; modelKey: ModelKey }
  | { type: "SET_SETTINGS"; settings: Partial<GenerationSettings> }
  | { type: "SET_PRESET"; presetId: string | null }
  | { type: "SET_PROMPT"; prompt: string }
  | { type: "ADD_REFERENCES"; refs: PendingRef[] }
  | { type: "REMOVE_REFERENCE"; id: string }
  | { type: "CLEAR_REFERENCES" }
  | { type: "ENTER_EDIT"; parent: StudioImage }
  | { type: "EXIT_EDIT" }
  | { type: "BEGIN_TURN"; assistantId: string }
  | { type: "TURN_SUCCESS"; assistantId: string; images: StudioImage[] }
  | { type: "TURN_ERROR"; assistantId: string; error: string };

function id(): string {
  return crypto.randomUUID();
}

function defaultSettings(modelKey: ModelKey): GenerationSettings {
  const d = getCapability(modelKey).defaultSettings;
  return { aspectRatio: d.aspectRatio, imageSize: d.imageSize, numImages: d.numImages };
}

function createSession(): StudioSession {
  const modelKey = MODEL_ORDER[0];
  return {
    id: id(),
    title: "Untitled",
    modelKey,
    presetId: null,
    settings: defaultSettings(modelKey),
    messages: [],
  };
}

/** Clamp settings to what a model actually supports. */
function clampSettings(modelKey: ModelKey, settings: GenerationSettings): GenerationSettings {
  const cap = getCapability(modelKey);
  return {
    aspectRatio: cap.supportedAspectRatios.includes(settings.aspectRatio)
      ? settings.aspectRatio
      : cap.defaultSettings.aspectRatio,
    imageSize: cap.supportedResolutions.includes(settings.imageSize)
      ? settings.imageSize
      : cap.defaultSettings.imageSize,
    numImages: Math.min(Math.max(1, settings.numImages), 8),
    thinkingLevel: cap.supportsThinking ? settings.thinkingLevel : undefined,
  };
}

function initState(): State {
  const first = createSession();
  return {
    sessions: [first],
    activeId: first.id,
    prompt: "",
    references: [],
    editParent: null,
  };
}

function updateActive(state: State, fn: (s: StudioSession) => StudioSession): StudioSession[] {
  return state.sessions.map((s) => (s.id === state.activeId ? fn(s) : s));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEW_SESSION": {
      const s = createSession();
      return {
        ...state,
        sessions: [s, ...state.sessions],
        activeId: s.id,
        prompt: "",
        references: [],
        editParent: null,
      };
    }
    case "SELECT_SESSION":
      return { ...state, activeId: action.id, prompt: "", references: [], editParent: null };
    case "SET_MODEL":
      return {
        ...state,
        sessions: updateActive(state, (s) => ({
          ...s,
          modelKey: action.modelKey,
          settings: clampSettings(action.modelKey, s.settings),
        })),
      };
    case "SET_SETTINGS":
      return {
        ...state,
        sessions: updateActive(state, (s) => ({
          ...s,
          settings: clampSettings(s.modelKey, { ...s.settings, ...action.settings }),
        })),
      };
    case "SET_PRESET": {
      const preset = getPreset(action.presetId);
      return {
        ...state,
        sessions: updateActive(state, (s) => ({
          ...s,
          presetId: action.presetId,
          settings: preset
            ? clampSettings(s.modelKey, { ...s.settings, ...preset.defaultSettings })
            : s.settings,
        })),
      };
    }
    case "SET_PROMPT":
      return { ...state, prompt: action.prompt };
    case "ADD_REFERENCES":
      return { ...state, references: [...state.references, ...action.refs] };
    case "REMOVE_REFERENCE":
      return { ...state, references: state.references.filter((r) => r.id !== action.id) };
    case "CLEAR_REFERENCES":
      return { ...state, references: [] };
    case "ENTER_EDIT":
      return { ...state, editParent: action.parent };
    case "EXIT_EDIT":
      return { ...state, editParent: null };
    case "BEGIN_TURN": {
      const isEdit = state.editParent !== null;
      const userMsg: StudioMessage = {
        id: id(),
        role: "user",
        type: isEdit ? "edit" : "generate",
        promptText: state.prompt,
      };
      const assistantMsg: StudioMessage = {
        id: action.assistantId,
        role: "assistant",
        type: isEdit ? "edit" : "generate",
        pending: true,
      };
      const title = state.prompt.slice(0, 48) || "Untitled";
      return {
        ...state,
        prompt: "",
        references: [],
        editParent: null,
        sessions: updateActive(state, (s) => ({
          ...s,
          title: s.messages.length === 0 ? title : s.title,
          messages: [...s.messages, userMsg, assistantMsg],
        })),
      };
    }
    case "TURN_SUCCESS":
      return {
        ...state,
        sessions: state.sessions.map((s) => ({
          ...s,
          messages: s.messages.map((m) =>
            m.id === action.assistantId ? { ...m, pending: false, images: action.images } : m,
          ),
        })),
      };
    case "TURN_ERROR":
      return {
        ...state,
        sessions: state.sessions.map((s) => ({
          ...s,
          messages: s.messages.map((m) =>
            m.id === action.assistantId ? { ...m, pending: false, error: action.error } : m,
          ),
        })),
      };
    default:
      return state;
  }
}

interface StudioContextValue {
  state: State;
  dispatch: Dispatch<Action>;
  activeSession: StudioSession;
  capability: ModelCapability;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const value = useMemo<StudioContextValue>(() => {
    const activeSession = state.sessions.find((s) => s.id === state.activeId) ?? state.sessions[0];
    return {
      state,
      dispatch,
      activeSession,
      capability: getCapability(activeSession.modelKey),
    };
  }, [state]);
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used within StudioProvider");
  return ctx;
}
