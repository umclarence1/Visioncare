
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
  TrendingUp
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
}

const GamificationPanel: React.FC = () => {
  const { screenTime, healthLogs, exerciseHistory } = useEyeCare();

  const calculateStreakDays = (): number => {
    // Simplified streak calculation
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

  const achievements: Achievement[] = [
    {
      id: 'first-log',
      title: 'Health Tracker',
      description: 'Log your first symptom',
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      unlocked: healthLogs.length >= 1,
      progress: Math.min(healthLogs.length, 1),
      maxProgress: 1,
      reward: '+10 XP'
    },
    {
      id: 'exercise-starter',
      title: 'Exercise Enthusiast',
      description: 'Complete 5 eye exercises',
      icon: <Target className="h-6 w-6 text-blue-500" />,
      unlocked: exerciseHistory.length >= 5,
      progress: Math.min(exerciseHistory.length, 5),
      maxProgress: 5,
      reward: '+50 XP'
    },
    {
      id: 'streak-master',
      title: 'Consistency King',
      description: 'Maintain a 7-day streak',
      icon: <Flame className="h-6 w-6 text-orange-500" />,
      unlocked: streakDays >= 7,
      progress: Math.min(streakDays, 7),
      maxProgress: 7,
      reward: '+100 XP'
    },
    {
      id: 'screen-guardian',
      title: 'Screen Time Guardian',
      description: 'Keep daily screen time under 5 hours',
      icon: <Award className="h-6 w-6 text-emerald-500" />,
      unlocked: screenTime.daily < 300,
      progress: screenTime.daily < 300 ? 1 : 0,
      maxProgress: 1,
      reward: '+25 XP'
    },
    {
      id: 'health-expert',
      title: 'Health Data Expert',
      description: 'Log symptoms for 30 days',
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      unlocked: healthLogs.length >= 30,
      progress: Math.min(healthLogs.length, 30),
      maxProgress: 30,
      reward: '+200 XP'
    },
    {
      id: 'exercise-master',
      title: 'Exercise Master',
      description: 'Complete 50 eye exercises',
      icon: <Medal className="h-6 w-6 text-red-500" />,
      unlocked: exerciseHistory.length >= 50,
      progress: Math.min(exerciseHistory.length, 50),
      maxProgress: 50,
      reward: '+300 XP'
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="space-y-6">
      {/* User Level & XP */}
      <Card className="neuro-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                  {userLevel}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Crown className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gradient">Level {userLevel}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Eye Care Champion</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-xl font-bold text-gradient">{xp} XP</span>
              </div>
              <p className="text-xs text-gray-500">{nextLevelXp - xp} XP to next level</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userLevel + 1}</span>
              <span>{Math.round((xp / nextLevelXp) * 100)}%</span>
            </div>
            <Progress value={(xp / nextLevelXp) * 100} className="h-3 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                style={{ width: `${(xp / nextLevelXp) * 100}%` }}
              />
            </Progress>
          </div>
        </CardContent>
      </Card>

      {/* Current Streak */}
      <Card className="neuro-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="icon-container-warning">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Current Streak</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keep up the momentum!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gradient-emerald">{streakDays}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Days Active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="neuro-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="icon-container">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-gradient">Achievements</span>
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              {unlockedAchievements.length}/{achievements.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Unlocked ({unlockedAchievements.length})
              </h5>
              {unlockedAchievements.map((achievement) => (
                <div key={achievement.id} className="achievement-badge p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/20 rounded-full">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h6 className="font-bold text-white">{achievement.title}</h6>
                      <p className="text-sm text-white/80">{achievement.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {achievement.reward}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                In Progress ({lockedAchievements.length})
              </h5>
              {lockedAchievements.map((achievement) => (
                <div key={achievement.id} className="p-4 neuro-card-inset rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full opacity-50">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h6 className="font-bold text-gray-700 dark:text-gray-300">{achievement.title}</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress: {achievement.progress}/{achievement.maxProgress}</span>
                          <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                      </div>
                    </div>
                    <Badge variant="outline" className="opacity-60">
                      {achievement.reward}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationPanel;
