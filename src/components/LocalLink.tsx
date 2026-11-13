import { Link, type LinkProps } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { langPath } from "@/lib/langPath";

/**
 * Drop-in replacement for react-router's <Link> that keeps the current
 * language prefix (/en/...) on internal links.
 */
const LocalLink = ({ to, ...rest }: LinkProps) => {
  const { language } = useLanguage();
  const target = typeof to === "string" ? langPath(to, language) : to;
  return <Link to={target} {...rest} />;
};

export default LocalLink;
