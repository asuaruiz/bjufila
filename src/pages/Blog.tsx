import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "../components/ui";
import { Reveal } from "../lib/reveal";
import { PageHero } from "../components/PageHero";
import { CTASection } from "../components/sections";
import { Seo, breadcrumbSchema } from "../lib/seo";
import { ux, uxSrcSet } from "../lib/img";
import { POSTS_EN, POSTS_ES } from "../data/content";
import { useT, useLang } from "../lib/useTranslation";

function fmt(d: string, lang: string) {
  return new Date(d).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function Blog() {
  const { t } = useT();
  const { lang } = useLang();
  const POSTS = lang === "es" ? POSTS_ES : POSTS_EN;
  const [feat, ...rest] = POSTS;

  const isSeo = lang === "es" ? "Blog de Limpieza Comercial — Consejos para Negocios de Orlando" : "Commercial Cleaning Blog — Tips for Orlando Businesses";
  const isDesc = lang === "es" ? "Guías prácticas de limpieza comercial para negocios de Orlando: precios, listas de restaurantes, salud de oficinas, limpieza ecológica y más del equipo de BJUFILA." : "Practical commercial cleaning guides for Orlando businesses: pricing, restaurant checklists, office health, green cleaning, and more from the BJUFILA team.";

  return (
    <>
      <Seo
        title={isSeo}
        description={isDesc}
        path="/blog"
        schema={breadcrumbSchema([{ name: lang === "es" ? "Inicio" : "Home", path: "/" }, { name: "Blog", path: "/blog" }])}
      />
      <PageHero
        eyebrow={t("blog.insights")}
        title={t("blog.bjufilaBlog")}
        subtitle={t("blog.blogSub")}
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          {/* Featured */}
          <Reveal>
            <Link
              to={`/blog/${feat.slug}`}
              className="card-hover group grid overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-soft lg:grid-cols-2"
            >
              <div className="h-64 overflow-hidden lg:h-auto">
                <img
                  src={ux(feat.cover, 900, 600)}
                  srcSet={uxSrcSet(feat.cover)}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt={feat.title}
                  width={900}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-royal-600">
                  {t("blog.featured")} · {feat.category}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy-900">{feat.title}</h2>
                <p className="mt-4 text-muted">{feat.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {fmt(feat.date)}</span>
                  <span>·</span>
                  <span>{feat.readingTime}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-royal-600">
                  {lang === "en" ? "Read article" : "Leer artículo"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-soft"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={ux(p.cover, 640, 384)}
                      srcSet={uxSrcSet(p.cover)}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      alt={p.title}
                      width={640}
                      height={384}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-royal-600">
                      {p.category} · {p.readingTime}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy-900">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                    <span className="mt-4 text-sm text-muted">{fmt(p.date, lang)}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
