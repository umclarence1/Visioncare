import { useState, useEffect } from 'react';
import { useEyeCare } from '@/contexts/EyeCareContext';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Target,
  Activity,
  Eye,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Clock,
  Shield
} from 'lucide-react';

interface AIRecommendation {
  id: string;
  type: 'exercise' | 'break' | 'insight' | 'alert';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action?: () => void;
  actionLabel?: string;
}

const AIInsights = () => {
  const {
    screenTime,
    healthLogs,
    breakSettings,
    startEyeExercise,
    setBreakSettings
  } = useEyeCare();

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [appliedRecommendations, setAppliedRecommendations] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    generateAIRecommendations();
  }, [screenTime, healthLogs]);

  const generateAIRecommendations = () => {
    const newRecommendations: AIRecommendation[] = [];

    if (screenTime.daily > 360) {
      newRecommendations.push({
        id: 'high-screen-time',
        type: 'alert',
        title: 'High Screen Time Detected',
        description: `You've used screens for ${Math.floor(screenTime.daily / 60)} hours today. Consider taking longer breaks to reduce eye strain.`,
        priority: 'high',
        action: () => setBreakSettings({ ...breakSettings, interval: Math.max(breakSettings.interval - 5, 15) }),
        actionLabel: 'Increase Break Frequency'
      });
    }

    const recentLogs = healthLogs.filter(log => {
      const logDate = new Date(log.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate > weekAgo;
    });

    if (recentLogs.length > 0) {
      const commonSymptoms = recentLogs.reduce((acc, log) => {
        log.symptoms.forEach((symptom: string) => {
          acc[symptom] = (acc[symptom] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>);

      const mostCommon = Object.entries(commonSymptoms).sort(([, a], [, b]) => b - a)[0];

      if (mostCommon && mostCommon[1] >= 3) {
        newRecommendations.push({
          id: 'symptom-pattern',
          type: 'exercise',
          title: 'Recurring Symptom Pattern',
          description: `You've logged "${mostCommon[0]}" ${mostCommon[1]} times this week. Try the Blink Focus routine.`,
          priority: 'high',
          action: () => startEyeExercise({
            name: 'Blink Focus',
            duration: 120,
            instructions: 'Focus on deliberate blinking to reduce dryness'
          }),
          actionLabel: 'Start Exercise'
        });
      }
    }

    const weeklyAverage = screenTime.weekly.reduce((sum, time) => sum + time, 0) / 7;
    if (screenTime.daily > weeklyAverage * 1.5) {
      newRecommendations.push({
        id: 'daily-spike',
        type: 'break',
        title: 'Unusual Screen Time Spike',
        description: `Today's usage is 50% higher than your weekly average. Consider extra breaks.`,
        priority: 'medium',
        action: () => setBreakSettings({ ...breakSettings, duration: breakSettings.duration + 30 }),
        actionLabel: 'Extend Breaks'
      });
    }

    const streak = Math.min(healthLogs.length, 7);
    if (streak >= 3) {
      newRecommendations.push({
        id: 'positive-streak',
        type: 'insight',
        title: 'Great Progress!',
        description: `You've maintained good eye care habits for ${streak} days. Keep it up!`,
        priority: 'low'
      });
    }

    setRecommendations(newRecommendations);
  };

  const applyRecommendation = (recommendation: AIRecommendation) => {
    if (recommendation.action) {
      recommendation.action();
      setAppliedRecommendations(prev => [...prev, recommendation.id]);
    }
  };

  const getHealthTrend = () => {
    if (healthLogs.length < 2) return 'neutral';
    const recent = healthLogs.slice(-3);
    const avgSeverity = recent.reduce((sum, log) => sum + log.severity, 0) / recent.length;
    return avgSeverity < 3 ? 'improving' : 'declining';
  };

  const healthTrend = getHealthTrend();
  const weeklyGoal = screenTime.weekly.filter(time => time < 300).length;
  const streakDays = Math.min(healthLogs.length, 30);

  return (
    <div className={`space-y-6 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* AI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InsightCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Health Trend"
          value={healthTrend === 'improving' ? 'Improving' : healthTrend === 'declining' ? 'Declining' : 'Stable'}
          subtitle="Based on recent symptoms"
          trend={healthTrend === 'improving' ? 'up' : healthTrend === 'declining' ? 'down' : 'neutral'}
          color="blue"
        />
        <InsightCard
          icon={<Target className="w-5 h-5" />}
          title="Weekly Goal"
          value={`${weeklyGoal}/7`}
          subtitle="Days under 5h screen time"
          trend={weeklyGoal >= 4 ? 'up' : 'down'}
          color="emerald"
        />
        <InsightCard
          icon={<Zap className="w-5 h-5" />}
          title="Active Streak"
          value={`${streakDays} days`}
          subtitle="Consistent tracking"
          trend="up"
          color="amber"
        />
      </div>

      {/* AI Analysis Section */}
      <div className="card-elevated p-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">AI Analysis</h2>
            <p className="text-sm text-neutral-500">Personalized insights based on your data</p>
          </div>
          <span className="ml-auto tag tag-purple">
            <Sparkles className="w-3 h-3" />
            Smart Analysis
          </span>
        </div>

        {/* Pattern Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="icon-wrapper icon-wrapper-blue">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-medium text-neutral-900 dark:text-white text-sm">Screen Time Pattern</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Your average daily screen time is <strong>{Math.floor(screenTime.weekly.reduce((a, b) => a + b, 0) / 7 / 60)}h {Math.floor(screenTime.weekly.reduce((a, b) => a + b, 0) / 7 % 60)}m</strong>.
              {screenTime.daily > 360 ? ' Consider reducing usage today.' : ' Great job staying balanced!'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="icon-wrapper icon-wrapper-green">
                <Eye className="w-4 h-4" />
              </div>
              <span className="font-medium text-neutral-900 dark:text-white text-sm">Eye Health Status</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {healthLogs.length > 0
                ? `Based on ${healthLogs.length} health log${healthLogs.length > 1 ? 's' : ''}, your eyes are ${healthTrend === 'improving' ? 'showing improvement' : 'needing attention'}.`
                : 'Start logging symptoms to get personalized insights about your eye health.'}
            </p>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-800/50">
          <h4 className="font-medium text-neutral-900 dark:text-white text-sm mb-3">Weekly Screen Time</h4>
          <div className="flex items-end justify-between gap-2 h-20">
            {screenTime.weekly.map((time, index) => {
              const height = Math.max((time / 480) * 100, 10);
              const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
              const isToday = index === new Date().getDay();
              const isHigh = time > 360;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      isHigh
                        ? 'bg-red-500'
                        : isToday
                        ? 'bg-blue-500'
                        : 'bg-neutral-300 dark:bg-neutral-600'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span className={`text-xs font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-500'}`}>
                    {dayNames[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-wrapper icon-wrapper-amber">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white">Personalized Recommendations</h3>
        </div>

        {recommendations.length === 0 ? (
          <div className="card-elevated p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">You're Doing Great!</h4>
            <p className="text-neutral-500 text-sm">No immediate recommendations. Keep up your excellent eye care routine!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                isApplied={appliedRecommendations.includes(rec.id)}
                onApply={() => applyRecommendation(rec)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pro Tips */}
      <div className="card-elevated p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Pro Tip: 20-20-20 Rule</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Every 20 minutes, look at something 20 feet away for 20 seconds. This simple habit can significantly reduce digital eye strain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Insight Card Component
const InsightCard = ({
  icon,
  title,
  value,
  subtitle,
  trend,
  color
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  trend: 'up' | 'down' | 'neutral';
  color: 'blue' | 'emerald' | 'amber';
}) => {
  const iconWrapperClass = {
    blue: 'icon-wrapper-blue',
    emerald: 'icon-wrapper-green',
    amber: 'icon-wrapper-amber'
  };

  return (
    <div className="card-elevated p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`icon-wrapper ${iconWrapperClass[color]}`}>
          {icon}
        </div>
        {trend !== 'neutral' && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        )}
      </div>
      <p className="text-xs text-neutral-500 mb-1">{title}</p>
      <p className="text-xl font-bold text-neutral-900 dark:text-white">{value}</p>
      <p className="text-xs text-neutral-400 mt-1">{subtitle}</p>
    </div>
  );
};

// Recommendation Card Component
const RecommendationCard = ({
  recommendation,
  isApplied,
  onApply
}: {
  recommendation: AIRecommendation;
  isApplied: boolean;
  onApply: () => void;
}) => {
  const priorityStyles = {
    high: 'border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10',
    medium: 'border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10',
    low: 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/10'
  };

  const tagStyles = {
    high: 'tag-red',
    medium: 'tag-amber',
    low: 'tag-green'
  };

  const typeIcons = {
    exercise: <Activity className="w-5 h-5" />,
    break: <Clock className="w-5 h-5" />,
    insight: <Lightbulb className="w-5 h-5" />,
    alert: <AlertTriangle className="w-5 h-5" />
  };

  return (
    <div className={`p-4 rounded-xl border ${priorityStyles[recommendation.priority]} transition-colors`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center">
          {typeIcons[recommendation.type]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-neutral-900 dark:text-white text-sm">{recommendation.title}</h4>
            <span className={`tag ${tagStyles[recommendation.priority]}`}>
              {recommendation.priority}
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{recommendation.description}</p>

          {recommendation.action && !isApplied && (
            <button
              onClick={onApply}
              className="btn-solid text-sm"
            >
              {recommendation.actionLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {isApplied && (
            <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Applied</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
