
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import NavigationHeader from './NavigationHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <NavigationHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          
          <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm p-4">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                VisionCare © 2024 - Professional Eye Health Management System
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
