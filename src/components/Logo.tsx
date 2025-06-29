
import React from 'react';
import { Eye } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
      <div className="relative">
        <Eye size={32} className="text-primary z-10 relative animate-pulse-gentle" />
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg transform -rotate-12"></div>
        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg rotate-12"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          VisionCare
        </span>
        <span className="text-xs text-muted-foreground">Smart View</span>
      </div>
    </div>
  );
};

export default Logo;
