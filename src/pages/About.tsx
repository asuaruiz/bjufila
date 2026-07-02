import { CheckCircle2, Heart, Target, Users } from "lucide-react";
import { Container, Button, Eyebrow } from "../components/ui";
import { Reveal } from "../lib/reveal";
import { PageHero } from "../components/PageHero";
import { StatsBand, TestimonialWall, CTASection } from "../components/sections";
import { Seo, breadcrumbSchema, localBusinessSchema } from "../lib/seo";
import { ux, IMG } from "../lib/img";
import { SITE } from "../lib/site";
import { useT, useLang } from "../lib/useTranslation";

const VALUES_EN = [
  { icon: Heart, title: "Care in every detail", body: "We treat your space like our own — because reputation is everything in this business." },
  { icon: Target, title: "Consistency over promises", body: "The same high standard on visit one and visit one hundred. No drift, no excuses." },
  { icon: Users, title: "Real relationships", body: "One dedicated contact who knows your facility and actually answers the phone." },
];

const VALUES_ES = [
  { icon: Heart, title: "Cuidado en cada detalle", body: "Tratamos tu espacio como el nuestro — porque la reputación lo es todo en este negocio." },
  { icon: Target, title: "Consistencia sobre promesas", body: "El mismo alto estándar en la visita uno y en la cien. Sin desviaciones, sin excusas." },
  { icon: Users, title: "Relaciones reales", body: "Un contacto dedicado que conoce tu instalación y realmente responde el teléfono." },
];

export default function About() {
  const { t } = useT();
  const { lang } = useLang();
  const VALUES = lang === "es" ? VALUES_ES : VALUES_EN;

  return (
    <>
      <Seo
        title={lang === "es" ? "Acerca de BJUFILA — Equipo de Limpieza Comercial de Orlando" : "About BJUFILA — Orlando Commercial Cleaning Team"}
        description={lang === "es" ? "Conoce BJUFILA Servicios de Limpieza y Lavaplatos — una empresa de limpieza comercial de Orlando de propiedad local construida sobre confiabilidad, transparencia y cuidado genuino por cada espacio que servimos." : "Meet BJUFILA Cleaning & Dishwashing Services — a locally owned Orlando commercial cleaning company built on reliability, transparency, and genuine care for every space we serve."}
        path="/about"
        schema={[localBusinessSchema, breadcrumbSchema([{ name: lang === "es" ? "Inicio" : "Home", path: "/" }, { name: lang === "es" ? "Acerca de" : "About", path: "/about" }])]}
      />
      <PageHero
        eyebrow={t("about.aboutUs")}
        title={t("about.locallyOwned")}
        subtitle={t("about.aboutSub")}
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-lift">
                  <img src={ux(IMG.team, 900, 620)} alt="BJUFILA commercial cleaning team in Orlando" width={900} height={620} className="w-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-4 rounded-2xl bg-royal-600 px-6 py-5 text-white shadow-lift sm:-right-6">
                  <div className="font-display text-3xl font-bold">Since {SITE.founded}</div>
                  <div className="text-sm text-royal-100">Serving Orlando businesses</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Eyebrow>{t("about.ourStory")}</Eyebrow>
              <h2 className="h-section mt-4 text-navy-900">{t("about.builtFor")}</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
                <p>
                  {lang === "es"
                    ? "Comenzamos BJUFILA después de ver a demasiados negocios de Orlando ciclar a través de limpiadoras poco confiables y franquicias nacionales sin rostro — persiguiendo visitas perdidas, calidad inconsistente y árboles telefónicos que nunca conectan con una persona real."
                    : "We started BJUFILA after seeing too many Orlando businesses cycle through unreliable cleaners and faceless national franchises — chasing missed visits, inconsistent quality, and phone trees that never connect to a real person."}
                </p>
                <p>
                  {lang === "es"
                    ? "Entonces construimos lo opuesto: equipos verificados y entrenados, precios planos transparentes, calidad verificada por foto en cada visita, y un contacto dedicado que conoce tu espacio. Desde lavaplatos de back-of-house hasta desinfección de grado clínico, lo hacemos bien — cada vez."
                    : "So we built the opposite: vetted, trained crews, transparent flat pricing, photo-verified quality on every visit, and one dedicated contact who knows your space. From back-of-house dishwashing to clinical-grade disinfection, we do it right — every time."}
                </p>
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {(lang === "es"
                  ? ["Asegurado y totalmente asegurado", "Equipos con antecedentes verificados", "Productos certificados ecológicos", "Calidad verificada por foto"]
                  : ["Bonded & fully insured", "Background-checked crews", "Green-certified products", "Photo-verified quality"]
                ).map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-navy-800">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-mint-400" /> <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <StatsBand />

      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("about.whatWeStandFor")}</Eyebrow>
            <h2 className="h-section mt-4 text-navy-900">{t("about.valuesShowUp")}</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="h-full rounded-3xl border border-navy-900/8 bg-white p-8 shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-50 text-royal-600">
                    <v.icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy-900">{v.title}</h3>
                  <p className="mt-2 text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialWall />
      <CTASection />
    </>
  );
}
