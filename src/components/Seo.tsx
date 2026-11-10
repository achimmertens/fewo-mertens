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
}

const Seo = ({ titleDe, titleEn, descriptionDe, descriptionEn, noindex }: SeoProps) => {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const title = language === "de" ? titleDe : titleEn;
  const description = language === "de" ? descriptionDe : descriptionEn;
  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;

  const keywords =
    language === "de"
      ? "Ferienwohnung Einruhr, Ferienwohnung Nationalpark Eifel, Ferienwohnung Rursee, Ferienwohnung Obersee, Ferienwohnung Eifel mit Hund, Urlaub Nationalpark Eifel, Wandern, Radfahren, Wassersport"
      : "holiday apartment Einruhr, holiday apartment Eifel National Park, holiday apartment Rursee, dog friendly holiday apartment Eifel, hiking, cycling, water sports";

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
    </Helmet>
  );
};

export default Seo;
