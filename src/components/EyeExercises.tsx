import { useState, useEffect } from 'react';
import { useEyeCare, eyeExercises } from '@/contexts/EyeCareContext';
import {
  Eye,
  Play,
  Pause,
  RotateCcw,
  Clock,
  CheckCircle2,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';

const EyeExercises = () => {
  const { currentExercise, isExercising, startExercise, endExercise } = useEyeCare();
  const [selectedExercise, setSelectedExercise] = useState(eyeExercises[0]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isExercising && currentExercise) {
      setTimeRemaining(currentExercise.duration);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / currentExercise.duration);
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });

        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);

      const stepInterval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % currentExercise.instructions.length);
      }, (currentExercise.duration * 1000) / currentExercise.instructions.length);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }
  }, [isExercising, currentExercise]);

  const handleStartExercise = () => {
    setProgress(0);
    setCurrentStep(0);
    startExercise(selectedExercise);
  };

  const handleEndExercise = () => {
    setProgress(0);
    setCurrentStep(0);
    setTimeRemaining(0);
    endExercise();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const exerciseIcons: Record<string, React.ReactNode> = {
    'Blinking Exercise': <Eye className="w-5 h-5" />,
    'Focus Shifting': <Target className="w-5 h-5" />,
    'Eye Rolling': <RotateCcw className="w-5 h-5" />
  };

  return (
    <div className={`space-y-6 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {!isExercising ? (
        <>
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-6 lg:p-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
            </div>

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4 animate-slide-up">
                <div className="glass-badge">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Eye Wellness</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  Eye Exercise <span className="text-white/80">Studio</span>
                </h1>
                <p className="text-white/70 max-w-lg">
                  Keep your eyes healthy with guided exercises designed to reduce strain and improve focus.
                </p>
              </div>

              <div className="flex items-center gap-4 animate-scale-in delay-200">
                <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white tabular-nums">3</div>
                  <div className="text-sm text-white/70">Exercises</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white tabular-nums">+15</div>
                  <div className="text-sm text-white/70">XP Each</div>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {eyeExercises.map((exercise) => {
              const isSelected = selectedExercise.id === exercise.id;

              return (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className={`
                    relative p-6 rounded-2xl text-left transition-all duration-300 group
                    ${isSelected
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/30'
                      : 'card-elevated hover-lift hover:shadow-emerald-500/20'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}

                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                    ${isSelected
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 group-hover:scale-110'
                    }
                  `}>
                    <span className={`${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {exerciseIcons[exercise.name] || <Eye className="w-6 h-6" />}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold mb-1 ${!isSelected && 'text-neutral-900 dark:text-white'}`}>
                    {exercise.name}
                  </h3>
                  <p className={`text-sm mb-4 ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                    {exercise.description}
                  </p>

                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                    isSelected
                      ? 'bg-white/20'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{exercise.duration}s</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Exercise Details */}
          <div className="card-elevated p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                  {exerciseIcons[selectedExercise.name] || <Eye className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900 dark:text-white">{selectedExercise.name}</h2>
                  <p className="text-sm text-neutral-500">{selectedExercise.instructions.length} steps · {selectedExercise.duration}s</p>
                </div>
              </div>
              <span className="tag tag-green">
                <Zap className="w-3 h-3" />
                +15 XP
              </span>
            </div>

            {/* Steps Preview */}
            <div className="space-y-2 mb-5">
              <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Steps</h4>
              {selectedExercise.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{index + 1}</span>
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{instruction}</p>
                </div>
              ))}
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartExercise}
              className="w-full py-3 rounded-xl bg-emerald-500 text-white font-medium flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
            >
              <Play className="w-5 h-5" />
              Start Exercise
            </button>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Pro tip:</strong> Perform eye exercises every 2-3 hours to reduce strain and maintain eye health.
              </p>
            </div>
          </div>
        </>
      ) : (
        /* Active Exercise Mode - Immersive Design */
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-6 lg:p-8">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            {/* Exercise Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white font-medium text-sm mb-4">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Exercise in Progress
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">{currentExercise?.name}</h2>
            </div>

            {/* Visual Exercise Display - Premium Ring */}
            <div className="relative mb-8">
              <div className="relative w-64 h-64 mx-auto">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full breathing-glow" />

                {/* Background decoration rings */}
                <div className="absolute inset-4 rounded-full border-4 border-white/10 ring-pulse-animation" />
                <div className="absolute inset-8 rounded-full border-2 border-white/5" />

                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
                  {/* Background circle */}
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* Animated progress circle */}
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    stroke="url(#exerciseGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 100}`}
                    strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.5))' }}
                  />
                  <defs>
                    <linearGradient id="exerciseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fff" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-bold tabular-nums text-white animate-count">
                    {formatTime(timeRemaining)}
                  </span>
                  <span className="text-lg text-white/70 font-medium mt-1">remaining</span>
                </div>
              </div>
            </div>

            {/* Current Instruction - Glass Card */}
            <div className="glass-card p-5 mb-6 bg-white/10 backdrop-blur-md border-white/20">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold">
                  {currentStep + 1}
                </span>
                <span className="text-sm text-white/80 font-medium">
                  Step {currentStep + 1} of {currentExercise?.instructions.length}
                </span>
              </div>
              <p className="text-center text-lg font-medium text-white">
                {currentExercise?.instructions[currentStep]}
              </p>
            </div>

            {/* Progress Bar - Glass Style */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span className="font-medium">Progress</span>
                <span className="tabular-nums font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${progress}%`, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                />
              </div>
            </div>

            {/* Controls */}
            <button
              onClick={handleEndExercise}
              className="w-full py-4 rounded-2xl bg-white/15 backdrop-blur-sm text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-white/25 transition-all border border-white/20"
            >
              <Pause className="w-6 h-6" />
              Stop Exercise
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EyeExercises;
