import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Square, Loader2 } from 'lucide-react';
import { SpeechTranscriber, isTranscriptionSupported } from '@/services/transcription';
import { cn } from '@/lib/utils';

interface VoiceMemoRecorderProps {
  onTranscriptReady: (transcript: string) => void;
  disabled?: boolean;
}

type RecordingState = 'idle' | 'recording' | 'processing';

const MAX_DURATION_SECONDS = 300; // 5 minutes max
const MIN_DURATION_SECONDS = 3;

const VoiceMemoRecorder = ({ onTranscriptReady, disabled }: VoiceMemoRecorderProps) => {
  const [state, setState] = useState<RecordingState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [interimText, setInterimText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const transcriberRef = useRef<SpeechTranscriber | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const finalTextRef = useRef('');
  const interimTextRef = useRef('');

  const supported = isTranscriptionSupported();

  useEffect(() => {
    return () => { stopEverything(); };
  }, []);

  useEffect(() => {
    if (elapsed >= MAX_DURATION_SECONDS && state === 'recording') {
      handleStop();
    }
  }, [elapsed, state]);

  const stopEverything = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (audioContextRef.current) { audioContextRef.current.close(); audioContextRef.current = null; }
    transcriberRef.current?.stop();
    transcriberRef.current = null;
  };

  const monitorAudio = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    const tick = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      setAudioLevel(Math.min(avg / 128, 1));
      animFrameRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, []);

  const handleStart = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = stream;

      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      ctx.createMediaStreamSource(stream).connect(analyser);
      monitorAudio();

      finalTextRef.current = '';
      interimTextRef.current = '';
      setFinalText('');
      setInterimText('');
      setElapsed(0);

      const transcriber = new SpeechTranscriber({
        continuous: true,
        interimResults: true,
        onResult: (result) => {
          if (result.isFinal) {
            finalTextRef.current = (finalTextRef.current ? finalTextRef.current + ' ' : '') + result.transcript;
            interimTextRef.current = '';
            setFinalText(finalTextRef.current);
            setInterimText('');
          } else {
            interimTextRef.current = result.transcript;
            setInterimText(result.transcript);
          }
        },
        onError: (err) => console.error('Speech recognition error:', err),
      });
      transcriberRef.current = transcriber;
      transcriber.start();

      timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);
      setState('recording');
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  }, [monitorAudio]);

  const handleStop = useCallback(() => {
    const transcript = transcriberRef.current?.stop() || '';
    stopEverything();
    setState('processing');
    setAudioLevel(0);

    const combined = (finalTextRef.current + (interimTextRef.current ? ' ' + interimTextRef.current : '')).trim() || transcript;

    setTimeout(() => {
      if (combined.length > 0) {
        onTranscriptReady(combined);
      }
      setState('idle');
      setFinalText('');
      setInterimText('');
      setElapsed(0);
    }, 500);
  }, [onTranscriptReady]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!supported) {
    return (
      <p className="text-xs text-muted-foreground">
        Voice memo is not supported in this browser. Try Chrome or Edge.
      </p>
    );
  }

  if (state === 'idle') {
    return (
      <Button type="button" variant="outline" size="sm" onClick={handleStart} disabled={disabled} className="gap-2">
        <Mic className="h-4 w-4" />
        Record Voice Memo
      </Button>
    );
  }

  return (
    <Card className="p-4 border-primary/30 bg-primary/5">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex items-center justify-center">
          <div className={cn(
            'w-3 h-3 rounded-full',
            state === 'recording' ? 'bg-red-500 animate-pulse' : 'bg-primary animate-pulse'
          )} />
          {state === 'recording' && (
            <div
              className="absolute w-6 h-6 rounded-full bg-red-500/20 transition-transform"
              style={{ transform: `scale(${1 + audioLevel * 1.5})` }}
            />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {state === 'recording' ? 'Recording' : 'Processing'}
            </span>
            <Badge variant="outline" className="text-xs font-mono">
              {formatTime(elapsed)} / {formatTime(MAX_DURATION_SECONDS)}
            </Badge>
          </div>
          {elapsed < MIN_DURATION_SECONDS && state === 'recording' && (
            <p className="text-xs text-muted-foreground">
              Speak for at least {MIN_DURATION_SECONDS} seconds
            </p>
          )}
        </div>

        {state === 'recording' && (
          <Button type="button" size="sm" variant="destructive" onClick={handleStop}
            disabled={elapsed < MIN_DURATION_SECONDS} className="gap-1.5">
            <Square className="h-3.5 w-3.5" />
            Stop
          </Button>
        )}

        {state === 'processing' && (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        )}
      </div>

      {(finalText || interimText) && (
        <div className="text-xs text-muted-foreground bg-background/50 rounded p-2 max-h-24 overflow-y-auto">
          <span>{finalText}</span>
          {interimText && <span className="text-primary/60 italic"> {interimText}</span>}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-2">
        Max {MAX_DURATION_SECONDS / 60} min. Uses browser speech recognition — no data leaves your device.
      </p>
    </Card>
  );
};

export default VoiceMemoRecorder;
