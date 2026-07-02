import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = process.env.SHOT_DIR || ".";
const BASE = "http://localhost:4173";

const routes = process.argv.slice(2);
const pages = routes.length ? routes : ["/"];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

async function audit(page) {
  return await page.evaluate(() => {
    const de = document.documentElement;
    const vw = window.innerWidth;
    const offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 60),
          right: Math.round(r.right),
          left: Math.round(r.left),
          w: Math.round(r.width),
        });
      }
    });
    return {
      vw,
      scrollW: de.scrollWidth,
      overflow: de.scrollWidth - vw,
      offenders: offenders.slice(0, 12),
    };
  });
}

for (const route of pages) {
  const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");

  // Mobile (iPhone 13-ish)
  const m = await browser.newPage();
  await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await m.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 600));
  const report = await audit(m);
  console.log(`\n=== ${route} (mobile ${report.vw}px) overflow=${report.overflow}px ===`);
  report.offenders.forEach((o) => console.log(`  ${o.tag}.${o.cls}  w=${o.w} L=${o.left} R=${o.right}`));
  await m.screenshot({ path: `${OUT}/${slug}-mobile.png`, fullPage: true });
  await m.close();

  // Desktop
  const d = await browser.newPage();
  await d.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await d.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 600));
  await d.screenshot({ path: `${OUT}/${slug}-desktop.png`, fullPage: true });
  await d.close();
}

await browser.close();
console.log("\n✓ done");
