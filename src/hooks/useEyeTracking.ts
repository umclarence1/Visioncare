
import { useState, useEffect, useRef } from 'react';

export interface EyeTrackingData {
  blinkRate: number;
  pupilDilation: number;
  focusPattern: 'concentrated' | 'scattered' | 'normal';
  fatigueLevel: number; // 0-100
  gazeDirection: { x: number; y: number };
  attentionScore: number;
}

export const useEyeTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<EyeTrackingData>({
    blinkRate: 15,
    pupilDilation: 0.5,
    focusPattern: 'normal',
    fatigueLevel: 20,
    gazeDirection: { x: 0, y: 0 },
    attentionScore: 85
  });
  const [hasPermission, setHasPermission] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      return true;
    } catch (error) {
      console.warn('Camera permission denied:', error);
      setHasPermission(false);
      return false;
    }
  };

  const startTracking = async () => {
    const permitted = await requestCameraPermission();
    if (!permitted) return false;

    setIsTracking(true);
    
    // Simulate real-time eye tracking data
    intervalRef.current = window.setInterval(() => {
      setTrackingData(prev => ({
        blinkRate: Math.max(5, Math.min(30, prev.blinkRate + (Math.random() - 0.5) * 4)),
        pupilDilation: Math.max(0.1, Math.min(1, prev.pupilDilation + (Math.random() - 0.5) * 0.2)),
        focusPattern: Math.random() > 0.8 ? 
          (['concentrated', 'scattered', 'normal'] as const)[Math.floor(Math.random() * 3)] : 
          prev.focusPattern,
        fatigueLevel: Math.max(0, Math.min(100, prev.fatigueLevel + (Math.random() - 0.3) * 5)),
        gazeDirection: {
          x: prev.gazeDirection.x + (Math.random() - 0.5) * 20,
          y: prev.gazeDirection.y + (Math.random() - 0.5) * 20
        },
        attentionScore: Math.max(0, Math.min(100, prev.attentionScore + (Math.random() - 0.4) * 10))
      }));
    }, 2000);

    return true;
  };

  const stopTracking = () => {
    setIsTracking(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isTracking,
    trackingData,
    hasPermission,
    startTracking,
    stopTracking,
    requestCameraPermission
  };
};
