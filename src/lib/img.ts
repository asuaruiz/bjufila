import { SITE } from "./site";

// Self-hosted images (downloaded once from Unsplash into public/images) — same-origin,
// so it works under any domain (staging or production) and inherits our immutable cache headers.
// Pre-generated at 400/640/900/1000px; pick the smallest bucket that covers the requested width
// so cards don't ship the same bytes as a full-bleed hero.
const BUCKETS = [400, 640, 900, 1000] as const;

export function ux(id: string, w = 1600, _h?: number, _q?: number) {
  const bucket = BUCKETS.find((b) => w <= b);
  return bucket ? `/images/${id}-${bucket}.webp` : `/images/${id}.webp`;
}

// srcset across every generated bucket so the browser can pick the smallest
// image that still fills its layout slot (crucial on narrow mobile viewports,
// which would otherwise download the same bytes as a full-bleed desktop hero).
export function uxSrcSet(id: string) {
  return BUCKETS.map((b) => `/images/${id}-${b}.webp ${b}w`).join(", ");
}

// Absolute URL for contexts that require one per spec (og:image, schema.org image) —
// unlike <img src>, these can't rely on same-origin resolution.
export function absoluteImg(id: string) {
  return `${SITE.url}${ux(id)}`;
}

export const IMG = {
  heroOffice: "1497366216548-37526070297c",
  heroCleaner: "1581578731548-c64695cc6952",
  supplies: "1584622650111-993a426fbf0a",
  kitchen: "1556910103-1c02745aae4d",
  restaurant: "1517248135467-4c7edcad34c4",
  hospital: "1519494026892-80bbd2d6fd0d",
  medical: "1538108149393-fbbd81895907",
  team: "1600880292203-757bb62b4baf",
  mopping: "1628177142898-93e36e4e3a50",
  window: "1527515637462-cff94eecc1ac",
  disinfect: "1584515933487-779824d29309",
  officeDesk: "1503387762-592deb58ef4e",
  office2: "1497366811353-6870744d04b2",
  lobby: "1497215728101-856f4ea42174",
  meeting: "1522708323590-d24dbb6b0267",
  coworking: "1524758631624-e2822e304c36",
  reception: "1567521464027-f127ff144326",
  glassOffice: "1554469384-e58fac16e23a",
  desks: "1552321554-5fefe8c9ef14",
  modernOffice: "1600585154340-be6161a56a0c",
  cafe: "1613323593608-abc90fec84ff",
  floorShine: "1631679706909-1844bbd07221",
  detail: "1581092160562-40aa08e78837",
  warehouse: "1590490360182-c33d57733427",
  gym: "1571624436279-b272aff752b5",
};
