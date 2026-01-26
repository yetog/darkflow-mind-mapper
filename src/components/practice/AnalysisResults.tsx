import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Zap,
  Clock,
  MessageSquare,
  Volume2,
  Target,
  Award,
} from 'lucide-react';
import { SpeechAnalysis, SpeechMetrics } from '@/types/speech-analysis';
import { getScoreColor, getScoreLabel } from '@/services/speech-analyzer';

interface AnalysisResultsProps {
  analysis: SpeechAnalysis;
  audioUrl: string | null;
  onPracticeAgain: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysis,
  audioUrl,
  onPracticeAgain,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const metricCards = [
    {
      key: 'pace' as const,
      label: 'Pace',
      icon: Clock,
      value: `${analysis.metrics.pace.wordsPerMinute} WPM`,
      description: analysis.metrics.pace.variation === 'good' 
        ? 'Perfect pace!' 
        : `Try to ${analysis.metrics.pace.variation === 'too-fast' ? 'slow down' : 'speed up'}`,
    },
    {
      key: 'fillerWords' as const,
      label: 'Filler Words',
      icon: MessageSquare,
      value: `${analysis.metrics.fillerWords.count} used`,
      description: analysis.metrics.fillerWords.count === 0 
        ? 'No fillers detected!' 
        : `${analysis.metrics.fillerWords.percentageOfSpeech.toFixed(1)}% of speech`,
    },
    {
      key: 'energy' as const,
      label: 'Energy',
      icon: Zap,
      value: analysis.metrics.energy.level.charAt(0).toUpperCase() + analysis.metrics.energy.level.slice(1),
      description: 'Voice energy level',
    },
    {
      key: 'confidence' as const,
      label: 'Confidence',
      icon: Target,
      value: analysis.metrics.confidence.assertiveness.charAt(0).toUpperCase() + analysis.metrics.confidence.assertiveness.slice(1),
      description: `${analysis.metrics.confidence.hesitations} hesitations detected`,
    },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Overall Score */}
        <Card className="overflow-hidden">
          <div className="relative bg-gradient-to-r from-primary/20 to-primary/5 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Your Speech Score</h2>
                <p className="text-muted-foreground">
                  {formatDuration(analysis.duration)} • {analysis.wordCount} words
                </p>
              </div>
              <div className="text-center">
                <div className={cn(
                  "text-6xl font-bold",
                  getScoreColor(analysis.overallScore)
                )}>
                  {analysis.overallScore}
                </div>
                <Badge variant="secondary" className="mt-2">
                  {getScoreLabel(analysis.overallScore)}
                </Badge>
              </div>
            </div>
            
            {/* Audio Playback */}
            {audioUrl && (
              <div className="mt-6 flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={togglePlayback}
                  className="gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play Recording'}
                </Button>
                <audio 
                  ref={audioRef} 
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            )}
          </div>
        </Card>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((metric) => {
            const score = analysis.metrics[metric.key].score;
            const Icon = metric.icon;
            
            return (
              <Card key={metric.key}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className={cn("text-2xl font-bold", getScoreColor(score))}>
                      {score}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{metric.label}</p>
                    <p className="text-sm text-primary">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                  <Progress value={score} className="mt-3 h-1" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Highlights */}
        {analysis.highlights.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.highlights.map((highlight, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg",
                    highlight.type === 'strength' 
                      ? "bg-green-500/10 border border-green-500/20" 
                      : "bg-amber-500/10 border border-amber-500/20"
                  )}
                >
                  {highlight.type === 'strength' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                  )}
                  <p className="text-sm">{highlight.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Suggestions */}
        {analysis.suggestions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>
                Focus on these areas in your next practice session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.suggestions.map((suggestion, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      suggestion.priority === 'high' ? 'destructive' : 
                      suggestion.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {suggestion.priority}
                    </Badge>
                    <h4 className="font-medium">{suggestion.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  {suggestion.exercise && (
                    <div className="text-sm bg-muted/50 p-3 rounded-lg">
                      <span className="font-medium">💡 Try this: </span>
                      {suggestion.exercise}
                    </div>
                  )}
                  {i < analysis.suggestions.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Transcript */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {analysis.transcript || 'No transcript available'}
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pb-6">
          <Button onClick={onPracticeAgain} size="lg" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Practice Again
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AnalysisResults;
