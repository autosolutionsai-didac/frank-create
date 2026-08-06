import { describe, expect, it } from "vitest";

// Vitest runs this static contract in Node; the app build does not execute it.
const { readFileSync } = await import("node:fs");
const styles = readFileSync("./src/styles.css", "utf-8") as string;
const tokens = (name: string) =>
  readFileSync(`./src/ds/tokens/${name}.css`, "utf-8") as string;

describe("AutoSolutions OS theme, frank body tenant", () => {
  it("builds on the OS token layer rather than a local brand layer", () => {
    expect(styles).toContain('@import "./ds/tokens.css"');
    expect(styles).not.toContain("Pitch-Semibold.woff2");
    expect(styles).not.toContain("FoundersGroteskText-Light.woff2");
  });

  it("uses the two OS faces: Google Sans for interface, Roboto for copy", () => {
    expect(tokens("fonts")).toContain("font-family:'Google Sans'");
    expect(tokens("fonts")).toContain("GoogleSans-Variable.ttf");
    expect(tokens("fonts")).toContain("font-family:'Roboto'");
    expect(tokens("fonts")).toContain("Roboto-Variable.ttf");
    expect(tokens("typography")).toContain("--font-display:'Google Sans'");
    expect(tokens("typography")).toContain("--font-body:'Roboto'");
  });

  it("carries the OS workspace colours", () => {
    expect(tokens("colors")).toContain("--ink:#303030");
    expect(tokens("colors")).toContain("--muted:#5E5E5E");
    expect(tokens("colors")).toContain("--surface:#FFFFFF");
    // The rail is a 10% ink tint over the ambient field, never its own fill.
    expect(tokens("colors")).toContain("--surface-rail:rgba(48,48,48,0.10)");
  });

  it("themes frank body through the tenant accent and ambient ramp", () => {
    expect(tokens("tenants")).toContain('[data-tenant="frank"]');
    expect(tokens("tenants")).toContain("--tenant-accent:#F9ABAA");
    expect(tokens("tenants")).toContain("--tenant-blob-bottom:#F9C0B9");
    expect(tokens("tenants")).toContain("--tenant-blob-top:#FDEFE4");
    expect(styles).toContain("--pink: var(--tenant-accent)");
    expect(styles).toContain("--tenant-ramp:");
  });

  it("keeps cards on the OS shape and elevation", () => {
    expect(tokens("radius")).toContain("--radius-glass-card:24px");
    expect(tokens("elevation")).toContain("--shadow-card-glow:0 0 10px rgba(0,0,0,0.10)");
    expect(styles).toContain("--shadow: var(--shadow-card-glow)");
  });
});
