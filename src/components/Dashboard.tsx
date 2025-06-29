
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { 
  Eye, 
  Clock, 
  Activity, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Timer,
  Heart
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    screenTime, 
    breakSettings, 
    healthLogs, 
    nextCheckupDate,
    isExercising,
    currentExercise 
  } = useEyeCare();

  // Calculate health score based on multiple factors
  const calculateHealthScore = () => {
    let score = 100;
    
    // Screen time impact
    const dailyHours = screenTime.daily / 60;
    if (dailyHours > 8) score -= 30;
    else if (dailyHours > 6) score -= 20;
    else if (dailyHours > 4) score -= 10;
    
    // Recent symptoms impact
    const recentLogs = healthLogs.filter(log => {
      const logDate = new Date(log.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate > weekAgo;
    });
    
    const avgSeverity = recentLogs.length > 0 
      ? recentLogs.reduce((sum, log) => sum + log.severity, 0) / recentLogs.length 
      : 0;
    
    score -= avgSeverity * 10;
    
    return Math.max(0, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getNextBreakTime = () => {
    const nextBreak = new Date();
    nextBreak.setMinutes(nextBreak.getMinutes() + (breakSettings.interval - (screenTime.daily % breakSettings.interval)));
    return nextBreak.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getDaysUntilCheckup = () => {
    if (!nextCheckupDate) return null;
    const days = Math.ceil((new Date(nextCheckupDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const checkupDays = getDaysUntilCheckup();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}!</h1>
        <p className="text-muted-foreground">Here's your eye health overview for today</p>
      </div>

      {/* Health Score & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-gradient">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Health Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(healthScore)}`}>
                  {Math.round(healthScore)}
                </p>
              </div>
              <Heart className={`h-8 w-8 ${getScoreColor(healthScore)}`} />
            </div>
            <Progress value={healthScore} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Screen Time</p>
                <p className="text-2xl font-bold">
                  {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
                </p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2">
              <Badge variant={screenTime.daily > 360 ? "destructive" : screenTime.daily > 240 ? "secondary" : "outline"} className="text-xs">
                {screenTime.daily > 360 ? 'High usage' : screenTime.daily > 240 ? 'Moderate' : 'Good'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Break</p>
                <p className="text-2xl font-bold">{getNextBreakTime()}</p>
              </div>
              <Timer className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {breakSettings.interval} min intervals
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Checkup</p>
                <p className="text-2xl font-bold">
                  {checkupDays !== null ? (
                    checkupDays <= 0 ? 'Due' : `${checkupDays}d`
                  ) : 'Not set'}
                </p>
              </div>
              <Calendar className={`h-8 w-8 ${checkupDays !== null && checkupDays <= 7 ? 'text-red-500' : 'text-green-500'}`} />
            </div>
            <div className="mt-2">
              <Badge variant={checkupDays !== null && checkupDays <= 7 ? "destructive" : "outline"} className="text-xs">
                {checkupDays !== null && checkupDays <= 0 ? 'Overdue' : checkupDays !== null && checkupDays <= 7 ? 'Due soon' : 'Scheduled'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Exercise Status */}
      {isExercising && currentExercise && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-primary animate-pulse" />
                <div>
                  <p className="font-medium">Exercise in Progress</p>
                  <p className="text-sm text-muted-foreground">{currentExercise.name}</p>
                </div>
              </div>
              <Badge>Active</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Priorities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5" />
            Today's Eye Care Priorities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="font-medium">Take regular breaks</p>
                  <p className="text-sm text-muted-foreground">Follow the 20-20-20 rule</p>
                </div>
              </div>
              <Badge variant="outline">Every {breakSettings.interval}min</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-green-500" />
                <div>
                  <p className="font-medium">Complete eye exercises</p>
                  <p className="text-sm text-muted-foreground">Strengthen and relax your eyes</p>
                </div>
              </div>
              <Badge variant={isExercising ? "default" : "outline"}>
                {isExercising ? "In Progress" : "Pending"}
              </Badge>
            </div>

            {healthLogs.length === 0 && (
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="font-medium">Log your symptoms</p>
                    <p className="text-sm text-muted-foreground">Track your eye health progress</p>
                  </div>
                </div>
                <Badge variant="outline">New</Badge>
              </div>
            )}

            {screenTime.daily > 300 && (
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="font-medium">High screen time detected</p>
                    <p className="text-sm text-muted-foreground">Consider taking longer breaks</p>
                  </div>
                </div>
                <Badge variant="secondary">Alert</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {screenTime.weekly.map((time, index) => {
                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const hours = Math.floor(time / 60);
                const minutes = Math.floor(time % 60);
                const isToday = index === new Date().getDay();
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-sm ${isToday ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
                      {dayNames[index]}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Progress value={Math.min((time / 480) * 100, 100)} className="w-20 h-2" />
                      <span className="text-sm w-12 text-right">
                        {hours}h{minutes > 0 ? ` ${minutes}m` : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Health Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {healthLogs.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recent symptoms</span>
                    <Badge variant="outline">{healthLogs.length} entries</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average severity</span>
                    <Badge variant={healthLogs[0]?.severity > 3 ? "destructive" : "outline"}>
                      {healthLogs.length > 0 ? `${(healthLogs.slice(0, 5).reduce((sum, log) => sum + log.severity, 0) / Math.min(5, healthLogs.length)).toFixed(1)}/5` : 'N/A'}
                    </Badge>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No health data yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Start logging your symptoms to see insights</p>
                </div>
              )}
              
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Next checkup</span>
                  <Badge variant={checkupDays !== null && checkupDays <= 30 ? "default" : "outline"}>
                    {nextCheckupDate ? new Date(nextCheckupDate).toLocaleDateString() : 'Not scheduled'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
