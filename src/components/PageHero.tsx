import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container, Eyebrow } from "./ui";
import { Reveal } from "../lib/reveal";
import { useLang } from "../lib/useTranslation";

type Crumb = { name: string; to?: string };

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden bg-mesh pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="noise" />
      <div className="bg-grid absolute inset-0 opacity-[0.12]" />
      <Container className="relative">
        {crumbs && (
          <Reveal>
            <nav className="mb-6 flex items-center gap-1.5 text-sm text-white/50">
              <Link to="/" className="hover:text-white">{lang === "es" ? "Inicio" : "Home"}</Link>
              {crumbs.map((c) => (
                <span key={c.name} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-white">{c.name}</Link>
                  ) : (
                    <span className="text-white/80">{c.name}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={160}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{subtitle}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
