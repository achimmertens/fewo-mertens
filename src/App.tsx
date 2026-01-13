
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Index = lazy(() => import("./pages/Index"));
const ApartmentPage = lazy(() => import("./pages/ApartmentPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const InfoPage = lazy(() => import("./pages/InfoPage"));
const Insidertipps = lazy(() => import("./pages/Insidertipps"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ArrivalPage = lazy(() => import("./pages/ArrivalPage"));
const ImpressumPage = lazy(() => import("./pages/ImpressumPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Handover = lazy(() => import("./pages/Handover"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/apartment" element={<ApartmentPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/insidertipps" element={<Insidertipps />} />
            <Route path="/handover" element={<Handover />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/arrival" element={<ArrivalPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
