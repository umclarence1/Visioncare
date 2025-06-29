
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { 
  Timer, 
  Bell, 
  Activity,
  AlertCircle,
  Play,
  Pause
} from 'lucide-react';

const NavigationHeader: React.FC = () => {
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
    <header className="h-16 border-b border-border/50 bg-card/95 backdrop-blur-xl sticky top-0 z-40">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground" />
          
          <div className="hidden md:flex items-center space-x-3">
            {isExercising && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/20 rounded-full">
                <Activity className="h-3 w-3 text-green-600 animate-pulse" />
                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                  Exercise Active
                </span>
              </div>
            )}

            {hasAlerts && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertCircle className="h-3 w-3 text-red-600" />
                <span className="text-xs font-medium text-red-700 dark:text-red-300">
                  Attention Required
                </span>
              </div>
            )}

            <Badge variant="outline" className="text-xs font-medium">
              {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m today
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost"
            onClick={handleEnableNotifications}
            size="sm"
            className="hidden sm:flex hover:bg-accent"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>

          <Button 
            variant={isTracking ? "destructive" : "default"}
            onClick={isTracking ? stopTracking : startTracking}
            size="sm"
            className="transition-all duration-300 shadow-sm"
          >
            {isTracking ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            <span className="hidden sm:inline">
              {isTracking ? "Pause Tracking" : "Resume Tracking"}
            </span>
          </Button>

          <Button 
            variant="outline" 
            onClick={resetDailyStats}
            size="sm"
            className="hidden md:flex hover:bg-accent"
          >
            Reset Day
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
