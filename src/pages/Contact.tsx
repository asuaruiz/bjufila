import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container, Eyebrow } from "../components/ui";
import { Reveal } from "../lib/reveal";
import { PageHero } from "../components/PageHero";
import { QuoteForm } from "../components/QuoteForm";
import { Seo, breadcrumbSchema, localBusinessSchema } from "../lib/seo";
import { SITE } from "../lib/site";
import { useT, useLang } from "../lib/useTranslation";

const CONTACTS_EN = [
  { icon: Phone, label: "Call us", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "Email us", value: SITE.email, href: SITE.emailHref },
  { icon: MapPin, label: "Service area", value: "Greater Orlando, FL" },
  { icon: Clock, label: "Office hours", value: SITE.hours },
];

const CONTACTS_ES = [
  { icon: Phone, label: "Llámanos", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "Envíanos un email", value: SITE.email, href: SITE.emailHref },
  { icon: MapPin, label: "Área de servicio", value: "Área metropolitana de Orlando, FL" },
  { icon: Clock, label: "Horario de oficina", value: SITE.hours },
];

export default function Contact() {
  const { t } = useT();
  const { lang } = useLang();
  const CONTACTS = lang === "es" ? CONTACTS_ES : CONTACTS_EN;

  return (
    <>
      <Seo
        title={lang === "es" ? "Contacta BJUFILA — Limpieza Comercial de Orlando" : "Contact BJUFILA — Orlando Commercial Cleaning"}
        description={lang === "es" ? "Ponte en contacto con BJUFILA Servicios de Limpieza y Lavaplatos en Orlando. Llama (407) 286-0078, envía un correo a sales@bjufilacds.com, o solicita una cotización gratis de limpieza comercial en línea." : "Get in touch with BJUFILA Cleaning & Dishwashing Services in Orlando. Call (407) 286-0078, email sales@bjufilacds.com, or request a free commercial cleaning quote online."}
        path="/contact"
        schema={[localBusinessSchema, breadcrumbSchema([{ name: lang === "es" ? "Inicio" : "Home", path: "/" }, { name: lang === "es" ? "Contacto" : "Contact", path: "/contact" }])]}
      />
      <PageHero
        eyebrow={t("contact.contact")}
        title={t("contact.letsTalk")}
        subtitle={t("contact.contactSub")}
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Reveal>
                <Eyebrow>{t("contact.reachUs")}</Eyebrow>
                <h2 className="h-section mt-4 text-navy-900">{t("contact.weAreLocal")}</h2>
                <p className="mt-4 text-muted">
                  {t("contact.noCallCenters")}
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {CONTACTS.map((c, i) => (
                  <Reveal key={c.label} delay={i * 70}>
                    <div className="rounded-3xl border border-navy-900/8 bg-paper p-6">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-royal-600 shadow-soft">
                        <c.icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="mt-1 block font-semibold text-navy-900 hover:text-royal-600">{c.value}</a>
                      ) : (
                        <div className="mt-1 font-semibold text-navy-900">{c.value}</div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <div className="mt-6 overflow-hidden rounded-3xl border border-navy-900/8 shadow-soft">
                  <iframe
                    title="BJUFILA service area — Orlando, Florida"
                    src="https://www.google.com/maps?q=Orlando,FL&output=embed"
                    className="h-64 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div id="quote">
                <h2 className="mb-4 font-display text-2xl font-bold text-navy-900">{t("contact.requestQuote")}</h2>
                <QuoteForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
