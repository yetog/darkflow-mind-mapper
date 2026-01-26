import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  Lightbulb,
  Play,
  Copy,
  Share2,
  BookOpen,
} from 'lucide-react';
import { StorytellerTactic, TACTIC_CATEGORIES } from '@/types/tactics';
import { STORYTELLER_TACTICS } from '@/data/storyteller-tactics';
import TacticDiagram from './TacticDiagram';
import { cn } from '@/lib/utils';
import { ConversationNode } from '@/types/conversation';

interface TacticDetailViewProps {
  tactic: StorytellerTactic;
  onBack: () => void;
  onApplyToMindMap?: (nodes: ConversationNode[]) => void;
  onPractice?: () => void;
  onSelectRelated?: (tactic: StorytellerTactic) => void;
}

const TacticDetailView = ({ 
  tactic, 
  onBack, 
  onApplyToMindMap, 
  onPractice,
  onSelectRelated 
}: TacticDetailViewProps) => {
  const category = TACTIC_CATEGORIES.find(c => c.id === tactic.category);

  // Convert tactic steps to mind map nodes
  const handleApplyToMindMap = () => {
    if (!onApplyToMindMap) return;

    const nodes: ConversationNode[] = tactic.steps.map((step, index) => ({
      id: `${tactic.id}-step-${index + 1}`,
      label: `Step ${index + 1}`,
      description: step,
      type: 'topic',
      emotionalTone: index === 0 ? 'positive' : index === tactic.steps.length - 1 ? 'building' : 'neutral',
    }));

    // Create root node with children
    const rootNode: ConversationNode = {
      id: `${tactic.id}-root`,
      label: tactic.name,
      description: tactic.description,
      type: 'topic',
      children: nodes,
    };

    onApplyToMindMap([rootNode]);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tactics
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <Badge 
              variant="outline" 
              className={cn('mb-2 capitalize', `badge-${tactic.category}`)}
            >
              {category?.label || tactic.category}
            </Badge>
            <h1 className="text-2xl font-bold text-foreground">{tactic.name}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {tactic.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
          {/* Interactive Diagram */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Story Structure
            </h2>
            <TacticDiagram tactic={tactic} className="h-[350px]" />
            <p className="text-sm text-muted-foreground mt-2">
              Drag and zoom to explore the structure. This is how your story should flow.
            </p>
          </motion.section>

          {/* When to Use */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              When to Use
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {tactic.whenToUse.map((use, index) => (
                <Card key={index} className="p-4 bg-secondary/30">
                  <p className="text-sm text-foreground">{use}</p>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Steps */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              How to Apply It
            </h2>
            <ol className="space-y-4">
              {tactic.steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <Card className="flex-1 p-4">
                    <p className="text-foreground">{step}</p>
                  </Card>
                </motion.li>
              ))}
            </ol>
          </motion.section>

          {/* Examples */}
          {tactic.examples && tactic.examples.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Examples in Action
              </h2>
              <div className="space-y-3">
                {tactic.examples.map((example, index) => (
                  <Card key={index} className="p-4 border-l-4 border-l-primary">
                    <p className="text-sm text-foreground italic">{example}</p>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* Keywords */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Keywords
            </h2>
            <div className="flex flex-wrap gap-2">
              {tactic.keywords.map(keyword => (
                <Badge key={keyword} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </motion.section>

          {/* Related Tactics */}
          {tactic.relatedTactics && tactic.relatedTactics.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Related Tactics
              </h2>
              <div className="flex flex-wrap gap-2">
                {tactic.relatedTactics.map(id => {
                  const related = STORYTELLER_TACTICS.find(t => t.id === id);
                  return related ? (
                    <Badge 
                      key={id} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => onSelectRelated?.(related)}
                    >
                      {related.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </motion.section>
          )}

          {/* Spacer for fixed footer */}
          <div className="h-24" />
        </div>
      </ScrollArea>

      {/* Action Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Button 
            className="flex-1" 
            onClick={handleApplyToMindMap}
            disabled={!onApplyToMindMap}
          >
            <Copy className="h-4 w-4 mr-2" />
            Apply to My Plan
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onPractice}
            disabled={!onPractice}
          >
            <Play className="h-4 w-4 mr-2" />
            Practice This Tactic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TacticDetailView;
