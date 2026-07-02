import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";
import { initContentProtection } from "./lib/contentProtection";
import "./index.css";

// Initialize content protection (disable right-click, dev tools, copy)
initContentProtection();

const root = document.getElementById("root")!;

const tree = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// If the HTML was prerendered, hydrate; otherwise mount fresh.
if (root.hasChildNodes()) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
