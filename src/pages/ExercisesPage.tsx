
import React from 'react';
import EyeExercises from '@/components/EyeExercises';

const ExercisesPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
          Eye Exercises
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Strengthen and relax your eyes with scientifically-backed exercises designed for digital wellness
        </p>
      </div>
      
      <EyeExercises />
    </div>
  );
};

export default ExercisesPage;
