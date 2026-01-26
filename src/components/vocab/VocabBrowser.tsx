import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import DynamicIcon from '@/components/ui/dynamic-icon';
import {
  Search,
  Shuffle,
  Plus,
  BookOpen,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  VOCABULARY_PHRASES,
  VOCAB_CATEGORIES,
  VocabPhrase,
  VocabCategory,
  searchVocab,
  getVocabByCategory,
  getRandomPhrase,
} from '@/data/vocabulary';
import { cn } from '@/lib/utils';

interface VocabBrowserProps {
  onAddPhrase?: (phrase: VocabPhrase) => void;
}

const VocabBrowser = ({ onAddPhrase }: VocabBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<VocabCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'browse' | 'flashcard'>('browse');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredPhrases = useMemo(() => {
    let phrases = VOCABULARY_PHRASES;
    
    if (searchQuery) {
      phrases = searchVocab(searchQuery);
    } else if (activeCategory !== 'all') {
      phrases = getVocabByCategory(activeCategory);
    }
    
    return phrases;
  }, [searchQuery, activeCategory]);

  const handleRandomPhrase = () => {
    const random = getRandomPhrase();
    setCurrentFlashcardIndex(VOCABULARY_PHRASES.indexOf(random));
    setIsFlipped(false);
    setViewMode('flashcard');
  };

  const nextFlashcard = () => {
    setCurrentFlashcardIndex((prev) => 
      prev < filteredPhrases.length - 1 ? prev + 1 : 0
    );
    setIsFlipped(false);
  };

  const prevFlashcard = () => {
    setCurrentFlashcardIndex((prev) => 
      prev > 0 ? prev - 1 : filteredPhrases.length - 1
    );
    setIsFlipped(false);
  };

  const currentFlashcard = filteredPhrases[currentFlashcardIndex] || filteredPhrases[0];

  const getCategoryColor = (category: VocabCategory) => {
    switch (category) {
      case 'business': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'casual': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'persuasion': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'emotional': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'humor': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

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
              <h2 className="text-lg font-semibold text-foreground">Vocabulary & Phrases</h2>
              <p className="text-sm text-muted-foreground">
                {VOCABULARY_PHRASES.length} phrases for impactful communication
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'browse' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('browse')}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Browse
            </Button>
            <Button
              variant={viewMode === 'flashcard' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => { setViewMode('flashcard'); setIsFlipped(false); }}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Flashcards
            </Button>
          </div>
        </div>

        {/* Search and Random */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search phrases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={handleRandomPhrase}>
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <Button
            variant={activeCategory === 'all' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveCategory('all')}
          >
            All
          </Button>
          {VOCAB_CATEGORIES.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={cn(activeCategory === category.id && getCategoryColor(category.id))}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'browse' ? (
            <motion.div
              key="browse"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <ScrollArea className="h-full">
                <div className="p-6 grid gap-4 md:grid-cols-2">
                  {filteredPhrases.map((phrase, index) => (
                    <motion.div
                      key={phrase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Card className="p-4 hover:border-primary/50 transition-colors h-full">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-muted">
                              <DynamicIcon name={phrase.iconName} size={18} className="text-muted-foreground" />
                            </div>
                            <h4 className="font-medium text-foreground">{phrase.phrase}</h4>
                          </div>
                          <Badge variant="outline" className={cn('text-xs capitalize', getCategoryColor(phrase.category))}>
                            {phrase.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {phrase.meaning}
                        </p>
                        <div className="bg-secondary/50 rounded-lg p-3 mb-3">
                          <p className="text-sm italic text-foreground/80">
                            "{phrase.example}"
                          </p>
                        </div>
                        {onAddPhrase && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAddPhrase(phrase)}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add to Speaker Notes
                          </Button>
                        )}
                      </Card>
                    </motion.div>
                  ))}

                  {filteredPhrases.length === 0 && (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-muted-foreground">No phrases found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          ) : (
            <motion.div
              key="flashcard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col items-center justify-center p-6"
            >
              {currentFlashcard && (
                <>
                  <div className="text-sm text-muted-foreground mb-4">
                    {currentFlashcardIndex + 1} of {filteredPhrases.length}
                  </div>
                  
                  {/* Flashcard */}
                  <motion.div
                    className="w-full max-w-md aspect-[4/3] cursor-pointer perspective-1000"
                    onClick={() => setIsFlipped(!isFlipped)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="relative w-full h-full"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Front */}
                      <Card 
                        className={cn(
                          "absolute inset-0 p-8 flex flex-col items-center justify-center text-center backface-hidden",
                          isFlipped && "invisible"
                        )}
                      >
                        <div className="p-3 rounded-lg bg-primary/10 mb-4">
                          <DynamicIcon name={currentFlashcard.iconName} size={32} className="text-primary" />
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {currentFlashcard.phrase}
                        </h3>
                        <Badge variant="outline" className={cn('mt-2 capitalize', getCategoryColor(currentFlashcard.category))}>
                          {currentFlashcard.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-4">
                          Tap to reveal meaning
                        </p>
                      </Card>
                      
                      {/* Back */}
                      <Card 
                        className={cn(
                          "absolute inset-0 p-8 flex flex-col items-center justify-center text-center backface-hidden",
                          !isFlipped && "invisible"
                        )}
                        style={{ transform: 'rotateY(180deg)' }}
                      >
                        <p className="text-lg text-foreground mb-4">
                          {currentFlashcard.meaning}
                        </p>
                        <div className="bg-secondary/50 rounded-lg p-4 w-full">
                          <p className="text-sm italic text-foreground/80">
                            "{currentFlashcard.example}"
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  </motion.div>

                  {/* Navigation */}
                  <div className="flex items-center gap-4 mt-6">
                    <Button variant="outline" size="icon" onClick={prevFlashcard}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" onClick={handleRandomPhrase}>
                      <Shuffle className="h-4 w-4 mr-2" />
                      Random
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextFlashcard}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>

                  {onAddPhrase && (
                    <Button
                      className="mt-4"
                      onClick={() => onAddPhrase(currentFlashcard)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Speaker Notes
                    </Button>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VocabBrowser;
