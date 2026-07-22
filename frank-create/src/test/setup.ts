import "@testing-library/jest-dom/vitest";

// jsdom does not implement scrollIntoView. Several components call it inside
// requestAnimationFrame callbacks (e.g. opening the model settings drawer), which
// would otherwise throw uncaught TypeErrors and derail unrelated tests. Stub it.
if (typeof window !== "undefined" && !window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = () => {};
}
