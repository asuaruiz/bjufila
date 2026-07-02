import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");

const ROUTES = [
  "/",
  "/services",
  "/services/office-commercial-cleaning",
  "/services/restaurant-kitchen-dishwashing",
  "/services/medical-healthcare-cleaning",
  "/services/retail-commercial-spaces",
  "/services/floor-care-deep-cleaning",
  "/services/post-construction-cleaning",
  "/gallery",
  "/blog",
  "/blog/commercial-cleaning-cost-orlando",
  "/blog/restaurant-cleaning-checklist",
  "/blog/office-cleaning-employee-health",
  "/blog/green-cleaning-benefits",
  "/about",
  "/contact",
  "/quote",
];

const serverEntry = pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href;
const { render } = await import(serverEntry);

// Pages are React.lazy() (see src/App.tsx) so each route only ships its own
// JS on the client. Without a hint, the browser discovers a route's chunk
// only after hydration starts, which would flash the (empty) Suspense
// fallback over the prerendered content. Map each route to its chunk (and
// that chunk's own dependencies) via the build manifest and preload them.
const manifest = JSON.parse(readFileSync(join(dist, ".vite", "manifest.json"), "utf-8"));

function resolvePageEntry(url) {
  if (url === "/") return "src/pages/Home.tsx";
  if (url === "/services") return "src/pages/Services.tsx";
  if (url.startsWith("/services/")) return "src/pages/ServiceDetail.tsx";
  if (url === "/gallery") return "src/pages/Gallery.tsx";
  if (url === "/blog") return "src/pages/Blog.tsx";
  if (url.startsWith("/blog/")) return "src/pages/BlogPost.tsx";
  if (url === "/about") return "src/pages/About.tsx";
  if (url === "/contact") return "src/pages/Contact.tsx";
  if (url === "/quote") return "src/pages/Quote.tsx";
  return "src/pages/NotFound.tsx";
}

function preloadLinksFor(url) {
  const entry = manifest[resolvePageEntry(url)];
  if (!entry) return "";
  const files = new Set([entry.file]);
  for (const dep of entry.imports || []) {
    if (dep === "index.html") continue;
    const depEntry = manifest[dep];
    if (depEntry) files.add(depEntry.file);
  }
  return [...files].map((f) => `<link rel="modulepreload" href="/${f}">`).join("\n    ");
}

const template = readFileSync(join(dist, "index.html"), "utf-8")
  // Remove the static <title> and description so helmet's versions are the only ones.
  .replace(/<title>[\s\S]*?<\/title>/, "")
  .replace(/<meta\s+name="description"[^>]*>/, "");

let count = 0;
for (const url of ROUTES) {
  const { html, helmet } = await render(url);
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].join("\n    ")
    : "";

  const page = template
    .replace("</head>", `    ${preloadLinksFor(url)}\n    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outDir = url === "/" ? dist : join(dist, url);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), page, "utf-8");
  count++;
}

console.log(`✓ Prerendered ${count} routes to static HTML`);
