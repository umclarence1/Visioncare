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
      {/* Level & XP Card */}
      <div className="card-elevated p-5 overflow-hidden">
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            {/* Level Badge */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{userLevel}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Level {userLevel}</h2>
                <p className="text-sm text-neutral-500">Eye Care Champion</p>
              </div>
            </div>

            {/* XP Display */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">{animatedXP}</span>
                  <span className="text-neutral-500">XP</span>
                </div>
                <p className="text-sm text-neutral-500">{nextLevelXp - xp} XP to next level</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5">
            <div className="flex justify-between text-sm text-neutral-500 mb-2">
              <span>Progress to Level {userLevel + 1}</span>
              <span className="tabular-nums">{Math.round(xpProgress)}%</span>
            </div>
            <div className="h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
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

      {/* Motivation Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold mb-0.5">Keep Going!</h4>
            <p className="text-white/80 text-sm">
              You're on a {streakDays}-day streak! Complete more exercises and log symptoms to level up faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Box Component
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

  return (
    <div className="card-elevated p-4">
      <div className={`icon-wrapper ${iconWrapperClass[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-xl font-bold text-neutral-900 dark:text-white tabular-nums">{value}</p>
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
