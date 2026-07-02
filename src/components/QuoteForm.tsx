import { useState } from "react";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { submitQuote, type QuotePayload } from "../lib/supabase";
import { SITE } from "../lib/site";
import { SERVICES } from "../data/content";
import { Button } from "./ui";
import { useT, useLang } from "../lib/useTranslation";

const FACILITIES = ["Office", "Restaurant / Kitchen", "Medical / Clinic", "Retail", "Warehouse", "Other"];
const FACILITIES_ES = ["Oficina", "Restaurante / Cocina", "Médico / Clínica", "Retail", "Almacén", "Otro"];
const FREQ = ["Daily", "3–5× / week", "Weekly", "Bi-weekly", "Monthly", "One-time / Deep clean"];
const FREQ_ES = ["Diario", "3–5× / semana", "Semanal", "Cada dos semanas", "Mensual", "Una vez / Limpieza profunda"];

const field = "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-[15px] text-navy-900 placeholder:text-muted/70 transition-colors focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-500/12";
const label = "mb-1.5 block text-sm font-semibold text-navy-800";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const { t } = useT();
  const { lang } = useLang();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState<QuotePayload>({ name: "", email: "" });

  const FAC = lang === "en" ? FACILITIES : FACILITIES_ES;
  const FRQ = lang === "en" ? FREQ : FREQ_ES;

  function set<K extends keyof QuotePayload>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      await submitQuote(form);
      setState("done");
      window.scrollTo({ top: Math.max(0, window.scrollY - 160), behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-mint-400/30 bg-white p-8 text-center shadow-soft sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint-400/15 text-mint-400">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-navy-900">{t("quote.success")}</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {t("quote.confirmation", { name: form.name ? `, ${form.name.split(" ")[0]}` : "", email: form.email })}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={SITE.phoneHref} variant="outline">
            <Phone className="h-4 w-4" /> {t("quote.preferCall", { phone: SITE.phone })}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-navy-900/8 bg-white p-6 shadow-soft sm:p-8">
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className={label} htmlFor="q-name">{t("quote.fullName")} *</label>
          <input id="q-name" required className={field} value={form.name}
            onChange={(e) => set("name", e.target.value)} placeholder="Jordan Rivera" />
        </div>
        <div>
          <label className={label} htmlFor="q-company">{t("quote.company")}</label>
          <input id="q-company" className={field} value={form.company ?? ""}
            onChange={(e) => set("company", e.target.value)} placeholder="Acme Offices LLC" />
        </div>
        <div>
          <label className={label} htmlFor="q-email">{t("quote.email")} *</label>
          <input id="q-email" type="email" required className={field} value={form.email}
            onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
        </div>
        <div>
          <label className={label} htmlFor="q-phone">{t("quote.phone")}</label>
          <input id="q-phone" type="tel" className={field} value={form.phone ?? ""}
            onChange={(e) => set("phone", e.target.value)} placeholder="(407) 000-0000" />
        </div>
        <div>
          <label className={label} htmlFor="q-service">{t("quote.serviceNeeded")}</label>
          <select id="q-service" className={field} value={form.service_type ?? ""}
            onChange={(e) => set("service_type", e.target.value)}>
            <option value="">{t("quote.selectService")}</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="q-facility">{t("quote.facilityType")}</label>
          <select id="q-facility" className={field} value={form.facility_type ?? ""}
            onChange={(e) => set("facility_type", e.target.value)}>
            <option value="">{t("quote.selectFacility")}</option>
            {FAC.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="q-sqft">{t("quote.sqft")}</label>
          <input id="q-sqft" className={field} value={form.square_footage ?? ""}
            onChange={(e) => set("square_footage", e.target.value)} placeholder="e.g. 5,000 sq ft" />
        </div>
        <div>
          <label className={label} htmlFor="q-freq">{t("quote.frequency")}</label>
          <select id="q-freq" className={field} value={form.frequency ?? ""}
            onChange={(e) => set("frequency", e.target.value)}>
            <option value="">{t("quote.selectFreq")}</option>
            {FRQ.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={label} htmlFor="q-msg">{t("quote.anything")}</label>
        <textarea id="q-msg" rows={3} className={field} value={form.message ?? ""}
          onChange={(e) => set("message", e.target.value)}
          placeholder={lang === "en" ? "Tell us about your space, timing, or special requirements…" : "Cuéntanos sobre tu espacio, tiempo o requisitos especiales…"} />
      </div>

      {state === "error" && (
        <p className="mt-4 rounded-xl bg-flag-red/10 px-4 py-3 text-sm text-flag-red-dark">
          {lang === "en" ? "Something went wrong. Please try again or call us at" : "Algo salió mal. Por favor intenta de nuevo o llámanos al"} {SITE.phone}.
        </p>
      )}

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted">
          {t("quote.noObligation")}
        </p>
        <Button type="submit" size="lg" disabled={state === "loading"} arrow={state !== "loading"} className="w-full sm:w-auto">
          {state === "loading" ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> {lang === "en" ? "Sending…" : "Enviando…"}</>
          ) : (
            t("quote.getMyQuote")
          )}
        </Button>
      </div>
    </form>
  );
}
