import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedCard, FadeInSection, PulsingElement } from '@/components/ui/animated-card';
import DynamicIcon from '@/components/ui/dynamic-icon';
import {
  Play,
  Clock,
  Target,
  Lock,
  CheckCircle,
  ChevronRight,
  Zap,
  Heart,
} from 'lucide-react';
import { LESSONS, LESSON_COURSES, DAILY_CHALLENGES } from '@/data/lessons';
import { LESSON_CATEGORIES } from '@/types/lessons';

interface LessonsBrowserProps {
  onStartLesson?: (lessonId: string) => void;
  onOpenFearModule?: () => void;
}

const LessonsBrowser: React.FC<LessonsBrowserProps> = ({ onStartLesson, onOpenFearModule }) => {
  const categories = Object.entries(LESSON_CATEGORIES);
  const todayChallenge = DAILY_CHALLENGES[0];

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <FadeInSection direction="up" delay={0}>
          <div>
            <h1 className="text-3xl font-bold">Lessons</h1>
            <p className="text-muted-foreground">Interactive exercises to improve your speaking skills</p>
          </div>
        </FadeInSection>

        {/* Daily Challenge */}
        <AnimatedCard index={1} hoverScale={false}>
          <PulsingElement enabled={true} className="relative">
            <Card className="overflow-hidden border-primary/50">
              <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <Badge variant="default">Daily Challenge</Badge>
                  </div>
                  <CardTitle className="text-xl">{todayChallenge.title}</CardTitle>
                  <CardDescription>{todayChallenge.exercise.instruction}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {todayChallenge.exercise.targetDuration}s
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        +{todayChallenge.reward.xp} XP
                      </span>
                    </div>
                    <Button className="gap-2" onClick={() => onStartLesson?.('daily')}>
                      <Play className="h-4 w-4" />
                      Start Challenge
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </PulsingElement>
        </AnimatedCard>

        {/* Featured: Overcome Fear Course */}
        <AnimatedCard index={2}>
          <Card 
            className="group cursor-pointer border-red-500/30 hover:border-red-500/60 transition-all bg-gradient-to-br from-red-500/10 to-transparent"
            onClick={onOpenFearModule}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-red-500/20">
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">Featured Course</Badge>
                    <CardTitle className="text-xl">Overcome Fear of Speaking</CardTitle>
                    <CardDescription>Master your nerves and speak with confidence</CardDescription>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:translate-x-2 group-hover:text-red-500 transition-all" />
              </div>
            </CardHeader>
          </Card>
        </AnimatedCard>

        {/* Courses */}
        <FadeInSection direction="up" delay={0.3}>
          <div>
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {LESSON_COURSES.map((course, index) => (
                <AnimatedCard key={course.id} index={index + 3}>
                  <Card className="group hover:border-primary/50 transition-colors cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <DynamicIcon name={course.iconName} size={24} className="text-primary" />
                        </div>
                        <Badge variant="secondary">{course.lessons.length} lessons</Badge>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.estimatedDuration} min
                        </span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* All Lessons by Category */}
        <FadeInSection direction="up" delay={0.5}>
          <div>
            <h2 className="text-xl font-semibold mb-4">All Lessons</h2>
            <Tabs defaultValue="confidence">
              <TabsList className="flex flex-wrap h-auto gap-1 mb-4">
                {categories.map(([key, category]) => (
                  <TabsTrigger key={key} value={key} className="gap-1.5">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map(([key, category]) => (
                <TabsContent key={key} value={key} className="space-y-3">
                  {LESSONS.filter(l => l.category === key).map((lesson, index) => {
                    const isLocked = index > 1;
                    const isCompleted = index === 0;

                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card 
                          className={cn(
                            "transition-all",
                            isLocked ? "opacity-60" : "hover:border-primary/50 hover:shadow-md cursor-pointer"
                          )}
                        >
                          <CardContent className="py-4">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "h-12 w-12 rounded-lg flex items-center justify-center",
                                `bg-${category.color}-500/10`
                              )}>
                                {isCompleted ? (
                                  <CheckCircle className="h-6 w-6 text-green-500" />
                                ) : isLocked ? (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <DynamicIcon name={lesson.iconName} size={24} className="text-primary" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium truncate">{lesson.title}</h3>
                                  <Badge variant="outline" className="shrink-0">
                                    {lesson.difficulty}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">
                                  {lesson.description}
                                </p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {lesson.duration} min
                                  </span>
                                  <span>{lesson.exercises.length} exercises</span>
                                </div>
                              </div>
                              {!isLocked && (
                                <Button 
                                  variant={isCompleted ? "secondary" : "default"} 
                                  size="sm"
                                  onClick={() => onStartLesson?.(lesson.id)}
                                >
                                  {isCompleted ? 'Review' : 'Start'}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </FadeInSection>
      </div>
    </ScrollArea>
  );
};

export default LessonsBrowser;
