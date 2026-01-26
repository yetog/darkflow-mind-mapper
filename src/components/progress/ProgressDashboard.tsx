import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  TrendingUp,
  Flame,
  Target,
  Award,
  Clock,
  BarChart3,
  Zap,
  MessageSquare,
  Volume2,
  Play,
  Lightbulb,
  Heart,
} from 'lucide-react';
import { USER_LEVELS } from '@/types/progress';
import { getRandomTip, ExpertTip } from '@/data/expert-tips';
import { SPEAKING_STATS } from '@/data/speaking-stats';
import ExpertTipCard from '@/components/common/ExpertTipCard';

interface ProgressDashboardProps {
  onStartPractice?: () => void;
}

// Mock data for demonstration
const mockProgress = {
  totalPracticeTime: 145, // minutes
  speechesAnalyzed: 23,
  currentStreak: 5,
  longestStreak: 12,
  level: {
    current: 3,
    title: 'Confident Communicator',
    xp: 450,
    xpToNextLevel: 600,
  },
  recentScores: [72, 75, 68, 82, 85, 78, 88],
  metricAverages: {
    pace: 82,
    fillerWords: 75,
    energy: 78,
    confidence: 70,
    conciseness: 85,
    pausing: 72,
  },
  insights: [
    {
      type: 'improvement' as const,
      title: 'Pace Improved 15%',
      description: 'Your speaking pace has become more consistent this week',
    },
    {
      type: 'tip' as const,
      title: 'Focus on Filler Words',
      description: 'Try replacing "um" with a brief pause instead',
    },
    {
      type: 'streak' as const,
      title: '5 Day Streak!',
      description: 'Keep it up to unlock the "Week Warrior" badge',
    },
  ],
  achievements: [
    { id: '1', name: 'First Speech', icon: '🎤', unlockedAt: new Date() },
    { id: '2', name: '10 Practices', icon: '🔟', unlockedAt: new Date() },
    { id: '3', name: '3 Day Streak', icon: '🔥', unlockedAt: new Date() },
  ],
};

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ onStartPractice }) => {
  const progress = mockProgress;
  const levelProgress = (progress.level.xp / progress.level.xpToNextLevel) * 100;
  const [currentTip, setCurrentTip] = useState<ExpertTip>(() => getRandomTip());

  const refreshTip = useCallback(() => {
    setCurrentTip(getRandomTip());
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header with Level */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Progress</h1>
            <p className="text-muted-foreground">Track your speaking improvement over time</p>
          </div>
          <Button onClick={onStartPractice} size="lg" className="gap-2">
            <Play className="h-4 w-4" />
            Start Practice
          </Button>
        </div>

        {/* Level Card */}
        <Card className="overflow-hidden">
          <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                {progress.level.current}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{progress.level.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <Progress value={levelProgress} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {progress.level.xp} / {progress.level.xpToNextLevel} XP
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {progress.level.xpToNextLevel - progress.level.xp} XP to {USER_LEVELS[progress.level.current]?.title || 'next level'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progress.totalPracticeTime}</p>
                  <p className="text-sm text-muted-foreground">Minutes Practiced</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progress.speechesAnalyzed}</p>
                  <p className="text-sm text-muted-foreground">Speeches Analyzed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progress.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progress.longestStreak}</p>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skill Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skill Breakdown
            </CardTitle>
            <CardDescription>Your average scores across different metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(progress.metricAverages).map(([key, value]) => {
                const icons: Record<string, React.ReactNode> = {
                  pace: <Clock className="h-4 w-4" />,
                  fillerWords: <MessageSquare className="h-4 w-4" />,
                  energy: <Zap className="h-4 w-4" />,
                  confidence: <Target className="h-4 w-4" />,
                  conciseness: <BarChart3 className="h-4 w-4" />,
                  pausing: <Volume2 className="h-4 w-4" />,
                };
                
                const labels: Record<string, string> = {
                  pace: 'Pace',
                  fillerWords: 'Filler Words',
                  energy: 'Energy',
                  confidence: 'Confidence',
                  conciseness: 'Conciseness',
                  pausing: 'Pausing',
                };

                return (
                  <div key={key} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                      {icons[key]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{labels[key]}</span>
                        <span className={cn(
                          "text-sm font-bold",
                          value >= 80 ? "text-green-500" : value >= 60 ? "text-amber-500" : "text-red-500"
                        )}>
                          {value}
                        </span>
                      </div>
                      <Progress value={value} className="h-1.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Daily Expert Tip */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Daily Expert Tip</h2>
          </div>
          <ExpertTipCard 
            tip={currentTip} 
            onRefresh={refreshTip}
            showCategory={true}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {progress.insights.map((insight, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-3 rounded-lg border",
                    insight.type === 'improvement' && "bg-green-500/5 border-green-500/20",
                    insight.type === 'tip' && "bg-blue-500/5 border-blue-500/20",
                    insight.type === 'streak' && "bg-orange-500/5 border-orange-500/20",
                  )}
                >
                  <p className="font-medium text-sm">{insight.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {progress.achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border"
                  >
                    <span className="text-xl">{achievement.icon}</span>
                    <span className="text-sm font-medium">{achievement.name}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-dashed text-muted-foreground">
                  <span className="text-xl">🔒</span>
                  <span className="text-sm">More to unlock...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Speaking Stats - Motivation */}
        <Card className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-red-500" />
              Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SPEAKING_STATS.slice(0, 4).map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default ProgressDashboard;
