import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { App, pageForPath } from "./App";

export async function render(url: string) {
  // Pages are code-split via lazyPreloadable() (see lib/lazyPreload.tsx).
  // renderToString is synchronous and can't await a lazy import, so preload
  // the page matching this URL first — it then renders directly instead of
  // going through Suspense, which also keeps the client hydration in sync
  // with the SSR output (a still-pending Suspense boundary at hydration time
  // makes React discard the SSR'd DOM and re-render client-only).
  await pageForPath(url.split("?")[0]).preload();

  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  return { html, helmet: helmetContext.helmet };
}
