
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const EyeCheckupScheduler: React.FC = () => {
  const { nextCheckupDate, setNextCheckup } = useEyeCare();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    nextCheckupDate ? new Date(nextCheckupDate) : undefined
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setNextCheckup(date.toISOString());
      setIsCalendarOpen(false);
    }
  };

  const isOverdue = () => {
    if (!nextCheckupDate) return false;
    return new Date(nextCheckupDate) < new Date();
  };

  const getDaysUntilCheckup = () => {
    if (!nextCheckupDate) return null;
    const days = Math.ceil((new Date(nextCheckupDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysUntil = getDaysUntilCheckup();

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Eye Checkup Scheduler</CardTitle>
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextCheckupDate ? (
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Next Appointment</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(nextCheckupDate), 'EEEE, MMMM do, yyyy')}
                  </p>
                </div>
                {isOverdue() ? (
                  <div className="flex items-center text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Overdue</span>
                  </div>
                ) : daysUntil !== null && (
                  <div className="flex items-center text-primary">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">
                      {daysUntil === 0 ? 'Today' : 
                       daysUntil === 1 ? 'Tomorrow' : 
                       `${daysUntil} days`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  No eye checkup scheduled. Regular checkups are important for eye health.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Schedule your next eye checkup</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Recommended Checkup Schedule:
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Ages 18-39: Every 2-3 years</li>
              <li>• Ages 40-54: Every 1-2 years</li>
              <li>• Ages 55+: Every year</li>
              <li>• With risk factors: As recommended by your doctor</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EyeCheckupScheduler;
