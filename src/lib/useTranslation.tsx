import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, type Lang } from "./i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("lang") as Lang) || "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export function useT() {
  const { lang } = useLang();
  const getNestedValue = (obj: any, path: string): string => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj) || path;
  };

  return {
    t: (path: string, vars?: Record<string, string>) => {
      let text = getNestedValue(translations[lang], path);
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{{${k}}}`, v);
        });
      }
      return text;
    },
  };
}
