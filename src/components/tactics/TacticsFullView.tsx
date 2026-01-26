import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Grid3X3,
  List,
  Plus,
  Star,
  Clock,
  BookOpen,
  GitCompare,
  Check,
} from 'lucide-react';
import {
  STORYTELLER_TACTICS,
  getTacticsByCategory,
} from '@/data/storyteller-tactics';
import { TACTIC_CATEGORIES, StorytellerTactic, TacticCategory } from '@/types/tactics';
import { ConversationType, ConversationNode } from '@/types/conversation';
import TacticDetailView from './TacticDetailView';
import TacticComparison from './TacticComparison';
import TacticRecommendations from './TacticRecommendations';
import CreateTacticModal from './CreateTacticModal';
import { useUserTactics } from '@/hooks/useUserTactics';
import { useTacticComparison } from '@/hooks/useTacticComparison';
import { cn } from '@/lib/utils';

interface TacticsFullViewProps {
  conversationType?: ConversationType;
  onApplyToMindMap?: (nodes: ConversationNode[]) => void;
  onStartPractice?: (tacticId: string) => void;
}

type ViewMode = 'grid' | 'list';
type TabType = 'all' | 'favorites' | 'recent' | 'my-tactics' | TacticCategory;

const TacticsFullView = ({ 
  conversationType = 'presentation',
  onApplyToMindMap,
  onStartPractice,
}: TacticsFullViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedTactic, setSelectedTactic] = useState<StorytellerTactic | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  const { userTactics, favorites, recentlyViewed, toggleFavorite, addToRecent, addTactic } = useUserTactics();
  const {
    leftTactic,
    rightTactic,
    isCompareMode,
    setIsCompareMode,
    addToComparison,
    setLeftTactic,
    setRightTactic,
    swapTactics,
    clearComparison,
    isInComparison,
    comparisonCount,
    canCompare,
  } = useTacticComparison();

  const allTactics = useMemo(() => [...STORYTELLER_TACTICS, ...userTactics], [userTactics]);

  // Filter tactics based on active tab and search
  const filteredTactics = useMemo(() => {
    let tactics: StorytellerTactic[] = [];

    // First, apply tab filter
    switch (activeTab) {
      case 'all':
        tactics = allTactics;
        break;
      case 'favorites':
        tactics = allTactics.filter(t => favorites.includes(t.id));
        break;
      case 'recent':
        tactics = recentlyViewed
          .map(id => allTactics.find(t => t.id === id))
          .filter((t): t is StorytellerTactic => t !== undefined);
        break;
      case 'my-tactics':
        tactics = userTactics;
        break;
      default:
        // Category filter
        tactics = getTacticsByCategory(activeTab);
        break;
    }

    // Then apply search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      tactics = tactics.filter(t => 
        t.name.toLowerCase().includes(lowerQuery) ||
        t.description.toLowerCase().includes(lowerQuery) ||
        t.keywords.some(k => k.toLowerCase().includes(lowerQuery))
      );
    }

    return tactics;
  }, [activeTab, searchQuery, allTactics, userTactics, favorites, recentlyViewed]);

  const handleTacticClick = (tactic: StorytellerTactic) => {
    if (isCompareMode) {
      addToComparison(tactic);
    } else {
      addToRecent(tactic.id);
      setSelectedTactic(tactic);
    }
  };

  const handlePractice = () => {
    if (selectedTactic && onStartPractice) {
      onStartPractice(selectedTactic.id);
    }
  };

  const handleOpenComparison = () => {
    setShowComparison(true);
    setIsCompareMode(false);
  };

  const handleCloseComparison = () => {
    setShowComparison(false);
    clearComparison();
  };

  // If showing comparison view
  if (showComparison) {
    return (
      <TacticComparison
        leftTactic={leftTactic}
        rightTactic={rightTactic}
        onSetLeft={setLeftTactic}
        onSetRight={setRightTactic}
        onSwap={swapTactics}
        onClose={handleCloseComparison}
        onSelectTactic={(tactic) => {
          setShowComparison(false);
          setSelectedTactic(tactic);
        }}
        userTactics={userTactics}
      />
    );
  }

  // If a tactic is selected, show detail view
  if (selectedTactic) {
    return (
      <TacticDetailView
        tactic={selectedTactic}
        onBack={() => setSelectedTactic(null)}
        onApplyToMindMap={onApplyToMindMap}
        onPractice={handlePractice}
        onSelectRelated={handleTacticClick}
        onCompare={(tactic) => {
          addToComparison(tactic);
          setShowComparison(true);
        }}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Storyteller Tactics</h2>
              <p className="text-sm text-muted-foreground">
                {STORYTELLER_TACTICS.length + userTactics.length} tactics to craft compelling stories
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border" />
            {isCompareMode ? (
              <>
                <Badge variant="secondary" className="gap-2">
                  <Check className="h-3 w-3" />
                  {comparisonCount}/2 selected
                </Badge>
                <Button 
                  variant="default" 
                  size="sm"
                  disabled={!canCompare}
                  onClick={handleOpenComparison}
                >
                  Compare
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    clearComparison();
                    setIsCompareMode(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCompareMode(true)}
              >
                <GitCompare className="h-4 w-4 mr-2" />
                Compare
              </Button>
            )}
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Tactic
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tactics by name, description, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <Button
            variant={activeTab === 'all' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('all')}
          >
            All Tactics
          </Button>
          <Button
            variant={activeTab === 'favorites' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('favorites')}
          >
            <Star className="h-3 w-3 mr-1" />
            Favorites ({favorites.length})
          </Button>
          <Button
            variant={activeTab === 'recent' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('recent')}
          >
            <Clock className="h-3 w-3 mr-1" />
            Recent
          </Button>
          <Button
            variant={activeTab === 'my-tactics' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('my-tactics')}
          >
            <Plus className="h-3 w-3 mr-1" />
            My Tactics ({userTactics.length})
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          {TACTIC_CATEGORIES.map(category => (
            <Button
              key={category.id}
              variant={activeTab === category.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(category.id)}
              className={cn(activeTab === category.id && `badge-${category.id}`)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Smart Recommendations - only show on "all" tab */}
          {activeTab === 'all' && !searchQuery && (
            <TacticRecommendations
              conversationType={conversationType}
              onSelectTactic={handleTacticClick}
              allTactics={allTactics}
              limit={6}
            />
          )}

          {/* Tactics Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + viewMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                viewMode === 'grid' 
                  ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'space-y-3'
              )}
            >
              {filteredTactics.map((tactic, index) => (
                <motion.div
                  key={tactic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Card
                    className={cn(
                      "cursor-pointer hover:border-primary/50 transition-all",
                      viewMode === 'grid' ? 'p-4' : 'p-4 flex items-center gap-4'
                    )}
                    onClick={() => handleTacticClick(tactic)}
                  >
                    <div className={cn("flex-1", viewMode === 'list' && 'min-w-0')}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="outline" 
                          className={cn('text-xs capitalize', `badge-${tactic.category}`)}
                        >
                          {tactic.category}
                        </Badge>
                        {favorites.includes(tactic.id) && (
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        )}
                      </div>
                      <h4 className="font-medium text-foreground mb-1">{tactic.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tactic.description}
                      </p>
                      {viewMode === 'grid' && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {tactic.keywords.slice(0, 3).map(keyword => (
                            <Badge key={keyword} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {viewMode === 'list' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tactic.id);
                        }}
                      >
                        <Star className={cn(
                          "h-4 w-4",
                          favorites.includes(tactic.id) 
                            ? "text-amber-400 fill-amber-400" 
                            : "text-muted-foreground"
                        )} />
                      </Button>
                    )}
                  </Card>
                </motion.div>
              ))}

              {filteredTactics.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    {activeTab === 'my-tactics' 
                      ? "You haven't created any tactics yet. Click 'Create Tactic' to start!"
                      : activeTab === 'favorites'
                        ? "No favorites yet. Click the star icon on any tactic to add it here."
                        : "No tactics found matching your search."}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Create Tactic Modal */}
      <CreateTacticModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSave={(tactic) => {
          addTactic(tactic);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
};

export default TacticsFullView;
