
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ApartmentPage from "./pages/ApartmentPage";
import LocationPage from "./pages/LocationPage";
import InfoPage from "./pages/InfoPage";
import CalculatorPage from "./pages/CalculatorPage";
import ContactPage from "./pages/ContactPage";
import ArrivalPage from "./pages/ArrivalPage";
import ImpressumPage from "./pages/ImpressumPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apartment" element={<ApartmentPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/arrival" element={<ArrivalPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
