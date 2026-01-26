import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ConversationNode } from '@/types/conversation';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Edit3,
  Play,
  Pause,
  Layers,
} from 'lucide-react';

interface CarouselViewProps {
  nodes: ConversationNode[];
  onNodesUpdate: (nodes: ConversationNode[]) => void;
}

const CarouselView = ({ nodes, onNodesUpdate }: CarouselViewProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);

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

  // Calculate cumulative duration
  let cumulativeTime = 0;
  slides.forEach((slide, index) => {
    if (index < currentSlide) {
      cumulativeTime += slide.duration || 5;
    }
  });

  const totalDuration = slides.reduce((acc, slide) => acc + (slide.duration || 5), 0);

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
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
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Slide
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Slide Preview */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 glass-card overflow-hidden relative">
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
                {/* Slide Content */}
                <div 
                  className="h-full flex flex-col items-center justify-center p-12 text-center"
                  style={{
                    background: 'radial-gradient(ellipse at center, hsl(222 47% 12%) 0%, hsl(222 47% 6%) 100%)',
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
                </div>

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

          {/* Slide Thumbnails */}
          {slides.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
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
                </button>
              ))}
              <button className="flex-shrink-0 w-32 h-20 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex items-center justify-center">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* Speaker Notes Panel */}
        {slides.length > 0 && (
          <Card className="w-80 flex-shrink-0 glass-card p-4 flex flex-col">
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
          </Card>
        )}
      </div>
    </div>
  );
};

export default CarouselView;
