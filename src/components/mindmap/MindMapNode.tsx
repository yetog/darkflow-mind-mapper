import React, { memo, useState } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  ArrowRight, 
  Zap, 
  Flag, 
  FileText,
  Plus,
  Trash2,
  GripVertical,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type NodeColor = 'blue' | 'purple' | 'teal' | 'amber' | 'green' | 'rose' | 'slate';

export interface MindMapNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  type: 'topic' | 'question' | 'transition' | 'activity' | 'milestone';
  duration?: number;
  emotionalTone?: 'positive' | 'neutral' | 'negative' | 'building' | 'resolving';
  customColor?: NodeColor;
  isRoot?: boolean;
  onAddChild?: (nodeId: string) => void;
  onDelete?: (nodeId: string) => void;
  onEdit?: (nodeId: string) => void;
  onColorChange?: (nodeId: string, color: NodeColor) => void;
}

const nodeIcons = {
  topic: FileText,
  question: MessageCircle,
  transition: ArrowRight,
  activity: Zap,
  milestone: Flag,
};

const nodeColors = {
  topic: {
    bg: 'from-primary/20 to-primary/10',
    border: 'border-primary/50',
    glow: 'shadow-primary/20',
    icon: 'text-primary',
  },
  question: {
    bg: 'from-purple-500/20 to-purple-500/10',
    border: 'border-purple-500/50',
    glow: 'shadow-purple-500/20',
    icon: 'text-purple-400',
  },
  transition: {
    bg: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-500/50',
    glow: 'shadow-teal-500/20',
    icon: 'text-teal-400',
  },
  activity: {
    bg: 'from-amber-500/20 to-amber-500/10',
    border: 'border-amber-500/50',
    glow: 'shadow-amber-500/20',
    icon: 'text-amber-400',
  },
  milestone: {
    bg: 'from-green-500/20 to-green-500/10',
    border: 'border-green-500/50',
    glow: 'shadow-green-500/20',
    icon: 'text-green-400',
  },
};

// Custom color overrides
const customColorStyles: Record<NodeColor, typeof nodeColors['topic']> = {
  blue: {
    bg: 'from-blue-500/20 to-blue-500/10',
    border: 'border-blue-500/50',
    glow: 'shadow-blue-500/20',
    icon: 'text-blue-400',
  },
  purple: {
    bg: 'from-purple-500/20 to-purple-500/10',
    border: 'border-purple-500/50',
    glow: 'shadow-purple-500/20',
    icon: 'text-purple-400',
  },
  teal: {
    bg: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-500/50',
    glow: 'shadow-teal-500/20',
    icon: 'text-teal-400',
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-500/10',
    border: 'border-amber-500/50',
    glow: 'shadow-amber-500/20',
    icon: 'text-amber-400',
  },
  green: {
    bg: 'from-green-500/20 to-green-500/10',
    border: 'border-green-500/50',
    glow: 'shadow-green-500/20',
    icon: 'text-green-400',
  },
  rose: {
    bg: 'from-rose-500/20 to-rose-500/10',
    border: 'border-rose-500/50',
    glow: 'shadow-rose-500/20',
    icon: 'text-rose-400',
  },
  slate: {
    bg: 'from-slate-500/20 to-slate-500/10',
    border: 'border-slate-500/50',
    glow: 'shadow-slate-500/20',
    icon: 'text-slate-400',
  },
};

export type MindMapNodeType = Node<MindMapNodeData, 'mindmap'>;

const MindMapNode = memo(({ id, data, selected }: NodeProps<MindMapNodeType>) => {
  const Icon = nodeIcons[data.type] || FileText;
  // Use custom color if set, otherwise use type-based color
  const colors = data.customColor 
    ? customColorStyles[data.customColor] 
    : (nodeColors[data.type] || nodeColors.topic);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 25,
        delay: Math.random() * 0.2 
      }}
      className="group"
    >
      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-primary/50 !border-2 !border-primary transition-all duration-200 group-hover:!bg-primary"
      />
      
      <div
        className={cn(
          'relative px-4 py-3 rounded-xl backdrop-blur-xl',
          'bg-gradient-to-br border',
          'transition-all duration-300 cursor-pointer',
          'min-w-[160px] max-w-[280px]',
          colors.bg,
          colors.border,
          selected && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
          'hover:scale-105 hover:shadow-xl',
          colors.glow,
          selected && 'shadow-lg'
        )}
        onDoubleClick={() => data.onEdit?.(id)}
      >
        {/* Drag handle indicator */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Node content */}
        <div className="flex items-start gap-3">
          <div className={cn(
            'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
            'bg-background/50 backdrop-blur-sm',
            colors.icon
          )}>
            <Icon className="w-4 h-4" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm leading-tight truncate">
              {data.label}
            </h4>
            {data.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {data.description}
              </p>
            )}
            {data.duration && (
              <span className="inline-flex items-center text-xs text-muted-foreground mt-1.5">
                {data.duration} min
              </span>
            )}
          </div>
        </div>

        {/* Action buttons - appear on hover */}
        <div className={cn(
          'absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1',
          'opacity-0 group-hover:opacity-100 transition-all duration-200',
          'translate-x-2 group-hover:translate-x-0'
        )}>
          <Button
            size="icon"
            variant="secondary"
            className="h-6 w-6 rounded-full shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              data.onAddChild?.(id);
            }}
          >
            <Plus className="w-3 h-3" />
          </Button>
          
          {/* Color Picker */}
          {data.onColorChange && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-6 w-6 rounded-full shadow-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Palette className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" side="right" align="center">
                <div className="flex gap-1">
                  {(['blue', 'purple', 'teal', 'amber', 'green', 'rose', 'slate'] as NodeColor[]).map((color) => (
                    <button
                      key={color}
                      onClick={(e) => {
                        e.stopPropagation();
                        data.onColorChange?.(id, color);
                      }}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 transition-all hover:scale-110',
                        color === 'blue' && 'bg-blue-500 border-blue-400',
                        color === 'purple' && 'bg-purple-500 border-purple-400',
                        color === 'teal' && 'bg-teal-500 border-teal-400',
                        color === 'amber' && 'bg-amber-500 border-amber-400',
                        color === 'green' && 'bg-green-500 border-green-400',
                        color === 'rose' && 'bg-rose-500 border-rose-400',
                        color === 'slate' && 'bg-slate-500 border-slate-400',
                        data.customColor === color && 'ring-2 ring-white ring-offset-2 ring-offset-background'
                      )}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
          
          {!data.isRoot && (
            <Button
              size="icon"
              variant="destructive"
              className="h-6 w-6 rounded-full shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                data.onDelete?.(id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Emotional tone indicator */}
        {data.emotionalTone && (
          <div className={cn(
            'absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full',
            data.emotionalTone === 'positive' && 'bg-green-500',
            data.emotionalTone === 'negative' && 'bg-red-500',
            data.emotionalTone === 'neutral' && 'bg-gray-400',
            data.emotionalTone === 'building' && 'bg-gradient-to-r from-amber-500 to-green-500',
            data.emotionalTone === 'resolving' && 'bg-gradient-to-r from-red-500 to-green-500',
          )} />
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-primary/50 !border-2 !border-primary transition-all duration-200 group-hover:!bg-primary"
      />
    </motion.div>
  );
});

MindMapNode.displayName = 'MindMapNode';

export default MindMapNode;
