// Image Studio client state, backed by Supabase via server functions + React
// Query. Server data (sessions, the active conversation) lives in the query
// cache; transient composer state (prompt, references, edit target) and the
// current control values live in local state.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import {
  createSession,
  deleteSession,
  getSession,
  listSessions,
  updateSession,
  type SessionDetail,
  type SessionSettings,
  type SessionSummary,
} from "../api/session.functions";
import { generateImage } from "../api/image.functions";
import {
  getCapability,
  isModelKey,
  MODEL_ORDER,
  type ModelCapability,
} from "../providers/capabilities";
import type { AspectRatio, GenerationSettings, ImageSize, ModelKey } from "../providers/types";

export interface PendingRef {
  id: string;
  mimeType: string;
  dataBase64: string;
}

export interface EditTarget {
  assetId: string;
  url: string;
}

interface Controls {
  modelKey: ModelKey;
  presetId: string | null;
  settings: GenerationSettings;
}

function defaultSettings(modelKey: ModelKey): GenerationSettings {
  const d = getCapability(modelKey).defaultSettings;
  return { aspectRatio: d.aspectRatio, imageSize: d.imageSize, numImages: d.numImages };
}

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

function coerceSettings(modelKey: ModelKey, raw: SessionSettings): GenerationSettings {
  const d = defaultSettings(modelKey);
  return clampSettings(modelKey, {
    aspectRatio:
      typeof raw.aspectRatio === "string" ? (raw.aspectRatio as AspectRatio) : d.aspectRatio,
    imageSize: typeof raw.imageSize === "string" ? (raw.imageSize as ImageSize) : d.imageSize,
    numImages: typeof raw.numImages === "number" ? raw.numImages : d.numImages,
    thinkingLevel:
      raw.thinkingLevel === "Low" || raw.thinkingLevel === "High" ? raw.thinkingLevel : undefined,
  });
}

function defaultControls(): Controls {
  const modelKey = MODEL_ORDER[0];
  return { modelKey, presetId: null, settings: defaultSettings(modelKey) };
}

interface StudioContextValue {
  sessions: SessionSummary[];
  isLoadingSessions: boolean;
  activeSessionId: string | null;
  selectSession: (id: string) => void;
  newSession: () => void;
  renameSession: (id: string, title: string) => void;
  removeSession: (id: string) => void;

  session: SessionDetail | null;
  isLoadingSession: boolean;

  modelKey: ModelKey;
  settings: GenerationSettings;
  presetId: string | null;
  capability: ModelCapability;
  setModel: (k: ModelKey) => void;
  setSettings: (p: Partial<GenerationSettings>) => void;
  setPreset: (id: string | null) => void;

  prompt: string;
  setPrompt: (s: string) => void;
  references: PendingRef[];
  addReferences: (refs: PendingRef[]) => void;
  removeReference: (id: string) => void;
  editParent: EditTarget | null;
  enterEdit: (target: EditTarget) => void;
  exitEdit: () => void;

  submit: () => void;
  isGenerating: boolean;
  pendingTurn: { promptText: string; type: "generate" | "edit" } | null;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();

  const [authReady, setAuthReady] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [controls, setControls] = useState<Controls>(defaultControls);
  const [prompt, setPrompt] = useState("");
  const [references, setReferences] = useState<PendingRef[]>([]);
  const [editParent, setEditParent] = useState<EditTarget | null>(null);
  const [pendingTurn, setPendingTurn] = useState<StudioContextValue["pendingTurn"]>(null);
  const lastSync = useRef<string | null>(null);
  const didInit = useRef(false);
  const submitting = useRef(false);

  useEffect(() => {
    let cancelled = false;

    void supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setAuthReady(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      setAuthReady(!!session);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const sessionsQuery = useQuery({
    queryKey: ["sessions"],
    queryFn: () => listSessions(),
    enabled: authReady,
  });
  const sessionQuery = useQuery({
    queryKey: ["session", activeSessionId],
    queryFn: () => getSession({ data: { sessionId: activeSessionId as string } }),
    enabled: authReady && !!activeSessionId,
  });

  const createMut = useMutation({ mutationFn: () => createSession({ data: {} }) });
  const updateMut = useMutation({
    mutationFn: (vars: { sessionId: string; title: string }) => updateSession({ data: vars }),
  });
  const deleteMut = useMutation({
    mutationFn: (sessionId: string) => deleteSession({ data: { sessionId } }),
  });
  const generateMut = useMutation({
    mutationFn: (vars: Parameters<typeof generateImage>[0]) => generateImage(vars),
  });

  // On first load only, default the active session to the most recent one.
  // Guarded so a later "New" (which sets activeSessionId to null) is respected.
  useEffect(() => {
    if (didInit.current || sessionsQuery.data === undefined) return;
    didInit.current = true;
    if (activeSessionId == null && sessionsQuery.data.length > 0) {
      setActiveSessionId(sessionsQuery.data[0].id);
    }
  }, [activeSessionId, sessionsQuery.data]);

  // When a different session loads, restore its persisted controls.
  useEffect(() => {
    const d = sessionQuery.data;
    if (d && lastSync.current !== d.id) {
      lastSync.current = d.id;
      const modelKey = isModelKey(d.activeModelKey) ? d.activeModelKey : MODEL_ORDER[0];
      setControls({
        modelKey,
        presetId: d.activePresetId,
        settings: coerceSettings(modelKey, d.settings),
      });
    }
  }, [sessionQuery.data]);

  const selectSession = useCallback((id: string) => {
    setActiveSessionId(id);
    setPrompt("");
    setReferences([]);
    setEditParent(null);
  }, []);

  const newSession = useCallback(() => {
    lastSync.current = null;
    setActiveSessionId(null);
    setControls(defaultControls());
    setPrompt("");
    setReferences([]);
    setEditParent(null);
  }, []);

  const renameSession = useCallback(
    (id: string, title: string) => {
      updateMut.mutate(
        { sessionId: id, title },
        { onSuccess: () => void qc.invalidateQueries({ queryKey: ["sessions"] }) },
      );
    },
    [qc, updateMut],
  );

  const removeSession = useCallback(
    (id: string) => {
      deleteMut.mutate(id, {
        onSuccess: () => {
          void qc.invalidateQueries({ queryKey: ["sessions"] });
          if (id === activeSessionId) newSession();
        },
        onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to delete session"),
      });
    },
    [qc, deleteMut, activeSessionId, newSession],
  );

  const setModel = useCallback(
    (k: ModelKey) =>
      setControls((c) => ({
        ...c,
        modelKey: k,
        // Reset image count to the new model's default (e.g. Replicate models
        // default to 1) so switching doesn't fan out unexpected parallel calls.
        settings: {
          ...clampSettings(k, c.settings),
          numImages: getCapability(k).defaultSettings.numImages,
        },
      })),
    [],
  );
  const setSettings = useCallback(
    (p: Partial<GenerationSettings>) =>
      setControls((c) => ({ ...c, settings: clampSettings(c.modelKey, { ...c.settings, ...p }) })),
    [],
  );
  const setPreset = useCallback(
    (id: string | null) => setControls((c) => ({ ...c, presetId: id })),
    [],
  );

  const addReferences = useCallback(
    (refs: PendingRef[]) => setReferences((r) => [...r, ...refs]),
    [],
  );
  const removeReference = useCallback(
    (id: string) => setReferences((r) => r.filter((x) => x.id !== id)),
    [],
  );

  const submit = useCallback(() => {
    const text = prompt.trim();
    // Synchronous guard: blocks a second click during the create-session phase,
    // before generateMut.isPending flips.
    if (!text || submitting.current) return;
    submitting.current = true;

    const refs = references;
    const parent = editParent;
    const { modelKey, presetId, settings } = controls;

    void (async () => {
      let sid = activeSessionId;
      try {
        if (!sid) {
          const created = await createMut.mutateAsync();
          sid = created.id;
          lastSync.current = sid;
          setActiveSessionId(sid);
          await qc.invalidateQueries({ queryKey: ["sessions"] });
        }

        setPrompt("");
        setReferences([]);
        setEditParent(null);
        setPendingTurn({ promptText: text, type: parent ? "edit" : "generate" });

        await generateMut.mutateAsync({
          data: {
            sessionId: sid,
            modelKey,
            prompt: text,
            presetId,
            settings: {
              aspectRatio: settings.aspectRatio,
              imageSize: settings.imageSize,
              numImages: settings.numImages,
              thinkingLevel: settings.thinkingLevel,
            },
            referenceImages: refs.map((r) => ({ mimeType: r.mimeType, dataBase64: r.dataBase64 })),
            parentAssetId: parent?.assetId,
          },
        });

        // Refetch the persisted turn BEFORE clearing the optimistic one (no flash).
        if (sid) {
          await qc.invalidateQueries({ queryKey: ["session", sid] });
          await qc.invalidateQueries({ queryKey: ["sessions"] });
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Generation failed");
      } finally {
        setPendingTurn(null);
        submitting.current = false;
      }
    })();
  }, [prompt, references, editParent, controls, activeSessionId, generateMut, createMut, qc]);

  const value = useMemo<StudioContextValue>(
    () => ({
      sessions: sessionsQuery.data ?? [],
      isLoadingSessions: !authReady || sessionsQuery.isLoading,
      activeSessionId,
      selectSession,
      newSession,
      renameSession,
      removeSession,
      session: sessionQuery.data ?? null,
      isLoadingSession: authReady && sessionQuery.isLoading && !!activeSessionId,
      modelKey: controls.modelKey,
      settings: controls.settings,
      presetId: controls.presetId,
      capability: getCapability(controls.modelKey),
      setModel,
      setSettings,
      setPreset,
      prompt,
      setPrompt,
      references,
      addReferences,
      removeReference,
      editParent,
      enterEdit: setEditParent,
      exitEdit: () => setEditParent(null),
      submit,
      isGenerating: generateMut.isPending,
      pendingTurn,
    }),
    [
      authReady,
      sessionsQuery.data,
      sessionsQuery.isLoading,
      activeSessionId,
      selectSession,
      newSession,
      renameSession,
      removeSession,
      sessionQuery.data,
      sessionQuery.isLoading,
      controls,
      setModel,
      setSettings,
      setPreset,
      prompt,
      references,
      addReferences,
      removeReference,
      editParent,
      submit,
      generateMut.isPending,
      pendingTurn,
    ],
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used within StudioProvider");
  return ctx;
}
