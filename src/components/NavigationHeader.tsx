
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { 
  Timer, 
  Bell, 
  Settings, 
  Activity,
  AlertCircle,
  Shield,
  Zap,
  User
} from 'lucide-react';

interface NavigationHeaderProps {
  onOpenSettings?: () => void;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ 
  onOpenSettings, 
  sidebarCollapsed = false
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

  const hasAlerts = screenTime.daily > 300 || healthLogs.some(log => 
    log.severity > 3 && new Date(log.date).toDateString() === new Date().toDateString()
  );

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section - Status */}
          <div className="flex items-center space-x-6">
            {isExercising && (
              <Badge variant="default" className="bg-emerald-500 px-3 py-1">
                <Activity className="h-4 w-4 mr-2 animate-pulse" />
                Exercise Active
              </Badge>
            )}

            {hasAlerts && (
              <Badge variant="destructive" className="px-3 py-1">
                <AlertCircle className="h-4 w-4 mr-2" />
                Attention Needed
              </Badge>
            )}

            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Today's Screen Time</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
                </span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost"
              onClick={handleEnableNotifications}
              size="sm"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bell className="h-4 w-4" />
              <span className="font-medium">Alerts</span>
            </Button>

            <Button 
              variant={isTracking ? "destructive" : "default"}
              onClick={isTracking ? stopTracking : startTracking}
              size="sm"
              className="shadow-lg transition-all duration-300 hover:shadow-xl"
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
              className="hidden sm:flex items-center gap-2 hover:shadow-md transition-all duration-300"
            >
              <Zap className="h-4 w-4" />
              <span className="font-medium">Reset</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              onClick={onOpenSettings}
              size="sm"
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
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
