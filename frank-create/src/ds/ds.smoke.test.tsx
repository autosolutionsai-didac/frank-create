import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { AmbientBackground, ProgressBar, ds } from "./index";

describe("AutoSolutions OS design system bundle", () => {
  it("loads every component without error", () => {
    expect(ds.__errors ?? []).toEqual([]);
    expect(typeof ds.AmbientBackground).toBe("function");
    expect(typeof ds.Button).toBe("function");
  });

  it("renders the ambient field as a fixed full-viewport svg", () => {
    const { container } = render(<AmbientBackground base="transparent" />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 1280 832");
    expect(svg?.getAttribute("preserveAspectRatio")).toBe("xMidYMid slice");
    expect(container.querySelector("feGaussianBlur")?.getAttribute("stdDeviation")).toBe("250");
    expect(container.querySelector("rect")).toBeNull();
  });

  it("renders a progress bar with its display value", () => {
    const { getByText } = render(<ProgressBar label="Approved" value={50} display="2 / 4" />);
    expect(getByText("2 / 4")).toBeTruthy();
  });
});
