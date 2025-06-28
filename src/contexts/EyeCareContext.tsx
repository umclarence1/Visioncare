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

interface HealthLogEntry {
  id: string;
  date: string;
  symptoms: string[];
  severity: number; // 1-5 scale
  notes: string;
  screenTimeHours: number;
}

interface EyeExercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  instructions: string[];
}

interface EyeCareContextType {
  screenTime: ScreenTime;
  breakSettings: BreakSetting;
  brightness: number;
  isTakingBreak: boolean;
  isTracking: boolean;
  healthLogs: HealthLogEntry[];
  currentExercise: EyeExercise | null;
  isExercising: boolean;
  nextCheckupDate: string | null;
  updateBreakSettings: (settings: Partial<BreakSetting>) => void;
  updateBrightness: (level: number) => void;
  startTracking: () => void;
  stopTracking: () => void;
  startBreak: () => void;
  endBreak: () => void;
  resetDailyStats: () => void;
  addHealthLog: (log: Omit<HealthLogEntry, 'id'>) => void;
  startExercise: (exercise: EyeExercise) => void;
  endExercise: () => void;
  setNextCheckup: (date: string) => void;
  requestNotificationPermission: () => Promise<boolean>;
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

const eyeExercises: EyeExercise[] = [
  {
    id: '1',
    name: 'Blinking Exercise',
    description: 'Deliberate blinking to moisturize eyes',
    duration: 30,
    instructions: [
      'Sit comfortably and relax your shoulders',
      'Blink slowly and deliberately 20 times',
      'Close your eyes for 2 seconds between each blink',
      'Focus on fully closing your eyelids'
    ]
  },
  {
    id: '2',
    name: 'Focus Shifting',
    description: 'Exercise eye muscles by changing focus',
    duration: 60,
    instructions: [
      'Hold your finger 6 inches from your face',
      'Focus on your finger for 3 seconds',
      'Look at something 20 feet away for 3 seconds',
      'Repeat this cycle 10 times'
    ]
  },
  {
    id: '3',
    name: 'Eye Rolling',
    description: 'Circular movements to relax eye muscles',
    duration: 45,
    instructions: [
      'Look up and slowly roll your eyes clockwise',
      'Complete 5 full circles',
      'Pause and blink a few times',
      'Roll your eyes counter-clockwise 5 times'
    ]
  }
];

const EyeCareContext = createContext<EyeCareContextType | undefined>(undefined);

export const EyeCareProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [screenTime, setScreenTime] = useState<ScreenTime>(defaultScreenTime);
  const [breakSettings, setBreakSettings] = useState<BreakSetting>(defaultBreakSettings);
  const [brightness, setBrightness] = useState<number>(70);
  const [isTakingBreak, setIsTakingBreak] = useState<boolean>(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [trackingInterval, setTrackingInterval] = useState<number | null>(null);
  const [breakCheckInterval, setBreakCheckInterval] = useState<number | null>(null);
  
  // New state for enhanced features
  const [healthLogs, setHealthLogs] = useState<HealthLogEntry[]>([]);
  const [currentExercise, setCurrentExercise] = useState<EyeExercise | null>(null);
  const [isExercising, setIsExercising] = useState<boolean>(false);
  const [nextCheckupDate, setNextCheckupDate] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    const savedScreenTime = localStorage.getItem('screenTime');
    const savedBreakSettings = localStorage.getItem('breakSettings');
    const savedBrightness = localStorage.getItem('brightness');
    const savedHealthLogs = localStorage.getItem('healthLogs');
    const savedCheckupDate = localStorage.getItem('nextCheckupDate');

    if (savedScreenTime) setScreenTime(JSON.parse(savedScreenTime));
    if (savedBreakSettings) setBreakSettings(JSON.parse(savedBreakSettings));
    if (savedBrightness) setBrightness(Number(savedBrightness));
    if (savedHealthLogs) setHealthLogs(JSON.parse(savedHealthLogs));
    if (savedCheckupDate) setNextCheckupDate(savedCheckupDate);
  }, []);

  useEffect(() => {
    localStorage.setItem('screenTime', JSON.stringify(screenTime));
    localStorage.setItem('breakSettings', JSON.stringify(breakSettings));
    localStorage.setItem('brightness', brightness.toString());
    localStorage.setItem('healthLogs', JSON.stringify(healthLogs));
    if (nextCheckupDate) localStorage.setItem('nextCheckupDate', nextCheckupDate);
  }, [screenTime, breakSettings, brightness, healthLogs, nextCheckupDate]);

  // Enhanced 20-20-20 rule with browser notifications
  const showNotification = (title: string, body: string) => {
    if (notificationPermission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      return permission === 'granted';
    }
    return false;
  };

  useEffect(() => {
    if (isTracking && breakSettings.enabled) {
      const checkForBreak = () => {
        const intervalMs = breakSettings.interval * 60 * 1000;
        const currentDailyMs = screenTime.daily * 60 * 1000;
        
        if (currentDailyMs % intervalMs < 60000 && currentDailyMs > 0) {
          const message = `You've been looking at the screen for ${breakSettings.interval} minutes. Take a ${breakSettings.duration} minute break.`;
          
          toast({
            title: "🔔 Time for an eye break!",
            description: message,
            duration: 10000,
          });
          
          showNotification("👁️ VisionCare - Eye Break Time!", message);
          startBreak();
        }
      };

      const interval = window.setInterval(checkForBreak, 60000);
      setBreakCheckInterval(interval);

      return () => {
        if (breakCheckInterval) clearInterval(breakCheckInterval);
      };
    }
  }, [isTracking, screenTime.daily, breakSettings, notificationPermission]);

  // Night mode detection and blue light reminders
  useEffect(() => {
    const checkNightMode = () => {
      const hour = new Date().getHours();
      const isNightTime = hour >= 19 || hour <= 6; // 7PM to 6AM
      
      if (isNightTime && brightness > 50) {
        toast({
          title: "🌙 Night Mode Reminder",
          description: "Consider reducing screen brightness and enabling blue light filter for better sleep.",
          duration: 8000,
        });
        
        showNotification("🌙 VisionCare - Night Mode", "Consider enabling blue light filter and reducing brightness.");
      }
    };

    // Check every hour
    const nightModeInterval = setInterval(checkNightMode, 3600000);
    
    return () => clearInterval(nightModeInterval);
  }, [brightness, notificationPermission]);

  const updateBreakSettings = (settings: Partial<BreakSetting>) => {
    setBreakSettings(prev => ({ ...prev, ...settings }));
  };

  const updateBrightness = (level: number) => {
    setBrightness(level);
    toast({
      title: "Brightness Updated",
      description: `Screen brightness set to ${level}%`,
    });
  };

  const startTracking = () => {
    if (isTracking) return;
    
    setIsTracking(true);
    
    const interval = window.setInterval(() => {
      setScreenTime(prev => ({
        ...prev,
        daily: prev.daily + 1/60,
        weekly: prev.weekly.map((day, i) => 
          i === new Date().getDay() ? day + 1/60 : day
        )
      }));
    }, 60000);
    
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
    stopTracking();
    
    toast({
      title: "Break Started",
      description: `Taking a ${breakSettings.duration} minute break. Look away from the screen.`,
    });
    
    setTimeout(() => {
      endBreak();
    }, breakSettings.duration * 60 * 1000);
  };

  const endBreak = () => {
    setIsTakingBreak(false);
    startTracking();
    
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

  // New functions for enhanced features
  const addHealthLog = (log: Omit<HealthLogEntry, 'id'>) => {
    const newLog: HealthLogEntry = {
      ...log,
      id: Date.now().toString()
    };
    setHealthLogs(prev => [newLog, ...prev].slice(0, 30)); // Keep last 30 entries
    
    toast({
      title: "Health Log Added",
      description: "Your eye health symptoms have been recorded.",
    });
  };

  const startExercise = (exercise: EyeExercise) => {
    setCurrentExercise(exercise);
    setIsExercising(true);
    
    toast({
      title: `Starting: ${exercise.name}`,
      description: exercise.description,
    });

    // Auto-end exercise after duration
    setTimeout(() => {
      endExercise();
    }, exercise.duration * 1000);
  };

  const endExercise = () => {
    setIsExercising(false);
    setCurrentExercise(null);
    
    toast({
      title: "Exercise Complete!",
      description: "Great job taking care of your eyes!",
    });
  };

  const setNextCheckup = (date: string) => {
    setNextCheckupDate(date);
    
    toast({
      title: "Eye Checkup Scheduled",
      description: `Next appointment: ${new Date(date).toLocaleDateString()}`,
    });
  };

  useEffect(() => {
    startTracking();
    requestNotificationPermission();
    
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
      healthLogs,
      currentExercise,
      isExercising,
      nextCheckupDate,
      updateBreakSettings,
      updateBrightness,
      startTracking,
      stopTracking,
      startBreak,
      endBreak,
      resetDailyStats,
      addHealthLog,
      startExercise,
      endExercise,
      setNextCheckup,
      requestNotificationPermission
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

export { eyeExercises };
