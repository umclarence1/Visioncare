
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Timer, Clock } from 'lucide-react';
import { useEyeCare } from '@/contexts/EyeCareContext';

const BreakControls: React.FC = () => {
  const { 
    breakSettings, 
    updateBreakSettings, 
    isTakingBreak, 
    startBreak, 
    endBreak 
  } = useEyeCare();

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Eye Break Settings</CardTitle>
        <Timer className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="break-enabled" className="font-medium">Automatic Breaks</Label>
            <Switch 
              id="break-enabled" 
              checked={breakSettings.enabled}
              onCheckedChange={(checked) => updateBreakSettings({ enabled: checked })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="interval" className="text-sm font-medium">Break Every</Label>
              <div className="flex items-center mt-1">
                <Input 
                  id="interval" 
                  type="number" 
                  value={breakSettings.interval} 
                  min={1}
                  max={120}
                  onChange={(e) => updateBreakSettings({ interval: Number(e.target.value) })}
                  className="w-16 mr-2"
                />
                <span className="text-sm">minutes</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="duration" className="text-sm font-medium">Break Length</Label>
              <div className="flex items-center mt-1">
                <Input 
                  id="duration" 
                  type="number" 
                  value={breakSettings.duration} 
                  min={1}
                  max={30}
                  onChange={(e) => updateBreakSettings({ duration: Number(e.target.value) })}
                  className="w-16 mr-2"
                />
                <span className="text-sm">minutes</span>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            disabled={isTakingBreak}
            onClick={startBreak}
          >
            Take a Break Now
          </Button>
          
          {isTakingBreak && (
            <div className="flex items-center justify-center space-x-2 py-2 bg-accent rounded-md">
              <Clock className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Break in progress...</span>
              <Button variant="outline" size="sm" onClick={endBreak}>
                End Early
              </Button>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground text-center">
            <p>The 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakControls;
