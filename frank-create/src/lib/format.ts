// Pure string / number formatting helpers extracted from App.tsx.

export function formatCount(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function titleize(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function providerDisplayName(provider?: string) {
  const names: Record<string, string> = {
    google: "Google",
    local: "Local",
    openai: "OpenAI",
    replicate: "Replicate"
  };
  return provider ? names[provider] ?? titleize(provider) : "Provider";
}

export function referenceCountLabel(count: number) {
  return `${count} reference${count === 1 ? "" : "s"}`;
}

export function parseJsonRecord(value?: unknown) {
  if (!value) {
    return {} as Record<string, unknown>;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  if (typeof value !== "string") {
    return {} as Record<string, unknown>;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

export function joinWithOr(values: string[]) {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
