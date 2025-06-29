
import React from 'react';
import { Eye, Sparkles } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-4 transition-all duration-500 hover:scale-105 group">
      <div className="relative">
        {/* Main Eye Icon with Glow Effect */}
        <div className="relative z-10">
          <Eye size={40} className="text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-300 animate-breathe" />
        </div>
        
        {/* Animated Background Rings */}
        <div className="absolute inset-0 -inset-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        </div>
        
        {/* Floating Sparkles */}
        <div className="absolute -top-1 -right-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles size={12} className="text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -left-1 opacity-50 group-hover:opacity-80 transition-opacity duration-500 delay-200">
          <Sparkles size={8} className="text-blue-400 animate-pulse" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-shimmer bg-size-200">
            VisionCare
          </span>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">
            Eye Health Companion
          </span>
          <div className="px-2 py-0.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/50 dark:border-emerald-700/50 rounded-full">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Pro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
