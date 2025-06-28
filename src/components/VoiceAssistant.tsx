
/// <reference path="../types/speech.d.ts" />
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEyeCare } from '@/contexts/EyeCareContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Brain,
  Sparkles,
  MessageCircle,
  Zap,
  Shield
} from 'lucide-react';

interface VoiceCommand {
  phrase: string;
  action: () => void;
  description: string;
  category: string;
}

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const { 
    startEyeExercise, 
    logHealthData, 
    getNextBreakTime,
    nextCheckupDate,
    screenTime,
    healthScore
  } = useEyeCare();

  const voiceCommands: VoiceCommand[] = [
    {
      phrase: 'start eye exercise',
      action: () => startEyeExercise({ name: 'Focus Enhancement', duration: 60, instructions: 'Follow the guided eye movements' }),
      description: 'Begin eye exercise routine',
      category: 'Exercise'
    },
    {
      phrase: 'log eye strain',
      action: () => logHealthData('eye strain', 3, 'Voice command entry'),
      description: 'Record eye strain symptoms',
      category: 'Health'
    },
    {
      phrase: 'next checkup',
      action: () => speak(`Your next eye checkup is ${nextCheckupDate ? new Date(nextCheckupDate).toLocaleDateString() : 'not scheduled'}`),
      description: 'Check appointment schedule',
      category: 'Schedule'
    },
    {
      phrase: 'screen time today',
      action: () => speak(`Today's screen time: ${Math.floor(screenTime.daily / 60)} hours and ${Math.floor(screenTime.daily % 60)} minutes`),
      description: 'Get daily screen usage',
      category: 'Analytics'
    },
    {
      phrase: 'health score',
      action: () => speak(`Your eye health score is ${Math.round(healthScore)} out of 100`),
      description: 'Check wellness rating',
      category: 'Health'
    },
    {
      phrase: 'next break',
      action: () => speak(`Your next break is scheduled in ${getNextBreakTime()} minutes`),
      description: 'Break schedule info',
      category: 'Schedule'
    }
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          const currentTranscript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          
          setTranscript(currentTranscript);
          
          if (event.results[event.results.length - 1].isFinal) {
            processCommand(currentTranscript.toLowerCase());
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
      }
    }
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const processCommand = (command: string) => {
    const matchedCommand = voiceCommands.find(cmd => 
      command.includes(cmd.phrase)
    );

    if (matchedCommand) {
      setLastCommand(matchedCommand.phrase);
      matchedCommand.action();
      speak(`Executing ${matchedCommand.phrase}`);
    } else {
      speak("I didn't recognize that command. Try saying 'start eye exercise' or 'health score'");
    }
    
    setTranscript('');
  };

  const toggleListening = () => {
    if (!isSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const commandsByCategory = voiceCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, VoiceCommand[]>);

  if (!isSupported) {
    return (
      <div className="animate-smooth-fade-in">
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <div className="icon-container-warning mx-auto mb-6 animate-gentle-float">
              <MicOff className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gradient mb-4">Voice Assistant Unavailable</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              Voice commands not supported in this browser
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Please use Chrome, Edge, or Safari for full voice functionality
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-smooth-fade-in">
      {/* Main Voice Control Interface */}
      <Card className="glass-card-strong">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container-ai animate-gentle-float">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gradient-ai">AI Voice Assistant</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">Hands-free eye care control</p>
              </div>
            </div>
            <Badge className="achievement-badge">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Powered
            </Badge>
          </div>

          {/* Voice Control Center */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Button
                onClick={toggleListening}
                className={`btn-voice w-24 h-24 ${isListening ? 'recording' : ''}`}
                disabled={!isSupported}
              >
                {isListening ? (
                  <Mic className="h-10 w-10" />
                ) : (
                  <MicOff className="h-10 w-10" />
                )}
              </Button>
              
              {isListening && (
                <div className="absolute inset-0 rounded-full border-4 border-red-400/50 animate-ping"></div>
              )}
            </div>
            
            <div className="text-center max-w-md">
              <h3 className="text-2xl font-bold mb-2">
                {isListening ? (
                  <span className="text-gradient">Listening...</span>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300">Tap to Speak</span>
                )}
              </h3>
              
              {transcript && (
                <div className="floating-card p-4 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    "{transcript}"
                  </p>
                </div>
              )}
              
              {lastCommand && (
                <div className="flex items-center justify-center gap-3 pro-card p-3 rounded-2xl">
                  <div className="icon-container-success">
                    <Volume2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-600">Command Executed</p>
                    <p className="text-xs text-gray-500">{lastCommand}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Command Reference Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(commandsByCategory).map(([category, commands]) => (
          <Card key={category} className="floating-card animate-smooth-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container">
                  {category === 'Exercise' && <Zap className="h-5 w-5 text-blue-600" />}
                  {category === 'Health' && <Shield className="h-5 w-5 text-emerald-600" />}
                  {category === 'Schedule' && <MessageCircle className="h-5 w-5 text-purple-600" />}
                  {category === 'Analytics' && <Brain className="h-5 w-5 text-indigo-600" />}
                </div>
                <h3 className="text-xl font-bold text-gradient">{category} Commands</h3>
              </div>
              
              <div className="space-y-4">
                {commands.map((command, index) => (
                  <div key={index} className="pro-card p-4 rounded-xl pro-card-hover">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-blue-600 dark:text-blue-400 text-lg">
                          "{command.phrase}"
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {command.description}
                        </p>
                      </div>
                      <div className="icon-container-success ml-4">
                        <Mic className="h-4 w-4 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="ai-insights animate-smooth-slide-up">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container-ai animate-gentle-float">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gradient-ai">Voice Assistant Tips</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="pro-card p-6 rounded-2xl text-center">
              <div className="icon-container mx-auto mb-4">
                <Volume2 className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Speak Clearly</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use a normal speaking voice and avoid background noise
              </p>
            </div>
            
            <div className="pro-card p-6 rounded-2xl text-center">
              <div className="icon-container-success mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Use Keywords</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Commands work best when you use the exact phrases shown
              </p>
            </div>
            
            <div className="pro-card p-6 rounded-2xl text-center">
              <div className="icon-container-warning mx-auto mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Wait for Response</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allow the AI to complete each command before speaking again
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
