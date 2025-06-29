
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEyeCare } from '@/contexts/EyeCareContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  BarChart3,
  Activity,
  Heart,
  BookOpen,
  Settings,
  Calendar,
  Eye,
  Timer,
  AlertCircle,
  User
} from 'lucide-react';
import Logo from './Logo';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    path: '/',
    description: 'Overview & insights'
  },
  {
    id: 'monitoring',
    label: 'Screen Monitor',
    icon: BarChart3,
    path: '/monitoring',
    description: 'Track usage & breaks'
  },
  {
    id: 'exercises',
    label: 'Eye Exercises',
    icon: Activity,
    path: '/exercises',
    description: 'Strengthen your vision'
  },
  {
    id: 'health',
    label: 'Health Log',
    icon: Heart,
    path: '/health',
    description: 'Symptoms & checkups'
  },
  {
    id: 'education',
    label: 'Learn & Tips',
    icon: BookOpen,
    path: '/education',
    description: 'Eye care knowledge'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    path: '/profile',
    description: 'Personal settings'
  }
];

const AppSidebar: React.FC = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { screenTime, healthLogs, isExercising, nextCheckupDate } = useEyeCare();

  const getNavClassName = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center w-full transition-all duration-200 ${
      isActive
        ? 'bg-primary text-primary-foreground shadow-md'
        : 'hover:bg-accent hover:text-accent-foreground'
    }`;
  };

  const hasHealthAlerts = screenTime.daily > 300 || healthLogs.some(log => 
    log.severity > 3 && new Date(log.date).toDateString() === new Date().toDateString()
  );

  const getDaysUntilCheckup = () => {
    if (!nextCheckupDate) return null;
    const days = Math.ceil((new Date(nextCheckupDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const checkupDays = getDaysUntilCheckup();

  return (
    <Sidebar className="border-r border-border/50 bg-card/95 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className={`flex items-center transition-all duration-300 ${collapsed ? 'justify-center' : 'justify-start'}`}>
          <Logo />
        </div>
        {!collapsed && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Professional Eye Care Assistant
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild className="p-0">
                      <NavLink
                        to={item.path}
                        className={getNavClassName(item.path)}
                      >
                        <div className="flex items-center w-full p-3">
                          <Icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                          {!collapsed && (
                            <div className="flex-1">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs opacity-70">{item.description}</div>
                            </div>
                          )}
                          {!collapsed && item.id === 'health' && hasHealthAlerts && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          {!collapsed && item.id === 'exercises' && isExercising && (
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 p-2">
                <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4 text-primary" />
                    <span className="text-sm">Today</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
                  </Badge>
                </div>
                
                {checkupDays !== null && (
                  <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Checkup</span>
                    </div>
                    <Badge variant={checkupDays <= 7 ? "destructive" : "outline"} className="text-xs">
                      {checkupDays <= 0 ? 'Due' : `${checkupDays}d`}
                    </Badge>
                  </div>
                )}
                
                {isExercising && (
                  <div className="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-sm">Exercise</span>
                    </div>
                    <Badge className="text-xs">Active</Badge>
                  </div>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        {!collapsed ? (
          <div className="text-center">
            <div className="text-xs text-muted-foreground">
              Protecting your vision since 2024
            </div>
            <div className="text-xs text-primary font-medium mt-1">
              Your eyes deserve the best care
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Eye className="h-5 w-5 text-primary" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
