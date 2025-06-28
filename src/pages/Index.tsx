
import React, { useState } from 'react';
import OnboardingWizard from '@/components/OnboardingWizard';
import NavigationHeader from '@/components/NavigationHeader';
import Dashboard from '@/components/Dashboard';
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
import { Card, CardContent } from '@/components/ui/card';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { 
  Home, 
  Activity, 
  BarChart3, 
  Settings, 
  BookOpen,
  Calendar,
  Heart
} from 'lucide-react';

const Index = () => {
  const { onboardingCompleted, setOnboardingComplete } = useEyeCare();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);

  if (!onboardingCompleted) {
    return <OnboardingWizard onComplete={setOnboardingComplete} />;
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'monitoring', label: 'Monitoring', icon: BarChart3 },
    { id: 'exercises', label: 'Exercises', icon: Activity },
    { id: 'health', label: 'Health Log', icon: Heart },
    { id: 'education', label: 'Learn', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      
      case 'monitoring':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Screen Time & Analytics</h1>
              <p className="text-muted-foreground">Monitor your digital wellness</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScreenTimeCard />
              <BrightnessControl />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeeklyScreenTimeChart />
              <EyeHealthStats />
            </div>
            
            <BreakControls />
          </div>
        );
      
      case 'exercises':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Eye Exercises</h1>
              <p className="text-muted-foreground">Strengthen and relax your eyes</p>
            </div>
            <EyeExercises />
          </div>
        );
      
      case 'health':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Health Tracking</h1>
              <p className="text-muted-foreground">Monitor symptoms and schedule checkups</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyHealthLog />
              <EyeCheckupScheduler />
            </div>
          </div>
        );
      
      case 'education':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Eye Health Education</h1>
              <p className="text-muted-foreground">Learn tips and best practices</p>
            </div>
            <EyeHealthTips />
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Settings & Preferences</h1>
              <p className="text-muted-foreground">Customize your VisionCare experience</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BrightnessControl />
              <BreakControls />
            </div>
          </div>
        );
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <NavigationHeader 
        onOpenSettings={() => setActiveTab('settings')}
      />

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <div className="hidden md:flex w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-col w-full p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start transition-all duration-200 ${
                      activeTab === item.id 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'hover:bg-accent'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 z-50">
          <div className="flex justify-around p-2">
            {navigationItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                    activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pb-20 md:pb-6 animate-fade-in">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 mt-12 hidden md:block">
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
