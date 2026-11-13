export type Language = "de" | "en";

/** Language is determined by the URL: /en and /en/... are English, everything else German. */
export function langFromPath(pathname: string): Language {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

/** Remove a leading /en prefix, returning the language-independent path. */
export function stripLang(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

/** Prefix a language-independent path for the given language. */
export function langPath(path: string, lang: Language): string {
  const clean = stripLang(path);
  if (lang === "en") return clean === "/" ? "/en" : `/en${clean}`;
  return clean;
}
