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

const template = readFileSync(join(dist, "index.html"), "utf-8")
  // Remove the static <title> and description so helmet's versions are the only ones.
  .replace(/<title>[\s\S]*?<\/title>/, "")
  .replace(/<meta\s+name="description"[^>]*>/, "");

let count = 0;
for (const url of ROUTES) {
  const { html, helmet } = render(url);
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].join("\n    ")
    : "";

  const page = template
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outDir = url === "/" ? dist : join(dist, url);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), page, "utf-8");
  count++;
}

console.log(`✓ Prerendered ${count} routes to static HTML`);
