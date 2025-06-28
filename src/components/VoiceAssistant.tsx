
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
  MessageCircle
} from 'lucide-react';

interface VoiceCommand {
  phrase: string;
  action: () => void;
  description: string;
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
      action: () => startEyeExercise({ name: 'Blink Focus', duration: 60, instructions: 'Blink slowly and deliberately' }),
      description: 'Start an eye exercise routine'
    },
    {
      phrase: 'log eye strain',
      action: () => logHealthData('eye strain', 3, 'Logged via voice'),
      description: 'Log eye strain symptoms'
    },
    {
      phrase: 'next checkup',
      action: () => speak(`Your next eye checkup is scheduled for ${nextCheckupDate ? new Date(nextCheckupDate).toLocaleDateString() : 'not scheduled'}`),
      description: 'Check next appointment'
    },
    {
      phrase: 'screen time today',
      action: () => speak(`You've used screens for ${Math.floor(screenTime.daily / 60)} hours and ${Math.floor(screenTime.daily % 60)} minutes today`),
      description: 'Get today\'s screen time'
    },
    {
      phrase: 'health score',
      action: () => speak(`Your current eye health score is ${Math.round(healthScore)} out of 100`),
      description: 'Check your health score'
    },
    {
      phrase: 'next break',
      action: () => speak(`Your next break is in ${getNextBreakTime()} minutes`),
      description: 'Time until next break'
    }
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
      speak("Sorry, I didn't understand that command. Try saying 'start eye exercise' or 'log eye strain'");
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

  if (!isSupported) {
    return (
      <Card className="neuro-card">
        <CardContent className="p-6 text-center">
          <div className="icon-container-warning mx-auto mb-4">
            <MicOff className="h-8 w-8 text-amber-600" />
          </div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Voice Assistant not supported in this browser
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Try using Chrome or Edge for voice commands
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Voice Control Panel */}
      <Card className="neuro-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="icon-container-ai">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient-ai">AI Voice Assistant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Control your eye care with voice commands</p>
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1 rounded-full font-medium bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>

          {/* Voice Button */}
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={toggleListening}
              className={`btn-voice ${isListening ? 'recording' : ''} w-20 h-20`}
              disabled={!isSupported}
            >
              {isListening ? (
                <Mic className="h-8 w-8 animate-pulse" />
              ) : (
                <MicOff className="h-8 w-8" />
              )}
            </Button>
            
            <div className="text-center">
              <p className="text-lg font-semibold">
                {isListening ? 'Listening...' : 'Tap to speak'}
              </p>
              {transcript && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                  "{transcript}"
                </p>
              )}
              {lastCommand && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Volume2 className="h-4 w-4 text-emerald-600" />
                  <p className="text-sm font-medium text-emerald-600">
                    Last command: {lastCommand}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Commands Reference */}
      <Card className="pro-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-container">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-gradient">Available Voice Commands</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voiceCommands.map((command, index) => (
              <div key={index} className="flex items-center justify-between p-3 neuro-card-inset rounded-xl">
                <div>
                  <p className="font-medium text-blue-600 dark:text-blue-400">
                    "{command.phrase}"
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {command.description}
                  </p>
                </div>
                <div className="icon-container-success">
                  <Mic className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
