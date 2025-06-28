
import React from 'react';
import Logo from '@/components/Logo';
import ScreenTimeCard from '@/components/ScreenTimeCard';
import WeeklyScreenTimeChart from '@/components/WeeklyScreenTimeChart';
import BrightnessControl from '@/components/BrightnessControl';
import BreakControls from '@/components/BreakControls';
import EyeHealthTips from '@/components/EyeHealthTips';
import EyeHealthStats from '@/components/EyeHealthStats';
import EyeExercises from '@/components/EyeExercises';
import DailyHealthLog from '@/components/DailyHealthLog';
import EyeCheckupScheduler from '@/components/EyeCheckupScheduler';
import { Button } from '@/components/ui/button';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { Timer, Bell } from 'lucide-react';

const Index = () => {
  const { isTracking, startTracking, stopTracking, resetDailyStats, requestNotificationPermission } = useEyeCare();

  const handleEnableNotifications = () => {
    requestNotificationPermission();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                onClick={handleEnableNotifications}
                size="sm"
              >
                <Bell className="mr-2 h-4 w-4" />
                Enable Alerts
              </Button>
              <Button 
                variant={isTracking ? "destructive" : "default"}
                onClick={isTracking ? stopTracking : startTracking}
                className="transition-all duration-300 hover:scale-105"
              >
                <Timer className="mr-2 h-4 w-4" />
                {isTracking ? "Pause Tracking" : "Resume Tracking"}
              </Button>
              <Button 
                variant="outline" 
                onClick={resetDailyStats}
                className="transition-all duration-300 hover:scale-105"
              >
                Reset Today
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4 animate-fade-in">
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Your Personal Eye Wellness Assistant
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Monitor and manage your screen time for healthier vision with comprehensive eye care tools.
          </p>
        </div>

        {/* Core monitoring section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <ScreenTimeCard />
          </div>
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <BrightnessControl />
          </div>
        </div>

        {/* Analytics section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <WeeklyScreenTimeChart />
          </div>
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <EyeHealthStats />
          </div>
        </div>

        {/* Active care section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <BreakControls />
          </div>
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <EyeExercises />
          </div>
        </div>

        {/* Health tracking section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <DailyHealthLog />
          </div>
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <EyeCheckupScheduler />
          </div>
        </div>

        {/* Tips section */}
        <div className="grid grid-cols-1 gap-6">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <EyeHealthTips />
          </div>
        </div>
      </main>

      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto py-6 px-4">
          <div className="text-center space-y-2">
            <p className="text-primary font-semibold text-lg">VisionCare - Your Comprehensive Eye Wellness Assistant</p>
            <p className="text-sm text-muted-foreground">"See Clearly. Live Comfortably. Track Progress."</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
