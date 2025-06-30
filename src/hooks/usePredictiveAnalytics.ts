
import { useState, useEffect } from 'react';
import { useEyeCare } from '@/contexts/EyeCareContext';

export interface PredictiveInsight {
  id: string;
  type: 'warning' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export const usePredictiveAnalytics = () => {
  const { screenTime, healthLogs, exerciseHistory } = useEyeCare();
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateInsights = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newInsights: PredictiveInsight[] = [];
    
    // Screen time analysis
    if (screenTime.daily > 420) { // 7+ hours
      newInsights.push({
        id: 'screen-time-risk',
        type: 'warning',
        title: 'High Risk of Digital Eye Strain',
        description: 'Your current usage pattern suggests 85% probability of experiencing eye strain within 2 hours.',
        confidence: 0.85,
        timeframe: '2 hours',
        actionable: true,
        priority: 'high'
      });
    }

    // Exercise pattern analysis
    if (exerciseHistory.length < 3) {
      newInsights.push({
        id: 'exercise-recommendation',
        type: 'recommendation',
        title: 'Optimize Eye Muscle Strength',
        description: 'Regular exercises could reduce your strain symptoms by 40% based on similar user profiles.',
        confidence: 0.73,
        timeframe: '1 week',
        actionable: true,
        priority: 'medium'
      });
    }

    // Health trend prediction
    const recentSymptoms = healthLogs.slice(0, 7);
    if (recentSymptoms.some(log => log.severity > 3)) {
      newInsights.push({
        id: 'health-trend',
        type: 'prediction',
        title: 'Symptom Escalation Predicted',
        description: 'Current trends suggest potential worsening of symptoms. Consider scheduling a checkup.',
        confidence: 0.67,
        timeframe: '10 days',
        actionable: true,
        priority: 'critical'
      });
    }

    // Productivity correlation
    newInsights.push({
      id: 'productivity-insight',
      type: 'recommendation',
      title: 'Productivity Optimization Opportunity',
      description: 'Users with similar patterns report 23% higher focus after implementing structured breaks.',
      confidence: 0.71,
      timeframe: '3 days',
      actionable: true,
      priority: 'medium'
    });

    setInsights(newInsights);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    generateInsights();
  }, [screenTime.daily, healthLogs.length, exerciseHistory.length]);

  return {
    insights,
    isAnalyzing,
    regenerateInsights: generateInsights
  };
};
