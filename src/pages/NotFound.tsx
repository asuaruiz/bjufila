import { Container, Button } from "../components/ui";
import { Seo } from "../lib/seo";
import { useT, useLang } from "../lib/useTranslation";

export default function NotFound() {
  const { t } = useT();
  const { lang } = useLang();

  return (
    <>
      <Seo
        title={lang === "es" ? "Página no encontrada" : "Page not found"}
        description={lang === "es" ? "La página que buscas no existe." : "The page you're looking for doesn't exist."}
        path="/404"
        noindex
      />
      <section className="relative flex min-h-screen items-center overflow-hidden bg-mesh text-white">
        <div className="noise" />
        <Container className="relative text-center">
          <div className="font-display text-[7rem] font-bold leading-none text-white/90 sm:text-[10rem]">404</div>
          <h1 className="mt-2 font-display text-3xl font-bold">{t("notFound.spotlessBecauseEmpty")}</h1>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            {t("notFound.pageDoesNotExist")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/" variant="white" size="lg" arrow>{t("notFound.backHome")}</Button>
            <Button to="/quote" variant="ghost" size="lg" className="ring-1 ring-white/20">{t("home.getQuote")}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
