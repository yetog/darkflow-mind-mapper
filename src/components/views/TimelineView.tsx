import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConversationNode } from '@/types/conversation';
import { cn } from '@/lib/utils';
import { AnimatedCard, FadeInSection } from '@/components/ui/animated-card';
import NodeDetailsPanel from '@/components/builder/NodeDetailsPanel';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  Clock,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Target,
  GripVertical,
  Edit3,
  Trash2,
} from 'lucide-react';

interface TimelineViewProps {
  nodes: ConversationNode[];
  totalDuration: number;
  onNodesUpdate: (nodes: ConversationNode[]) => void;
}

// Sortable segment component
const SortableSegment = ({
  segment,
  index,
  segmentsLength,
  selectedSegmentId,
  onSelect,
  onEdit,
}: {
  segment: ConversationNode & { startTime: number; endTime: number };
  index: number;
  segmentsLength: number;
  selectedSegmentId: string | null;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: segment.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  const Icon = getSegmentIcon(segment.type);
  const isSelected = selectedSegmentId === segment.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer',
        isDragging && 'shadow-xl ring-2 ring-primary',
        isSelected
          ? 'border-primary bg-primary/5 shadow-glow'
          : 'border-border bg-card/50 hover:border-primary/50 hover:bg-card'
      )}
      onClick={() => onSelect(segment.id)}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Time Indicator */}
      <div className="flex-shrink-0 w-16 text-center">
        <div className="text-sm font-medium text-foreground">
          {segment.startTime}:00
        </div>
        <div className="text-xs text-muted-foreground">
          {segment.duration || 5} min
        </div>
      </div>

      {/* Icon */}
      <div className={cn(
        'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
        segment.type === 'question' && 'bg-purple-500/20 text-purple-400',
        segment.type === 'transition' && 'bg-teal-500/20 text-teal-400',
        segment.type === 'milestone' && 'bg-green-500/20 text-green-400',
        segment.type === 'topic' && 'bg-blue-500/20 text-blue-400',
        segment.type === 'activity' && 'bg-amber-500/20 text-amber-400'
      )}>
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">
          {segment.label}
        </h4>
        {segment.description && (
          <p className="text-sm text-muted-foreground truncate mt-0.5">
            {segment.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant="outline"
            className={cn('text-xs capitalize', `badge-${segment.type}`)}
          >
            {segment.type}
          </Badge>
          {segment.emotionalTone && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className={cn('w-2 h-2 rounded-full', getEmotionalColor(segment.emotionalTone))} />
              <span className="capitalize">{segment.emotionalTone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(segment.id);
        }}
      >
        <Edit3 className="h-4 w-4" />
      </Button>

      {/* Emotional Arc Indicator */}
      <div className="flex-shrink-0 w-20 h-12">
        <svg viewBox="0 0 80 48" className="w-full h-full">
          <path
            d={getArcPath(segment.emotionalTone)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={cn(
              segment.emotionalTone === 'positive' && 'text-green-500',
              segment.emotionalTone === 'negative' && 'text-red-500',
              segment.emotionalTone === 'building' && 'text-amber-500',
              segment.emotionalTone === 'resolving' && 'text-blue-500',
              !segment.emotionalTone && 'text-muted-foreground'
            )}
          />
        </svg>
      </div>
    </div>
  );
};

const getSegmentIcon = (type: ConversationNode['type']) => {
  switch (type) {
    case 'question': return HelpCircle;
    case 'transition': return ArrowRight;
    case 'milestone': return Target;
    default: return MessageCircle;
  }
};

const getEmotionalColor = (tone?: string) => {
  switch (tone) {
    case 'positive': return 'bg-green-500';
    case 'negative': return 'bg-red-500';
    case 'building': return 'bg-amber-500';
    case 'resolving': return 'bg-blue-500';
    default: return 'bg-muted-foreground';
  }
};

const TimelineView = ({ nodes, totalDuration, onNodesUpdate }: TimelineViewProps) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Flatten nodes into timeline segments
  const segments = nodes[0]?.children || [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  let cumulativeTime = 0;
  const segmentsWithTime = segments.map(segment => {
    const startTime = cumulativeTime;
    cumulativeTime += segment.duration || 5;
    return {
      ...segment,
      startTime,
      endTime: cumulativeTime,
    };
  });

  const actualDuration = cumulativeTime;

  const editingNode = editingNodeId
    ? segments.find(s => s.id === editingNodeId) || null
    : null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !nodes[0]) return;

    const oldIndex = segments.findIndex(s => s.id === active.id);
    const newIndex = segments.findIndex(s => s.id === over.id);
    const reordered = arrayMove([...segments], oldIndex, newIndex);
    onNodesUpdate([{ ...nodes[0], children: reordered }]);
  };

  const handleEditSegment = (segmentId: string) => {
    setEditingNodeId(segmentId);
    setIsPanelOpen(true);
  };

  const handleSaveNode = (nodeId: string, updates: Partial<ConversationNode>) => {
    if (!nodes[0]) return;
    const updatedChildren = segments.map(s =>
      s.id === nodeId ? { ...s, ...updates } : s
    );
    onNodesUpdate([{ ...nodes[0], children: updatedChildren }]);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!nodes[0]) return;
    const updatedChildren = segments.filter(s => s.id !== nodeId);
    onNodesUpdate([{ ...nodes[0], children: updatedChildren }]);
    setIsPanelOpen(false);
    setEditingNodeId(null);
  };

  const handleAddSegment = () => {
    if (!nodes[0]) return;
    const newSegment: ConversationNode = {
      id: `segment-${Date.now()}`,
      label: 'New Segment',
      type: 'topic',
      duration: 5,
    };
    onNodesUpdate([{ ...nodes[0], children: [...segments, newSegment] }]);
  };

  return (
    <div className="h-full flex flex-col p-6 relative">
      {/* Header Stats */}
      <FadeInSection direction="up" delay={0}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Total: {actualDuration} min</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {segments.length} segments
            </Badge>
          </div>
          <Button size="sm" onClick={handleAddSegment}>
            <Plus className="h-4 w-4 mr-2" />
            Add Segment
          </Button>
        </div>
      </FadeInSection>

      {/* Timeline Container */}
      <AnimatedCard index={1} hoverScale={false} className="flex-1">
        <Card className="h-full glass-card overflow-hidden">
          <div className="h-full overflow-auto custom-scrollbar p-6">
            {segments.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center"
                  >
                    <Clock className="w-10 h-10 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      Build Your Timeline
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Plan out the flow of your conversation with timed segments
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="relative mb-8">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 flex">
                      {segmentsWithTime.map((segment, index) => (
                        <motion.div
                          key={segment.id}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${((segment.duration || 5) / actualDuration) * 100}%` 
                          }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                          className={cn(
                            'h-full transition-all cursor-pointer',
                            getEmotionalColor(segment.emotionalTone),
                            index === 0 && 'rounded-l-full',
                            index === segments.length - 1 && 'rounded-r-full',
                            selectedSegmentId === segment.id ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                          )}
                          onClick={() => setSelectedSegmentId(segment.id)}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Time markers */}
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>0:00</span>
                    <span>{Math.floor(actualDuration / 2)}:00</span>
                    <span>{actualDuration}:00</span>
                  </div>
                </div>

                {/* Segment Cards */}
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={segmentsWithTime.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {segmentsWithTime.map((segment, index) => (
                        <SortableSegment
                          key={segment.id}
                          segment={segment}
                          index={index}
                          segmentsLength={segments.length}
                          selectedSegmentId={selectedSegmentId}
                          onSelect={setSelectedSegmentId}
                          onEdit={handleEditSegment}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </div>
        </Card>
      </AnimatedCard>

      {/* Node Details Panel */}
      <NodeDetailsPanel
        node={editingNode}
        open={isPanelOpen}
        onOpenChange={setIsPanelOpen}
        onSave={handleSaveNode}
        onDelete={handleDeleteNode}
      />
    </div>
  );
};

// Generate SVG path for emotional arc visualization
const getArcPath = (tone?: string): string => {
  const baseline = 24;
  const amplitude = 16;
  
  switch (tone) {
    case 'positive':
      return `M 0 ${baseline} Q 40 ${baseline - amplitude} 80 ${baseline - amplitude * 0.5}`;
    case 'negative':
      return `M 0 ${baseline} Q 40 ${baseline + amplitude} 80 ${baseline + amplitude * 0.5}`;
    case 'building':
      return `M 0 ${baseline + amplitude * 0.3} Q 40 ${baseline} 80 ${baseline - amplitude}`;
    case 'resolving':
      return `M 0 ${baseline - amplitude * 0.3} Q 40 ${baseline} 80 ${baseline + amplitude * 0.3}`;
    default:
      return `M 0 ${baseline} L 80 ${baseline}`;
  }
};

export default TimelineView;
