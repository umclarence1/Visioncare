
import React from 'react';
import { Eye } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Eye size={30} className="text-primary animate-pulse-gentle" />
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10"></div>
      </div>
      <span className="font-bold text-xl text-primary">VisionCare</span>
    </div>
  );
};

export default Logo;
