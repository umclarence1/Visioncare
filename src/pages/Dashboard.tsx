
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
      title: 'Today\'s Screen Time',
      value: `${Math.floor(screenTime.daily / 60)}h ${Math.floor(screenTime.daily % 60)}m`,
      change: '+15%',
      trend: 'up',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Eye Health Score',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: Eye,
      color: 'emerald'
    },
    {
      title: 'Breaks Taken',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Weekly Progress',
      value: '78%',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'amber'
    }
  ];

  const quickActions = [
    {
      title: 'Start Eye Exercise',
      description: 'Quick 5-minute eye workout',
      icon: Activity,
      link: '/exercises',
      color: 'emerald',
      urgent: false
    },
    {
      title: 'Log Symptoms',
      description: 'Track how your eyes feel today',
      icon: Heart,
      link: '/health',
      color: 'red',
      urgent: healthLogs.length === 0
    },
    {
      title: 'AI Health Insights',
      description: 'Get personalized recommendations',
      icon: Brain,
      link: '/ai-insights',
      color: 'purple',
      urgent: false
    },
    {
      title: 'Schedule Checkup',
      description: 'Book your next eye exam',
      icon: Calendar,
      link: '/appointments',
      color: 'blue',
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Good morning! 👋
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
              Let's take care of your eyes today
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={isTracking ? 'default' : 'secondary'} className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              {isTracking ? 'Tracking Active' : 'Tracking Paused'}
            </Badge>
            {isExercising && (
              <Badge variant="default" className="px-4 py-2 bg-emerald-500">
                <Activity className="h-4 w-4 mr-2" />
                Exercise Active
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                      <span className="text-sm text-emerald-500 font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`h-8 w-8 text-${stat.color}-600 dark:text-${stat.color}-400`} />
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
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-xl bg-${action.color}-100 dark:bg-${action.color}-900/20 mr-3`}>
                          <Icon className={`h-5 w-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                        </div>
                        {action.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
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
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
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
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 p-1">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Health Score</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your eyes are in good condition. Keep up the good work!
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Screen Time Goal</span>
                  <span className="text-sm font-medium">6h remaining</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <Link to="/health">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
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
