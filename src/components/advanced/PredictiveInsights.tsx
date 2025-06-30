import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePredictiveAnalytics } from '@/hooks/usePredictiveAnalytics';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  RefreshCw,
  Clock,
  BarChart3
} from 'lucide-react';

const PredictiveInsights: React.FC = () => {
  const { insights, isAnalyzing, regenerateInsights } = usePredictiveAnalytics();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'recommendation': return <Lightbulb className="h-5 w-5 text-blue-600" />;
      case 'prediction': return <TrendingUp className="h-5 w-5 text-purple-600" />;
      default: return <Brain className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-950/20';
      case 'high': return 'border-amber-500 bg-amber-50 dark:bg-amber-950/20';
      case 'medium': return 'border-blue-500 bg-blue-50 dark:bg-blue-950/20';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      critical: 'destructive',
      high: 'secondary',
      medium: 'outline',
      low: 'outline'
    } as const;
    return colors[priority as keyof typeof colors] || 'outline';
  };

  if (isAnalyzing) {
    return (
      <Card className="floating-card border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="icon-container-ai animate-pulse">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-gradient-ai">AI Analysis in Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <div className="icon-container-ai mx-auto mb-4 animate-spin">
              <BarChart3 className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Your Patterns</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Advanced AI is processing your data to generate personalized insights
            </p>
            <Progress value={75} className="w-full max-w-xs mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="floating-card border-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="icon-container-ai">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-gradient-ai">Predictive Health Insights</span>
          </CardTitle>
          <Button onClick={regenerateInsights} size="sm" variant="outline">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-8">
            <div className="icon-container mx-auto mb-4">
              <Target className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No concerning patterns detected. Keep up the great work!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-xl border-l-4 ${getPriorityColor(insight.priority)} transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {insight.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getPriorityBadge(insight.priority)} className="text-xs">
                          {insight.priority.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {insight.timeframe}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium mb-1">
                      {(insight.confidence * 100).toFixed(0)}% confidence
                    </div>
                    <Progress value={insight.confidence * 100} className="w-16 h-2" />
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  {insight.description}
                </p>
                
                {insight.actionable && (
                  <Button size="sm" variant="outline" className="text-xs">
                    Take Action
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-300">
            🧠 <strong>AI-Powered Predictions:</strong> These insights are generated using machine learning models trained on anonymized health data from thousands of users.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveInsights;
