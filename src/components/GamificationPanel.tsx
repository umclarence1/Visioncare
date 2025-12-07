import { useState, useEffect } from 'react';
import { useEyeCare } from '@/contexts/EyeCareContext';
import {
  Trophy,
  Target,
  Flame,
  Star,
  Award,
  Zap,
  Crown,
  Medal,
  Gift,
  TrendingUp,
  Lock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: string;
  color: string;
}

const GamificationPanel = () => {
  const { screenTime, healthLogs, exerciseHistory } = useEyeCare();
  const [mounted, setMounted] = useState(false);
  const [animatedXP, setAnimatedXP] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateStreakDays = (): number => {
    return Math.min(healthLogs.length + exerciseHistory.length, 30);
  };

  const getUserLevel = (): number => {
    const totalActions = healthLogs.length + exerciseHistory.length + (screenTime.daily < 300 ? 1 : 0);
    return Math.floor(totalActions / 5) + 1;
  };

  const getExperiencePoints = (): number => {
    return healthLogs.length * 10 + exerciseHistory.length * 15 + (screenTime.daily < 300 ? 25 : 0);
  };

  const streakDays = calculateStreakDays();
  const userLevel = getUserLevel();
  const xp = getExperiencePoints();
  const nextLevelXp = userLevel * 50;
  const xpProgress = (xp / nextLevelXp) * 100;

  // Animate XP on mount
  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        const duration = 1000;
        const steps = 30;
        const increment = xp / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= xp) {
            setAnimatedXP(xp);
            clearInterval(interval);
          } else {
            setAnimatedXP(Math.round(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [xp, mounted]);

  const achievements: Achievement[] = [
    {
      id: 'first-log',
      title: 'Health Tracker',
      description: 'Log your first symptom',
      icon: <Star className="w-5 h-5" />,
      unlocked: healthLogs.length >= 1,
      progress: Math.min(healthLogs.length, 1),
      maxProgress: 1,
      reward: '+10 XP',
      color: 'from-amber-400 to-yellow-500'
    },
    {
      id: 'exercise-starter',
      title: 'Exercise Enthusiast',
      description: 'Complete 5 eye exercises',
      icon: <Target className="w-5 h-5" />,
      unlocked: exerciseHistory.length >= 5,
      progress: Math.min(exerciseHistory.length, 5),
      maxProgress: 5,
      reward: '+50 XP',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'streak-master',
      title: 'Consistency King',
      description: 'Maintain a 7-day streak',
      icon: <Flame className="w-5 h-5" />,
      unlocked: streakDays >= 7,
      progress: Math.min(streakDays, 7),
      maxProgress: 7,
      reward: '+100 XP',
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'screen-guardian',
      title: 'Screen Guardian',
      description: 'Keep daily screen time under 5 hours',
      icon: <Award className="w-5 h-5" />,
      unlocked: screenTime.daily < 300,
      progress: screenTime.daily < 300 ? 1 : 0,
      maxProgress: 1,
      reward: '+25 XP',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'health-expert',
      title: 'Health Expert',
      description: 'Log symptoms for 30 days',
      icon: <Crown className="w-5 h-5" />,
      unlocked: healthLogs.length >= 30,
      progress: Math.min(healthLogs.length, 30),
      maxProgress: 30,
      reward: '+200 XP',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'exercise-master',
      title: 'Exercise Master',
      description: 'Complete 50 eye exercises',
      icon: <Medal className="w-5 h-5" />,
      unlocked: exerciseHistory.length >= 50,
      progress: Math.min(exerciseHistory.length, 50),
      maxProgress: 50,
      reward: '+300 XP',
      color: 'from-red-400 to-rose-500'
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className={`space-y-6 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Level Card - Premium Design */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 p-6 lg:p-8">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: Level Info */}
          <div className="flex items-center gap-5 animate-slide-up">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
                <span className="text-4xl font-bold text-white">{userLevel}</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <div className="glass-badge mb-2">
                <Sparkles className="w-4 h-4 animate-sparkle" />
                <span className="text-sm font-medium">Champion</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white">Level {userLevel}</h2>
              <p className="text-white/70">Eye Care Master</p>
            </div>
          </div>

          {/* Right: XP Display */}
          <div className="flex items-center gap-4 animate-scale-in delay-200">
            <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 justify-center mb-1">
                <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
                <span className="text-3xl font-bold text-white tabular-nums">{animatedXP}</span>
              </div>
              <p className="text-sm text-white/70">Total XP</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white tabular-nums">{nextLevelXp - xp}</div>
              <p className="text-sm text-white/70">XP to Level Up</p>
            </div>
          </div>
        </div>

        {/* Progress Bar - Glass Style */}
        <div className="relative mt-6">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span className="font-medium">Progress to Level {userLevel + 1}</span>
            <span className="tabular-nums font-bold">{Math.round(xpProgress)}%</span>
          </div>
          <div className="h-4 rounded-full bg-white/15 overflow-hidden backdrop-blur-sm">
            <div
              className="h-full rounded-full bg-gradient-to-r from-white to-white/80 transition-all duration-1000"
              style={{ width: `${xpProgress}%`, boxShadow: '0 0 20px rgba(255,255,255,0.4)' }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox
          icon={<Flame className="w-5 h-5" />}
          value={streakDays}
          label="Day Streak"
          color="amber"
        />
        <StatBox
          icon={<Trophy className="w-5 h-5" />}
          value={unlockedAchievements.length}
          label="Achievements"
          color="purple"
        />
        <StatBox
          icon={<Target className="w-5 h-5" />}
          value={exerciseHistory.length}
          label="Exercises"
          color="emerald"
        />
        <StatBox
          icon={<Star className="w-5 h-5" />}
          value={healthLogs.length}
          label="Health Logs"
          color="blue"
        />
      </div>

      {/* Achievements Section */}
      <div className="card-elevated p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white">Achievements</h3>
              <p className="text-xs text-neutral-500">{unlockedAchievements.length} of {achievements.length} unlocked</p>
            </div>
          </div>
          <span className="tag tag-purple">
            <Sparkles className="w-3 h-3" />
            {unlockedAchievements.length}/{achievements.length}
          </span>
        </div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Unlocked ({unlockedAchievements.length})
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unlockedAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                In Progress ({lockedAchievements.length})
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lockedAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} locked />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Motivation Banner - Premium Design */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white animate-sparkle" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-1">Keep Going!</h4>
            <p className="text-white/80 text-sm">
              You're on a <span className="font-bold text-white">{streakDays}-day streak</span>! Complete more exercises and log symptoms to level up faster.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Box Component - Premium Design
const StatBox = ({
  icon,
  value,
  label,
  color
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: 'amber' | 'purple' | 'emerald' | 'blue';
}) => {
  const iconWrapperClass = {
    amber: 'icon-wrapper-amber',
    purple: 'icon-wrapper-purple',
    emerald: 'icon-wrapper-green',
    blue: 'icon-wrapper-blue'
  };

  const glowColors = {
    amber: 'group-hover:shadow-amber-500/20',
    purple: 'group-hover:shadow-purple-500/20',
    emerald: 'group-hover:shadow-emerald-500/20',
    blue: 'group-hover:shadow-blue-500/20'
  };

  return (
    <div className={`card-elevated p-5 group hover-lift ${glowColors[color]}`}>
      <div className={`icon-wrapper ${iconWrapperClass[color]} mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">{value}</p>
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
  );
};

// Achievement Card Component
const AchievementCard = ({
  achievement,
  locked = false
}: {
  achievement: Achievement;
  locked?: boolean;
}) => {
  const progressPercent = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <div className={`p-4 rounded-xl transition-colors ${
      locked
        ? 'bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700'
        : `bg-gradient-to-br ${achievement.color} text-white`
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          locked ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500' : 'bg-white/20'
        }`}>
          {locked ? <Lock className="w-4 h-4" /> : achievement.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className={`font-medium text-sm truncate ${locked ? 'text-neutral-700 dark:text-neutral-300' : ''}`}>
              {achievement.title}
            </h4>
            {!locked && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
          </div>
          <p className={`text-xs mb-2 ${locked ? 'text-neutral-500' : 'text-white/80'}`}>
            {achievement.description}
          </p>

          {locked && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-neutral-500">
                <span>{achievement.progress}/{achievement.maxProgress}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-1 rounded-full bg-neutral-200 dark:bg-neutral-600 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium ${
            locked
              ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
              : 'bg-white/20'
          }`}>
            <Zap className="w-3 h-3" />
            {achievement.reward}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;
