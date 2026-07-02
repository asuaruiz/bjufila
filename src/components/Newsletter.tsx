import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { subscribe } from "../lib/supabase";
import { useT, useLang } from "../lib/useTranslation";

export function Newsletter() {
  const { t } = useT();
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      await subscribe(email);
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-mint-400/15 px-4 py-3 text-sm text-mint-400">
        <Check className="h-4 w-4" /> {t("footer.youreIn")}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <p className="text-sm text-white/60">{t("footer.joinMailing")}</p>
      <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-royal-400">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="grid w-11 shrink-0 place-items-center bg-royal-600 text-white transition-colors hover:bg-royal-500 disabled:opacity-60"
          aria-label="Subscribe"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {state === "error" && <p className="text-xs text-flag-red">{lang === "es" ? "Algo salió mal. Intenta de nuevo." : "Something went wrong. Try again."}</p>}
    </form>
  );
}
