
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useEyeCare, eyeExercises } from '@/contexts/EyeCareContext';
import { Eye, Play, Pause, RotateCcw } from 'lucide-react';

const EyeExercises: React.FC = () => {
  const { currentExercise, isExercising, startExercise, endExercise } = useEyeCare();
  const [selectedExercise, setSelectedExercise] = useState(eyeExercises[0]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isExercising && currentExercise) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / currentExercise.duration);
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 1000);

      // Step progression for instructions
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % currentExercise.instructions.length);
      }, (currentExercise.duration * 1000) / currentExercise.instructions.length);

      return () => {
        clearInterval(interval);
        clearInterval(stepInterval);
      };
    }
  }, [isExercising, currentExercise]);

  const handleStartExercise = () => {
    setProgress(0);
    setCurrentStep(0);
    startExercise(selectedExercise);
  };

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Eye Exercises</CardTitle>
          <Eye className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {!isExercising ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              {eyeExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedExercise.id === exercise.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <h3 className="font-medium">{exercise.name}</h3>
                  <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  <p className="text-xs text-primary mt-1">{exercise.duration}s duration</p>
                </div>
              ))}
            </div>
            
            <Button onClick={handleStartExercise} className="w-full">
              <Play className="mr-2 h-4 w-4" />
              Start {selectedExercise.name}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">{currentExercise?.name}</h3>
              <div className="mt-4 p-6 bg-accent/20 rounded-lg animate-pulse">
                <div className="text-6xl mb-2">👁️</div>
                <p className="text-sm font-medium">
                  {currentExercise?.instructions[currentStep]}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={endExercise} variant="outline" className="flex-1">
                <Pause className="mr-2 h-4 w-4" />
                Stop Exercise
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡 <strong>Tip:</strong> Perform eye exercises every 2-3 hours to reduce strain and maintain eye health.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EyeExercises;
