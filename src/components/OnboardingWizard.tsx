
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface OnboardingData {
  name: string;
  reminderInterval: number;
  screenTimeGoal: number;
  workingHours: { start: number; end: number };
  preferences: string[];
  isCompleted: boolean;
}

interface OnboardingWizardProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    reminderInterval: 20,
    screenTimeGoal: 6,
    workingHours: { start: 9, end: 17 },
    preferences: [],
    isCompleted: false
  });

  const steps = [
    'Welcome',
    'Personal Info',
    'Reminder Settings',
    'Screen Time Goals',
    'Work Schedule',
    'Preferences',
    'Complete'
  ];

  const preferenceOptions = [
    'Eye strain headaches',
    'Dry eyes',
    'Blurry vision',
    'Light sensitivity',
    'Contact lens user',
    'Glasses wearer',
    'Night shift worker',
    'Gaming/Design work'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ ...data, isCompleted: true });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreferenceToggle = (preference: string) => {
    setData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
              <Eye className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to VisionCare</h2>
              <p className="text-muted-foreground">Your comprehensive eye health companion</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <p className="font-medium">Smart Reminders</p>
                <p className="text-muted-foreground">20-20-20 rule automation</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <p className="font-medium">Eye Exercises</p>
                <p className="text-muted-foreground">Guided routines</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <p className="font-medium">Health Tracking</p>
                <p className="text-muted-foreground">Symptom monitoring</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <p className="font-medium">Professional Care</p>
                <p className="text-muted-foreground">Checkup scheduling</p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Let's personalize your experience</h2>
              <p className="text-muted-foreground">Help us customize VisionCare for you</p>
            </div>
            <div>
              <Label htmlFor="name">What should we call you?</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="mt-1"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">20-20-20 Rule Settings</h2>
              <p className="text-muted-foreground">How often should we remind you to take breaks?</p>
            </div>
            <div>
              <Label>Reminder interval: {data.reminderInterval} minutes</Label>
              <Slider
                value={[data.reminderInterval]}
                onValueChange={(value) => setData(prev => ({ ...prev, reminderInterval: value[0] }))}
                min={15}
                max={45}
                step={5}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>15 min</span>
                <span>30 min</span>
                <span>45 min</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Daily Screen Time Goal</h2>
              <p className="text-muted-foreground">Set a healthy daily limit for your screen usage</p>
            </div>
            <div>
              <Label>Daily goal: {data.screenTimeGoal} hours</Label>
              <Slider
                value={[data.screenTimeGoal]}
                onValueChange={(value) => setData(prev => ({ ...prev, screenTimeGoal: value[0] }))}
                min={2}
                max={12}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>2h</span>
                <span>6h</span>
                <span>12h</span>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Work Schedule</h2>
              <p className="text-muted-foreground">When are you most active? We'll optimize reminders accordingly.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start time</Label>
                <Input
                  type="time"
                  value={`${data.workingHours.start.toString().padStart(2, '0')}:00`}
                  onChange={(e) => {
                    const hour = parseInt(e.target.value.split(':')[0]);
                    setData(prev => ({ ...prev, workingHours: { ...prev.workingHours, start: hour }}));
                  }}
                />
              </div>
              <div>
                <Label>End time</Label>
                <Input
                  type="time"
                  value={`${data.workingHours.end.toString().padStart(2, '0')}:00`}
                  onChange={(e) => {
                    const hour = parseInt(e.target.value.split(':')[0]);
                    setData(prev => ({ ...prev, workingHours: { ...prev.workingHours, end: hour }}));
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Eye Health Profile</h2>
              <p className="text-muted-foreground">Select any conditions or situations that apply to you</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {preferenceOptions.map(option => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={data.preferences.includes(option)}
                    onCheckedChange={() => handlePreferenceToggle(option)}
                  />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h2 className="text-2xl font-bold mb-2">You're all set{data.name ? `, ${data.name}` : ''}!</h2>
              <p className="text-muted-foreground">VisionCare is now customized for your eye health journey</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-background/50 rounded">
                <span>Break reminders:</span>
                <Badge variant="outline">Every {data.reminderInterval} min</Badge>
              </div>
              <div className="flex justify-between p-2 bg-background/50 rounded">
                <span>Daily screen goal:</span>
                <Badge variant="outline">{data.screenTimeGoal} hours</Badge>
              </div>
              <div className="flex justify-between p-2 bg-background/50 rounded">
                <span>Active hours:</span>
                <Badge variant="outline">{data.workingHours.start}:00 - {data.workingHours.end}:00</Badge>
              </div>
              {data.preferences.length > 0 && (
                <div className="flex justify-between p-2 bg-background/50 rounded">
                  <span>Health focuses:</span>
                  <Badge variant="outline">{data.preferences.length} selected</Badge>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return data.name.trim().length > 0;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-lg">Setup VisionCare</CardTitle>
            <Badge variant="outline">{currentStep + 1} of {steps.length}</Badge>
          </div>
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px] flex flex-col justify-between">
            <div className="flex-1">
              {renderStep()}
            </div>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingWizard;
