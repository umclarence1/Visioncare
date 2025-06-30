
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  Eye,
  BarChart3,
  Target,
  Calendar,
  Briefcase
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  healthScore: number;
  screenTime: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface WorkplaceMetrics {
  teamSize: number;
  averageHealthScore: number;
  totalScreenTime: number;
  productivityIndex: number;
  complianceRate: number;
}

const WorkplaceAnalytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  
  const mockTeamData: TeamMember[] = [
    { id: '1', name: 'Sarah Chen', role: 'Software Engineer', healthScore: 85, screenTime: 7.2, riskLevel: 'medium' },
    { id: '2', name: 'Mike Johnson', role: 'UX Designer', healthScore: 92, screenTime: 6.1, riskLevel: 'low' },
    { id: '3', name: 'Emma Davis', role: 'Product Manager', healthScore: 78, screenTime: 8.5, riskLevel: 'high' },
    { id: '4', name: 'Alex Rodriguez', role: 'Data Analyst', healthScore: 88, screenTime: 7.8, riskLevel: 'medium' },
    { id: '5', name: 'Lisa Wang', role: 'Developer', healthScore: 90, screenTime: 6.8, riskLevel: 'low' }
  ];

  const workplaceMetrics: WorkplaceMetrics = {
    teamSize: mockTeamData.length,
    averageHealthScore: mockTeamData.reduce((sum, member) => sum + member.healthScore, 0) / mockTeamData.length,
    totalScreenTime: mockTeamData.reduce((sum, member) => sum + member.screenTime, 0),
    productivityIndex: 87,
    complianceRate: 73
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-950/20';
      case 'medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-950/20';
      default: return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/20';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="floating-card border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="icon-container">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-gradient-ai">Workplace Eye Health Analytics</span>
            <Badge className="bg-purple-100 text-purple-800">
              Enterprise
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{workplaceMetrics.teamSize}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {workplaceMetrics.averageHealthScore.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Health Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {workplaceMetrics.productivityIndex}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Productivity Index</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {workplaceMetrics.complianceRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Policy Compliance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
          <TabsTrigger value="quarter">This Quarter</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTimeframe} className="space-y-6">
          {/* Team Overview */}
          <Card className="floating-card border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="icon-container-success">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-gradient-emerald">Team Health Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeamData.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 pro-card rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getHealthScoreColor(member.healthScore)}`}>
                          {member.healthScore}
                        </div>
                        <div className="text-xs text-gray-500">Health Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {member.screenTime.toFixed(1)}h
                        </div>
                        <div className="text-xs text-gray-500">Screen Time</div>
                      </div>
                      <Badge className={`px-3 py-1 rounded-full text-xs ${getRiskColor(member.riskLevel)}`}>
                        {member.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="floating-card border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="icon-container">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gradient">Performance Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-sm">Productivity Correlation</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Teams with higher eye health scores show 23% better task completion rates and 
                    15% fewer sick days.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-emerald-600" />
                    <span className="font-semibold text-sm">Optimization Opportunity</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Implementing structured break schedules could improve team health scores by 
                    an estimated 12-18%.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="font-semibold text-sm">Break Compliance</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Only 73% of team members are following recommended break schedules. 
                    Consider automated reminders.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="floating-card border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="icon-container-warning">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                    Wellness Initiatives
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 pro-card rounded-xl">
                    <span className="text-sm font-medium">Eye Exercise Challenges</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 pro-card rounded-xl">
                    <span className="text-sm font-medium">Ergonomic Assessments</span>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 pro-card rounded-xl">
                    <span className="text-sm font-medium">Blue Light Awareness Training</span>
                    <Badge variant="secondary">Planned</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 pro-card rounded-xl">
                    <span className="text-sm font-medium">Wellness Competitions</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Running</Badge>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Launch New Initiative
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
        <p className="text-sm text-purple-700 dark:text-purple-300">
          🏢 <strong>Enterprise Analytics:</strong> Comprehensive workplace eye health monitoring helps reduce healthcare costs by up to 30% and improve overall team productivity.
        </p>
      </div>
    </div>
  );
};

export default WorkplaceAnalytics;
