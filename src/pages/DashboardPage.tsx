
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { Link } from 'react-router-dom';
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
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { 
    screenTime, 
    breakSettings, 
    healthLogs, 
    nextCheckupDate,
    isExercising,
    currentExercise 
  } = useEyeCare();

  const calculateHealthScore = () => {
    let score = 100;
    const dailyHours = screenTime.daily / 60;
    if (dailyHours > 8) score -= 30;
    else if (dailyHours > 6) score -= 20;
    else if (dailyHours > 4) score -= 10;
    
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDaysUntilCheckup = () => {
    if (!nextCheckupDate) return null;
    const days = Math.ceil((new Date(nextCheckupDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const checkupDays = getDaysUntilCheckup();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          {getGreeting()}!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive eye health dashboard - tracking, protecting, and optimizing your vision wellness
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(healthScore)}`}>
                  {Math.round(healthScore)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Attention'}
                </p>
              </div>
              <div className="relative">
                <Heart className={`h-12 w-12 ${getScoreColor(healthScore)}`} />
                <div className="absolute inset-0 bg-current opacity-20 rounded-full blur-xl"></div>
              </div>
            </div>
            <Progress value={healthScore} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Screen Time Today</p>
                <p className="text-3xl font-bold text-primary">
                  {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
                </p>
                <Badge variant={screenTime.daily > 360 ? "destructive" : screenTime.daily > 240 ? "secondary" : "outline"} className="text-xs mt-1">
                  {screenTime.daily > 360 ? 'High usage' : screenTime.daily > 240 ? 'Moderate' : 'Good'}
                </Badge>
              </div>
              <Eye className="h-12 w-12 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Break</p>
                <p className="text-2xl font-bold text-purple-600">
                  {breakSettings.interval - (screenTime.daily % breakSettings.interval)} min
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Every {breakSettings.interval} minutes
                </p>
              </div>
              <Timer className="h-12 w-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Checkup</p>
                <p className="text-2xl font-bold text-orange-600">
                  {checkupDays !== null ? (
                    checkupDays <= 0 ? 'Due Now' : `${checkupDays} days`
                  ) : 'Not set'}
                </p>
                <Badge variant={checkupDays !== null && checkupDays <= 7 ? "destructive" : "outline"} className="text-xs mt-1">
                  {checkupDays !== null && checkupDays <= 0 ? 'Overdue' : checkupDays !== null && checkupDays <= 7 ? 'Due soon' : 'Scheduled'}
                </Badge>
              </div>
              <Calendar className={`h-12 w-12 ${checkupDays !== null && checkupDays <= 7 ? 'text-red-500' : 'text-orange-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Exercise Alert */}
      {isExercising && currentExercise && (
        <Card className="border-primary bg-gradient-to-r from-primary/10 to-blue-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Activity className="h-6 w-6 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Exercise in Progress</h3>
                  <p className="text-muted-foreground">{currentExercise.name} - Keep focusing!</p>
                </div>
              </div>
              <Badge className="px-4 py-2">Active Session</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20">
          <Link to="/exercises">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Eye Exercises</h3>
                  <p className="text-sm text-muted-foreground">Strengthen and relax your vision</p>
                </div>
                <ArrowRight className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20">
          <Link to="/monitoring">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Screen Monitoring</h3>
                  <p className="text-sm text-muted-foreground">Track usage and breaks</p>
                </div>
                <ArrowRight className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-red-50/50 dark:from-gray-800 dark:to-red-900/20">
          <Link to="/health">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Health Tracking</h3>
                  <p className="text-sm text-muted-foreground">Log symptoms & schedule checkups</p>
                </div>
                <ArrowRight className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Today's Priorities */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Target className="mr-3 h-6 w-6 text-primary" />
            Today's Eye Care Priorities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Take Regular Breaks</p>
                  <p className="text-sm text-muted-foreground">Follow the 20-20-20 rule consistently</p>
                </div>
              </div>
              <Badge variant="outline">Every {breakSettings.interval}min</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Complete Eye Exercises</p>
                  <p className="text-sm text-muted-foreground">Strengthen and relax your eye muscles</p>
                </div>
              </div>
              <Badge variant={isExercising ? "default" : "outline"}>
                {isExercising ? "In Progress" : "Pending"}
              </Badge>
            </div>

            {screenTime.daily > 300 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">High Screen Time Alert</p>
                    <p className="text-sm text-muted-foreground">Consider taking longer breaks and reducing usage</p>
                  </div>
                </div>
                <Badge variant="destructive">Action Needed</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
