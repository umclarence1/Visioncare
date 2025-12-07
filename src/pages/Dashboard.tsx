import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEyeCare } from '@/contexts/EyeCareContext';
import {
  Eye,
  Activity,
  Clock,
  TrendingUp,
  Brain,
  Heart,
  Shield,
  Calendar,
  ArrowRight,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { screenTime, isTracking, healthLogs, isExercising } = useEyeCare();

  const quickStats = [
    {
      title: "Today's Screen Time",
      value: `${Math.floor(screenTime.daily / 60)}h ${Math.floor(screenTime.daily % 60)}m`,
      change: '+15%',
      trend: 'up',
      icon: Clock,
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Eye Health Score',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: Eye,
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      title: 'Breaks Taken',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Activity,
      color: 'from-purple-500 to-purple-700'
    },
    {
      title: 'Weekly Progress',
      value: '78%',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-700'
    }
  ];

  const quickActions = [
    {
      title: 'Start Eye Exercise',
      description: 'Quick 5-minute eye workout',
      icon: Activity,
      link: '/exercises',
      color: 'from-emerald-500 to-emerald-700',
      urgent: false
    },
    {
      title: 'Log Symptoms',
      description: 'Track how your eyes feel today',
      icon: Heart,
      link: '/health',
      color: 'from-red-500 to-red-700',
      urgent: healthLogs.length === 0
    },
    {
      title: 'AI Health Insights',
      description: 'Get personalized recommendations',
      icon: Brain,
      link: '/ai-insights',
      color: 'from-purple-500 to-purple-700',
      urgent: false
    },
    {
      title: 'Schedule Checkup',
      description: 'Book your next eye exam',
      icon: Calendar,
      link: '/appointments',
      color: 'from-blue-500 to-blue-700',
      urgent: false
    }
  ];

  const recentActivity = [
    { time: '2 hours ago', action: 'Completed 20-20-20 exercise', type: 'success' },
    { time: '4 hours ago', action: 'Exceeded recommended screen time', type: 'warning' },
    { time: '6 hours ago', action: 'Logged eye strain symptoms', type: 'info' },
    { time: '1 day ago', action: 'Completed weekly eye health assessment', type: 'success' }
  ];

  return (
    <div className="space-y-10 px-2 md:px-0">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Good morning! <span role="img" aria-label="wave">👋</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Your personalized eye health dashboard
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={isTracking ? 'default' : 'secondary'} className="px-4 py-2 text-base rounded-lg shadow">
            <Shield className="h-5 w-5 mr-2" />
            {isTracking ? 'Tracking Active' : 'Tracking Paused'}
          </Badge>
          {isExercising && (
            <Badge variant="default" className="px-4 py-2 bg-emerald-500 text-base rounded-lg shadow">
              <Activity className="h-5 w-5 mr-2" />
              Exercise Active
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br {stat.color} text-white">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/80 to-transparent" />
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-90">{stat.title}</p>
                    <p className="text-3xl font-extrabold mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-white mr-1" />
                      <span className="text-sm font-semibold">{stat.change}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/20">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} to={action.link}>
              <Card className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br ${action.color} text-white cursor-pointer`}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-xl bg-white/20 mr-3">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        {action.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity & Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-bold">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800/70">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/20' :
                    activity.type === 'warning' ? 'bg-amber-100 dark:bg-amber-900/20' :
                    'bg-blue-100 dark:bg-blue-900/20'
                  }`}>
                    {activity.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : activity.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/monitoring">
              <Button variant="ghost" className="w-full mt-4 group">
                View All Activity
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Health Overview */}
        <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-bold">
              <Eye className="h-5 w-5 mr-2" />
              Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">85%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Health Score</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                  Your eyes are in good condition. Keep up the good work!
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Screen Time Goal</span>
                  <span className="text-sm font-semibold">6h remaining</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <Link to="/health">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold shadow">
                  View Detailed Health Report
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;