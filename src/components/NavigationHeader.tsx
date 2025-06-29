
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { 
  Timer, 
  Bell, 
  Menu, 
  Settings, 
  Activity,
  AlertCircle,
  Shield,
  Zap
} from 'lucide-react';

interface NavigationHeaderProps {
  onOpenSettings?: () => void;
  onToggleSidebar?: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ 
  onOpenSettings, 
  onToggleSidebar 
}) => {
  const { 
    isTracking, 
    startTracking, 
    stopTracking, 
    resetDailyStats, 
    requestNotificationPermission,
    screenTime,
    isExercising,
    healthLogs
  } = useEyeCare();

  const handleEnableNotifications = () => {
    requestNotificationPermission();
  };

  // Calculate if there are any alerts
  const hasAlerts = screenTime.daily > 300 || healthLogs.some(log => 
    log.severity > 3 && new Date(log.date).toDateString() === new Date().toDateString()
  );

  return (
    <header className="sticky top-0 z-50 backdrop-professional border-b border-white/10 dark:border-white/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="md:hidden p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Logo />
          </div>

          {/* Center Status Indicators */}
          <div className="hidden lg:flex items-center space-x-4">
            {isExercising && (
              <div className="status-indicator status-active animate-fade-in">
                <Activity className="h-4 w-4 mr-2 animate-pulse" />
                <span className="font-medium">Exercise Active</span>
              </div>
            )}

            {hasAlerts && (
              <div className="status-indicator status-warning animate-fade-in">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="font-medium">Attention Needed</span>
              </div>
            )}

            <div className="flex items-center gap-3 px-4 py-2 pro-card rounded-2xl">
              <div className="icon-container">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Today's Screen Time</span>
                <span className="text-sm font-bold text-gradient">
                  {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost"
              onClick={handleEnableNotifications}
              size="sm"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
            >
              <div className="icon-container-warning">
                <Bell className="h-4 w-4 text-amber-600" />
              </div>
              <span className="font-medium">Alerts</span>
            </Button>

            <Button 
              variant={isTracking ? "destructive" : "default"}
              onClick={isTracking ? stopTracking : startTracking}
              size="sm"
              className={`btn-innovative ${isTracking ? 'from-red-500 to-red-600' : ''} shadow-lg`}
            >
              <Timer className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline font-semibold">
                {isTracking ? "Pause Tracking" : "Resume Tracking"}
              </span>
              <span className="sm:hidden">
                {isTracking ? "Pause" : "Resume"}
              </span>
            </Button>

            <Button 
              variant="outline" 
              onClick={resetDailyStats}
              size="sm"
              className="hidden sm:flex items-center gap-2 pro-card border-none hover:shadow-lg transition-all duration-300"
            >
              <Zap className="h-4 w-4" />
              <span className="font-medium">Reset</span>
            </Button>

            <Button
              variant="ghost"
              onClick={onOpenSettings}
              size="sm"
              className="p-3 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
