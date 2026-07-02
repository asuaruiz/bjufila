import { useState } from "react";
import { Star, Plus, Phone, Sparkles } from "lucide-react";
import { Container, Button, Eyebrow } from "./ui";
import { Reveal } from "../lib/reveal";
import { STATS, TESTIMONIALS, FAQS } from "../data/content";
import { SITE } from "../lib/site";
import { useT, useLang } from "../lib/useTranslation";

export function StatsBand() {
  return (
    <section className="relative -mt-px bg-navy-900 py-10 text-white">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <div className="font-display text-4xl font-bold text-white sm:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-white/55">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialWall() {
  const { lang } = useLang();

  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{lang === "es" ? "Amor de clientes" : "Client love"}</Eyebrow>
          <h2 className="h-section mt-4 text-navy-900">
            {lang === "es" ? "Negocios de Orlando que nunca piensan en la limpieza" : "Orlando businesses that never think about cleaning anymore"}
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 100}>
              <figure className="card-hover flex h-full flex-col rounded-3xl border border-navy-900/8 bg-white p-7 shadow-soft">
                <div className="flex gap-1 text-flag-red">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-navy-800">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-mist pt-5">
                  <div className="font-semibold text-navy-900">{t.name}</div>
                  <div className="text-sm text-muted">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FAQAccordion() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="h-section mt-4 text-navy-900">{lang === "es" ? "Preguntas, respondidas" : "Questions, answered"}</h2>
            <p className="mt-4 max-w-sm text-muted">
              {lang === "es" ? "¿Todavía tienes curiosidad? Llámanos al " : "Still curious? Call us at "}{" "}
              <a href={SITE.phoneHref} className="font-semibold text-royal-600 link-underline">
                {SITE.phone}
              </a>{" "}
              {lang === "es" ? "— una persona real atiende." : "— a real person picks up."}
            </p>
          </div>
          <div className="divide-y divide-mist">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="py-2">
                  <button
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold text-navy-900">{f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy-900/12 transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-royal-600 text-white" : "text-navy-900"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-12 text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CTASection() {
  const { t } = useT();
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden bg-mesh py-20 sm:py-28">
      <div className="noise" />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #4f83f1, transparent 70%)" }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-royal-100 ring-1 ring-white/15">
            <Sparkles className="h-3.5 w-3.5" /> {lang === "es" ? "Caminata gratuita · Sin obligación" : "Free walkthrough · No obligation"}
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            {lang === "es" ? "¿Listo para un espacio " : "Ready for a space that's "}<span className="text-gradient">{lang === "es" ? "impecable" : "spotless"}</span>{lang === "es" ? ", cada día?" : ", every single day?"}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            {t("home.transparent")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/quote" variant="white" size="lg" arrow>
              {t("home.getQuote")}
            </Button>
            <Button href={SITE.phoneHref} variant="ghost" size="lg" className="ring-1 ring-white/20">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
