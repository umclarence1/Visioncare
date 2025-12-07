import { useState, useMemo } from 'react';
import { useEyeCare } from '@/contexts/EyeCareContext';
import {
  Lightbulb,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Eye,
  Monitor,
  Moon,
  Clock,
  Droplets,
  Sparkles
} from 'lucide-react';

interface Tip {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
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
    icon: <Eye className="w-5 h-5" />,
    conditions: { longScreenTime: true }
  },
  {
    id: 2,
    title: "Adjust Screen Position",
    description: "Position your screen about an arm's length away and at eye level or slightly below.",
    priority: 'medium',
    icon: <Monitor className="w-5 h-5" />,
    conditions: { longScreenTime: true }
  },
  {
    id: 3,
    title: "Reduce Glare",
    description: "Minimize glare by adjusting room lighting and using matte screen filters if necessary.",
    priority: 'medium',
    icon: <Sparkles className="w-5 h-5" />,
    conditions: { highBrightness: true }
  },
  {
    id: 4,
    title: "Blink More Often",
    description: "When using digital devices, we blink less frequently. Make a conscious effort to blink regularly.",
    priority: 'high',
    icon: <Droplets className="w-5 h-5" />,
    conditions: { longScreenTime: true }
  },
  {
    id: 5,
    title: "Use Night Mode",
    description: "Enable night mode or blue light filters in the evening to reduce exposure to blue light.",
    priority: 'high',
    icon: <Moon className="w-5 h-5" />,
    conditions: { nightTime: true }
  },
  {
    id: 6,
    title: "Take Regular Breaks",
    description: "You've been working for a while. Remember to take short breaks to prevent eye fatigue.",
    priority: 'high',
    icon: <Clock className="w-5 h-5" />,
    conditions: { noBreaks: true }
  },
  {
    id: 7,
    title: "Lower Brightness",
    description: "Consider lowering your screen brightness. High brightness levels can contribute to eye strain.",
    priority: 'medium',
    icon: <Monitor className="w-5 h-5" />,
    conditions: { highBrightness: true }
  }
];

const EyeHealthTips = () => {
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

    return filteredTips.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [screenTime.daily, brightness, isTakingBreak]);

  const displayTips = expanded ? relevantTips : relevantTips.slice(0, 3);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          border: 'border-l-4 border-l-red-500',
          bg: 'bg-red-50 dark:bg-red-900/10',
          icon: 'text-red-600 dark:text-red-400'
        };
      case 'medium':
        return {
          border: 'border-l-4 border-l-amber-500',
          bg: 'bg-amber-50 dark:bg-amber-900/10',
          icon: 'text-amber-600 dark:text-amber-400'
        };
      default:
        return {
          border: 'border-l-4 border-l-emerald-500',
          bg: 'bg-emerald-50 dark:bg-emerald-900/10',
          icon: 'text-emerald-600 dark:text-emerald-400'
        };
    }
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Health Tips</h3>
            <p className="text-sm text-neutral-500">Personalized for you</p>
          </div>
        </div>
        {relevantTips.length > 0 && (
          <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold">
            {relevantTips.length} tip{relevantTips.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {relevantTips.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-lg font-semibold text-neutral-900 dark:text-white">You're doing great!</p>
          <p className="text-sm text-neutral-500 mt-1">No specific tips needed right now</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayTips.map((tip) => {
            const styles = getPriorityStyles(tip.priority);
            return (
              <div
                key={tip.id}
                className={`p-3 rounded-lg ${styles.border} ${styles.bg} transition-colors`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center ${styles.icon}`}>
                    {tip.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-medium text-sm text-neutral-900 dark:text-white">{tip.title}</h4>
                      {tip.priority === 'high' && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">{tip.description}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {relevantTips.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {expanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show {relevantTips.length - 3} More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EyeHealthTips;
