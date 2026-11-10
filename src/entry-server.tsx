import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";

// Eagerly import every page so that server rendering does not need to await
// React.lazy() chunks (renderToString does not wait for lazy boundaries).
import Index from "./pages/Index";
import ApartmentPage from "./pages/ApartmentPage";
import LocationPage from "./pages/LocationPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import InfoPage from "./pages/InfoPage";
import Insidertipps from "./pages/Insidertipps";
import Handover from "./pages/Handover";
import CalculatorPage from "./pages/CalculatorPage";
import ContactPage from "./pages/ContactPage";
import ArrivalPage from "./pages/ArrivalPage";
import ImpressumPage from "./pages/ImpressumPage";
import NotFound from "./pages/NotFound";

export interface RenderResult {
  html: string;
  head: string;
  htmlAttributes: string;
  bodyAttributes: string;
}

/**
 * Renders a single route to a static HTML string (SSG/prerender).
 * Used at build time by scripts/prerender.mjs.
 */
export function render(url: string): RenderResult {
  const queryClient = new QueryClient();
  const helmetContext: Record<string, any> = {};

  const app = (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <StaticRouter location={url}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/apartment" element={<ApartmentPage />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="/insidertipps" element={<Insidertipps />} />
                <Route path="/handover" element={<Handover />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/arrival" element={<ArrivalPage />} />
                <Route path="/impressum" element={<ImpressumPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </StaticRouter>
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const html = renderToString(app);
  const helmet = helmetContext.helmet;

  const head = [
    helmet?.title?.toString() ?? "",
    helmet?.meta?.toString() ?? "",
    helmet?.link?.toString() ?? "",
    helmet?.script?.toString() ?? "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    html,
    head,
    htmlAttributes: helmet?.htmlAttributes?.toString() ?? "",
    bodyAttributes: helmet?.bodyAttributes?.toString() ?? "",
  };
}
