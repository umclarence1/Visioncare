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
      {/* Hero Section - Premium Design */}
      <div className="hero-card-teal">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-purple w-64 h-64 -top-20 -right-20" style={{ animationDelay: '0s' }} />
          <div className="orb orb-pink w-48 h-48 bottom-0 left-1/4" style={{ animationDelay: '2s' }} />
          <div className="orb orb-teal w-32 h-32 top-1/2 right-1/3" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left: Greeting & Stats */}
          <div className="space-y-5 animate-slide-up">
            <div>
              <div className="glass-badge mb-3">
                <Sparkles className="w-4 h-4 animate-sparkle" />
                <span className="text-sm font-medium">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">{greeting}</h1>
              <p className="text-white/80 mt-2 text-lg">
                Your eyes are in <span className="font-semibold text-white">{scoreStatus.label.toLowerCase()}</span> condition
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="glass-badge px-4 py-2.5 hover:bg-white/20 transition-colors cursor-pointer">
                <Clock className="w-5 h-5" />
                <div>
                  <p className="text-xs text-white/70">Screen Time</p>
                  <p className="text-sm font-bold tabular-nums">
                    {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
                  </p>
                </div>
              </div>

              <div className="glass-badge px-4 py-2.5 hover:bg-white/20 transition-colors cursor-pointer">
                <Timer className="w-5 h-5" />
                <div>
                  <p className="text-xs text-white/70">Next Break</p>
                  <p className="text-sm font-bold">{getNextBreakTime()}</p>
                </div>
              </div>

              <div className="glass-badge px-4 py-2.5 hover:bg-white/20 transition-colors cursor-pointer">
                <Activity className="w-5 h-5" />
                <div>
                  <p className="text-xs text-white/70">Status</p>
                  <p className="text-sm font-bold">{isExercising ? 'Exercising' : 'Tracking'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Health Score Ring - Enhanced */}
          <div className="flex justify-center lg:justify-end animate-scale-in delay-200">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full ring-pulse-animation"
                   style={{ boxShadow: '0 0 40px rgba(255,255,255,0.3)' }} />

              <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 180 180">
                {/* Background circle */}
                <circle
                  cx="90"
                  cy="90"
                  r="80"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Animated progress circle */}
                <circle
                  cx="90"
                  cy="90"
                  r="80"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - animatedScore / 100)}`}
                  className="transition-all duration-1500 ease-out"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold tabular-nums animate-count">{animatedScore}</span>
                <span className="text-sm text-white/80 font-medium">Health Score</span>
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

      {/* Active Exercise Banner - Premium Design */}
      {isExercising && currentExercise && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 p-5 text-white breathing-glow">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Activity className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <p className="text-sm text-white/80 font-medium">Exercise in Progress</p>
                </div>
                <p className="text-xl font-bold">{currentExercise.name}</p>
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-white text-emerald-600 font-semibold text-sm hover:bg-white/90 transition-all hover:scale-105 shadow-lg">
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

      {/* AI Insights Banner - Premium Design */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-white/80 animate-sparkle" />
                <span className="text-white/80 text-sm font-medium">Powered by AI</span>
              </div>
              <h3 className="text-xl font-bold text-white">Personalized Health Insights</h3>
              <p className="text-white/70 text-sm">Get smart recommendations based on your habits</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-white text-purple-600 font-semibold flex items-center gap-2 hover:bg-white/90 transition-all hover:scale-105 shadow-lg whitespace-nowrap">
            View Insights
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component - Premium Design
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

  const glowColors = {
    blue: 'group-hover:shadow-blue-500/20',
    emerald: 'group-hover:shadow-emerald-500/20',
    amber: 'group-hover:shadow-amber-500/20',
    purple: 'group-hover:shadow-purple-500/20'
  };

  return (
    <div className={`card-elevated p-5 group hover-lift ${glowColors[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`icon-wrapper ${iconWrapperClass[color]} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className={`metric-trend ${trend === 'up' ? 'metric-trend-up' : 'metric-trend-down'}`}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{trendValue}</span>
        </div>
      </div>
      <p className="metric-value text-3xl">{value}</p>
      <p className="metric-label mt-1">{label}</p>
    </div>
  );
};

// Quick Action Component - Premium Design
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
    emerald: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    red: 'bg-gradient-to-br from-red-400 to-red-600',
    purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600'
  };

  const shadowColors = {
    emerald: 'group-hover:shadow-emerald-500/30',
    red: 'group-hover:shadow-red-500/30',
    purple: 'group-hover:shadow-purple-500/30',
    blue: 'group-hover:shadow-blue-500/30'
  };

  return (
    <button className={`card-elevated p-5 text-left group hover-lift ${shadowColors[color]}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${bgColors[color]} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-neutral-900 dark:text-white">{title}</p>
          <p className="text-sm text-neutral-500 truncate">{description}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
          <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
        </div>
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
