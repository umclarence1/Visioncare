
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ScreenTime {
  daily: number; // in minutes
  weekly: number[]; // array of 7 days in minutes
}

interface BreakSetting {
  interval: number; // in minutes
  duration: number; // in minutes
  enabled: boolean;
}

interface EyeCareContextType {
  screenTime: ScreenTime;
  breakSettings: BreakSetting;
  brightness: number;
  isTakingBreak: boolean;
  isTracking: boolean;
  updateBreakSettings: (settings: Partial<BreakSetting>) => void;
  updateBrightness: (level: number) => void;
  startTracking: () => void;
  stopTracking: () => void;
  startBreak: () => void;
  endBreak: () => void;
  resetDailyStats: () => void;
}

const defaultScreenTime: ScreenTime = {
  daily: 0,
  weekly: [0, 0, 0, 0, 0, 0, 0]
};

const defaultBreakSettings: BreakSetting = {
  interval: 20, // 20 minutes work time
  duration: 1, // 1 minute break
  enabled: true
};

const EyeCareContext = createContext<EyeCareContextType | undefined>(undefined);

export const EyeCareProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [screenTime, setScreenTime] = useState<ScreenTime>(defaultScreenTime);
  const [breakSettings, setBreakSettings] = useState<BreakSetting>(defaultBreakSettings);
  const [brightness, setBrightness] = useState<number>(70); // default 70%
  const [isTakingBreak, setIsTakingBreak] = useState<boolean>(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [trackingInterval, setTrackingInterval] = useState<number | null>(null);
  const [breakCheckInterval, setBreakCheckInterval] = useState<number | null>(null);

  // Load saved data from localStorage on initial load
  useEffect(() => {
    const savedScreenTime = localStorage.getItem('screenTime');
    const savedBreakSettings = localStorage.getItem('breakSettings');
    const savedBrightness = localStorage.getItem('brightness');

    if (savedScreenTime) setScreenTime(JSON.parse(savedScreenTime));
    if (savedBreakSettings) setBreakSettings(JSON.parse(savedBreakSettings));
    if (savedBrightness) setBrightness(Number(savedBrightness));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('screenTime', JSON.stringify(screenTime));
    localStorage.setItem('breakSettings', JSON.stringify(breakSettings));
    localStorage.setItem('brightness', brightness.toString());
  }, [screenTime, breakSettings, brightness]);

  // Check for breaks when tracking is active
  useEffect(() => {
    if (isTracking && breakSettings.enabled) {
      const checkForBreak = () => {
        // Convert to milliseconds for comparison
        const intervalMs = breakSettings.interval * 60 * 1000;
        const currentDailyMs = screenTime.daily * 60 * 1000;
        
        // If screen time since last break exceeds interval, suggest a break
        if (currentDailyMs % intervalMs < 60000 && currentDailyMs > 0) {
          toast({
            title: "Time for an eye break!",
            description: `You've been looking at the screen for ${breakSettings.interval} minutes. Take a ${breakSettings.duration} minute break.`,
            duration: 10000,
          });
          
          startBreak();
        }
      };

      const interval = window.setInterval(checkForBreak, 60000); // Check every minute
      setBreakCheckInterval(interval);

      return () => {
        if (breakCheckInterval) clearInterval(breakCheckInterval);
      };
    }
  }, [isTracking, screenTime.daily, breakSettings]);

  const updateBreakSettings = (settings: Partial<BreakSetting>) => {
    setBreakSettings(prev => ({ ...prev, ...settings }));
  };

  const updateBrightness = (level: number) => {
    setBrightness(level);
    // In a real app, this would interface with device APIs to actually change brightness
    toast({
      title: "Brightness Updated",
      description: `Screen brightness set to ${level}%`,
    });
  };

  const startTracking = () => {
    if (isTracking) return;
    
    setIsTracking(true);
    
    // Set up interval to increment screen time every minute
    const interval = window.setInterval(() => {
      setScreenTime(prev => ({
        ...prev,
        daily: prev.daily + 1/60, // Add 1 minute
        weekly: prev.weekly.map((day, i) => 
          i === new Date().getDay() ? day + 1/60 : day
        )
      }));
    }, 60000); // Every minute
    
    setTrackingInterval(interval);
    
    toast({
      title: "Screen Time Tracking Started",
      description: "VisionCare is now monitoring your screen time.",
    });
  };

  const stopTracking = () => {
    if (!isTracking) return;
    
    setIsTracking(false);
    
    if (trackingInterval) {
      clearInterval(trackingInterval);
      setTrackingInterval(null);
    }
    
    if (breakCheckInterval) {
      clearInterval(breakCheckInterval);
      setBreakCheckInterval(null);
    }
    
    toast({
      title: "Screen Time Tracking Paused",
      description: "VisionCare has stopped monitoring your screen time.",
    });
  };

  const startBreak = () => {
    setIsTakingBreak(true);
    stopTracking(); // Pause tracking during break
    
    toast({
      title: "Break Started",
      description: `Taking a ${breakSettings.duration} minute break. Look away from the screen.`,
    });
    
    // Automatically end break after duration
    setTimeout(() => {
      endBreak();
    }, breakSettings.duration * 60 * 1000);
  };

  const endBreak = () => {
    setIsTakingBreak(false);
    startTracking(); // Resume tracking after break
    
    toast({
      title: "Break Ended",
      description: "Break completed. Back to work!",
    });
  };

  const resetDailyStats = () => {
    setScreenTime(prev => ({
      ...prev,
      daily: 0
    }));
    
    toast({
      title: "Daily Stats Reset",
      description: "Your daily screen time statistics have been reset.",
    });
  };

  // Auto-start tracking when app loads
  useEffect(() => {
    startTracking();
    
    // Clean up intervals when component unmounts
    return () => {
      if (trackingInterval) clearInterval(trackingInterval);
      if (breakCheckInterval) clearInterval(breakCheckInterval);
    };
  }, []);

  return (
    <EyeCareContext.Provider value={{
      screenTime,
      breakSettings,
      brightness,
      isTakingBreak,
      isTracking,
      updateBreakSettings,
      updateBrightness,
      startTracking,
      stopTracking,
      startBreak,
      endBreak,
      resetDailyStats
    }}>
      {children}
    </EyeCareContext.Provider>
  );
};

export const useEyeCare = () => {
  const context = useContext(EyeCareContext);
  
  if (context === undefined) {
    throw new Error('useEyeCare must be used within an EyeCareProvider');
  }
  
  return context;
};
