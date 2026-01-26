import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';

type BreathingPhase = 'idle' | 'inhale' | 'hold' | 'exhale';

interface BreathingExerciseProps {
  inhaleDuration?: number;
  holdDuration?: number;
  exhaleDuration?: number;
  cycles?: number;
  onComplete?: () => void;
  className?: string;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  inhaleDuration = 4,
  holdDuration = 4,
  exhaleDuration = 6,
  cycles = 5,
  onComplete,
  className,
}) => {
  const [phase, setPhase] = useState<BreathingPhase>('idle');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalCycleTime = inhaleDuration + holdDuration + exhaleDuration;

  const getPhaseInstruction = (): string => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Ready?';
    }
  };

  const getPhaseColor = (): string => {
    switch (phase) {
      case 'inhale':
        return 'text-blue-500';
      case 'hold':
        return 'text-amber-500';
      case 'exhale':
        return 'text-teal-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCircleScale = (): number => {
    switch (phase) {
      case 'inhale':
        return 1.4;
      case 'hold':
        return 1.4;
      case 'exhale':
        return 1;
      default:
        return 1;
    }
  };

  const startExercise = useCallback(() => {
    setIsActive(true);
    setCurrentCycle(1);
    setPhase('inhale');
    setTimeRemaining(inhaleDuration);
  }, [inhaleDuration]);

  const pauseExercise = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetExercise = useCallback(() => {
    setIsActive(false);
    setPhase('idle');
    setCurrentCycle(0);
    setTimeRemaining(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            return holdDuration;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return exhaleDuration;
          } else if (phase === 'exhale') {
            if (currentCycle >= cycles) {
              // Exercise complete
              setIsActive(false);
              setPhase('idle');
              onComplete?.();
              return 0;
            }
            // Start new cycle
            setCurrentCycle(c => c + 1);
            setPhase('inhale');
            return inhaleDuration;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase, currentCycle, cycles, inhaleDuration, holdDuration, exhaleDuration, onComplete]);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wind className="h-5 w-5 text-primary" />
          Deep Breathing Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Breathing Circle */}
        <div className="flex justify-center py-6">
          <div className="relative">
            {/* Outer ring */}
            <div
              className={cn(
                'w-32 h-32 rounded-full border-4 transition-all duration-1000 ease-in-out',
                phase === 'idle' ? 'border-muted' : 'border-primary/30'
              )}
              style={{
                transform: `scale(${getCircleScale()})`,
              }}
            >
              {/* Inner content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn('text-2xl font-bold transition-colors', getPhaseColor())}>
                  {phase === 'idle' ? '🧘' : timeRemaining}
                </span>
                <span className={cn('text-sm font-medium mt-1', getPhaseColor())}>
                  {getPhaseInstruction()}
                </span>
              </div>
            </div>

            {/* Animated ring */}
            {isActive && (
              <div
                className={cn(
                  'absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse',
                  'transition-all duration-1000 ease-in-out'
                )}
                style={{
                  transform: `scale(${getCircleScale()})`,
                }}
              />
            )}
          </div>
        </div>

        {/* Progress */}
        {isActive && (
          <div className="text-center text-sm text-muted-foreground">
            Cycle {currentCycle} of {cycles}
          </div>
        )}

        {/* Timing Info */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className={cn(
            'p-2 rounded-lg transition-colors',
            phase === 'inhale' ? 'bg-blue-500/20 text-blue-500' : 'bg-muted'
          )}>
            <div className="font-medium">Inhale</div>
            <div>{inhaleDuration}s</div>
          </div>
          <div className={cn(
            'p-2 rounded-lg transition-colors',
            phase === 'hold' ? 'bg-amber-500/20 text-amber-500' : 'bg-muted'
          )}>
            <div className="font-medium">Hold</div>
            <div>{holdDuration}s</div>
          </div>
          <div className={cn(
            'p-2 rounded-lg transition-colors',
            phase === 'exhale' ? 'bg-teal-500/20 text-teal-500' : 'bg-muted'
          )}>
            <div className="font-medium">Exhale</div>
            <div>{exhaleDuration}s</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {phase === 'idle' ? (
            <Button onClick={startExercise} className="gap-2">
              <Play className="h-4 w-4" />
              Start ({cycles} cycles)
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={isActive ? pauseExercise : startExercise}
              >
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" onClick={resetExercise}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
