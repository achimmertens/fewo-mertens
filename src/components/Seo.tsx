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

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content={language === "de" ? "de_DE" : "en_US"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};

export default Seo;
