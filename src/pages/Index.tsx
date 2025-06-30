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
import VoiceAssistant from '@/components/VoiceAssistant';
import AIInsights from '@/components/AIInsights';
import GamificationPanel from '@/components/GamificationPanel';

// Advanced Components
import RealTimeEyeMonitor from '@/components/advanced/RealTimeEyeMonitor';
import PredictiveInsights from '@/components/advanced/PredictiveInsights';
import BiometricIntegration from '@/components/advanced/BiometricIntegration';
import WorkplaceAnalytics from '@/components/advanced/WorkplaceAnalytics';

import { Button } from '@/components/ui/button';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { 
  Home, 
  Activity, 
  BarChart3, 
  Settings, 
  BookOpen,
  Calendar,
  Heart,
  Sparkles,
  Eye,
  Brain,
  Mic,
  Trophy,
  Building2,
  Camera,
  Zap
} from 'lucide-react';

const Index = () => {
  const { onboardingCompleted, setOnboardingComplete } = useEyeCare();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!onboardingCompleted) {
    return <OnboardingWizard onComplete={setOnboardingComplete} />;
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-blue-500 to-blue-600', desc: 'Overview & insights' },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, gradient: 'from-purple-500 to-pink-600', desc: 'Predictive analytics' },
    { id: 'real-time', label: 'Eye Tracking', icon: Camera, gradient: 'from-indigo-500 to-blue-600', desc: 'Live monitoring' },
    { id: 'biometrics', label: 'Biometrics', icon: Heart, gradient: 'from-red-500 to-pink-600', desc: 'Health integration' },
    { id: 'workplace', label: 'Workplace', icon: Building2, gradient: 'from-purple-500 to-indigo-600', desc: 'Team analytics' },
    { id: 'monitoring', label: 'Analytics', icon: BarChart3, gradient: 'from-emerald-500 to-teal-600', desc: 'Screen time data' },
    { id: 'exercises', label: 'Exercises', icon: Activity, gradient: 'from-emerald-500 to-emerald-600', desc: 'Eye workouts' },
    { id: 'health', label: 'Health Log', icon: Zap, gradient: 'from-amber-500 to-orange-600', desc: 'Symptom tracking' },
    { id: 'gamification', label: 'Achievements', icon: Trophy, gradient: 'from-yellow-500 to-orange-600', desc: 'Progress rewards' },
    { id: 'voice', label: 'Voice AI', icon: Mic, gradient: 'from-teal-500 to-cyan-600', desc: 'Voice commands' },
    { id: 'education', label: 'Learn', icon: BookOpen, gradient: 'from-blue-500 to-purple-600', desc: 'Tips & guides' },
    { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-gray-500 to-gray-600', desc: 'Preferences' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      
      case 'ai-insights':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container-ai animate-float">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <h1 className="text-4xl font-bold text-gradient-ai">Advanced AI Intelligence</h1>
                <div className="icon-container animate-float delay-500">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Predictive analytics and personalized health insights</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PredictiveInsights />
              <AIInsights />
            </div>
          </div>
        );

      case 'real-time':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container animate-float">
                  <Camera className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Real-Time Eye Monitoring
                </h1>
                <div className="icon-container animate-float delay-500">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Advanced computer vision for live eye health analysis</p>
            </div>
            <RealTimeEyeMonitor />
          </div>
        );

      case 'biometrics':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container-warning animate-float">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  Biometric Integration
                </h1>
                <div className="icon-container animate-float delay-500">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Comprehensive health monitoring through wearable devices</p>
            </div>
            <BiometricIntegration />
          </div>
        );

      case 'workplace':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container animate-float">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h1 className="text-4xl font-bold text-gradient-ai">Workplace Analytics</h1>
                <div className="icon-container animate-float delay-500">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Enterprise-grade team health monitoring and insights</p>
            </div>
            <WorkplaceAnalytics />
          </div>
        );
      
      
      case 'monitoring':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container animate-float">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-4xl font-bold text-gradient">Screen Time & Analytics</h1>
                <div className="icon-container animate-float delay-500">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Monitor your digital wellness with precision</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScreenTimeCard />
              <BrightnessControl />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WeeklyScreenTimeChart />
              <EyeHealthStats />
            </div>
            
            <BreakControls />
          </div>
        );
      
      case 'exercises':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container-success animate-float">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
                <h1 className="text-4xl font-bold text-gradient-emerald">Eye Exercises</h1>
                <div className="icon-container animate-float delay-500">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Strengthen and relax your eyes with guided exercises</p>
            </div>
            <EyeExercises />
          </div>
        );
      
      case 'health':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container-warning animate-float">
                  <Zap className="h-6 w-6 text-amber-600" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">Health Tracking</h1>
                <div className="icon-container animate-float delay-500">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Monitor symptoms and schedule checkups</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DailyHealthLog />
              <EyeCheckupScheduler />
            </div>
          </div>
        );

      case 'voice':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container-ai animate-float">
                  <Mic className="h-6 w-6 text-teal-600" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">Voice Assistant</h1>
                <div className="icon-container animate-float delay-500">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Control your eye care with voice commands</p>
            </div>
            <VoiceAssistant />
          </div>
        );

      case 'gamification':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container-warning animate-float">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">Achievements & Progress</h1>
                <div className="icon-container animate-float delay-500">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Track your progress and unlock achievements</p>
            </div>
            <GamificationPanel />
          </div>
        );
      
      case 'education':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container-warning animate-float">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">Eye Health Education</h1>
                <div className="icon-container animate-float delay-500">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Learn tips and best practices for optimal eye health</p>
            </div>
            <EyeHealthTips />
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="icon-container animate-float">
                  <Settings className="h-6 w-6 text-gray-600" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 bg-clip-text text-transparent">Settings & Preferences</h1>
                <div className="icon-container animate-float delay-500">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Customize your VisionCare experience</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950/20 transition-all duration-700">
      <NavigationHeader 
        onOpenSettings={() => setActiveTab('settings')}
      />

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Enhanced Sidebar Navigation */}
        <div className="hidden md:flex w-80 backdrop-professional border-r border-white/10 dark:border-white/5">
          <div className="flex flex-col w-full p-6">
            <nav className="space-y-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full justify-start text-left p-4 h-auto transition-all duration-300 group ${
                      isActive 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-blue-500/25 scale-105` 
                        : 'hover:bg-white/10 dark:hover:bg-white/5 hover:scale-102'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <div className={`p-2 rounded-xl mr-4 transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'bg-white/10 dark:bg-white/5 group-hover:bg-white/20'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-lg">{item.label}</span>
                      <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {item.desc}
                      </span>
                    </div>
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 backdrop-professional border-t border-white/10 dark:border-white/5 z-50">
          <div className="flex justify-around p-3">
            {navigationItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 h-auto py-3 px-4 transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-b ${item.gradient} text-white shadow-lg rounded-2xl scale-110` 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 pb-24 md:pb-8 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Enhanced Footer */}
      <footer className="backdrop-professional border-t border-white/10 dark:border-white/5 mt-16 hidden md:block">
        <div className="container mx-auto py-8 px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="icon-container animate-float">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gradient">VisionCare Pro - Advanced AI Eye Wellness Platform</p>
              <div className="icon-container animate-float delay-300">
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium italic">
              "See Clearly. Live Healthily. Predict Proactively."
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
