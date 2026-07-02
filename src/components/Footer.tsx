import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { SITE, NAV } from "../lib/site";
import { SERVICES } from "../data/content";
import { Container } from "./ui";
import { Newsletter } from "./Newsletter";
import { useT, useLang } from "../lib/useTranslation";

export function Footer() {
  const { t } = useT();
  const { lang } = useLang();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="noise" />
      <div className="bg-mesh absolute inset-x-0 top-0 h-px opacity-60" />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white">
                <img src="/logo-mark.png" alt="BJUFILA logo" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <span className="font-display text-xl font-bold">BJUFILA</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {lang === "es"
                ? "Servicios de limpieza comercial y lavaplatos confiables por oficinas, restaurantes e instalaciones médicas en todo el área metropolitana de Orlando."
                : "Commercial cleaning & dishwashing services trusted by offices, restaurants, and medical facilities across the Orlando metro."}
            </p>
            <div className="mt-5 flex items-center gap-1.5 text-flag-red">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-2 text-sm text-white/60">4.9 · 127 reviews</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{t("footer.company")}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-white/75 transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/quote" className="text-white/75 transition-colors hover:text-white">
                  {lang === "es" ? "Solicitar una Cotización" : "Request a Quote"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{t("footer.services")}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{t("footer.getInTouch")}</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-3 text-white/80 hover:text-white">
                  <Phone className="h-4 w-4 text-royal-400" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="flex items-center gap-3 text-white/80 hover:text-white">
                  <Mail className="h-4 w-4 text-royal-400" /> {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <MapPin className="h-4 w-4 text-royal-400" /> Orlando, Florida
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Clock className="h-4 w-4 text-royal-400" /> {SITE.hours}
              </li>
            </ul>
            <div className="mt-6">
              <Newsletter />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. {t("footer.allRightsReserved")}
          </p>
          <p>{t("footer.licensed")}</p>
        </div>
      </Container>
    </footer>
  );
}
