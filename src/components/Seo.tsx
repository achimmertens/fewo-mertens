import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SITE_URL = "https://fewo.amertens.me";
const OG_IMAGE = `${SITE_URL}/og-image.webp`;

interface SeoProps {
  /** German title (without brand suffix) */
  titleDe: string;
  /** English title (without brand suffix) */
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  /** Set true for pages that should not be indexed */
  noindex?: boolean;
  /** Additional JSON-LD structured-data objects to embed on this page. */
  jsonLd?: Record<string, unknown>[];
}

/** Short, human-readable breadcrumb labels per route (per language). */
const BREADCRUMB_LABELS: Record<string, { de: string; en: string }> = {
  "/": { de: "Startseite", en: "Home" },
  "/apartment": { de: "Die Wohnung", en: "The Apartment" },
  "/location": { de: "Umgebung", en: "Surroundings" },
  "/activities": { de: "Aktivitäten", en: "Activities" },
  "/info": { de: "Preise & Infos", en: "Prices & Info" },
  "/calculator": { de: "Preisrechner", en: "Price Calculator" },
  "/contact": { de: "Kontakt", en: "Contact" },
  "/arrival": { de: "Anreise", en: "How to Get Here" },
  "/impressum": { de: "Impressum", en: "Legal Notice" },
  "/insidertipps": { de: "Insidertipps", en: "Insider Tips" },
};

const Seo = ({ titleDe, titleEn, descriptionDe, descriptionEn, noindex, jsonLd }: SeoProps) => {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const title = language === "de" ? titleDe : titleEn;
  const description = language === "de" ? descriptionDe : descriptionEn;
  // Normalised path (no trailing slash, except the root "/").
  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const url = `${SITE_URL}${path}`;

  const keywords =
    language === "de"
      ? "Ferienwohnung Einruhr, Ferienwohnung Nationalpark Eifel, Ferienwohnung Rursee, Ferienwohnung Obersee, Ferienwohnung Eifel mit Hund, Urlaub Nationalpark Eifel, Wandern, Radfahren, Wassersport"
      : "holiday apartment Einruhr, holiday apartment Eifel National Park, holiday apartment Rursee, dog friendly holiday apartment Eifel, hiking, cycling, water sports";

  // BreadcrumbList derived from the current route (site is one level deep).
  const homeLabel = BREADCRUMB_LABELS["/"][language === "de" ? "de" : "en"];
  const crumbItems: Record<string, unknown>[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeLabel,
      item: `${SITE_URL}/`,
    },
  ];
  if (path !== "/") {
    const label = BREADCRUMB_LABELS[path];
    crumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: label ? label[language === "de" ? "de" : "en"] : title,
      item: url,
    });
  }
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbItems,
  };

  const jsonLdBlocks = [breadcrumbLd, ...(jsonLd ?? [])];

  // GA4: manual page_view per route (config uses send_page_view: false).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag !== "function") return;
    w.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: title,
      page_language: language,
    });
  }, [path, title, language]);

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ferienwohnung Waldoase Mertens" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content={language === "de" ? "de_DE" : "en_US"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
