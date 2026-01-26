import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Calendar,
  Presentation,
  MessageSquare,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { ConversationType, CONVERSATION_TYPES } from '@/types/conversation';
import { cn } from '@/lib/utils';

interface WelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectType: (type: ConversationType) => void;
}

const ICON_MAP = {
  Users,
  Calendar,
  Presentation,
  MessageSquare,
  GraduationCap,
};

const TYPE_EXAMPLES: Record<ConversationType, string[]> = {
  gathering: ['Networking event', 'Team happy hour', 'Coffee chat', 'Conference mingling'],
  meeting: ['1:1 with manager', 'Team standup', 'Project kickoff', 'Client sync'],
  presentation: ['Keynote speech', 'Pitch deck', 'Product demo', 'All-hands update'],
  panel: ['Industry discussion', 'Expert Q&A', 'Debate', 'Podcast interview'],
  lesson: ['Training session', 'Workshop', 'Tutorial', 'Onboarding'],
};

const TYPE_COLORS: Record<ConversationType, string> = {
  gathering: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 hover:border-amber-500/60',
  meeting: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500/60',
  presentation: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-500/60',
  panel: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 hover:border-teal-500/60',
  lesson: 'from-green-500/20 to-lime-500/20 border-green-500/30 hover:border-green-500/60',
};

const TYPE_ICON_COLORS: Record<ConversationType, string> = {
  gathering: 'text-amber-500',
  meeting: 'text-blue-500',
  presentation: 'text-purple-500',
  panel: 'text-teal-500',
  lesson: 'text-green-500',
};

const WelcomeModal = ({ open, onOpenChange, onSelectType }: WelcomeModalProps) => {
  const handleSelect = (type: ConversationType) => {
    onSelectType(type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 bg-background/95 backdrop-blur-xl border-border/50">
        {/* Fear Statistic Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-6 py-3 text-center border-b border-amber-500/20">
          <p className="text-sm">
            <span className="font-bold text-amber-500">73% of people</span>
            <span className="text-muted-foreground"> fear public speaking — ConvoFlow helps you beat it!</span>
          </p>
        </div>
        
        <DialogHeader className="p-6 pb-4 text-center">
          <DialogTitle className="text-2xl font-bold text-foreground">
            What type of conversation are you planning?
          </DialogTitle>
          <DialogDescription className="text-muted-foreground max-w-lg mx-auto">
            Choose a conversation type to get tailored tactics, structure suggestions, and coaching tips
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONVERSATION_TYPES.map((type) => {
              const Icon = ICON_MAP[type.icon as keyof typeof ICON_MAP];
              const examples = TYPE_EXAMPLES[type.id];
              const colorClass = TYPE_COLORS[type.id];
              const iconColor = TYPE_ICON_COLORS[type.id];

              return (
                <Card
                  key={type.id}
                  onClick={() => handleSelect(type.id)}
                  className={cn(
                    'relative p-5 cursor-pointer transition-all duration-300 group',
                    'bg-gradient-to-br border-2',
                    colorClass,
                    'hover:scale-[1.02] hover:shadow-lg'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-xl bg-background/50 backdrop-blur-sm',
                      'group-hover:scale-110 transition-transform'
                    )}>
                      <Icon className={cn('h-6 w-6', iconColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {type.label}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {type.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {examples.slice(0, 3).map((example) => (
                          <Badge
                            key={example}
                            variant="secondary"
                            className="text-xs font-normal bg-background/50"
                          >
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    'absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100',
                    'transition-all group-hover:translate-x-1',
                    iconColor
                  )}>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Not sure which to pick?{' '}
            <span className="text-primary cursor-pointer hover:underline">
              Ask the AI Coach to help you decide
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
