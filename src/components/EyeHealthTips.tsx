
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

const tips = [
  {
    id: 1,
    title: "20-20-20 Rule",
    description: "Every 20 minutes, look at something 20 feet away for 20 seconds. This helps reduce eye strain."
  },
  {
    id: 2,
    title: "Adjust Screen Position",
    description: "Position your screen about an arm's length away and at eye level or slightly below to reduce neck strain."
  },
  {
    id: 3,
    title: "Reduce Glare",
    description: "Minimize glare by adjusting room lighting and using matte screen filters if necessary."
  },
  {
    id: 4,
    title: "Blink More Often",
    description: "When using digital devices, we blink less frequently. Make a conscious effort to blink regularly to keep your eyes moist."
  },
  {
    id: 5,
    title: "Use Night Mode",
    description: "Enable night mode or blue light filters in the evening to reduce exposure to blue light, which can affect sleep."
  },
  {
    id: 6,
    title: "Proper Lighting",
    description: "Ensure your room has adequate lighting to reduce the contrast between the screen and surroundings."
  },
  {
    id: 7,
    title: "Regular Eye Exams",
    description: "Schedule regular eye check-ups to monitor your vision health, especially if you spend many hours on screens."
  }
];

const EyeHealthTips: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const displayTips = expanded ? tips : tips.slice(0, 3);

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Eye Health Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {displayTips.map((tip) => (
            <div key={tip.id} className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
              <h3 className="font-medium text-primary">{tip.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
            </div>
          ))}
          
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
        </div>
      </CardContent>
    </Card>
  );
};

export default EyeHealthTips;
