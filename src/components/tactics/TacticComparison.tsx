import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  ArrowLeftRight,
  Check,
  X,
  Lightbulb,
} from 'lucide-react';
import { StorytellerTactic, TACTIC_CATEGORIES } from '@/types/tactics';
import { STORYTELLER_TACTICS } from '@/data/storyteller-tactics';
import TacticDiagram from './TacticDiagram';
import { compareTactics } from '@/services/tactic-recommender';
import { cn } from '@/lib/utils';

interface TacticComparisonProps {
  leftTactic: StorytellerTactic | null;
  rightTactic: StorytellerTactic | null;
  onSetLeft: (tactic: StorytellerTactic | null) => void;
  onSetRight: (tactic: StorytellerTactic | null) => void;
  onSwap: () => void;
  onClose: () => void;
  onSelectTactic: (tactic: StorytellerTactic) => void;
  userTactics?: StorytellerTactic[];
}

const TacticComparisonColumn = ({
  tactic,
  onSelect,
  onUse,
  side,
  allTactics,
}: {
  tactic: StorytellerTactic | null;
  onSelect: (tactic: StorytellerTactic | null) => void;
  onUse: () => void;
  side: 'left' | 'right';
  allTactics: StorytellerTactic[];
}) => {
  const category = tactic ? TACTIC_CATEGORIES.find(c => c.id === tactic.category) : null;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Tactic Selector */}
      <div className="mb-4">
        <Select
          value={tactic?.id || ''}
          onValueChange={(id) => {
            const selected = allTactics.find(t => t.id === id);
            onSelect(selected || null);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${side} tactic`} />
          </SelectTrigger>
          <SelectContent>
            {allTactics.map(t => (
              <SelectItem key={t.id} value={t.id}>
                <span className="flex items-center gap-2">
                  <Badge variant="outline" className={cn('text-xs', `badge-${t.category}`)}>
                    {t.category}
                  </Badge>
                  {t.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {tactic ? (
        <div className="flex-1 flex flex-col space-y-4">
          {/* Header */}
          <div>
            <Badge variant="outline" className={cn('mb-2 capitalize', `badge-${tactic.category}`)}>
              {category?.label || tactic.category}
            </Badge>
            <h3 className="text-lg font-semibold text-foreground">{tactic.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{tactic.description}</p>
          </div>

          {/* Diagram */}
          <Card className="p-2">
            <TacticDiagram tactic={tactic} className="h-[180px]" />
          </Card>

          {/* When to Use */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              When to Use
            </h4>
            <ul className="space-y-1">
              {tactic.whenToUse.slice(0, 3).map((use, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Check className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  {use}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Steps ({tactic.steps.length})
            </h4>
            <ol className="space-y-2">
              {tactic.steps.map((step, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="line-clamp-2">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Keywords */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {tactic.keywords.map(keyword => (
                <Badge key={keyword} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Use Button */}
          <Button onClick={onUse} className="mt-auto">
            Use This Tactic
          </Button>
        </div>
      ) : (
        <Card className="flex-1 flex items-center justify-center text-muted-foreground border-dashed">
          <p className="text-sm">Select a tactic to compare</p>
        </Card>
      )}
    </div>
  );
};

const TacticComparison = ({
  leftTactic,
  rightTactic,
  onSetLeft,
  onSetRight,
  onSwap,
  onClose,
  onSelectTactic,
  userTactics = [],
}: TacticComparisonProps) => {
  const allTactics = [...STORYTELLER_TACTICS, ...userTactics];
  const comparison = leftTactic && rightTactic ? compareTactics(leftTactic, rightTactic) : null;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Compare Tactics</h2>
              <p className="text-sm text-muted-foreground">
                View two tactics side-by-side to find the best fit
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onSwap} disabled={!leftTactic || !rightTactic}>
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Swap
          </Button>
        </div>
      </div>

      {/* Comparison Summary */}
      {comparison && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-3 bg-secondary/30 border-b border-border"
        >
          <div className="flex items-center justify-center gap-6 text-sm">
            {comparison.categorySame && (
              <span className="text-muted-foreground">
                <Badge variant="outline" className="mr-2">Same Category</Badge>
              </span>
            )}
            {comparison.sharedKeywords.length > 0 && (
              <span className="text-muted-foreground">
                <strong className="text-foreground">{comparison.sharedKeywords.length}</strong> shared keywords
              </span>
            )}
            {comparison.stepDifference !== 0 && (
              <span className="text-muted-foreground">
                {leftTactic?.name} has{' '}
                <strong className="text-foreground">
                  {Math.abs(comparison.stepDifference)} {comparison.stepDifference > 0 ? 'more' : 'fewer'}
                </strong>{' '}
                steps
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* Comparison Grid */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="flex gap-6">
            <TacticComparisonColumn
              tactic={leftTactic}
              onSelect={onSetLeft}
              onUse={() => leftTactic && onSelectTactic(leftTactic)}
              side="left"
              allTactics={allTactics}
            />
            
            {/* Divider */}
            <div className="w-px bg-border relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-2 rounded-full border border-border">
                <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <TacticComparisonColumn
              tactic={rightTactic}
              onSelect={onSetRight}
              onUse={() => rightTactic && onSelectTactic(rightTactic)}
              side="right"
              allTactics={allTactics}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TacticComparison;
