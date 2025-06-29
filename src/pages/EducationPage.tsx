
import React from 'react';
import EyeHealthTips from '@/components/EyeHealthTips';

const EducationPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Eye Health Education
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn evidence-based tips and best practices for maintaining optimal eye health in the digital age
        </p>
      </div>
      
      <EyeHealthTips />
    </div>
  );
};

export default EducationPage;
