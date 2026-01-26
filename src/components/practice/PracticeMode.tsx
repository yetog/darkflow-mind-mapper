import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  RotateCcw,
  Loader2,
  Volume2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { AudioRecorder, isRecordingSupported } from '@/services/audio-recorder';
import { SpeechTranscriber, isTranscriptionSupported } from '@/services/transcription';
import { analyzeSpeech } from '@/services/speech-analyzer';
import { RecordingState, SpeechAnalysis } from '@/types/speech-analysis';
import AudioVisualizer from './AudioVisualizer';
import AnalysisResults from './AnalysisResults';

interface PracticeModeProps {
  onClose?: () => void;
}

const PracticeMode: React.FC<PracticeModeProps> = ({ onClose }) => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [analysis, setAnalysis] = useState<SpeechAnalysis | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<AudioRecorder | null>(null);
  const transcriberRef = useRef<SpeechTranscriber | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Check browser support
  const isSupported = isRecordingSupported() && isTranscriptionSupported();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = useCallback(async () => {
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setAnalysis(null);
    setAudioUrl(null);
    
    try {
      // Initialize audio recorder
      recorderRef.current = new AudioRecorder({
        onAudioLevel: setAudioLevel,
      });

      // Initialize transcriber
      transcriberRef.current = new SpeechTranscriber({
        onResult: (result) => {
          if (result.isFinal) {
            setTranscript(prev => prev + result.transcript + ' ');
            setInterimTranscript('');
          } else {
            setInterimTranscript(result.transcript);
          }
        },
        onError: (err) => {
          console.warn('Transcription error:', err);
        },
      });

      // Start recording
      await recorderRef.current.start();
      transcriberRef.current.start();

      // Start timer
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setDuration(elapsed);
      }, 1000);

      setRecordingState('recording');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
      setRecordingState('idle');
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (!recorderRef.current) return;

    setRecordingState('processing');

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Stop transcription
    const finalTranscript = transcriberRef.current?.stop() || transcript;
    setTranscript(finalTranscript);

    try {
      // Stop recording and get audio blob
      const audioBlob = await recorderRef.current.stop();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Analyze the speech
      const speechAnalysis = analyzeSpeech(finalTranscript, duration, audioLevel);
      setAnalysis(speechAnalysis);

      setRecordingState('complete');
    } catch (err) {
      setError('Failed to process recording');
      setRecordingState('idle');
    }
  }, [transcript, duration, audioLevel]);

  const resetRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setRecordingState('idle');
    setDuration(0);
    setTranscript('');
    setInterimTranscript('');
    setAnalysis(null);
    setAudioUrl(null);
    setError(null);
    setAudioLevel(0);
  }, [audioUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      recorderRef.current?.stop().catch(() => {});
      transcriberRef.current?.stop();
    };
  }, [audioUrl]);

  if (!isSupported) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Browser Not Supported</h3>
            <p className="text-muted-foreground">
              Speech recording requires a modern browser with microphone access and Web Speech API support.
              Please try Chrome, Edge, or Safari.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (recordingState === 'complete' && analysis) {
    return (
      <AnalysisResults 
        analysis={analysis}
        audioUrl={audioUrl}
        onPracticeAgain={resetRecording}
      />
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Practice Mode</h2>
          <p className="text-muted-foreground">
            {recordingState === 'idle' && 'Click the microphone to start practicing'}
            {recordingState === 'recording' && 'Speak naturally - we\'re transcribing and analyzing'}
            {recordingState === 'processing' && 'Analyzing your speech...'}
          </p>
        </div>

        {/* Timer */}
        <div className="text-center">
          <span className="text-5xl font-mono font-bold text-foreground">
            {formatTime(duration)}
          </span>
        </div>

        {/* Audio Visualizer */}
        <div className="h-24 flex items-center justify-center">
          <AudioVisualizer 
            isActive={recordingState === 'recording'} 
            level={audioLevel} 
          />
        </div>

        {/* Main Recording Button */}
        <div className="flex justify-center gap-4">
          {recordingState === 'idle' && (
            <Button
              size="lg"
              className="h-20 w-20 rounded-full"
              onClick={startRecording}
            >
              <Mic className="h-8 w-8" />
            </Button>
          )}

          {recordingState === 'recording' && (
            <Button
              size="lg"
              variant="destructive"
              className="h-20 w-20 rounded-full"
              onClick={stopRecording}
            >
              <Square className="h-8 w-8" />
            </Button>
          )}

          {recordingState === 'processing' && (
            <Button
              size="lg"
              className="h-20 w-20 rounded-full"
              disabled
            >
              <Loader2 className="h-8 w-8 animate-spin" />
            </Button>
          )}
        </div>

        {/* Live Transcript */}
        {(recordingState === 'recording' || transcript) && (
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary" />
                Live Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm min-h-[4rem]">
                {transcript}
                <span className="text-muted-foreground italic">{interimTranscript}</span>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="py-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="ghost" size="sm" onClick={resetRecording} className="ml-auto">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recording Tips */}
        {recordingState === 'idle' && (
          <div className="grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
            <div className="space-y-1">
              <div className="text-2xl">🎯</div>
              <p>Speak clearly</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl">⏱️</div>
              <p>Take your time</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl">🔇</div>
              <p>Find a quiet spot</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeMode;
