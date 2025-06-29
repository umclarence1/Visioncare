
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/components/AppSidebar';
import NavigationHeader from '@/components/NavigationHeader';

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/20">
      <AppSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
        <NavigationHeader 
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <main className="p-8 min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
