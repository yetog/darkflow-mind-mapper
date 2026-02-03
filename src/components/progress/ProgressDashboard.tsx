import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AnimatedCard, AnimatedCounter, AnimatedProgress, FadeInSection } from '@/components/ui/animated-card';
import {
  TrendingUp,
  Flame,
  Target,
  Clock,
  BarChart3,
  Play,
  Lightbulb,
  Mic,
  BookOpen,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { USER_LEVELS } from '@/types/progress';
import { getRandomTip, ExpertTip } from '@/data/expert-tips';
import ExpertTipCard from '@/components/common/ExpertTipCard';

interface ProgressDashboardProps {
  onStartPractice?: () => void;
  onOpenLessons?: () => void;
  onOpenTactics?: () => void;
}

// Mock data for demonstration
const mockProgress = {
  totalPracticeTime: 145,
  speechesAnalyzed: 23,
  currentStreak: 5,
  level: {
    current: 3,
    title: 'Confident Communicator',
    xp: 450,
    xpToNextLevel: 600,
  },
  topSkillsToImprove: [
    { name: 'Confidence', score: 70, icon: Target },
    { name: 'Pausing', score: 72, icon: Clock },
  ],
};

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ 
  onStartPractice,
  onOpenLessons,
  onOpenTactics,
}) => {
  const progress = mockProgress;
  const levelProgress = (progress.level.xp / progress.level.xpToNextLevel) * 100;
  const [currentTip, setCurrentTip] = useState<ExpertTip>(() => getRandomTip());
  const [tipExpanded, setTipExpanded] = useState(false);

  const refreshTip = useCallback(() => {
    setCurrentTip(getRandomTip());
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Compact Header with Level */}
        <FadeInSection direction="up" delay={0}>
          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-xl font-bold text-primary-foreground shadow-lg"
                  >
                    {progress.level.current}
                  </motion.div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">Welcome Back!</h1>
                    <p className="text-sm text-muted-foreground">
                      Level {progress.level.current} • {progress.level.title}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 min-w-[180px]">
                  <div className="flex items-center gap-2 w-full">
                    <AnimatedProgress value={levelProgress} className="flex-1" delay={0.3} />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      <AnimatedCounter value={progress.level.xp} /> / {progress.level.xpToNextLevel} XP
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {progress.level.xpToNextLevel - progress.level.xp} XP to next level
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </FadeInSection>

        {/* Key Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Clock, value: progress.totalPracticeTime, label: 'Minutes', sublabel: 'Practiced', color: 'text-blue-400' },
            { icon: BarChart3, value: progress.speechesAnalyzed, label: 'Speeches', sublabel: 'Analyzed', color: 'text-green-400' },
            { icon: Flame, value: progress.currentStreak, label: 'Day', sublabel: 'Streak', color: 'text-orange-400' },
          ].map((stat, index) => (
            <AnimatedCard key={stat.label} index={index + 1}>
              <Card className="text-center py-6">
                <stat.icon className={cn('h-6 w-6 mx-auto mb-2', stat.color)} />
                <p className="text-2xl font-bold text-foreground">
                  <AnimatedCounter value={stat.value} duration={1} />
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        {/* Focus Area */}
        <AnimatedCard index={4}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {progress.topSkillsToImprove.map((skill, idx) => (
                <motion.div 
                  key={skill.name}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                >
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                    <skill.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className={cn(
                        "text-sm font-bold",
                        skill.score >= 80 ? "text-green-500" : skill.score >= 60 ? "text-amber-500" : "text-red-500"
                      )}>
                        {skill.score}%
                      </span>
                    </div>
                    <AnimatedProgress value={skill.score} delay={0.5 + idx * 0.1} />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Quick Actions */}
        <AnimatedCard index={5}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  onClick={onStartPractice} 
                  className="flex flex-col h-auto py-4 gap-2"
                >
                  <Play className="h-5 w-5" />
                  <span className="text-xs">Practice</span>
                </Button>
                <Button 
                  variant="secondary"
                  onClick={onOpenLessons}
                  className="flex flex-col h-auto py-4 gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">Lessons</span>
                </Button>
                <Button 
                  variant="secondary"
                  onClick={onOpenTactics}
                  className="flex flex-col h-auto py-4 gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs">Tactics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Daily Tip - Collapsible */}
        <FadeInSection direction="up" delay={0.5}>
          <Collapsible open={tipExpanded} onOpenChange={setTipExpanded}>
            <Card>
              <CollapsibleTrigger asChild>
                <div className="p-4 cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Daily Expert Tip</h3>
                      {!tipExpanded && (
                        <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                          {currentTip.tip}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    tipExpanded && "rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <ExpertTipCard 
                    tip={currentTip} 
                    onRefresh={refreshTip}
                    showCategory={true}
                  />
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </FadeInSection>
      </div>
    </ScrollArea>
  );
};

export default ProgressDashboard;
