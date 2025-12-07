import { useState, useEffect } from 'react';
import { useEyeCare } from '@/contexts/EyeCareContext';
import OnboardingWizard from '@/components/OnboardingWizard';
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
import VoiceAssistant from '@/components/VoiceAssistant';
import AIInsights from '@/components/AIInsights';
import GamificationPanel from '@/components/GamificationPanel';
import {
  Home,
  Activity,
  BarChart3,
  Settings,
  BookOpen,
  Heart,
  Brain,
  Mic,
  Trophy,
  Eye,
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react';

const Index = () => {
  const { onboardingCompleted, setOnboardingComplete, screenTime } = useEyeCare();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  if (!onboardingCompleted) {
    return <OnboardingWizard onComplete={setOnboardingComplete} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'exercises', label: 'Exercises', icon: Activity },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-insights':
        return <AIInsights />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ScreenTimeCard />
              <BrightnessControl />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <WeeklyScreenTimeChart />
              <EyeHealthStats />
            </div>
            <BreakControls />
          </div>
        );
      case 'exercises':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Eye Exercises</h2>
            <EyeExercises />
          </div>
        );
      case 'health':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Health Tracking</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <DailyHealthLog />
              <EyeCheckupScheduler />
            </div>
          </div>
        );
      case 'voice':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Voice Assistant</h2>
            <VoiceAssistant />
          </div>
        );
      case 'achievements':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Achievements</h2>
            <GamificationPanel />
          </div>
        );
      case 'learn':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Learn</h2>
            <EyeHealthTips />
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <div className="grid md:grid-cols-2 gap-6">
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg hidden sm:block">VisionCare</span>
            </div>
          </div>

          {/* Center - Screen time */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Today:</span>
            <span className="text-sm font-semibold tabular-nums">
              {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-14 bottom-0 left-0 z-40 w-64
        bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800
        transition-transform duration-200 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }
                `}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pt-14 lg:pl-64 min-h-screen">
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-30">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-1 ${
                  isActive ? 'text-blue-600' : 'text-neutral-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="h-16 lg:hidden" />
    </div>
  );
};

export default Index;
