import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  Play,
  Copy,
  Share2,
  BookOpen,
  GitCompare,
  Sparkles,
  Target,
  MessageSquare,
  CheckCircle,
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
  onCompare?: (tactic: StorytellerTactic) => void;
}

const TacticDetailView = ({ 
  tactic, 
  onBack, 
  onApplyToMindMap, 
  onPractice,
  onSelectRelated,
  onCompare,
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
            {onCompare && (
              <Button variant="outline" size="icon" onClick={() => onCompare(tactic)}>
                <GitCompare className="h-4 w-4" />
              </Button>
            )}
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
          {/* Section 1: The Framework - Visual Structure */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              The Framework
            </h2>
            
            {/* Framework name badge if available */}
            {tactic.framework && (
              <div className="mb-4">
                <Badge variant="secondary" className="text-sm font-mono">
                  {tactic.framework.name}
                </Badge>
              </div>
            )}
            
            {/* Framework sections as numbered cards */}
            {tactic.framework && tactic.framework.sections.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {tactic.framework.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 text-center h-full border-2 hover:border-primary/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center mx-auto mb-2">
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">
                        {section.label}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {section.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Fallback: show steps as framework */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {tactic.steps.slice(0, 4).map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 text-center h-full border-2 hover:border-primary/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center mx-auto mb-2">
                        {index + 1}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {step}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Interactive Diagram */}
            <TacticDiagram tactic={tactic} className="h-[400px]" />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Drag and zoom to explore the story structure
            </p>
          </motion.section>

          {/* Section 2: Example Story */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              Example Story
            </h2>
            
            {tactic.exampleStory ? (
              <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                <h4 className="font-medium text-foreground mb-3">{tactic.exampleStory.title}</h4>
                <p className="text-foreground/90 italic leading-relaxed">
                  "{tactic.exampleStory.story}"
                </p>
              </Card>
            ) : tactic.examples && tactic.examples.length > 0 ? (
              <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                <p className="text-foreground/90 italic leading-relaxed">
                  "{tactic.examples[0]}"
                </p>
              </Card>
            ) : (
              <Card className="p-6 bg-muted/50 border-dashed">
                <p className="text-muted-foreground text-center">
                  Create your own story using the framework above
                </p>
              </Card>
            )}
          </motion.section>

          {/* Section 3: How to Apply */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              How to Apply
            </h2>
            <div className="space-y-3">
              {tactic.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium flex items-center justify-center mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 4: When to Use */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              When to Use
            </h2>
            <div className="flex flex-wrap gap-2">
              {tactic.whenToUse.map((use, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                >
                  <Badge variant="secondary" className="py-2 px-3 text-sm">
                    <CheckCircle className="h-3 w-3 mr-1.5 text-green-400" />
                    {use}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 5: Related Tactics */}
          {tactic.relatedTactics && tactic.relatedTactics.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
                      className="cursor-pointer hover:bg-primary/10 transition-colors py-1.5 px-3"
                      onClick={() => onSelectRelated?.(related)}
                    >
                      {related.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </motion.section>
          )}

          {/* Keywords */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-sm font-medium text-muted-foreground mb-2">
              Keywords
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {tactic.keywords.map(keyword => (
                <Badge key={keyword} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </motion.section>

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
