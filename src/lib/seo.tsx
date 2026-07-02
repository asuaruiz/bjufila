import { Helmet } from "react-helmet-async";
import { SITE } from "./site";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  schema?: object | object[];
  noindex?: boolean;
};

export function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export function Seo({ title, description, path = "/", image, type = "website", schema, noindex }: SeoProps) {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE.shortName}`;
  const ogImage =
    image ||
    `${SITE.url}/images/1497366216548-37526070297c.webp`;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.shortName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "@id": `${SITE.url}/#business`,
  name: SITE.legalName,
  alternateName: SITE.shortName,
  description:
    "Commercial cleaning and janitorial services for offices, restaurants, and medical facilities in Orlando, Florida.",
  url: SITE.url,
  telephone: "+14072860078",
  email: SITE.email,
  priceRange: SITE.priceRange,
  image: `${SITE.url}/images/1497366216548-37526070297c.webp`,
  logo: `${SITE.url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Orlando",
    addressRegion: "FL",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  areaServed: SITE.serviceArea.map((c) => ({ "@type": "City", name: c })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
  },
  sameAs: [],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE.url}${path}`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "City", name: "Orlando" },
  };
}
