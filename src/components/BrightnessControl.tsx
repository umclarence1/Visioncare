import { useEyeCare } from '@/contexts/EyeCareContext';
import { Sun, Moon } from 'lucide-react';

const BrightnessControl = () => {
  const { brightness, updateBrightness } = useEyeCare();

  const getAdvice = () => {
    if (brightness > 70) return { text: 'High brightness may strain your eyes', color: 'amber' };
    if (brightness > 40) return { text: 'Comfortable for most lighting conditions', color: 'emerald' };
    return { text: 'Great for evening and dark rooms', color: 'blue' };
  };

  const advice = getAdvice();

  const textColors: Record<string, string> = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    amber: 'text-amber-600 dark:text-amber-400',
    blue: 'text-blue-600 dark:text-blue-400'
  };

  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="icon-wrapper icon-wrapper-amber">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">Brightness</h3>
            <p className="text-xs text-neutral-500">Adjust screen brightness</p>
          </div>
        </div>
      </div>

      {/* Brightness Value */}
      <div className="text-center mb-5">
        <div className="metric-value text-4xl mb-1">
          {brightness}%
        </div>
        <p className={`text-sm font-medium ${textColors[advice.color]}`}>
          {advice.text}
        </p>
      </div>

      {/* Slider */}
      <div className="mb-5">
        <div className="flex items-center gap-4">
          <Moon className="w-5 h-5 text-neutral-400" />
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => updateBrightness(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-amber-500
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:hover:scale-110"
            />
          </div>
          <Sun className="w-5 h-5 text-amber-500" />
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex gap-2">
        {[25, 50, 75, 100].map((preset) => (
          <button
            key={preset}
            onClick={() => updateBrightness(preset)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              brightness === preset
                ? 'bg-amber-500 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {preset}%
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrightnessControl;
