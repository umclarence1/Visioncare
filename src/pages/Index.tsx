import { useState, useEffect } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Dashboard from "@/components/Dashboard";
import ScreenTimeCard from "@/components/ScreenTimeCard";
import EyeExercises from "@/components/EyeExercises";
import BreakControls from "@/components/BreakControls";
import EyeHealthStats from "@/components/EyeHealthStats";
import DailyHealthLog from "@/components/DailyHealthLog";
import EyeCheckupScheduler from "@/components/EyeCheckupScheduler";
import EyeHealthTips from "@/components/EyeHealthTips";
import WeeklyScreenTimeChart from "@/components/WeeklyScreenTimeChart";
import VoiceAssistant from "@/components/VoiceAssistant";
import AIInsights from "@/components/AIInsights";
import BrightnessControl from "@/components/BrightnessControl";
import GamificationPanel from "@/components/GamificationPanel";
import OnboardingWizard from "@/components/OnboardingWizard";
import { useEyeCare } from "@/contexts/EyeCareContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Eye, 
  Monitor, 
  Activity, 
  TrendingUp, 
  Heart, 
  Calendar, 
  Lightbulb,
  Settings,
  Award,
  Mic,
  Brain,
  Sun
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { hasCompletedOnboarding } = useEyeCare();

  useEffect(() => {
    // Check if onboarding is completed on mount
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [hasCompletedOnboarding]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  if (!hasCompletedOnboarding) {
    return <OnboardingWizard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavigationHeader onToggleSidebar={() => {}} />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-transparent p-0 w-full justify-center">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              <Eye className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              <TrendingUp className="mr-2 h-4 w-4" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              <Heart className="mr-2 h-4 w-4" />
              Health
            </TabsTrigger>
            <TabsTrigger value="exercises" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              <Activity className="mr-2 h-4 w-4" />
              Exercises
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="outline-none">
            <Dashboard />
          </TabsContent>
          <TabsContent value="stats" className="outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScreenTimeCard />
              <WeeklyScreenTimeChart />
            </div>
          </TabsContent>
          <TabsContent value="health" className="outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyHealthLog />
              <EyeCheckupScheduler />
              <EyeHealthStats />
            </div>
          </TabsContent>
          <TabsContent value="exercises" className="outline-none">
            <EyeExercises />
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your account settings and set preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <BreakControls />
            <EyeHealthTips />
            <BrightnessControl />
            <VoiceAssistant />
            <AIInsights />
            <GamificationPanel />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
