import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import { NAV, SITE } from "../lib/site";
import { Button } from "./ui";
import { useLang, useT } from "../lib/useTranslation";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const { lang, setLang } = useLang();
  const { t } = useT();

  const getNavLabel = (label: string) => {
    const map: Record<string, Record<string, string>> = {
      en: { Services: "Services", Gallery: "Gallery", Blog: "Blog", About: "About", Contact: "Contact" },
      es: { Services: "Servicios", Gallery: "Galería", Blog: "Blog", About: "Acerca de", Contact: "Contacto" },
    };
    return map[lang]?.[label] || label;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => void (document.body.style.overflow = "");
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-3 py-2.5 pl-4 transition-all duration-500 sm:px-4 ${
          scrolled
            ? "bg-white/90 shadow-[0_10px_40px_-12px_rgba(11,31,58,0.25)] backdrop-blur-xl"
            : "bg-white/75 shadow-[0_6px_24px_-14px_rgba(11,31,58,0.3)] backdrop-blur-md"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label="BJUFILA home">
          <img src="/logo-mark.png" alt="BJUFILA logo" width={40} height={40} className="h-9 w-9 object-contain" />
          <span className="font-display text-lg font-bold leading-none tracking-tight text-navy-900">
            BJUFILA
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-royal-600" : "text-navy-800/80 hover:text-navy-900"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="hidden items-center gap-1 rounded-full bg-white/10 p-1 sm:flex">
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l ? "bg-white text-royal-600" : "text-white/60 hover:text-white"
                }`}
                aria-label={`Switch to ${l === "en" ? "English" : "Español"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:text-royal-600 xl:flex"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            {SITE.phone}
          </a>
          <Button to="/quote" className="hidden sm:inline-flex" arrow>
            {lang === "en" ? "Free Quote" : "Cotización Gratis"}
          </Button>
          <button
            className="grid h-10 w-10 place-items-center rounded-full text-navy-900 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-3 top-20 origin-top rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center gap-2 rounded-full bg-mist p-1 sm:hidden">
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                  lang === l ? "bg-royal-600 text-white" : "text-navy-800 hover:bg-white/50"
                }`}
                aria-label={`Switch to ${l === "en" ? "English" : "Español"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors ${
                    isActive ? "bg-royal-50 text-royal-600" : "text-navy-900 hover:bg-mist"
                  }`
                }
              >
                {getNavLabel(n.label)}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-mist pt-4">
            <Button to="/quote" size="lg" arrow className="w-full">
              {lang === "en" ? "Get a Free Quote" : "Obtén tu Cotización Gratis"}
            </Button>
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-navy-900/10 py-3 font-semibold text-navy-900"
            >
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
