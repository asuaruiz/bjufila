import { ShieldCheck, Clock, BadgeDollarSign, Star, Phone } from "lucide-react";
import { Container } from "../components/ui";
import { Reveal } from "../lib/reveal";
import { PageHero } from "../components/PageHero";
import { QuoteForm } from "../components/QuoteForm";
import { Seo, breadcrumbSchema } from "../lib/seo";
import { SITE } from "../lib/site";
import { TESTIMONIALS } from "../data/content";
import { useT, useLang } from "../lib/useTranslation";

const PERKS_EN = [
  { icon: BadgeDollarSign, title: "Transparent flat pricing", body: "Clear monthly rate, no hidden fees or surprise charges." },
  { icon: Clock, title: "Response within 24 hours", body: "A real quote fast — often the same day." },
  { icon: ShieldCheck, title: "Bonded & insured", body: "Vetted, background-checked crews. Zero risk to you." },
];

const PERKS_ES = [
  { icon: BadgeDollarSign, title: "Precios planos transparentes", body: "Tarifa mensual clara, sin cargos ocultos ni sorpresas." },
  { icon: Clock, title: "Respuesta dentro de 24 horas", body: "Una cotización real rápida — a menudo el mismo día." },
  { icon: ShieldCheck, title: "Asegurado y garantizado", body: "Equipos verificados y con antecedentes limpios. Riesgo cero para ti." },
];

export default function Quote() {
  const { t } = useT();
  const { lang } = useLang();
  const PERKS = lang === "es" ? PERKS_ES : PERKS_EN;

  return (
    <>
      <Seo
        title={lang === "es" ? "Obtén una Cotización Gratis de Limpieza Comercial en Orlando" : "Get a Free Commercial Cleaning Quote in Orlando"}
        description={lang === "es" ? "Solicita una cotización gratis, sin obligación de limpieza comercial de BJUFILA en Orlando. Precios planos transparentes para oficinas, restaurantes e instalaciones médicas — respuesta dentro de 24 horas." : "Request a free, no-obligation commercial cleaning quote from BJUFILA in Orlando. Transparent flat pricing for offices, restaurants, and medical facilities — response within 24 hours."}
        path="/quote"
        schema={breadcrumbSchema([{ name: lang === "es" ? "Inicio" : "Home", path: "/" }, { name: lang === "es" ? "Obtén una Cotización" : "Get a Quote", path: "/quote" }])}
      />
      <PageHero
        eyebrow={t("quote.freeQuote")}
        title={t("quote.getYourFreeQuote")}
        subtitle={t("quote.tellUs")}
      />

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <Reveal>
              <QuoteForm />
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={100}>
                <div className="rounded-3xl border border-navy-900/8 bg-white p-7 shadow-soft">
                  <div className="flex gap-1 text-flag-red">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-3 text-navy-800">"{TESTIMONIALS[0].quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-navy-900">{TESTIMONIALS[0].name}</p>
                  <p className="text-sm text-muted">{TESTIMONIALS[0].role}</p>
                </div>
              </Reveal>
              {PERKS.map((p, i) => (
                <Reveal key={p.title} delay={160 + i * 70}>
                  <div className="flex items-start gap-4 rounded-3xl border border-navy-900/8 bg-white p-6 shadow-soft">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-50 text-royal-600">
                      <p.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-navy-900">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={380}>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-3xl bg-navy-950 py-5 font-semibold text-white transition-colors hover:bg-navy-900"
                >
                  <Phone className="h-4 w-4" /> {lang === "es" ? "¿Prefieres hablar?" : "Prefer to talk?"} {SITE.phone}
                </a>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
