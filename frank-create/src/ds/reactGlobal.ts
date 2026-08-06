// The AutoSolutions OS bundle is prebuilt JSX that resolves `React` off the
// global scope. Importing this module first puts React there before the
// bundle body runs — ES import order within a module is depth-first.
import React from "react";

(globalThis as unknown as { React: typeof React }).React = React;
