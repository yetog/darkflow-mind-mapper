import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FadeInSection } from '@/components/ui/animated-card';
import DynamicIcon from '@/components/ui/dynamic-icon';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Mic,
  BookOpen,
  Wind,
  Play,
  RotateCcw,
  Target,
} from 'lucide-react';
import { Lesson, Exercise, ExerciseType } from '@/types/lessons';
import { LESSONS } from '@/data/lessons';
import BreathingExercise from '@/components/common/BreathingExercise';

interface LessonPlayerProps {
  lessonId: string;
  onClose: () => void;
  onStartPractice?: () => void;
}

const LessonPlayer: React.FC<LessonPlayerProps> = ({ lessonId, onClose, onStartPractice }) => {
  const lesson = LESSONS.find(l => l.id === lessonId);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const exercise = lesson?.exercises[currentExerciseIndex];
  const totalExercises = lesson?.exercises.length || 0;
  const progressPercent = totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

  // Timer logic
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => setTimerSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const resetTimer = useCallback(() => {
    setTimerSeconds(0);
    setTimerRunning(false);
  }, []);

  const markComplete = useCallback(() => {
    setCompletedExercises(prev => new Set([...prev, currentExerciseIndex]));
  }, [currentExerciseIndex]);

  const goNext = useCallback(() => {
    markComplete();
    resetTimer();
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  }, [currentExerciseIndex, totalExercises, markComplete, resetTimer]);

  const goPrev = useCallback(() => {
    resetTimer();
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  }, [currentExerciseIndex, resetTimer]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!lesson || !exercise) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Lesson not found</p>
          <Button onClick={onClose}>Go Back</Button>
        </Card>
      </div>
    );
  }

  const isLastExercise = currentExerciseIndex === totalExercises - 1;
  const allComplete = completedExercises.size === totalExercises;

  const getExerciseIcon = (type: ExerciseType) => {
    switch (type) {
      case 'breathing': return Wind;
      case 'prompt':
      case 'impromptu': return Mic;
      case 'reading':
      case 'articulation': return BookOpen;
      case 'timed-speech': return Clock;
      case 'repeat-after': return Play;
      default: return Target;
    }
  };

  const ExerciseIcon = getExerciseIcon(exercise.type);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <FadeInSection direction="up" delay={0}>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onClose} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Lessons
            </Button>
            <Badge variant="secondary">
              {lesson.difficulty}
            </Badge>
          </div>
        </FadeInSection>

        {/* Lesson Title & Progress */}
        <FadeInSection direction="up" delay={0.1}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DynamicIcon name={lesson.iconName} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Progress value={progressPercent} className="flex-1" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {completedExercises.size}/{totalExercises} exercises
                </span>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        {/* Exercise Steps */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {lesson.exercises.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => { resetTimer(); setCurrentExerciseIndex(i); }}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
                i === currentExerciseIndex
                  ? 'bg-primary text-primary-foreground'
                  : completedExercises.has(i)
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {completedExercises.has(i) && i !== currentExerciseIndex && (
                <CheckCircle className="h-3 w-3" />
              )}
              {i + 1}. {ex.title}
            </button>
          ))}
        </div>

        {/* Active Exercise */}
        <AnimatePresence mode="wait">
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ExerciseIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <Badge variant="outline" className="mt-1 capitalize">{exercise.type.replace('-', ' ')}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Instruction */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm leading-relaxed">{exercise.instruction}</p>
                </div>

                {/* Prompt text if available */}
                {exercise.prompt && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-xs font-medium text-primary mb-1">Example / Prompt</p>
                    <p className="text-sm italic text-muted-foreground">{exercise.prompt}</p>
                  </div>
                )}

                {/* Breathing exercise */}
                {exercise.type === 'breathing' && (
                  <BreathingExercise />
                )}

                {/* Timer for timed exercises */}
                {(exercise.type === 'prompt' || exercise.type === 'timed-speech' || exercise.type === 'impromptu') && (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <div className="text-4xl font-mono font-bold text-foreground">
                      {formatTime(timerSeconds)}
                    </div>
                    {exercise.targetDuration && (
                      <p className="text-xs text-muted-foreground">
                        Target: {exercise.targetDuration}s
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant={timerRunning ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="gap-2"
                      >
                        {timerRunning ? (
                          <>Stop</>
                        ) : (
                          <><Play className="h-4 w-4" /> Start Timer</>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetTimer} className="gap-2">
                        <RotateCcw className="h-4 w-4" /> Reset
                      </Button>
                    </div>
                    {onStartPractice && (
                      <Button variant="secondary" size="sm" onClick={onStartPractice} className="gap-2">
                        <Mic className="h-4 w-4" /> Record with Practice Mode
                      </Button>
                    )}
                  </div>
                )}

                {/* Tips */}
                {exercise.tips && exercise.tips.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tips</p>
                    <ul className="space-y-1.5">
                      {exercise.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Evaluation criteria */}
                {exercise.evaluationCriteria && exercise.evaluationCriteria.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Success Criteria</p>
                    <ul className="space-y-1.5">
                      {exercise.evaluationCriteria.map((criteria, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Target className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentExerciseIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>

          <div className="flex gap-2">
            {!completedExercises.has(currentExerciseIndex) && (
              <Button variant="secondary" onClick={markComplete} className="gap-2">
                <CheckCircle className="h-4 w-4" /> Mark Complete
              </Button>
            )}

            {isLastExercise ? (
              allComplete || completedExercises.has(currentExerciseIndex) ? (
                <Button onClick={() => { markComplete(); onClose(); }} className="gap-2">
                  <CheckCircle className="h-4 w-4" /> Finish Lesson
                </Button>
              ) : (
                <Button onClick={() => { markComplete(); onClose(); }} className="gap-2">
                  Finish Lesson
                </Button>
              )
            ) : (
              <Button onClick={goNext} className="gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default LessonPlayer;