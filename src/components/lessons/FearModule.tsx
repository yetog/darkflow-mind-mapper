import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  FEAR_SYMPTOMS,
  FEAR_CAUSES,
  FEAR_SOLUTIONS,
  GLOSSOPHOBIA_STATS,
  BERKUN_FEAR_TRIGGERS,
} from '@/data/fear-content';
import BreathingExercise from '@/components/common/BreathingExercise';
import DynamicIcon from '@/components/ui/dynamic-icon';
import {
  Brain,
  Heart,
  Shield,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Star,
  Check,
} from 'lucide-react';

interface FearModuleProps {
  onClose?: () => void;
}

const FearModule: React.FC<FearModuleProps> = ({ onClose }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [completedSolutions, setCompletedSolutions] = useState<string[]>([]);
  const [fearLevel, setFearLevel] = useState<number>(5);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleSolution = (id: string) => {
    setCompletedSolutions(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const progressPercentage = (completedSolutions.length / FEAR_SOLUTIONS.length) * 100;

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Conquering Your Fear of Public Speaking
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Glossophobia affects over {GLOSSOPHOBIA_STATS.percentage}% of people.
            You're not alone, and you can overcome it.
          </p>
        </div>

        {/* Stats Banner */}
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
          <CardContent className="py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-500">
                  {GLOSSOPHOBIA_STATS.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Fear Public Speaking</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-500">#{GLOSSOPHOBIA_STATS.rank}</div>
                <div className="text-sm text-muted-foreground">Most Common Fear</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500">
                  {FEAR_SOLUTIONS.length}
                </div>
                <div className="text-sm text-muted-foreground">Proven Solutions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500">100%</div>
                <div className="text-sm text-muted-foreground">Beatable</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSolutions.length}/{FEAR_SOLUTIONS.length} techniques mastered
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="understand" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="understand" className="gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Understand</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Symptoms</span>
            </TabsTrigger>
            <TabsTrigger value="solutions" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Solutions</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Practice</span>
            </TabsTrigger>
          </TabsList>

          {/* Understand Tab */}
          <TabsContent value="understand" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What is Glossophobia?</CardTitle>
                <CardDescription>
                  Understanding why we fear public speaking is the first step to overcoming it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Glossophobia is the state of nervousness a person feels when put in a position
                  to communicate ideas in front of a group. It {GLOSSOPHOBIA_STATS.rankDescription}.
                  But here's the truth: <strong>no one is born a great speaker</strong>. Almost all
                  speakers, even superstars, have felt some degree of glossophobia.
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold">Where Does the Fear Come From?</h4>
                  <div className="grid gap-4">
                    {FEAR_CAUSES.map((cause) => (
                      <div
                        key={cause.id}
                        className="flex gap-4 p-4 rounded-lg bg-muted/50"
                      >
                        <div className="p-2 rounded-lg bg-primary/10">
                          <DynamicIcon name={cause.iconName} size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="font-medium">{cause.name}</h5>
                          <p className="text-sm text-muted-foreground">{cause.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Scott Berkun's Fear Triggers</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {BERKUN_FEAR_TRIGGERS.map((trigger) => (
                      <div
                        key={trigger.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                      >
                        <div className="p-1.5 rounded-md bg-destructive/20">
                          <DynamicIcon name={trigger.iconName} size={18} className="text-destructive" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{trigger.name}</p>
                          <p className="text-xs text-muted-foreground">{trigger.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Symptoms Tab */}
          <TabsContent value="symptoms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Identify Your Symptoms</CardTitle>
                <CardDescription>
                  Check the symptoms you experience. Understanding your body's response helps manage it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {FEAR_SYMPTOMS.map((symptom) => (
                    <div
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all',
                        'border hover:border-primary/50',
                        selectedSymptoms.includes(symptom.id)
                          ? 'bg-primary/10 border-primary'
                          : 'bg-card border-border'
                      )}
                    >
                      <Checkbox
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={() => toggleSymptom(symptom.id)}
                      />
                      <div className="p-1.5 rounded-md bg-muted">
                        <DynamicIcon name={symptom.iconName} size={18} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{symptom.name}</p>
                        <p className="text-xs text-muted-foreground">{symptom.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSymptoms.length > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-500">
                          You've identified {selectedSymptoms.length} symptom(s)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          These are normal physical responses to stress. The "Solutions" tab has
                          specific techniques to manage each of these symptoms.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solutions Tab */}
          <TabsContent value="solutions" className="space-y-6">
            <div className="grid gap-4">
              {FEAR_SOLUTIONS.map((solution) => (
                <Card
                  key={solution.id}
                  className={cn(
                    'transition-all',
                    completedSolutions.includes(solution.id)
                      ? 'border-green-500/50 bg-green-500/5'
                      : ''
                  )}
                >
                  <CardContent className="py-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'p-3 rounded-lg',
                          completedSolutions.includes(solution.id)
                            ? 'bg-green-500/20'
                            : 'bg-muted'
                        )}
                      >
                        {completedSolutions.includes(solution.id) ? (
                          <Check className="h-6 w-6 text-green-500" />
                        ) : (
                          <DynamicIcon name={solution.iconName} size={24} className="text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{solution.name}</h4>
                          <Button
                            variant={completedSolutions.includes(solution.id) ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => toggleSolution(solution.id)}
                          >
                            {completedSolutions.includes(solution.id) ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mastered
                              </>
                            ) : (
                              'Mark Complete'
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {solution.description}
                        </p>
                        <div className="mt-3 space-y-1">
                          {solution.steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <ArrowRight className="h-3 w-3 text-primary" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Breathing Exercise */}
              <BreathingExercise
                inhaleDuration={4}
                holdDuration={4}
                exhaleDuration={6}
                cycles={5}
                onComplete={() => {
                  if (!completedSolutions.includes('breathing')) {
                    toggleSolution('breathing');
                  }
                }}
              />

              {/* Fear Level Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fear Level Tracker</CardTitle>
                  <CardDescription>
                    Rate your current fear level before and after practice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Relaxed</span>
                    <span className="text-sm">Terrified</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFearLevel(level)}
                        className={cn(
                          'flex-1 h-10 rounded transition-all text-sm font-medium',
                          level <= fearLevel
                            ? level <= 3
                              ? 'bg-green-500 text-white'
                              : level <= 6
                              ? 'bg-amber-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Current level: {fearLevel}/10
                    {fearLevel <= 3 && ' - You\'re doing great!'}
                    {fearLevel > 3 && fearLevel <= 6 && ' - Some nervousness is normal'}
                    {fearLevel > 6 && ' - Let\'s work on this together'}
                  </p>
                </CardContent>
              </Card>

              {/* Visualization Exercise */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    Visualization Exercise
                  </CardTitle>
                  <CardDescription>
                    Close your eyes and imagine success
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Follow these steps for a powerful visualization:
                    </p>
                    <ol className="space-y-3">
                      {[
                        'Find a quiet, comfortable place and close your eyes',
                        'Take 3 deep breaths to relax your body',
                        'Picture yourself walking confidently to the stage',
                        'See the audience smiling and nodding as you speak',
                        'Imagine delivering your key points smoothly and clearly',
                        'Visualize the audience applauding as you finish',
                        'Feel the sense of accomplishment and pride',
                        'Open your eyes, carrying that confidence with you',
                      ].map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-0.5">
                            {index + 1}
                          </Badge>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    <Button
                      onClick={() => {
                        if (!completedSolutions.includes('visualize')) {
                          toggleSolution('visualize');
                        }
                      }}
                      className="w-full"
                    >
                      {completedSolutions.includes('visualize') ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Visualization Complete
                        </>
                      ) : (
                        'Mark Visualization Complete'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FearModule;
