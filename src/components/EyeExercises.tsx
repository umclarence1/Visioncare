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
          {/* Exercise Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {eyeExercises.map((exercise) => {
              const isSelected = selectedExercise.id === exercise.id;

              return (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className={`
                    relative p-5 rounded-xl text-left transition-all duration-200 group
                    ${isSelected
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'card-elevated hover:scale-[1.02]'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}

                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all
                    ${isSelected
                      ? 'bg-white/20'
                      : 'bg-emerald-100 dark:bg-emerald-900/30 group-hover:scale-110'
                    }
                  `}>
                    <span className={isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}>
                      {exerciseIcons[exercise.name] || <Eye className="w-5 h-5" />}
                    </span>
                  </div>

                  <h3 className={`font-semibold mb-1 ${!isSelected && 'text-neutral-900 dark:text-white'}`}>
                    {exercise.name}
                  </h3>
                  <p className={`text-sm mb-3 ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                    {exercise.description}
                  </p>

                  <div className={`flex items-center gap-2 text-sm font-medium ${isSelected ? 'text-white/90' : 'text-emerald-600 dark:text-emerald-400'}`}>
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
        /* Active Exercise Mode */
        <div className="card-elevated p-6">
          {/* Exercise Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Exercise in Progress
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{currentExercise?.name}</h2>
          </div>

          {/* Visual Exercise Display */}
          <div className="relative mb-6">
            {/* Circular Progress */}
            <div className="relative w-52 h-52 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-neutral-200 dark:text-neutral-800"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tabular-nums text-neutral-900 dark:text-white">
                  {formatTime(timeRemaining)}
                </span>
                <span className="text-sm text-neutral-500">remaining</span>
              </div>
            </div>
          </div>

          {/* Current Instruction */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/50 mb-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                {currentStep + 1}
              </span>
              <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Step {currentStep + 1} of {currentExercise?.instructions.length}
              </span>
            </div>
            <p className="text-center font-medium text-neutral-900 dark:text-white">
              {currentExercise?.instructions[currentStep]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-5">
            <div className="flex justify-between text-sm text-neutral-500 mb-2">
              <span>Progress</span>
              <span className="tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div className="progress-track h-2">
              <div
                className="progress-fill progress-fill-green h-2"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={handleEndExercise}
            className="w-full py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <Pause className="w-5 h-5" />
            Stop Exercise
          </button>
        </div>
      )}
    </div>
  );
};

export default EyeExercises;
