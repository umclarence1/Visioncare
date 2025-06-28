
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  Target,
  Calendar,
  Activity,
  Eye,
  Sparkles,
  CheckCircle
} from 'lucide-react';

interface AIRecommendation {
  id: string;
  type: 'exercise' | 'break' | 'article' | 'alert';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action?: () => void;
  actionLabel?: string;
}

const AIInsights: React.FC = () => {
  const { 
    screenTime, 
    healthLogs, 
    breakSettings,
    startEyeExercise,
    setBreakSettings
  } = useEyeCare();

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [appliedRecommendations, setAppliedRecommendations] = useState<string[]>([]);

  useEffect(() => {
    generateAIRecommendations();
  }, [screenTime, healthLogs]);

  const generateAIRecommendations = () => {
    const newRecommendations: AIRecommendation[] = [];

    // Screen time analysis
    if (screenTime.daily > 360) { // More than 6 hours
      newRecommendations.push({
        id: 'high-screen-time',
        type: 'alert',
        title: 'High Screen Time Detected',
        description: `You've used screens for ${Math.floor(screenTime.daily / 60)} hours today. Consider taking longer breaks.`,
        priority: 'high',
        action: () => setBreakSettings({ ...breakSettings, interval: Math.max(breakSettings.interval - 5, 15) }),
        actionLabel: 'Increase Break Frequency'
      });
    }

    // Recent symptoms analysis
    const recentLogs = healthLogs.filter(log => {
      const logDate = new Date(log.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate > weekAgo;
    });

    if (recentLogs.length > 0) {
      const commonSymptoms = recentLogs.reduce((acc, log) => {
        log.symptoms.forEach(symptom => {
          acc[symptom] = (acc[symptom] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>);

      const mostCommon = Object.entries(commonSymptoms).sort(([,a], [,b]) => b - a)[0];
      
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
          actionLabel: 'Start Blink Exercise'
        });
      }
    }

    // Weekly pattern analysis
    const weeklyAverage = screenTime.weekly.reduce((sum, time) => sum + time, 0) / 7;
    if (screenTime.daily > weeklyAverage * 1.5) {
      newRecommendations.push({
        id: 'daily-spike',
        type: 'break',
        title: 'Unusual Screen Time Spike',
        description: `Today's usage is 50% higher than your weekly average. Consider extra breaks.`,
        priority: 'medium',
        action: () => setBreakSettings({ ...breakSettings, duration: breakSettings.duration + 30 }),
        actionLabel: 'Extend Break Duration'
      });
    }

    // Positive reinforcement
    const streak = calculateStreakDays();
    if (streak >= 3) {
      newRecommendations.push({
        id: 'positive-streak',
        type: 'article',
        title: 'Great Progress!',
        description: `You've maintained good eye care habits for ${streak} days. Keep it up!`,
        priority: 'low'
      });
    }

    // Personalized exercise recommendations
    if (recentLogs.some(log => log.symptoms.some(symptom => symptom.includes('dry')))) {
      newRecommendations.push({
        id: 'dry-eyes',
        type: 'exercise',
        title: 'Combat Dry Eyes',
        description: 'Based on your symptoms, try the Moisture Restoration exercise.',
        priority: 'medium',
        action: () => startEyeExercise({ 
          name: 'Moisture Restoration', 
          duration: 180, 
          instructions: 'Slow blinking and gentle eye massage' 
        }),
        actionLabel: 'Start Exercise'
      });
    }

    setRecommendations(newRecommendations);
  };

  const calculateStreakDays = (): number => {
    // Simplified streak calculation based on daily activity
    return healthLogs.length > 0 ? Math.min(healthLogs.length, 7) : 0;
  };

  const applyRecommendation = (recommendation: AIRecommendation) => {
    if (recommendation.action) {
      recommendation.action();
      setAppliedRecommendations(prev => [...prev, recommendation.id]);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-amber-500 to-orange-500';
      case 'low': return 'from-emerald-500 to-teal-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return TrendingUp;
      case 'low': return CheckCircle;
      default: return Lightbulb;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exercise': return Activity;
      case 'break': return Calendar;
      case 'article': return Eye;
      case 'alert': return AlertTriangle;
      default: return Lightbulb;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card className="ai-insights">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="icon-container-ai">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-gradient-ai">AI-Powered Insights</span>
            <Badge variant="outline" className="px-3 py-1 rounded-full font-medium bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <Sparkles className="h-3 w-3 mr-1" />
              Smart Analysis
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Health Trend */}
            <div className="text-center p-4 neuro-card rounded-2xl">
              <div className="icon-container mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Health Trend</p>
              <p className="text-2xl font-bold text-gradient">
                {healthLogs.length > 0 ? 
                  (healthLogs.slice(-3).reduce((sum, log) => sum + log.severity, 0) / 3 < 3 ? 'Improving' : 'Needs Attention')
                  : 'No Data'
                }
              </p>
            </div>

            {/* Weekly Goal */}
            <div className="text-center p-4 neuro-card rounded-2xl">
              <div className="icon-container-success mx-auto mb-3">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weekly Goal</p>
              <p className="text-2xl font-bold text-gradient-emerald">
                {screenTime.weekly.filter(time => time < 300).length}/7 Days
              </p>
            </div>

            {/* Streak Counter */}
            <div className="text-center p-4 neuro-card rounded-2xl">
              <div className="streak-counter mx-auto mb-3">
                {calculateStreakDays()}
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
              <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                Days Active
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gradient flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Personalized Recommendations
        </h3>
        
        {recommendations.length === 0 ? (
          <Card className="pro-card">
            <CardContent className="p-8 text-center">
              <div className="icon-container-success mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Great job! No immediate recommendations.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Keep up your excellent eye care routine!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {recommendations.map((recommendation) => {
              const PriorityIcon = getPriorityIcon(recommendation.priority);
              const TypeIcon = getTypeIcon(recommendation.type);
              const isApplied = appliedRecommendations.includes(recommendation.id);
              
              return (
                <Card key={recommendation.id} className="neuro-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${getPriorityColor(recommendation.priority)}/10 border border-current/20`}>
                          <TypeIcon className={`h-6 w-6`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-bold">{recommendation.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${getPriorityColor(recommendation.priority)}/10 border-current/30`}
                            >
                              <PriorityIcon className="h-3 w-3 mr-1" />
                              {recommendation.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {recommendation.description}
                          </p>
                          {recommendation.action && !isApplied && (
                            <Button
                              onClick={() => applyRecommendation(recommendation)}
                              className="btn-innovative text-sm"
                            >
                              {recommendation.actionLabel || 'Apply Recommendation'}
                            </Button>
                          )}
                          {isApplied && (
                            <div className="flex items-center gap-2 text-emerald-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Applied</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
