
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EyeCareProvider } from "@/contexts/EyeCareContext";
import MainLayout from "@/components/MainLayout";
import DashboardPage from "@/pages/DashboardPage";
import MonitoringPage from "@/pages/MonitoringPage";
import ExercisesPage from "@/pages/ExercisesPage";
import HealthPage from "@/pages/HealthPage";
import EducationPage from "@/pages/EducationPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EyeCareProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </EyeCareProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
