
import React from 'react';
import Logo from '@/components/Logo';
import ScreenTimeCard from '@/components/ScreenTimeCard';
import WeeklyScreenTimeChart from '@/components/WeeklyScreenTimeChart';
import BrightnessControl from '@/components/BrightnessControl';
import BreakControls from '@/components/BreakControls';
import EyeHealthTips from '@/components/EyeHealthTips';
import { Button } from '@/components/ui/button';
import { useEyeCare } from '@/contexts/EyeCareContext';

const Index = () => {
  const { isTracking, startTracking, stopTracking, resetDailyStats } = useEyeCare();

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center space-x-2">
              <Button 
                variant={isTracking ? "destructive" : "default"}
                onClick={isTracking ? stopTracking : startTracking}
              >
                {isTracking ? "Pause Tracking" : "Resume Tracking"}
              </Button>
              <Button 
                variant="outline" 
                onClick={resetDailyStats}
              >
                Reset Today
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Personal Eye Wellness Assistant</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your screen time for healthier vision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ScreenTimeCard />
          <BrightnessControl />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <WeeklyScreenTimeChart />
          <BreakControls />
        </div>

        <div className="mb-6">
          <EyeHealthTips />
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>VisionCare - Your Personal Eye Wellness Assistant</p>
            <p className="mt-1">"See Clearly. Live Comfortably."</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
