
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Brain, 
  BarChart3, 
  Activity, 
  Heart, 
  Mic, 
  Trophy, 
  BookOpen, 
  Settings,
  Calendar,
  Eye,
  Users,
  Shield,
  Bell,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEyeCare } from '@/contexts/EyeCareContext';
import Logo from '@/components/Logo';

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { screenTime, healthLogs, isExercising } = useEyeCare();
  
  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      path: '/dashboard',
      description: 'Overview & insights',
      badge: null
    },
    { 
      id: 'ai-insights', 
      label: 'AI Insights', 
      icon: Brain, 
      path: '/ai-insights',
      description: 'Smart recommendations',
      badge: 'AI'
    },
    { 
      id: 'monitoring', 
      label: 'Analytics', 
      icon: BarChart3, 
      path: '/monitoring',
      description: 'Screen time tracking',
      badge: Math.floor(screenTime.daily / 60) > 4 ? 'Alert' : null
    },
    { 
      id: 'exercises', 
      label: 'Exercises', 
      icon: Activity, 
      path: '/exercises',
      description: 'Eye workouts',
      badge: isExercising ? 'Active' : null
    },
    { 
      id: 'health', 
      label: 'Health Log', 
      icon: Heart, 
      path: '/health',
      description: 'Symptom tracking',
      badge: healthLogs.length > 0 ? healthLogs.length.toString() : null
    },
    { 
      id: 'appointments', 
      label: 'Appointments', 
      icon: Calendar, 
      path: '/appointments',
      description: 'Schedule checkups',
      badge: null
    },
    { 
      id: 'voice', 
      label: 'Voice AI', 
      icon: Mic, 
      path: '/voice',
      description: 'Voice commands',
      badge: 'Beta'
    },
    { 
      id: 'community', 
      label: 'Community', 
      icon: Users, 
      path: '/community',
      description: 'Connect with others',
      badge: null
    },
    { 
      id: 'achievements', 
      label: 'Achievements', 
      icon: Trophy, 
      path: '/achievements',
      description: 'Progress & rewards',
      badge: null
    },
    { 
      id: 'education', 
      label: 'Learn', 
      icon: BookOpen, 
      path: '/education',
      description: 'Tips & guides',
      badge: null
    }
  ];

  const bottomItems = [
    { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname === path.replace('/', '');

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl z-50 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-80'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && <Logo />}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={`group flex items-center px-3 py-3 rounded-xl transition-all duration-200 relative ${
                  active
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  active ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                {!isCollapsed && (
                  <>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant={item.badge === 'Alert' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    
                    {active && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={`group flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Icon className="h-4 w-4" />
                </div>
                {!isCollapsed && (
                  <span className="ml-4 font-medium text-sm">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Status Indicator */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 rounded-xl">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
              <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Eye Health Score
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                85% - Good
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;
