import { useParams, Link, Navigate } from "react-router-dom";
import { CalendarDays, ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Button } from "../components/ui";
import { Reveal } from "../lib/reveal";
import { PageHero } from "../components/PageHero";
import { CTASection } from "../components/sections";
import { Seo, breadcrumbSchema } from "../lib/seo";
import { SITE } from "../lib/site";
import { ux, absoluteImg } from "../lib/img";
import { POSTS_EN, POSTS_ES } from "../data/content";
import { useT, useLang } from "../lib/useTranslation";

function fmt(d: string, lang: string) {
  return new Date(d).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPost() {
  const { t } = useT();
  const { lang } = useLang();
  const { slug } = useParams();
  const POSTS = lang === "es" ? POSTS_ES : POSTS_EN;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;
  const more = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteImg(post.cover),
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.legalName },
    publisher: { "@type": "Organization", name: SITE.legalName, logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` } },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        image={absoluteImg(post.cover)}
        schema={[
          articleSchema,
          breadcrumbSchema([
            { name: lang === "es" ? "Inicio" : "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ name: "Blog", to: "/blog" }, { name: post.category }]}
      />

      <article className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {fmt(post.date, lang)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <Reveal>
            <div className="mt-6 overflow-hidden rounded-3xl shadow-soft">
              <img src={ux(post.cover, 1000, 560)} alt={post.title} width={1000} height={560} className="w-full object-cover" />
            </div>
          </Reveal>

          <div className="prose-custom mt-10">
            {post.body.map((block, i) => {
              if (block.h) return <h2 key={i} className="mt-10 font-display text-2xl font-bold text-navy-900">{block.h}</h2>;
              if (block.list)
                return (
                  <ul key={i} className="mt-5 space-y-2.5">
                    {block.list.map((li, j) => (
                      <li key={j} className="flex gap-3 text-navy-800">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-500" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                );
              return <p key={i} className="mt-5 text-lg leading-relaxed text-navy-800/90">{block.p}</p>;
            })}
          </div>

          <div className="mt-12 rounded-3xl bg-paper p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-navy-900">{lang === "es" ? "¿Quieres un espacio impecable sin complicaciones?" : "Want a spotless space without the hassle?"}</h3>
            <p className="mx-auto mt-2 max-w-md text-muted">
              {lang === "es" ? "Obtén una caminata gratuita y una cotización plana transparente para tu instalación de Orlando." : "Get a free walkthrough and a transparent flat quote for your Orlando facility."}
            </p>
            <div className="mt-6 flex justify-center">
              <Button to="/quote" size="lg" arrow>{t("home.getQuote")}</Button>
            </div>
          </div>

          <div className="mt-10">
            <Link to="/blog" className="inline-flex items-center gap-2 font-semibold text-royal-600">
              <ArrowLeft className="h-4 w-4" /> {lang === "es" ? "Volver a todos los artículos" : "Back to all articles"}
            </Link>
          </div>
        </Container>
      </article>

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <h2 className="h-section text-navy-900">{lang === "es" ? "Sigue leyendo" : "Keep reading"}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {more.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="card-hover group grid overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-soft sm:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="h-40 overflow-hidden sm:h-full">
                  <img src={ux(p.cover, 480, 360)} alt={p.title} width={480} height={360} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-royal-600">{p.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy-900">{p.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600">
                    {lang === "en" ? "Read" : "Leer"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
