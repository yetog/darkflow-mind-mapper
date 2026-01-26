import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ConversationNode } from '@/types/conversation';
import { cn } from '@/lib/utils';
import { AnimatedCard, FadeInSection } from '@/components/ui/animated-card';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  Clock,
  Edit3,
  Play,
  Pause,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';

interface CarouselViewProps {
  nodes: ConversationNode[];
  onNodesUpdate: (nodes: ConversationNode[]) => void;
}

const CarouselView = ({ nodes, onNodesUpdate }: CarouselViewProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = nodes[0]?.children || [];
  const totalSlides = slides.length;
  const currentSlideData = slides[currentSlide];

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case 'ArrowUp':
          e.preventDefault();
          insertSlide('before');
          break;
        case 'ArrowDown':
          e.preventDefault();
          insertSlide('after');
          break;
        case '+':
        case '=':
          setZoomLevel(z => Math.min(z + 0.1, 2));
          break;
        case '-':
          setZoomLevel(z => Math.max(z - 0.1, 0.5));
          break;
        case '0':
          setZoomLevel(1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides]);

  const insertSlide = (position: 'before' | 'after') => {
    if (!nodes[0]) return;
    
    const newSlide: ConversationNode = {
      id: `slide-${Date.now()}`,
      label: 'New Slide',
      type: 'topic',
      duration: 5,
    };

    const insertIndex = position === 'before' ? currentSlide : currentSlide + 1;
    const newChildren = [...slides];
    newChildren.splice(insertIndex, 0, newSlide);

    onNodesUpdate([{ ...nodes[0], children: newChildren }]);
    
    if (position === 'after') {
      setCurrentSlide(insertIndex);
    }
  };

  // Calculate cumulative duration
  let cumulativeTime = 0;
  slides.forEach((slide, index) => {
    if (index < currentSlide) {
      cumulativeTime += slide.duration || 5;
    }
  });

  const totalDuration = slides.reduce((acc, slide) => acc + (slide.duration || 5), 0);

  return (
    <div className="h-full flex flex-col p-6" ref={containerRef}>
      {/* Header */}
      <FadeInSection direction="up" delay={0}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Layers className="h-4 w-4" />
              <span>Slide {currentSlide + 1} of {totalSlides}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{cumulativeTime}:00 / {totalDuration}:00</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 mr-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setZoomLevel(z => Math.max(z - 0.1, 0.5))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setZoomLevel(z => Math.min(z + 0.1, 2))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setZoomLevel(1)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              variant={isPresenting ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setIsPresenting(!isPresenting)}
            >
              {isPresenting ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Exit Rehearsal
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Rehearse
                </>
              )}
            </Button>
            <Button size="sm" onClick={() => insertSlide('after')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </div>
        </div>
      </FadeInSection>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Slide Preview */}
        <div className="flex-1 flex flex-col">
          <AnimatedCard index={1} hoverScale={false} className="flex-1">
            <Card className="h-full glass-card overflow-hidden relative">
              {slides.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Layers className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        Create Your First Slide
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Build your presentation one card at a time
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Slide Content with Zoom */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col items-center justify-center p-12 text-center"
                      style={{
                        background: 'radial-gradient(ellipse at center, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center center',
                      }}
                    >
                      <Badge 
                        variant="outline" 
                        className={cn('mb-6 text-xs capitalize', `badge-${currentSlideData?.type}`)}
                      >
                        {currentSlideData?.type}
                      </Badge>
                      <h2 className="text-4xl font-bold text-foreground mb-4">
                        {currentSlideData?.label}
                      </h2>
                      {currentSlideData?.description && (
                        <p className="text-xl text-muted-foreground max-w-2xl">
                          {currentSlideData.description}
                        </p>
                      )}
                      {currentSlideData?.duration && (
                        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{currentSlideData.duration} minutes</span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Insert Above Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => insertSlide('before')}
                    className="absolute top-4 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <ChevronUp className="h-5 w-5" />
                  </Button>

                  {/* Insert Below Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => insertSlide('after')}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </Button>

                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </Card>
          </AnimatedCard>

          {/* Slide Thumbnails */}
          {slides.length > 0 && (
            <motion.div 
              className="mt-4 flex gap-2 overflow-x-auto pb-2 custom-scrollbar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {slides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'flex-shrink-0 w-32 h-20 rounded-lg border-2 transition-all overflow-hidden',
                    index === currentSlide
                      ? 'border-primary shadow-glow'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className="w-full h-full bg-card flex items-center justify-center p-2">
                    <span className="text-xs text-muted-foreground truncate">
                      {slide.label}
                    </span>
                  </div>
                </motion.button>
              ))}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => insertSlide('after')}
                className="flex-shrink-0 w-32 h-20 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 text-muted-foreground" />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Speaker Notes Panel */}
        {slides.length > 0 && (
          <AnimatedCard index={2} hoverScale={false} className="w-80 flex-shrink-0">
            <Card className="h-full glass-card p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">Speaker Notes</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingNotes(!editingNotes)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
              
              {editingNotes ? (
                <Textarea
                  className="flex-1 resize-none bg-background/50"
                  placeholder="Add your speaker notes here..."
                  value={currentSlideData?.speakerNotes || ''}
                />
              ) : (
                <div className="flex-1 overflow-auto custom-scrollbar">
                  {currentSlideData?.speakerNotes ? (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {currentSlideData.speakerNotes}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground/50 italic">
                      No speaker notes for this slide. Click the edit button to add some.
                    </p>
                  )}
                </div>
              )}

              {/* Tactics Applied */}
              {currentSlideData?.tacticIds && currentSlideData.tacticIds.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Applied Tactics
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {currentSlideData.tacticIds.map(tacticId => (
                      <Badge key={tacticId} variant="outline" className="text-xs">
                        {tacticId}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Keyboard Shortcuts Help */}
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Keyboard Shortcuts
                </h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>← →</span>
                    <span>Navigate slides</span>
                  </div>
                  <div className="flex justify-between">
                    <span>↑ ↓</span>
                    <span>Insert slide</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ / -</span>
                    <span>Zoom in/out</span>
                  </div>
                  <div className="flex justify-between">
                    <span>0</span>
                    <span>Reset zoom</span>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedCard>
        )}
      </div>
    </div>
  );
};

export default CarouselView;
