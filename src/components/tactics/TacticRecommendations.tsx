import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ChevronRight, Info } from 'lucide-react';
import { StorytellerTactic } from '@/types/tactics';
import { ConversationType, AudienceProfile } from '@/types/conversation';
import { ScoredTactic, getRecommendedTactics } from '@/services/tactic-recommender';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TacticRecommendationsProps {
  conversationType: ConversationType;
  audience?: AudienceProfile;
  goals?: string[];
  duration?: number;
  onSelectTactic: (tactic: StorytellerTactic) => void;
  onSeeAll?: () => void;
  compact?: boolean;
  limit?: number;
  allTactics?: StorytellerTactic[];
}

const CONVERSATION_LABELS: Record<ConversationType, string> = {
  gathering: 'Gatherings',
  meeting: 'Meetings',
  presentation: 'Presentations',
  panel: 'Panels',
  lesson: 'Lessons',
};

const TacticRecommendations = ({
  conversationType,
  audience,
  goals,
  duration,
  onSelectTactic,
  onSeeAll,
  compact = false,
  limit = 6,
  allTactics,
}: TacticRecommendationsProps) => {
  const recommendations = React.useMemo(() => {
    return getRecommendedTactics(
      { conversationType, audience, goals, duration },
      allTactics,
      limit
    );
  }, [conversationType, audience, goals, duration, allTactics, limit]);

  const contextDescription = React.useMemo(() => {
    const parts: string[] = [CONVERSATION_LABELS[conversationType]];
    
    if (audience?.size) {
      parts.push(`${audience.size} audience`);
    }
    if (audience?.expertise) {
      parts.push(`${audience.expertise} level`);
    }
    if (goals?.length) {
      parts.push(goals.slice(0, 2).join(', '));
    }
    if (duration) {
      parts.push(`${duration}min`);
    }
    
    return parts.join(' • ');
  }, [conversationType, audience, goals, duration]);

  if (recommendations.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Top picks for you</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {recommendations.slice(0, 4).map((rec) => (
            <Card
              key={rec.tactic.id}
              className="p-3 cursor-pointer hover:border-primary/50 transition-all flex-shrink-0 min-w-[140px]"
              onClick={() => onSelectTactic(rec.tactic)}
            >
              <Badge variant="outline" className={cn('text-xs mb-1', `badge-${rec.tactic.category}`)}>
                {rec.score}% match
              </Badge>
              <p className="text-sm font-medium text-foreground truncate">{rec.tactic.name}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-foreground">
            Recommended for You
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="text-sm">
                  Based on: {contextDescription}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {onSeeAll && (
          <Button variant="ghost" size="sm" onClick={onSeeAll}>
            See all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec, index) => (
          <RecommendationCard
            key={rec.tactic.id}
            recommendation={rec}
            index={index}
            onClick={() => onSelectTactic(rec.tactic)}
          />
        ))}
      </div>
    </motion.section>
  );
};

const RecommendationCard = ({
  recommendation,
  index,
  onClick,
}: {
  recommendation: ScoredTactic;
  index: number;
  onClick: () => void;
}) => {
  const { tactic, score, matchReasons } = recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className="p-4 cursor-pointer hover:border-primary/50 transition-all hover:shadow-glow group"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline" className={cn('text-xs capitalize', `badge-${tactic.category}`)}>
            {tactic.category}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-primary">{score}%</span>
            <Progress value={score} className="w-12 h-1.5" />
          </div>
        </div>

        <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
          {tactic.name}
        </h4>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {tactic.description}
        </p>

        {matchReasons.length > 0 && (
          <div className="space-y-1">
            {matchReasons.slice(0, 2).map((reason, i) => (
              <p key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                {reason}
              </p>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default TacticRecommendations;
