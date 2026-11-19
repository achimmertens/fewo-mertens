import { Link, type LinkProps } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { langPath } from "@/lib/langPath";

/**
 * Drop-in replacement for react-router's <Link> that keeps the current
 * language prefix (/en/...) on internal links.
 *
 * External / non-path targets (http(s)://, //, mailto:, tel:, #anchor) are
 * passed through unchanged — otherwise the /en prefix would be prepended and
 * produce broken URLs like "/enhttps://..." (404).
 */
const isExternalOrNonPath = (to: string) =>
  /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(to);

const LocalLink = ({ to, ...rest }: LinkProps) => {
  const { language } = useLanguage();
  const target =
    typeof to === "string" && !isExternalOrNonPath(to)
      ? langPath(to, language)
      : to;
  return <Link to={target} {...rest} />;
};

export default LocalLink;
