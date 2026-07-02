import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { Container, Button, Eyebrow } from "../components/ui";
import { Icon } from "../components/Icon";
import { Reveal } from "../lib/reveal";
import { PageHero } from "../components/PageHero";
import { CTASection } from "../components/sections";
import { QuoteForm } from "../components/QuoteForm";
import { Seo, serviceSchema, breadcrumbSchema, truncateAtWord } from "../lib/seo";
import { ux, uxSrcSet, absoluteImg } from "../lib/img";
import { SITE } from "../lib/site";
import { SERVICES } from "../data/content";
import { useT, useLang } from "../lib/useTranslation";

export default function ServiceDetail() {
  const { t } = useT();
  const { lang } = useLang();
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;
  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${service.title} ${lang === "es" ? "en" : "in"} Orlando`}
        description={truncateAtWord(service.intro, 155)}
        path={`/services/${service.slug}`}
        image={absoluteImg(service.hero)}
        schema={[
          serviceSchema(service.title, service.intro, `/services/${service.slug}`),
          breadcrumbSchema([
            { name: lang === "es" ? "Inicio" : "Home", path: "/" },
            { name: lang === "es" ? "Servicios" : "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={lang === "es" ? "Servicio" : "Service"}
        title={`${service.title} ${lang === "es" ? "en" : "in"} Orlando, FL`}
        subtitle={service.short}
        crumbs={[{ name: lang === "es" ? "Servicios" : "Services", to: "/services" }, { name: service.title }]}
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <Reveal>
                <div className="overflow-hidden rounded-3xl shadow-soft">
                  <img
                    src={ux(service.hero, 1000, 620)}
                    srcSet={uxSrcSet(service.hero)}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    alt={service.title}
                    width={1000}
                    height={620}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="h-section mt-10 text-navy-900">{lang === "es" ? "Qué está incluido" : "What's included"}</h2>
                <p className="mt-4 text-lg text-muted">{service.intro}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 rounded-2xl bg-paper p-4 text-navy-800">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint-400" />
                      <span className="text-sm font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* sticky quote rail */}
            <div>
              <div className="lg:sticky lg:top-28">
                <Reveal delay={120}>
                  <div className="rounded-3xl border border-navy-900/8 bg-navy-950 p-7 text-white shadow-lift">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-600/25 text-royal-100 ring-1 ring-white/10">
                      <Icon name={service.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold">{lang === "es" ? "Obtén una cotización plana para" : "Get a flat quote for"} {service.title.toLowerCase()}</h3>
                    <p className="mt-2 text-sm text-white/60">
                      {lang === "es" ? "Caminata gratuita, precios transparentes, respuesta dentro de un día hábil." : "Free walkthrough, transparent pricing, response within one business day."}
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      <Button to="/quote" variant="white" arrow className="w-full">{lang === "es" ? "Solicitar una Cotización" : "Request a Quote"}</Button>
                      <Button href={SITE.phoneHref} variant="ghost" className="w-full ring-1 ring-white/20">
                        <Phone className="h-4 w-4" /> {SITE.phone}
                      </Button>
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{lang === "es" ? "Ideal para" : "Ideal for"}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.idealFor.map((f) => (
                          <span key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other services */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <Eyebrow>{t("services.exploreMore")}</Eyebrow>
          <h2 className="h-section mt-4 text-navy-900">{lang === "es" ? "Otros servicios que ofrecemos" : "Other services we offer"}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="card-hover group flex items-center gap-4 rounded-3xl border border-navy-900/8 bg-white p-5 shadow-soft"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-royal-50 text-royal-600">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="font-display font-bold text-navy-900">{s.title}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-royal-600 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
