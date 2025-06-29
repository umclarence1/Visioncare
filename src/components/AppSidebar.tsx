
import React from 'react';
import { 
  Home, 
  Monitor, 
  Activity, 
  Heart, 
  BookOpen, 
  User,
  Eye,
  Settings
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Monitoring', url: '/monitoring', icon: Monitor },
  { title: 'Exercises', url: '/exercises', icon: Activity },
  { title: 'Health Log', url: '/health', icon: Heart },
  { title: 'Education', url: '/education', icon: BookOpen },
  { title: 'Profile', url: '/profile', icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (active: boolean) =>
    active 
      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500" 
      : "hover:bg-white/10 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400";

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-white/10 dark:border-white/5 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80`}>
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-4 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-gradient">VisionCare</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Eye Health Pro</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className={`${isCollapsed ? 'hidden' : 'block'} text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2`}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClasses(isActive(item.url))} flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {isActive(item.url) && (
                        <div className="absolute right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="mt-auto p-4 border-t border-white/10 dark:border-white/5">
          <SidebarMenuButton asChild>
            <button className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 w-full">
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">Settings</span>}
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
