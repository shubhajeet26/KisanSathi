import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Chatbot from "@/pages/Chatbot";
import FarmingCalendar from "@/pages/FarmingCalendar";
import DiseaseDetection from "@/pages/DiseaseDetection";
import MapPage from "@/pages/MapPage";
import ProfitEstimator from "@/pages/ProfitEstimator";
import Reminders from "@/pages/Reminders";
import SoilHealth from "@/pages/SoilHealth";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/calendar" element={<FarmingCalendar />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/profit" element={<ProfitEstimator />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/soil" element={<SoilHealth />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
