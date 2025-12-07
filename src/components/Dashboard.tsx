import { useEffect, useState } from 'react';
import { useEyeCare } from '@/contexts/EyeCareContext';
import {
  Eye,
  Clock,
  Activity,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Timer,
  Heart,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  Play,
  Brain,
  Shield,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const {
    screenTime,
    breakSettings,
    healthLogs,
    nextCheckupDate,
    isExercising,
    currentExercise
  } = useEyeCare();

  const [animatedScore, setAnimatedScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Calculate health score
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

  // Animate health score on mount
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = healthScore / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= healthScore) {
          setAnimatedScore(healthScore);
          clearInterval(interval);
        } else {
          setAnimatedScore(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(timer);
  }, [healthScore]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const greeting = getGreeting();

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'emerald' };
    if (score >= 60) return { label: 'Good', color: 'amber' };
    return { label: 'Needs Attention', color: 'red' };
  };

  const scoreStatus = getScoreStatus(healthScore);

  const getNextBreakTime = () => {
    const nextBreak = new Date();
    nextBreak.setMinutes(nextBreak.getMinutes() + (breakSettings.interval - (screenTime.daily % breakSettings.interval)));
    return nextBreak.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const getDaysUntilCheckup = () => {
    if (!nextCheckupDate) return null;
    return Math.ceil((new Date(nextCheckupDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  const checkupDays = getDaysUntilCheckup();

  // Calculate weekly average
  const weeklyAvg = screenTime.weekly.reduce((a, b) => a + b, 0) / 7;
  const todayVsAvg = screenTime.daily - weeklyAvg;

  return (
    <div className={`space-y-6 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 lg:p-8 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: Greeting & Stats */}
          <div className="space-y-4">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold">{greeting}</h1>
              <p className="text-white/80 mt-1">Your eyes are in {scoreStatus.label.toLowerCase()} condition</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                <Clock className="w-4 h-4" />
                <div>
                  <p className="text-xs text-white/70">Screen Time</p>
                  <p className="text-sm font-semibold tabular-nums">
                    {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                <Timer className="w-4 h-4" />
                <div>
                  <p className="text-xs text-white/70">Next Break</p>
                  <p className="text-sm font-semibold">{getNextBreakTime()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                <Activity className="w-4 h-4" />
                <div>
                  <p className="text-xs text-white/70">Exercises</p>
                  <p className="text-sm font-semibold">{isExercising ? 'Active' : '0 Today'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Health Score Ring */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="white"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - animatedScore / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tabular-nums">{animatedScore}</span>
                <span className="text-xs text-white/70">Health Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye className="w-5 h-5" />}
          label="Screen Time"
          value={`${Math.floor(screenTime.daily / 60)}h ${Math.floor(screenTime.daily % 60)}m`}
          trend={todayVsAvg > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(Math.round(todayVsAvg))}m vs avg`}
          color="blue"
        />
        <StatCard
          icon={<Heart className="w-5 h-5" />}
          label="Health Score"
          value={`${animatedScore}/100`}
          trend={healthScore >= 70 ? 'up' : 'down'}
          trendValue={scoreStatus.label}
          color="emerald"
        />
        <StatCard
          icon={<Zap className="w-5 h-5" />}
          label="Breaks Today"
          value={`${Math.floor(screenTime.daily / breakSettings.interval)}`}
          trend="up"
          trendValue={`Every ${breakSettings.interval}m`}
          color="amber"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Next Checkup"
          value={checkupDays !== null ? `${checkupDays}d` : 'Not Set'}
          trend={checkupDays !== null && checkupDays <= 7 ? 'down' : 'up'}
          trendValue={checkupDays !== null && checkupDays <= 7 ? 'Due soon' : 'On track'}
          color="purple"
        />
      </div>

      {/* Active Exercise Banner */}
      {isExercising && currentExercise && (
        <div className="rounded-xl bg-emerald-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-white/80">Exercise in Progress</p>
                <p className="text-lg font-semibold">{currentExercise.name}</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-white text-emerald-600 font-medium text-sm hover:bg-white/90 transition-colors">
              View Progress
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction
          icon={<Play className="w-5 h-5" />}
          title="Start Exercise"
          description="5 min eye workout"
          color="emerald"
        />
        <QuickAction
          icon={<Heart className="w-5 h-5" />}
          title="Log Symptoms"
          description="Track your health"
          color="red"
        />
        <QuickAction
          icon={<Brain className="w-5 h-5" />}
          title="AI Insights"
          description="Get recommendations"
          color="purple"
        />
        <QuickAction
          icon={<Calendar className="w-5 h-5" />}
          title="Schedule Checkup"
          description="Book appointment"
          color="blue"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="icon-wrapper icon-wrapper-blue">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Weekly Progress</h3>
                <p className="text-xs text-neutral-500">Screen time by day</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {screenTime.weekly.map((time, index) => {
              const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              const hours = Math.floor(time / 60);
              const minutes = Math.floor(time % 60);
              const isToday = index === new Date().getDay();
              const percentage = Math.min((time / 480) * 100, 100);
              const isHigh = time > 360;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                    isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <span className={`text-sm font-medium w-10 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-500'}`}>
                    {dayNames[index]}
                  </span>
                  <div className="flex-1">
                    <div className="progress-track">
                      <div
                        className={`progress-fill ${isHigh ? 'progress-fill-red' : 'progress-fill-blue'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-sm font-medium tabular-nums w-14 text-right ${
                    isToday ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {hours}h {minutes}m
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Priorities */}
        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="icon-wrapper icon-wrapper-green">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Today's Priorities</h3>
                <p className="text-xs text-neutral-500">Stay on track</p>
              </div>
            </div>
            <span className="tag tag-green">
              <CheckCircle2 className="w-3 h-3" />
              2/4 Done
            </span>
          </div>

          <div className="space-y-2">
            <PriorityItem
              icon={<Clock className="w-4 h-4" />}
              title="Take regular breaks"
              subtitle="Follow the 20-20-20 rule"
              status="pending"
            />
            <PriorityItem
              icon={<Activity className="w-4 h-4" />}
              title="Complete eye exercises"
              subtitle={isExercising ? 'In progress...' : '5 minutes recommended'}
              status={isExercising ? 'active' : 'pending'}
            />
            {healthLogs.length === 0 && (
              <PriorityItem
                icon={<Heart className="w-4 h-4" />}
                title="Log your symptoms"
                subtitle="Track how your eyes feel"
                status="pending"
              />
            )}
            {screenTime.daily > 300 && (
              <PriorityItem
                icon={<AlertCircle className="w-4 h-4" />}
                title="High screen time detected"
                subtitle="Consider taking a longer break"
                status="warning"
              />
            )}
            <PriorityItem
              icon={<Shield className="w-4 h-4" />}
              title="Adjust screen brightness"
              subtitle="Match your environment"
              status="completed"
            />
          </div>
        </div>
      </div>

      {/* Insights Banner */}
      <div className="card-elevated p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white">AI-Powered Insights</h3>
              <p className="text-sm text-neutral-500">Get personalized recommendations</p>
            </div>
          </div>
          <button className="btn-accent whitespace-nowrap">
            View Insights
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({
  icon,
  label,
  value,
  trend,
  trendValue,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: 'up' | 'down';
  trendValue: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple';
}) => {
  const iconWrapperClass = {
    blue: 'icon-wrapper-blue',
    emerald: 'icon-wrapper-green',
    amber: 'icon-wrapper-amber',
    purple: 'icon-wrapper-purple'
  };

  return (
    <div className="card-elevated p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`icon-wrapper ${iconWrapperClass[color]}`}>
          {icon}
        </div>
        <div className={`metric-trend ${trend === 'up' ? 'metric-trend-up' : 'metric-trend-down'}`}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{trendValue}</span>
        </div>
      </div>
      <p className="metric-value text-2xl">{value}</p>
      <p className="metric-label mt-1">{label}</p>
    </div>
  );
};

// Quick Action Component
const QuickAction = ({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'emerald' | 'red' | 'purple' | 'blue';
}) => {
  const bgColors = {
    emerald: 'bg-emerald-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500'
  };

  return (
    <button className="card-elevated p-4 text-left group hover:scale-[1.02] transition-transform">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${bgColors[color]} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-neutral-900 dark:text-white">{title}</p>
          <p className="text-sm text-neutral-500 truncate">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:translate-x-1 transition-all" />
      </div>
    </button>
  );
};

// Priority Item Component
const PriorityItem = ({
  icon,
  title,
  subtitle,
  status
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  status: 'pending' | 'active' | 'completed' | 'warning';
}) => {
  const statusStyles = {
    pending: 'bg-neutral-50 dark:bg-neutral-800/50',
    active: 'bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-200 dark:ring-blue-800',
    completed: 'bg-emerald-50 dark:bg-emerald-900/20',
    warning: 'bg-amber-50 dark:bg-amber-900/20'
  };

  const iconStyles = {
    pending: 'text-neutral-500',
    active: 'text-blue-600 dark:text-blue-400',
    completed: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400'
  };

  const tagClass = {
    pending: 'tag',
    active: 'tag tag-blue',
    completed: 'tag tag-green',
    warning: 'tag tag-amber'
  };

  const tagText = {
    pending: 'Pending',
    active: 'In Progress',
    completed: 'Done',
    warning: 'Alert'
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${statusStyles[status]}`}>
      <div className={`w-8 h-8 rounded-lg bg-white dark:bg-neutral-900 flex items-center justify-center ${iconStyles[status]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-neutral-900 dark:text-white truncate">{title}</p>
        <p className="text-xs text-neutral-500 truncate">{subtitle}</p>
      </div>
      <span className={tagClass[status]}>
        {tagText[status]}
      </span>
    </div>
  );
};

export default Dashboard;
