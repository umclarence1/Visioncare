
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Monitor } from 'lucide-react';
import { useEyeCare } from '@/contexts/EyeCareContext';

const ScreenTimeCard: React.FC = () => {
  const { screenTime } = useEyeCare();
  
  // Calculate screen time in hours and minutes
  const hours = Math.floor(screenTime.daily / 60);
  const minutes = Math.floor(screenTime.daily % 60);
  
  // Calculate percentage for the day (assuming 8 hours max)
  const percentage = Math.min((screenTime.daily / (8 * 60)) * 100, 100);

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Today's Screen Time</CardTitle>
        <Monitor className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="text-3xl font-bold text-center text-primary">
            {hours}h {minutes}m
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="text-sm text-muted-foreground text-center">
            {percentage < 25 ? 'Great job! Low screen time today.' :
             percentage < 50 ? 'Moderate screen usage.' :
             percentage < 75 ? 'You\'ve been on screens for a while today.' :
             'High screen time. Consider taking longer breaks.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenTimeCard;
