
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEyeCare } from '@/contexts/EyeCareContext';

const WeeklyScreenTimeChart: React.FC = () => {
  const { screenTime } = useEyeCare();
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = new Date().getDay();
  
  // Reorder the days to start with current day at index 6 (looking back over the past week)
  const orderedDays = [...days.slice(currentDay + 1), ...days.slice(0, currentDay + 1)];
  
  // Reorder the weekly data to match
  const orderedData = [...screenTime.weekly.slice(currentDay + 1), ...screenTime.weekly.slice(0, currentDay + 1)];
  
  const chartData = orderedDays.map((day, index) => ({
    day,
    hours: +(orderedData[index] / 60).toFixed(1) // Convert minutes to hours with 1 decimal place
  })).reverse(); // Reverse so most recent day is on the right

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Screen Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value} hrs`, 'Screen Time']} />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyScreenTimeChart;
