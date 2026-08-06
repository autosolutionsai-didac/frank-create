import "@testing-library/jest-dom/vitest";

// jsdom does not implement scrollIntoView; the studio calls it when opening drawers.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {};
}
