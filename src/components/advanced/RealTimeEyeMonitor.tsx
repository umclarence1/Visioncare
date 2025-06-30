
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEyeTracking } from '@/hooks/useEyeTracking';
import { Eye, Camera, AlertTriangle, Activity, Target, Zap } from 'lucide-react';

const RealTimeEyeMonitor: React.FC = () => {
  const { 
    isTracking, 
    trackingData, 
    hasPermission, 
    startTracking, 
    stopTracking, 
    requestCameraPermission 
  } = useEyeTracking();

  const getFatigueColor = (level: number) => {
    if (level > 70) return 'text-red-600';
    if (level > 40) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getFocusPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'concentrated': return <Target className="h-4 w-4 text-blue-600" />;
      case 'scattered': return <Zap className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-emerald-600" />;
    }
  };

  return (
    <Card className="floating-card border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="icon-container">
            <Camera className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-gradient">Real-Time Eye Monitoring</span>
          {isTracking && (
            <Badge className="bg-emerald-100 text-emerald-800 animate-pulse">
              🔴 Live
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasPermission ? (
          <div className="text-center space-y-4 py-8">
            <div className="icon-container mx-auto">
              <Eye className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Camera Access Required</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Enable camera access for advanced eye tracking and fatigue detection
              </p>
              <Button onClick={requestCameraPermission} className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Enable Camera Access
              </Button>
            </div>
          </div>
        ) : !isTracking ? (
          <div className="text-center space-y-4">
            <Button onClick={startTracking} size="lg" className="w-full">
              <Eye className="mr-2 h-5 w-5" />
              Start Eye Tracking
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced AI will monitor your eye movements, blink patterns, and fatigue levels
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Real-time metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Blink Rate</span>
                  <span className="text-lg font-bold text-blue-600">
                    {trackingData.blinkRate.toFixed(1)}/min
                  </span>
                </div>
                <Progress value={(trackingData.blinkRate / 30) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Attention</span>
                  <span className="text-lg font-bold text-emerald-600">
                    {trackingData.attentionScore.toFixed(0)}%
                  </span>
                </div>
                <Progress value={trackingData.attentionScore} className="h-2" />
              </div>
            </div>

            {/* Fatigue level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Fatigue Level</span>
                <span className={`text-lg font-bold ${getFatigueColor(trackingData.fatigueLevel)}`}>
                  {trackingData.fatigueLevel.toFixed(0)}%
                </span>
              </div>
              <Progress value={trackingData.fatigueLevel} className="h-3 rounded-full" />
              {trackingData.fatigueLevel > 60 && (
                <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-amber-700 dark:text-amber-300">
                    High fatigue detected - consider taking a break
                  </span>
                </div>
              )}
            </div>

            {/* Focus pattern */}
            <div className="flex items-center justify-between p-3 pro-card rounded-xl">
              <div className="flex items-center gap-2">
                {getFocusPatternIcon(trackingData.focusPattern)}
                <span className="text-sm font-medium">Focus Pattern</span>
              </div>
              <Badge variant="outline" className="capitalize">
                {trackingData.focusPattern}
              </Badge>
            </div>

            {/* Pupil data */}
            <div className="flex items-center justify-between p-3 pro-card rounded-xl">
              <span className="text-sm font-medium">Pupil Response</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 bg-gray-900 rounded-full transition-all duration-500"
                  style={{ 
                    transform: `scale(${trackingData.pupilDilation})`,
                  }}
                />
                <span className="text-sm text-gray-600">
                  {(trackingData.pupilDilation * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <Button onClick={stopTracking} variant="outline" className="w-full">
              Stop Tracking
            </Button>
          </div>
        )}

        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡 <strong>AI-Powered:</strong> Our advanced computer vision algorithms analyze micro-movements and physiological indicators for unprecedented accuracy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeEyeMonitor;
