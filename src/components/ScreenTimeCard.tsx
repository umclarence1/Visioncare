import { useEyeCare } from '@/contexts/EyeCareContext';
import { Monitor, TrendingUp, TrendingDown } from 'lucide-react';

const ScreenTimeCard = () => {
  const { screenTime } = useEyeCare();

  const hours = Math.floor(screenTime.daily / 60);
  const minutes = Math.floor(screenTime.daily % 60);
  const percentage = Math.min((screenTime.daily / (8 * 60)) * 100, 100);

  const weeklyAvg = screenTime.weekly.reduce((a, b) => a + b, 0) / 7;
  const vsAvg = screenTime.daily - weeklyAvg;

  const getStatus = () => {
    if (percentage < 25) return { text: 'Excellent', color: 'emerald' };
    if (percentage < 50) return { text: 'Good', color: 'blue' };
    if (percentage < 75) return { text: 'Moderate', color: 'amber' };
    return { text: 'High', color: 'red' };
  };

  const status = getStatus();

  const tagColors: Record<string, string> = {
    emerald: 'tag-green',
    blue: 'tag-blue',
    amber: 'tag-amber',
    red: 'tag-red'
  };

  const progressColors: Record<string, string> = {
    emerald: 'progress-fill-green',
    blue: 'progress-fill-blue',
    amber: 'progress-fill-amber',
    red: 'progress-fill-red'
  };

  const bgColors: Record<string, string> = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    amber: 'bg-amber-50 dark:bg-amber-900/20',
    red: 'bg-red-50 dark:bg-red-900/20'
  };

  const textColors: Record<string, string> = {
    emerald: 'text-emerald-700 dark:text-emerald-300',
    blue: 'text-blue-700 dark:text-blue-300',
    amber: 'text-amber-700 dark:text-amber-300',
    red: 'text-red-700 dark:text-red-300'
  };

  const messages: Record<string, string> = {
    emerald: 'Great job! Low screen time today.',
    blue: 'Moderate screen usage. Keep it up!',
    amber: 'Consider taking more breaks.',
    red: 'High screen time. Take a break soon.'
  };

  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="icon-wrapper icon-wrapper-blue">
            <Monitor className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">Screen Time</h3>
            <p className="text-xs text-neutral-500">Today's usage</p>
          </div>
        </div>
        <span className={`tag ${tagColors[status.color]}`}>
          {status.text}
        </span>
      </div>

      {/* Main Display */}
      <div className="text-center mb-5">
        <div className="metric-value text-4xl mb-1">
          {hours}h {minutes}m
        </div>
        <div className={`metric-trend ${vsAvg > 0 ? 'metric-trend-down' : 'metric-trend-up'}`}>
          {vsAvg > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(Math.round(vsAvg))}m {vsAvg > 0 ? 'above' : 'below'} avg</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-neutral-500 mb-2">
          <span>Daily limit (8h)</span>
          <span className="tabular-nums">{Math.round(percentage)}%</span>
        </div>
        <div className="progress-track h-2">
          <div
            className={`progress-fill h-2 ${progressColors[status.color]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Status Message */}
      <div className={`p-3 rounded-lg ${bgColors[status.color]}`}>
        <p className={`text-sm font-medium ${textColors[status.color]}`}>
          {messages[status.color]}
        </p>
      </div>
    </div>
  );
};

export default ScreenTimeCard;
