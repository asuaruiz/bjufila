import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App, pageForPath } from "./App";
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

// Pages are code-split (see lib/lazyPreload.tsx). Preload the one matching
// the current URL before mounting so the initial render/hydrate never hits
// a pending Suspense boundary — that would make React discard the SSR'd DOM
// and re-render client-only instead of hydrating it.
pageForPath(window.location.pathname)
  .preload()
  .then(() => {
    // If the HTML was prerendered, hydrate; otherwise mount fresh.
    if (root.hasChildNodes()) {
      hydrateRoot(root, tree);
    } else {
      createRoot(root).render(tree);
    }
  });
