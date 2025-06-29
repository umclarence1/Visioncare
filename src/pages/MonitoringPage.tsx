
import React from 'react';
import ScreenTimeCard from '@/components/ScreenTimeCard';
import WeeklyScreenTimeChart from '@/components/WeeklyScreenTimeChart';
import BrightnessControl from '@/components/BrightnessControl';
import BreakControls from '@/components/BreakControls';
import EyeHealthStats from '@/components/EyeHealthStats';

const MonitoringPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Screen Time Analytics
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Monitor your digital wellness with comprehensive tracking and intelligent insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScreenTimeCard />
        <BrightnessControl />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyScreenTimeChart />
        <EyeHealthStats />
      </div>
      
      <BreakControls />
    </div>
  );
};

export default MonitoringPage;
