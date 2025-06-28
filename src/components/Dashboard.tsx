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
  Heart,
  Sparkles,
  Shield,
  Zap,
  Target,
  Award
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
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-500';
    if (score >= 60) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-pink-500';
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="icon-container animate-float">
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gradient">
            {getGreeting()}!
          </h1>
          <div className="icon-container animate-float delay-500">
            <Eye className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
          Your comprehensive eye health overview for today
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-400"></div>
        </div>
      </div>

      {/* Health Score & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="floating-card border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Health Score</p>
                <p className={`text-4xl font-bold ${getScoreColor(healthScore)} animate-pulse`}>
                  {Math.round(healthScore)}
                </p>
              </div>
              <div className="icon-container-success">
                <Heart className={`h-8 w-8 ${getScoreColor(healthScore)} animate-breathe`} />
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={healthScore} className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className={`h-full bg-gradient-to-r ${getScoreGradient(healthScore)} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${healthScore}%` }}
                />
              </Progress>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Poor</span>
                <span className="text-gray-500">Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="floating-card border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Screen Time</p>
                <p className="text-4xl font-bold text-gradient">
                  {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
                </p>
              </div>
              <div className="icon-container">
                <Eye className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={screenTime.daily > 360 ? "destructive" : screenTime.daily > 240 ? "secondary" : "outline"}
                className="px-3 py-1 rounded-full font-medium"
              >
                {screenTime.daily > 360 ? '🔴 High usage' : screenTime.daily > 240 ? '🟡 Moderate' : '🟢 Good'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="floating-card border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Break</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 animate-pulse">
                  {getNextBreakTime()}
                </p>
              </div>
              <div className="icon-container-warning">
                <Timer className="h-8 w-8 text-amber-600 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1 rounded-full font-medium">
                ⏰ Every {breakSettings.interval} minutes
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="floating-card border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Checkup</p>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {checkupDays !== null ? (
                    checkupDays <= 0 ? 'Due' : `${checkupDays}d`
                  ) : 'Not set'}
                </p>
              </div>
              <div className={`${checkupDays !== null && checkupDays <= 7 ? 'icon-container-warning' : 'icon-container-success'}`}>
                <Calendar className={`h-8 w-8 ${checkupDays !== null && checkupDays <= 7 ? 'text-red-600' : 'text-emerald-600'} animate-pulse`} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={checkupDays !== null && checkupDays <= 7 ? "destructive" : "outline"}
                className="px-3 py-1 rounded-full font-medium"
              >
                {checkupDays !== null && checkupDays <= 0 ? '🚨 Overdue' : 
                 checkupDays !== null && checkupDays <= 7 ? '⚠️ Due soon' : '✅ Scheduled'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Exercise Status */}
      {isExercising && currentExercise && (
        <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/20 dark:via-gray-900 dark:to-emerald-950/20 animate-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="icon-container-success animate-pulse">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-emerald-800 dark:text-emerald-200">Exercise in Progress</p>
                  <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">{currentExercise.name}</p>
                </div>
              </div>
              <Badge className="status-indicator status-active text-lg px-4 py-2 animate-pulse">
                🎯 Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Priorities */}
      <Card className="floating-card border-none">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="icon-container">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-gradient">Today's Eye Care Priorities</span>
            <div className="icon-container animate-float">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 pro-card rounded-2xl pro-card-hover">
              <div className="flex items-center space-x-4">
                <div className="icon-container">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Take regular breaks</p>
                  <p className="text-gray-600 dark:text-gray-400">Follow the 20-20-20 rule</p>
                </div>
              </div>
              <Badge variant="outline" className="px-3 py-1 rounded-full font-medium">
                Every {breakSettings.interval}min
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 pro-card rounded-2xl pro-card-hover">
              <div className="flex items-center space-x-4">
                <div className="icon-container-success">
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Complete eye exercises</p>
                  <p className="text-gray-600 dark:text-gray-400">Strengthen and relax your eyes</p>
                </div>
              </div>
              <Badge variant={isExercising ? "default" : "outline"} className="px-3 py-1 rounded-full font-medium">
                {isExercising ? "🎯 In Progress" : "⏳ Pending"}
              </Badge>
            </div>

            {healthLogs.length === 0 && (
              <div className="flex items-center justify-between p-4 pro-card rounded-2xl pro-card-hover">
                <div className="flex items-center space-x-4">
                  <div className="icon-container-warning">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Log your symptoms</p>
                    <p className="text-gray-600 dark:text-gray-400">Track your eye health progress</p>
                  </div>
                </div>
                <Badge variant="outline" className="px-3 py-1 rounded-full font-medium">
                  ✨ New
                </Badge>
              </div>
            )}

            {screenTime.daily > 300 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-700/50">
                <div className="flex items-center space-x-4">
                  <div className="icon-container-warning">
                    <AlertCircle className="h-5 w-5 text-amber-600 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-amber-800 dark:text-amber-200">High screen time detected</p>
                    <p className="text-amber-600 dark:text-amber-400">Consider taking longer breaks</p>
                  </div>
                </div>
                <Badge variant="secondary" className="px-3 py-1 rounded-full font-medium bg-amber-200 text-amber-800">
                  🚨 Alert
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="floating-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="icon-container">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-gradient">Weekly Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {screenTime.weekly.map((time, index) => {
                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const hours = Math.floor(time / 60);
                const minutes = Math.floor(time % 60);
                const isToday = index === new Date().getDay();
                const percentage = Math.min((time / 480) * 100, 100);
                
                return (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${isToday ? 'pro-card' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <span className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {dayNames[index]} {isToday && '(Today)'}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-16 text-right">
                        {hours}h{minutes > 0 ? ` ${minutes}m` : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="floating-card border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="icon-container-success">
                <Shield className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-gradient-emerald">Health Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthLogs.length > 0 ? (
                <>
                  <div className="flex items-center justify-between p-3 pro-card rounded-xl">
                    <span className="text-sm font-medium">Recent symptoms</span>
                    <Badge variant="outline" className="px-3 py-1 rounded-full">
                      📊 {healthLogs.length} entries
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 pro-card rounded-xl">
                    <span className="text-sm font-medium">Average severity</span>
                    <Badge variant={healthLogs[0]?.severity > 3 ? "destructive" : "outline"} className="px-3 py-1 rounded-full">
                      {healthLogs.length > 0 ? `${(healthLogs.slice(0, 5).reduce((sum, log) => sum + log.severity, 0) / Math.min(5, healthLogs.length)).toFixed(1)}/5` : 'N/A'}
                    </Badge>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 pro-card rounded-xl">
                  <div className="icon-container mx-auto mb-4">
                    <Heart className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400">No health data yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start logging your symptoms to see insights</p>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-3 pro-card rounded-xl">
                  <span className="text-sm font-medium">Next checkup</span>
                  <Badge variant={checkupDays !== null && checkupDays <= 30 ? "default" : "outline"} className="px-3 py-1 rounded-full">
                    {nextCheckupDate ? new Date(nextCheckupDate).toLocaleDateString() : '📅 Not scheduled'}
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
