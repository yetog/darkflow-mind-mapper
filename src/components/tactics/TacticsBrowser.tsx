import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import {
  Search,
  X,
  BookOpen,
  ChevronRight,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { 
  STORYTELLER_TACTICS, 
  getTacticsByCategory, 
  getTacticsForConversationType,
  searchTactics 
} from '@/data/storyteller-tactics';
import { TACTIC_CATEGORIES, StorytellerTactic } from '@/types/tactics';
import { ConversationType } from '@/types/conversation';
import { cn } from '@/lib/utils';

interface TacticsBrowserProps {
  conversationType: ConversationType;
  onClose: () => void;
  onSelectTactic?: (tactic: StorytellerTactic) => void;
}

const TacticsBrowser = ({ conversationType, onClose, onSelectTactic }: TacticsBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTactic, setSelectedTactic] = useState<StorytellerTactic | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const recommendedTactics = useMemo(() => {
    return getTacticsForConversationType(conversationType).slice(0, 6);
  }, [conversationType]);

  const filteredTactics = useMemo(() => {
    let tactics = STORYTELLER_TACTICS;
    
    if (searchQuery) {
      tactics = searchTactics(searchQuery);
    } else if (activeCategory !== 'all') {
      tactics = getTacticsByCategory(activeCategory);
    }
    
    return tactics;
  }, [searchQuery, activeCategory]);

  const handleTacticClick = (tactic: StorytellerTactic) => {
    setSelectedTactic(tactic);
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Story Tactics</h2>
              <p className="text-sm text-muted-foreground">54 tactics from Storyteller Tactics</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tactics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex min-h-0">
        {/* Tactics List */}
        <div className="flex-1 flex flex-col border-r border-border">
          {/* Category Tabs */}
          <div className="p-4 border-b border-border">
            <ScrollArea className="w-full">
              <div className="flex gap-2">
                <Button
                  variant={activeCategory === 'all' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveCategory('all')}
                  className="flex-shrink-0"
                >
                  All
                </Button>
                {TACTIC_CATEGORIES.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={cn('flex-shrink-0', `badge-${category.id}`)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Recommended Section */}
          {!searchQuery && activeCategory === 'all' && (
            <div className="p-4 border-b border-border bg-primary/5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Recommended for {conversationType}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendedTactics.map(tactic => (
                  <Badge
                    key={tactic.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => handleTacticClick(tactic)}
                  >
                    {tactic.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tactics List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {filteredTactics.map(tactic => (
                <Card
                  key={tactic.id}
                  className={cn(
                    'p-4 cursor-pointer transition-all hover:border-primary/50',
                    selectedTactic?.id === tactic.id && 'border-primary bg-primary/5'
                  )}
                  onClick={() => handleTacticClick(tactic)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">
                          {tactic.name}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={cn('text-xs capitalize flex-shrink-0', `badge-${tactic.category}`)}
                        >
                          {tactic.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tactic.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                  </div>
                </Card>
              ))}
              
              {filteredTactics.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No tactics found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Tactic Detail */}
        {selectedTactic && (
          <div className="w-80 flex-shrink-0 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                  <Badge 
                    variant="outline" 
                    className={cn('mb-2 capitalize', `badge-${selectedTactic.category}`)}
                  >
                    {selectedTactic.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedTactic.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedTactic.description}
                  </p>
                </div>

                {/* When to Use */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    When to Use
                  </h4>
                  <ul className="space-y-1">
                    {selectedTactic.whenToUse.map((use, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Steps
                  </h4>
                  <ol className="space-y-2">
                    {selectedTactic.steps.map((step, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Keywords */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Keywords
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedTactic.keywords.map(keyword => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Related Tactics */}
                {selectedTactic.relatedTactics && selectedTactic.relatedTactics.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      Related Tactics
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTactic.relatedTactics.map(id => {
                        const related = STORYTELLER_TACTICS.find(t => t.id === id);
                        return related ? (
                          <Badge 
                            key={id} 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-primary/10"
                            onClick={() => handleTacticClick(related)}
                          >
                            {related.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Apply Button */}
            <div className="p-4 border-t border-border">
              <Button 
                className="w-full"
                onClick={() => onSelectTactic?.(selectedTactic)}
              >
                Apply to Current Slide
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TacticsBrowser;
