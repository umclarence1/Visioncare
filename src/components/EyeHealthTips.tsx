
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { useEyeCare } from '@/contexts/EyeCareContext';

interface Tip {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  conditions: {
    longScreenTime?: boolean;
    noBreaks?: boolean;
    highBrightness?: boolean;
    nightTime?: boolean;
  };
}

const allTips: Tip[] = [
  {
    id: 1,
    title: "20-20-20 Rule",
    description: "Every 20 minutes, look at something 20 feet away for 20 seconds. This helps reduce eye strain.",
    priority: 'high',
    conditions: { longScreenTime: true }
  },
  {
    id: 2,
    title: "Adjust Screen Position",
    description: "Position your screen about an arm's length away and at eye level or slightly below to reduce neck strain.",
    priority: 'medium',
    conditions: { longScreenTime: true }
  },
  {
    id: 3,
    title: "Reduce Glare",
    description: "Minimize glare by adjusting room lighting and using matte screen filters if necessary.",
    priority: 'medium',
    conditions: { highBrightness: true }
  },
  {
    id: 4,
    title: "Blink More Often",
    description: "When using digital devices, we blink less frequently. Make a conscious effort to blink regularly to keep your eyes moist.",
    priority: 'high',
    conditions: { longScreenTime: true }
  },
  {
    id: 5,
    title: "Use Night Mode",
    description: "Enable night mode or blue light filters in the evening to reduce exposure to blue light, which can affect sleep.",
    priority: 'high',
    conditions: { nightTime: true }
  },
  {
    id: 6,
    title: "Take Regular Breaks",
    description: "You've been working for a while. Remember to take short breaks to prevent eye fatigue.",
    priority: 'high',
    conditions: { noBreaks: true }
  },
  {
    id: 7,
    title: "Brightness Adjustment",
    description: "Consider lowering your screen brightness. High brightness levels can contribute to eye strain.",
    priority: 'medium',
    conditions: { highBrightness: true }
  }
];

const EyeHealthTips: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { screenTime, brightness, isTakingBreak } = useEyeCare();

  const relevantTips = useMemo(() => {
    const currentHour = new Date().getHours();
    const conditions = {
      longScreenTime: screenTime.daily > 120,
      noBreaks: !isTakingBreak && screenTime.daily > 60,
      highBrightness: brightness > 70,
      nightTime: currentHour >= 20 || currentHour <= 6
    };

    const filteredTips = allTips.filter(tip => {
      return Object.entries(tip.conditions).some(([condition, required]) => {
        return required && conditions[condition as keyof typeof conditions];
      });
    });

    // Sort by priority
    return filteredTips.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [screenTime.daily, brightness, isTakingBreak]);

  const displayTips = expanded ? relevantTips : relevantTips.slice(0, 3);

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Contextual Eye Health Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {displayTips.map((tip) => (
            <div 
              key={tip.id} 
              className={`bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm hover:shadow-md transition-all duration-300
                ${tip.priority === 'high' ? 'border-l-4 border-red-500' : 
                  tip.priority === 'medium' ? 'border-l-4 border-yellow-500' : 
                  'border-l-4 border-green-500'}`}
            >
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-primary">{tip.title}</h3>
                {tip.priority === 'high' && (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
            </div>
          ))}
          
          {relevantTips.length > 3 && (
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <span className="flex items-center">
                  Show Less <ArrowUp className="ml-2 h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center">
                  Show More <ArrowDown className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EyeHealthTips;
