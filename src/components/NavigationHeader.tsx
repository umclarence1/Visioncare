
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
  AlertCircle 
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
    <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Logo />
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center space-x-3">
            {isExercising && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                <Activity className="h-3 w-3 text-green-600 animate-pulse" />
                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                  Exercise Active
                </span>
              </div>
            )}

            {hasAlerts && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertCircle className="h-3 w-3 text-red-600" />
                <span className="text-xs font-medium text-red-700 dark:text-red-300">
                  Attention Needed
                </span>
              </div>
            )}

            <Badge variant="outline" className="text-xs">
              {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m today
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost"
              onClick={handleEnableNotifications}
              size="sm"
              className="hidden sm:flex"
            >
              <Bell className="mr-1 h-4 w-4" />
              Alerts
            </Button>

            <Button 
              variant={isTracking ? "destructive" : "default"}
              onClick={isTracking ? stopTracking : startTracking}
              size="sm"
              className="transition-all duration-300"
            >
              <Timer className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">
                {isTracking ? "Pause" : "Resume"}
              </span>
            </Button>

            <Button 
              variant="outline" 
              onClick={resetDailyStats}
              size="sm"
              className="hidden sm:flex transition-all duration-300"
            >
              Reset
            </Button>

            <Button
              variant="ghost"
              onClick={onOpenSettings}
              size="sm"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
