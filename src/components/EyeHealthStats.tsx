
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { Monitor, AlertTriangle } from 'lucide-react';

const EyeHealthStats: React.FC = () => {
  const { screenTime, brightness } = useEyeCare();

  // Calculate risk score based on current usage patterns
  const calculateRiskScore = () => {
    const hourlyScreenTime = screenTime.daily / 60;
    const isHighBrightness = brightness > 70;
    let score = 0;

    // Screen time impact
    if (hourlyScreenTime > 4) score += 30;
    else if (hourlyScreenTime > 2) score += 15;

    // Brightness impact
    if (isHighBrightness) score += 20;

    // Time of day impact
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour <= 5) score += 15;

    return Math.min(score, 100);
  };

  const riskScore = calculateRiskScore();
  const getRiskLevel = () => {
    if (riskScore < 30) return { level: 'Low', color: 'text-green-500' };
    if (riskScore < 60) return { level: 'Moderate', color: 'text-yellow-500' };
    return { level: 'High', color: 'text-red-500' };
  };

  const risk = getRiskLevel();

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Eye Strain Risk Analysis</CardTitle>
          <Monitor className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Risk Level</p>
              <p className={`text-2xl font-bold ${risk.color}`}>{risk.level}</p>
            </div>
            {riskScore > 50 && (
              <AlertTriangle className="h-8 w-8 text-yellow-500 animate-pulse" />
            )}
          </div>

          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { hour: '6am', risk: 20 },
                  { hour: '9am', risk: 35 },
                  { hour: '12pm', risk: 45 },
                  { hour: '3pm', risk: 60 },
                  { hour: '6pm', risk: riskScore }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-background/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Daily Screen Time</p>
              <p className="text-lg font-semibold">
                {Math.floor(screenTime.daily / 60)}h {Math.floor(screenTime.daily % 60)}m
              </p>
            </div>
            <div className="p-3 bg-background/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Current Brightness</p>
              <p className="text-lg font-semibold">{brightness}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EyeHealthStats;
