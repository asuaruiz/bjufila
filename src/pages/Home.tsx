import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, Leaf, Clock, Phone, CheckCircle2 } from "lucide-react";
import { Container, Button, Eyebrow } from "../components/ui";
import { Icon } from "../components/Icon";
import { Reveal } from "../lib/reveal";
import { BeforeAfter } from "../components/BeforeAfter";
import { StatsBand, TestimonialWall, FAQAccordion, CTASection } from "../components/sections";
import { Seo, localBusinessSchema, faqSchema } from "../lib/seo";
import { ux, IMG } from "../lib/img";
import { SITE } from "../lib/site";
import { SERVICES, DIFFERENTIATORS, PROCESS, POSTS_EN, POSTS_ES, FAQS } from "../data/content";
import { useT, useLang } from "../lib/useTranslation";

const TRUST_EN = ["Offices", "Restaurants", "Medical Clinics", "Retail", "Warehouses", "Coworking", "Gyms", "Schools"];
const TRUST_ES = ["Oficinas", "Restaurantes", "Clínicas Médicas", "Retail", "Almacenes", "Coworking", "Gimnasios", "Escuelas"];

export default function Home() {
  const { t } = useT();
  const { lang } = useLang();
  const TRUST = lang === "es" ? TRUST_ES : TRUST_EN;
  const POSTS = lang === "es" ? POSTS_ES : POSTS_EN;

  return (
    <>
      <Seo
        title={t("nav.services") === "Servicios" ? "Servicios de Limpieza Comercial en Orlando, FL | BJUFILA" : "Commercial Cleaning Services in Orlando, FL | BJUFILA"}
        description={t("nav.services") === "Servicios" ? "BJUFILA ofrece servicios confiables de limpieza comercial, servicios de conserjería y lavaplatos para oficinas, restaurantes e instalaciones médicas en Orlando, FL. Asegurado, garantizado y certificado ecológico. Obtén una cotización gratuita." : "BJUFILA delivers reliable commercial cleaning, janitorial & dishwashing services for offices, restaurants & medical facilities across Orlando, FL. Bonded, insured & green-certified. Get a free quote."}
        path="/"
        schema={[localBusinessSchema, faqSchema(FAQS)]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-mesh pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="noise" />
        <div className="bg-grid absolute inset-0 opacity-[0.15]" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="text-white">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-royal-100 ring-1 ring-white/15">
                  <span className="flex gap-0.5 text-flag-red">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                  {t("home.rated")}
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="h-hero mt-6 text-white">
                  {lang === "en" ? "Orlando's " : "El estándar "}
                  <span className="text-gradient">{lang === "en" ? "spotless" : "impecable"}</span>
                  {lang === "en" ? " standard in commercial cleaning" : " de Orlando en limpieza comercial"}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                  {t("home.heroSub")}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button to="/quote" size="lg" variant="white" arrow>
                    {t("home.getQuote")}
                  </Button>
                  <Button href={SITE.phoneHref} size="lg" variant="ghost" className="ring-1 ring-white/20">
                    <Phone className="h-4 w-4" /> {SITE.phone}
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
                  <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-royal-400" /> {t("home.bonded")}</span>
                  <span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-mint-400" /> {t("home.green")}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-royal-400" /> {t("home.afterHours")}</span>
                </div>
              </Reveal>
            </div>

            {/* Hero visual */}
            <Reveal delay={200} className="relative">
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/10">
                  <img
                    src={ux(IMG.mopping, 900, 1000, 74)}
                    alt="Professional commercial cleaning service disinfecting an Orlando workspace"
                    width={900}
                    height={1000}
                    {...{ fetchpriority: "high" }}
                    className="h-[420px] w-full object-cover object-center sm:h-[520px]"
                  />
                </div>
                {/* floating stat card */}
                <div className="animate-float absolute -left-4 bottom-8 w-52 rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur sm:-left-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint-400/15 text-mint-400">
                      <CheckCircle2 className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="font-display text-2xl font-bold leading-none text-navy-900">500+</div>
                      <div className="text-xs text-muted">{lang === "en" ? "spaces kept spotless" : "espacios impecables"}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-3 top-8 rounded-2xl bg-navy-900/90 px-4 py-3 text-white shadow-lift ring-1 ring-white/10 backdrop-blur sm:-right-6">
                  <div className="text-xs text-white/60">{lang === "en" ? "Response time" : "Tiempo de respuesta"}</div>
                  <div className="font-display text-lg font-bold">&lt; 24 hrs</div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* trust marquee */}
        <div className="relative mt-16 border-y border-white/10 py-5">
          <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
              {[...TRUST, ...TRUST].map((t, i) => (
                <span key={i} className="whitespace-nowrap font-display text-lg font-semibold text-white/40">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* SERVICES */}
      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <Eyebrow>{t("home.whatWeDo")}</Eyebrow>
              <h2 className="h-section mt-4 text-navy-900">
                {t("home.onePartner")}
              </h2>
            </div>
            <Button to="/services" variant="outline" arrow className="shrink-0">
              {t("home.allServices")}
            </Button>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link
                  to={`/services/${s.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-soft"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={ux(s.image, 640, 360)}
                      alt={s.title}
                      width={640}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                    <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/95 text-royal-600 shadow-soft">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-navy-900">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* BEFORE / AFTER */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <BeforeAfter beforeId={IMG.reception} afterId={IMG.reception} />
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>{t("home.seeTheDifference")}</Eyebrow>
              <h2 className="h-section mt-4 text-navy-900">{t("home.visibleDifference")}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {t("home.dragSlider")}
              </p>
              <ul className="mt-7 space-y-3">
                {[t("home.detailObsessed"), t("home.photoVerified"), t("home.consistent")].map((text) => (
                  <li key={text} className="flex items-start gap-3 text-navy-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint-400" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/gallery" variant="outline" arrow>
                  {t("home.viewWork")}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* WHY US */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
        <div className="noise" />
        <div className="bg-grid absolute inset-0 opacity-[0.06]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow light>{t("home.whyBJUFILA")}</Eyebrow>
            <h2 className="h-section mt-4 text-white">
              {t("home.withoutRunaround")}
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 80}>
                <div className="glass h-full rounded-3xl p-7 transition-colors hover:bg-white/[0.12]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-600/25 text-royal-100 ring-1 ring-white/10">
                    <Icon name={d.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("home.howItWorks")}</Eyebrow>
            <h2 className="h-section mt-4 text-navy-900">{t("home.fourSteps")}</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <div className="relative h-full rounded-3xl border border-navy-900/8 bg-white p-7 shadow-soft">
                  <span className="font-display text-5xl font-bold text-mist">{p.step}</span>
                  <h3 className="mt-3 font-display text-lg font-bold text-navy-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialWall />

      {/* BLOG PREVIEW */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <Eyebrow>{t("home.fromBlog")}</Eyebrow>
              <h2 className="h-section mt-4 text-navy-900">{t("home.insights")}</h2>
            </div>
            <Button to="/blog" variant="outline" arrow className="shrink-0">
              {t("home.allArticles")}
            </Button>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {POSTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-soft"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={ux(p.cover, 640, 384)}
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
