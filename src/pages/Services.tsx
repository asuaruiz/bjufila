import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, Button, Eyebrow } from "../components/ui";
import { Icon } from "../components/Icon";
import { Reveal } from "../lib/reveal";
import { CTASection, FAQAccordion } from "../components/sections";
import { PageHero } from "../components/PageHero";
import { Seo, breadcrumbSchema } from "../lib/seo";
import { ux } from "../lib/img";
import { SERVICES } from "../data/content";
import { useT, useLang } from "../lib/useTranslation";

export default function Services() {
  const { t } = useT();
  const { lang } = useLang();

  return (
    <>
      <Seo
        title={lang === "es" ? "Servicios de Limpieza Comercial en Orlando" : "Commercial Cleaning Services in Orlando"}
        description={lang === "es" ? "Explora los servicios de limpieza comercial de BJUFILA en Orlando — limpieza de oficinas, lavaplatos de restaurante y cocina, desinfección de instalaciones médicas, retail, cuidado de pisos y limpieza post-construcción." : "Explore BJUFILA's commercial cleaning services in Orlando — office cleaning, restaurant & kitchen dishwashing, medical facility disinfection, retail, floor care & post-construction cleaning."}
        path="/services"
        schema={breadcrumbSchema([{ name: lang === "es" ? "Inicio" : "Home", path: "/" }, { name: lang === "es" ? "Servicios" : "Services", path: "/services" }])}
      />
      <PageHero
        eyebrow={t("services.ourServices")}
        title={t("services.builtAround")}
        subtitle={t("services.description")}
      />

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <div className="space-y-8">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 80}>
                <Link
                  to={`/services/${s.slug}`}
                  className={`card-hover group grid overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-soft md:grid-cols-2 ${
                    i % 2 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[220px] overflow-hidden">
                    <img
                      src={ux(s.image, 800, 560)}
                      alt={s.title}
                      width={800}
                      height={560}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-10">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-50 text-royal-600">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <h2 className="mt-5 font-display text-2xl font-bold text-navy-900">{s.title}</h2>
                    <p className="mt-3 text-muted">{s.intro}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.idealFor.map((f) => (
                        <span key={f} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-navy-800">
                          {f}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-royal-600">
                      {t("home.explore")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FAQAccordion />
      <CTASection />
    </>
  );
}
