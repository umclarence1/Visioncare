import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEyeCare } from '@/contexts/EyeCareContext';
import {
  Calendar,
  TrendingUp,
  Plus,
  Check,
  Heart
} from 'lucide-react';

const commonSymptoms = [
  'Dryness',
  'Itchiness',
  'Redness',
  'Burning sensation',
  'Blurred vision',
  'Headache',
  'Eye strain',
  'Sensitivity to light'
];

const DailyHealthLog = () => {
  const { healthLogs, addHealthLog, screenTime } = useEyeCare();
  const [showAddForm, setShowAddForm] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(3);
  const [notes, setNotes] = useState('');

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    if (symptoms.length === 0) return;

    addHealthLog({
      date: new Date().toISOString().split('T')[0],
      symptoms,
      severity,
      notes,
      screenTimeHours: screenTime.daily / 60
    });

    setSymptoms([]);
    setSeverity(3);
    setNotes('');
    setShowAddForm(false);
  };

  const chartData = healthLogs.slice(0, 7).reverse().map(log => ({
    date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    severity: log.severity
  }));

  const getSeverityColor = (sev: number) => {
    if (sev <= 2) return 'text-emerald-600 dark:text-emerald-400';
    if (sev <= 3) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSeverityBg = (sev: number) => {
    if (sev <= 2) return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
    if (sev <= 3) return 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800';
    return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Health Log</h3>
            <p className="text-sm text-neutral-500">Track your symptoms</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800">
          <Calendar className="w-4 h-4 text-neutral-500" />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {!showAddForm ? (
        <div className="space-y-5">
          {/* Add Entry Button - Premium Design */}
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full p-5 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-red-400 dark:hover:border-red-600 hover:bg-gradient-to-br hover:from-red-50 hover:to-rose-50 dark:hover:from-red-950/20 dark:hover:to-rose-950/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-red-500/25">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-neutral-900 dark:text-white">Log Today's Symptoms</span>
                <span className="text-sm text-neutral-500">Track how your eyes feel</span>
              </div>
            </div>
          </button>

          {/* Chart */}
          {healthLogs.length > 0 && (
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-4 flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Severity Trend
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <YAxis domain={[1, 5]} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="severity"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: '#ef4444' }}
                      name="Severity"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recent Entries */}
          {healthLogs.length > 0 && (
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-neutral-500" />
                Recent Entries
              </h4>
              <div className="space-y-2">
                {healthLogs.slice(0, 3).map(log => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityBg(log.severity)} ${getSeverityColor(log.severity)}`}>
                        Severity {log.severity}/5
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {log.symptoms.map(symptom => (
                        <span key={symptom} className="px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                          {symptom}
                        </span>
                      ))}
                    </div>
                    {log.notes && (
                      <p className="text-xs text-neutral-500 mt-1">{log.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {healthLogs.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-neutral-400" />
              </div>
              <p className="font-semibold text-neutral-700 dark:text-neutral-300">No health logs yet</p>
              <p className="text-sm text-neutral-500 mt-1">Start tracking your symptoms today</p>
            </div>
          )}
        </div>
      ) : (
        /* Add Form */
        <div className="space-y-5">
          {/* Symptom Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Select symptoms you're experiencing:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {commonSymptoms.map(symptom => {
                const isSelected = symptoms.includes(symptom);
                return (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`p-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-2 border-red-300 dark:border-red-700'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-2 border-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isSelected && <Check className="w-4 h-4" />}
                      {symptom}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Severity Slider */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Overall severity
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => setSeverity(level)}
                  className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    severity === level
                      ? level <= 2
                        ? 'bg-emerald-500 text-white'
                        : level <= 3
                        ? 'bg-amber-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>Mild</span>
              <span>Severe</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Additional notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional details..."
              className="w-full p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={symptoms.length === 0}
              className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
            >
              Save Entry
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyHealthLog;
