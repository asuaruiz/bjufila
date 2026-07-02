import { useState } from "react";
import { Container, Eyebrow } from "../components/ui";
import { Reveal } from "../lib/reveal";
import { PageHero } from "../components/PageHero";
import { BeforeAfter } from "../components/BeforeAfter";
import { CTASection } from "../components/sections";
import { Seo, breadcrumbSchema } from "../lib/seo";
import { ux, uxSrcSet, IMG } from "../lib/img";
import { GALLERY } from "../data/content";
import { useT, useLang } from "../lib/useTranslation";

const CATS_EN = ["All", "Office", "Restaurant", "Medical", "Floor Care"];
const CATS_ES = ["Todos", "Oficina", "Restaurante", "Médico", "Cuidado de Pisos"];

export default function Gallery() {
  const { t } = useT();
  const { lang } = useLang();
  const [cat, setCat] = useState(lang === "es" ? "Todos" : "All");
  const CATS = lang === "es" ? CATS_ES : CATS_EN;
  const items = (lang === "es" ? cat === "Todos" : cat === "All") ? GALLERY : GALLERY.filter((g) => g.cat === cat);

  return (
    <>
      <Seo
        title={lang === "es" ? "Nuestro Trabajo — Galería de Limpieza Comercial" : "Our Work — Commercial Cleaning Gallery"}
        description={lang === "es" ? "Ve el trabajo de limpieza comercial de BJUFILA en oficinas, restaurantes e instalaciones médicas de Orlando. Transformaciones antes y después y resultados impecables." : "See BJUFILA's commercial cleaning work across Orlando offices, restaurants, and medical facilities. Before-and-after transformations and spotless results."}
        path="/gallery"
        schema={breadcrumbSchema([{ name: lang === "es" ? "Inicio" : "Home", path: "/" }, { name: lang === "es" ? "Galería" : "Gallery", path: "/gallery" }])}
      />
      <PageHero
        eyebrow={t("gallery.ourWork")}
        title={t("gallery.spotlessResults")}
        subtitle={t("gallery.galleryDescription")}
      />

      {/* Before/After feature */}
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <BeforeAfter beforeId={IMG.lobby} afterId={IMG.lobby} />
            </Reveal>
            <Reveal delay={100}>
              <Eyebrow>{t("gallery.beforeAfter")}</Eyebrow>
              <h2 className="h-section mt-4 text-navy-900">{t("gallery.dragReveal")}</h2>
              <p className="mt-5 text-lg text-muted">
                {t("gallery.transformation")}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Filterable grid */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  cat === c ? "bg-royal-600 text-white" : "bg-white text-navy-800 ring-1 ring-navy-900/10 hover:ring-royal-500/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {items.map((g, i) => (
              <Reveal key={g.id + i} delay={(i % 3) * 60}>
                <figure className="group relative overflow-hidden rounded-3xl shadow-soft">
                  <img
                    src={ux(g.id, 640, i % 3 === 1 ? 800 : 520)}
                    srcSet={uxSrcSet(g.id)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    alt={`${g.label} — commercial cleaning by BJUFILA in Orlando`}
                    width={640}
                    height={i % 3 === 1 ? 800 : 520}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <figcaption className="absolute bottom-4 left-4 translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-royal-200">{g.cat}</span>
                    <div className="font-display text-lg font-bold">{g.label}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
