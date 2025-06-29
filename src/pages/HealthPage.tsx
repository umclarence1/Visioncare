
import React from 'react';
import DailyHealthLog from '@/components/DailyHealthLog';
import EyeCheckupScheduler from '@/components/EyeCheckupScheduler';

const HealthPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
          Health Tracking
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Monitor your eye health symptoms and maintain regular professional checkups
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DailyHealthLog />
        <EyeCheckupScheduler />
      </div>
    </div>
  );
};

export default HealthPage;
