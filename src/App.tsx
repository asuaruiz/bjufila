import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LangProvider } from "./lib/useTranslation";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { lazyPreloadable } from "./lib/lazyPreload";

const Home = lazyPreloadable(() => import("./pages/Home"));
const Services = lazyPreloadable(() => import("./pages/Services"));
const ServiceDetail = lazyPreloadable(() => import("./pages/ServiceDetail"));
const Gallery = lazyPreloadable(() => import("./pages/Gallery"));
const Blog = lazyPreloadable(() => import("./pages/Blog"));
const BlogPost = lazyPreloadable(() => import("./pages/BlogPost"));
const About = lazyPreloadable(() => import("./pages/About"));
const Contact = lazyPreloadable(() => import("./pages/Contact"));
const Quote = lazyPreloadable(() => import("./pages/Quote"));
const NotFound = lazyPreloadable(() => import("./pages/NotFound"));

// Shared by main.tsx (client) and entry-server.tsx (SSR) so the page
// component matching the *current* URL can be preloaded before the first
// render/hydrate — see lib/lazyPreload.tsx for why that matters.
export function pageForPath(pathname: string) {
  if (pathname === "/") return Home;
  if (pathname === "/services") return Services;
  if (pathname.startsWith("/services/")) return ServiceDetail;
  if (pathname === "/gallery") return Gallery;
  if (pathname === "/blog") return Blog;
  if (pathname.startsWith("/blog/")) return BlogPost;
  if (pathname === "/about") return About;
  if (pathname === "/contact") return Contact;
  if (pathname === "/quote") return Quote;
  return NotFound;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  );
}
