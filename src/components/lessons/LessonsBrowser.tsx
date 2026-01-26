import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Play,
  Clock,
  Target,
  Lock,
  CheckCircle,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { LESSONS, LESSON_COURSES, DAILY_CHALLENGES } from '@/data/lessons';
import { LESSON_CATEGORIES } from '@/types/lessons';

interface LessonsBrowserProps {
  onStartLesson?: (lessonId: string) => void;
}

const LessonsBrowser: React.FC<LessonsBrowserProps> = ({ onStartLesson }) => {
  const categories = Object.entries(LESSON_CATEGORIES);
  const todayChallenge = DAILY_CHALLENGES[0];

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Lessons</h1>
          <p className="text-muted-foreground">Interactive exercises to improve your speaking skills</p>
        </div>

        {/* Daily Challenge */}
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

        {/* Courses */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Courses</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {LESSON_COURSES.map((course) => (
              <Card key={course.id} className="group hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{course.icon}</span>
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
            ))}
          </div>
        </div>

        {/* All Lessons by Category */}
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
                  const isLocked = index > 1; // Mock: first 2 lessons unlocked
                  const isCompleted = index === 0; // Mock: first lesson completed

                  return (
                    <Card 
                      key={lesson.id}
                      className={cn(
                        "transition-colors",
                        isLocked ? "opacity-60" : "hover:border-primary/50 cursor-pointer"
                      )}
                    >
                      <CardContent className="py-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "h-12 w-12 rounded-lg flex items-center justify-center text-2xl",
                            `bg-${category.color}-500/10`
                          )}>
                            {isCompleted ? (
                              <CheckCircle className={`h-6 w-6 text-green-500`} />
                            ) : isLocked ? (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              lesson.icon
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
                  );
                })}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
};

export default LessonsBrowser;
