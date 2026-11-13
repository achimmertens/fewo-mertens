import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";
import { langFromPath, langPath } from "@/lib/langPath";

const Index = lazy(() => import("./pages/Index"));
const ApartmentPage = lazy(() => import("./pages/ApartmentPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const InfoPage = lazy(() => import("./pages/InfoPage"));
const Insidertipps = lazy(() => import("./pages/Insidertipps"));
const ActivitiesPage = lazy(() => import("./pages/ActivitiesPage"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ArrivalPage = lazy(() => import("./pages/ArrivalPage"));
const ImpressumPage = lazy(() => import("./pages/ImpressumPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Handover = lazy(() => import("./pages/Handover"));

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      {/* German (default, no prefix) */}
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

      {/* English (/en prefix) */}
      <Route path="/en" element={<Index />} />
      <Route path="/en/apartment" element={<ApartmentPage />} />
      <Route path="/en/location" element={<LocationPage />} />
      <Route path="/en/activities" element={<ActivitiesPage />} />
      <Route path="/en/info" element={<InfoPage />} />
      <Route path="/en/insidertipps" element={<Insidertipps />} />
      <Route path="/en/handover" element={<Handover />} />
      <Route path="/en/calculator" element={<CalculatorPage />} />
      <Route path="/en/contact" element={<ContactPage />} />
      <Route path="/en/arrival" element={<ArrivalPage />} />
      <Route path="/en/impressum" element={<ImpressumPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const AppShell = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const language = langFromPath(pathname);
  const setLanguage = (lang: Language) => navigate(langPath(pathname, lang));

  return (
    <LanguageProvider language={language} setLanguage={setLanguage}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </LanguageProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
