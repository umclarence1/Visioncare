
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Activity, Moon, Zap, Bluetooth, Smartphone } from 'lucide-react';

interface BiometricData {
  heartRate: number;
  heartRateVariability: number;
  stressLevel: number;
  sleepQuality: number;
  activityLevel: number;
  isConnected: boolean;
}

const BiometricIntegration: React.FC = () => {
  const [biometricData, setBiometricData] = useState<BiometricData>({
    heartRate: 0,
    heartRateVariability: 0,
    stressLevel: 0,
    sleepQuality: 0,
    activityLevel: 0,
    isConnected: false
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const simulateConnection = async () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setBiometricData({
      heartRate: 72,
      heartRateVariability: 35,
      stressLevel: 25,
      sleepQuality: 78,
      activityLevel: 65,
      isConnected: true
    });
    
    setIsConnecting(false);
  };

  // Simulate real-time updates when connected
  useEffect(() => {
    if (!biometricData.isConnected) return;

    const interval = setInterval(() => {
      setBiometricData(prev => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
        heartRateVariability: Math.max(20, Math.min(50, prev.heartRateVariability + (Math.random() - 0.5) * 6)),
        stressLevel: Math.max(0, Math.min(100, prev.stressLevel + (Math.random() - 0.5) * 8)),
        sleepQuality: Math.max(0, Math.min(100, prev.sleepQuality + (Math.random() - 0.5) * 2)),
        activityLevel: Math.max(0, Math.min(100, prev.activityLevel + (Math.random() - 0.5) * 10))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [biometricData.isConnected]);

  const getStressColor = (level: number) => {
    if (level > 60) return 'text-red-600';
    if (level > 30) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getSleepQualityColor = (quality: number) => {
    if (quality > 80) return 'text-emerald-600';
    if (quality > 60) return 'text-blue-600';
    return 'text-amber-600';
  };

  if (!biometricData.isConnected && !isConnecting) {
    return (
      <Card className="floating-card border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="icon-container">
              <Heart className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-gradient">Biometric Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4 py-8">
            <div className="icon-container mx-auto">
              <Bluetooth className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Connect Your Wearable Device</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sync with fitness trackers, smartwatches, and health monitors for comprehensive wellness insights
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Apple Health</span>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <Activity className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium">Fitbit</span>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium">Garmin</span>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Oura Ring</span>
                </div>
              </div>
              <Button onClick={simulateConnection} size="lg" className="w-full">
                <Bluetooth className="mr-2 h-5 w-5" />
                Connect Device
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isConnecting) {
    return (
      <Card className="floating-card border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="icon-container animate-pulse">
              <Bluetooth className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-gradient">Connecting to Device</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="icon-container mx-auto mb-4 animate-bounce">
              <Heart className="h-12 w-12 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Establishing Connection</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Syncing with your wearable device...
            </p>
            <Progress value={66} className="w-full max-w-xs mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="floating-card border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="icon-container-success animate-pulse">
            <Heart className="h-5 w-5 text-red-600" />
          </div>
          <span className="text-gradient">Biometric Monitoring</span>
          <Badge className="bg-emerald-100 text-emerald-800 animate-pulse">
            🔗 Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Heart Rate & HRV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 pro-card rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-red-600 animate-pulse" />
              <span className="text-sm font-medium">Heart Rate</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {biometricData.heartRate.toFixed(0)} <span className="text-sm text-gray-500">BPM</span>
            </div>
          </div>
          
          <div className="p-4 pro-card rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">HRV</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {biometricData.heartRateVariability.toFixed(0)} <span className="text-sm text-gray-500">ms</span>
            </div>
          </div>
        </div>

        {/* Stress Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Stress Level</span>
            <span className={`text-lg font-bold ${getStressColor(biometricData.stressLevel)}`}>
              {biometricData.stressLevel.toFixed(0)}%
            </span>
          </div>
          <Progress value={biometricData.stressLevel} className="h-3 rounded-full" />
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {biometricData.stressLevel > 60 ? 'High stress detected - consider relaxation techniques' :
             biometricData.stressLevel > 30 ? 'Moderate stress levels' : 'Low stress - excellent!'}
          </p>
        </div>

        {/* Sleep Quality */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Sleep Quality</span>
            </div>
            <span className={`text-lg font-bold ${getSleepQualityColor(biometricData.sleepQuality)}`}>
              {biometricData.sleepQuality.toFixed(0)}%
            </span>
          </div>
          <Progress value={biometricData.sleepQuality} className="h-3 rounded-full" />
        </div>

        {/* Activity Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">Activity Level</span>
            </div>
            <span className="text-lg font-bold text-emerald-600">
              {biometricData.activityLevel.toFixed(0)}%
            </span>
          </div>
          <Progress value={biometricData.activityLevel} className="h-3 rounded-full" />
        </div>

        {/* Correlation Insights */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl">
          <h4 className="font-semibold text-sm mb-2">Eye Health Correlation</h4>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>• High stress correlates with 34% increased eye strain</p>
            <p>• Poor sleep quality reduces blink rate by 12%</p>
            <p>• Current biometrics suggest optimal eye health conditions</p>
          </div>
        </div>

        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-300">
            ❤️ <strong>Health Integration:</strong> Biometric data helps predict eye strain patterns and optimize break timing based on your physiological state.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiometricIntegration;
