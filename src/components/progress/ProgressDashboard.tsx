import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedCard, AnimatedCounter, AnimatedProgress, FadeInSection, PulsingElement } from '@/components/ui/animated-card';
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
  Mic,
  Trophy,
  Lock,
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
  totalPracticeTime: 145,
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
    { id: '1', name: 'First Speech', icon: Mic, unlockedAt: new Date() },
    { id: '2', name: '10 Practices', icon: Trophy, unlockedAt: new Date() },
    { id: '3', name: '3 Day Streak', icon: Flame, unlockedAt: new Date() },
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
        <FadeInSection direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Progress</h1>
              <p className="text-muted-foreground">Track your speaking improvement over time</p>
            </div>
            <PulsingElement enabled={true}>
              <Button onClick={onStartPractice} size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Start Practice
              </Button>
            </PulsingElement>
          </div>
        </FadeInSection>

        {/* Level Card */}
        <AnimatedCard index={1} hoverScale={false}>
          <Card className="overflow-hidden">
            <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6">
              <div className="flex items-center gap-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground"
                >
                  {progress.level.current}
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{progress.level.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <AnimatedProgress value={levelProgress} className="flex-1" delay={0.4} />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      <AnimatedCounter value={progress.level.xp} /> / {progress.level.xpToNextLevel} XP
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {progress.level.xpToNextLevel - progress.level.xp} XP to {USER_LEVELS[progress.level.current]?.title || 'next level'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, value: progress.totalPracticeTime, label: 'Minutes Practiced', color: 'blue' },
            { icon: BarChart3, value: progress.speechesAnalyzed, label: 'Speeches Analyzed', color: 'green' },
            { icon: Flame, value: progress.currentStreak, label: 'Day Streak', color: 'orange' },
            { icon: Target, value: progress.longestStreak, label: 'Best Streak', color: 'purple' },
          ].map((stat, index) => (
            <AnimatedCard key={stat.label} index={index + 2} hoverLift={true}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      `bg-${stat.color}-500/10`
                    )}>
                      <stat.icon className={cn('h-5 w-5', `text-${stat.color}-500`)} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter value={stat.value} duration={1.2} />
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        {/* Skill Metrics */}
        <AnimatedCard index={6} hoverScale={false}>
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
                {Object.entries(progress.metricAverages).map(([key, value], idx) => {
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
                    <motion.div 
                      key={key} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
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
                        <AnimatedProgress value={value} delay={0.6 + idx * 0.1} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Daily Expert Tip */}
        <FadeInSection direction="up" delay={0.7}>
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
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Insights */}
          <AnimatedCard index={8}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {progress.insights.map((insight, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className={cn(
                      "p-3 rounded-lg border",
                      insight.type === 'improvement' && "bg-green-500/5 border-green-500/20",
                      insight.type === 'tip' && "bg-blue-500/5 border-blue-500/20",
                      insight.type === 'streak' && "bg-orange-500/5 border-orange-500/20",
                    )}
                  >
                    <p className="font-medium text-sm">{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Achievements */}
          <AnimatedCard index={9}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {progress.achievements.map((achievement, idx) => (
                    <motion.div 
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + idx * 0.1, type: 'spring' }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border"
                    >
                      <achievement.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{achievement.name}</span>
                    </motion.div>
                  ))}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, type: 'spring' }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-dashed text-muted-foreground"
                  >
                    <Lock className="h-5 w-5" />
                    <span className="text-sm">More to unlock...</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>

        {/* Speaking Stats - Motivation */}
        <AnimatedCard index={10} hoverScale={false}>
          <Card className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-red-500" />
                Did You Know?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SPEAKING_STATS.slice(0, 4).map((stat, idx) => (
                  <motion.div 
                    key={stat.id} 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + idx * 0.1 }}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </ScrollArea>
  );
};

export default ProgressDashboard;
