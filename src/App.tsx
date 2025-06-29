
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EyeCareProvider } from "@/contexts/EyeCareContext";
import MainLayout from "@/components/MainLayout";
import OnboardingWizard from "@/components/OnboardingWizard";
import Dashboard from "@/pages/Dashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EyeCareProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<OnboardingWizard onComplete={() => {}} />} />
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ai-insights" element={<Navigate to="/" replace />} />
              <Route path="monitoring" element={<Navigate to="/" replace />} />
              <Route path="exercises" element={<Navigate to="/" replace />} />
              <Route path="health" element={<Navigate to="/" replace />} />
              <Route path="appointments" element={<Navigate to="/" replace />} />
              <Route path="voice" element={<Navigate to="/" replace />} />
              <Route path="community" element={<Navigate to="/" replace />} />
              <Route path="achievements" element={<Navigate to="/" replace />} />
              <Route path="education" element={<Navigate to="/" replace />} />
              <Route path="help" element={<Navigate to="/" replace />} />
              <Route path="settings" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EyeCareProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
