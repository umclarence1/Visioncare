
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { Calendar, TrendingUp, Plus } from 'lucide-react';

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

const DailyHealthLog: React.FC = () => {
  const { healthLogs, addHealthLog, screenTime } = useEyeCare();
  const [showAddForm, setShowAddForm] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<number[]>([3]);
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
      severity: severity[0],
      notes,
      screenTimeHours: screenTime.daily / 60
    });

    // Reset form
    setSymptoms([]);
    setSeverity([3]);
    setNotes('');
    setShowAddForm(false);
  };

  const chartData = healthLogs.slice(0, 7).reverse().map(log => ({
    date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    severity: log.severity,
    screenTime: log.screenTimeHours
  }));

  return (
    <Card className="shadow-md card-gradient">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Daily Eye Health Log</CardTitle>
          <Calendar className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!showAddForm ? (
            <>
              <Button 
                onClick={() => setShowAddForm(true)} 
                className="w-full"
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Log Today's Symptoms
              </Button>

              {healthLogs.length > 0 && (
                <>
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[1, 5]} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="severity" 
                          stroke="hsl(var(--destructive))" 
                          strokeWidth={2}
                          name="Severity"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Recent Entries
                    </h4>
                    {healthLogs.slice(0, 3).map(log => (
                      <div key={log.id} className="p-3 bg-background/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium">
                            {new Date(log.date).toLocaleDateString()}
                          </span>
                          <Badge variant={log.severity > 3 ? "destructive" : log.severity > 2 ? "secondary" : "outline"}>
                            Severity: {log.severity}/5
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {log.symptoms.map(symptom => (
                            <Badge key={symptom} variant="outline" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                        {log.notes && (
                          <p className="text-xs text-muted-foreground">{log.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Select symptoms you're experiencing today:
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {commonSymptoms.map(symptom => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={symptoms.includes(symptom)}
                        onCheckedChange={() => handleSymptomToggle(symptom)}
                      />
                      <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Overall severity (1 = Mild, 5 = Severe)
                </Label>
                <div className="px-2">
                  <Slider
                    value={severity}
                    onValueChange={setSeverity}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Mild</span>
                    <span className="font-medium">Level {severity[0]}</span>
                    <span>Severe</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium">
                  Additional notes (optional)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional details about your symptoms..."
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmit} 
                  disabled={symptoms.length === 0}
                  className="flex-1"
                >
                  Save Entry
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)} 
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyHealthLog;
