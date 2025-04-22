
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useEyeCare } from '@/contexts/EyeCareContext';

const BrightnessControl: React.FC = () => {
  const { brightness, updateBrightness } = useEyeCare();

  const handleChange = (value: number[]) => {
    updateBrightness(value[0]);
  };

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Screen Brightness</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <Moon className="h-5 w-5 text-gray-500" />
            <Slider 
              defaultValue={[brightness]} 
              max={100}
              step={1}
              className="mx-4"
              onValueChange={handleChange}
            />
            <Sun className="h-5 w-5 text-primary" />
          </div>
          
          <div className="text-center text-xl font-medium">{brightness}%</div>
          
          <div className="flex justify-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => updateBrightness(Math.max(brightness - 10, 0))}
              className="w-14"
            >
              -10%
            </Button>
            <Button 
              variant="outline" 
              onClick={() => updateBrightness(50)}
              className="w-14"
            >
              50%
            </Button>
            <Button 
              variant="outline" 
              onClick={() => updateBrightness(Math.min(brightness + 10, 100))}
              className="w-14"
            >
              +10%
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            {brightness > 70 ? 'High brightness might strain your eyes.' :
             brightness > 40 ? 'Current brightness is comfortable for most lighting.' :
             'Low brightness is better for evening and dark rooms.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrightnessControl;
