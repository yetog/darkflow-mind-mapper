import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Trash2, 
  FileText, 
  MessageCircle, 
  ArrowRight, 
  Zap, 
  Flag,
  Clock,
  Smile,
  Meh,
  Frown,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ConversationNode } from '@/types/conversation';
import { cn } from '@/lib/utils';

interface NodeDetailsPanelProps {
  node: ConversationNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (nodeId: string, updates: Partial<ConversationNode>) => void;
  onDelete: (nodeId: string) => void;
}

const nodeTypes = [
  { value: 'topic', label: 'Topic', icon: FileText, color: 'text-primary' },
  { value: 'question', label: 'Question', icon: MessageCircle, color: 'text-purple-400' },
  { value: 'transition', label: 'Transition', icon: ArrowRight, color: 'text-teal-400' },
  { value: 'activity', label: 'Activity', icon: Zap, color: 'text-amber-400' },
  { value: 'milestone', label: 'Milestone', icon: Flag, color: 'text-green-400' },
];

const emotionalTones = [
  { value: 'positive', label: 'Positive', icon: Smile, color: 'text-green-500' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-muted-foreground' },
  { value: 'negative', label: 'Negative', icon: Frown, color: 'text-red-500' },
  { value: 'building', label: 'Building', icon: TrendingUp, color: 'text-amber-500' },
  { value: 'resolving', label: 'Resolving', icon: TrendingDown, color: 'text-blue-500' },
];

const NodeDetailsPanel = ({ 
  node, 
  open, 
  onOpenChange, 
  onSave, 
  onDelete 
}: NodeDetailsPanelProps) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(5);
  const [type, setType] = useState<ConversationNode['type']>('topic');
  const [emotionalTone, setEmotionalTone] = useState<ConversationNode['emotionalTone']>('neutral');
  const [speakerNotes, setSpeakerNotes] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sync form with node data
  useEffect(() => {
    if (node) {
      setLabel(node.label || '');
      setDescription(node.description || '');
      setDuration(node.duration || 5);
      setType(node.type || 'topic');
      setEmotionalTone(node.emotionalTone || 'neutral');
      setSpeakerNotes(node.speakerNotes || '');
      setShowDeleteConfirm(false);
    }
  }, [node]);

  const handleSave = () => {
    if (!node) return;
    
    onSave(node.id, {
      label,
      description,
      duration,
      type,
      emotionalTone,
      speakerNotes,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (!node) return;
    onDelete(node.id);
    onOpenChange(false);
  };

  const selectedType = nodeTypes.find(t => t.value === type);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              {selectedType && (
                <selectedType.icon className={cn('w-5 h-5', selectedType.color)} />
              )}
              Edit Node
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter node label..."
              className="bg-background"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this section..."
              className="bg-background resize-none"
              rows={3}
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Node Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as ConversationNode['type'])}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {nodeTypes.map((nodeType) => (
                  <SelectItem key={nodeType.value} value={nodeType.value}>
                    <div className="flex items-center gap-2">
                      <nodeType.icon className={cn('w-4 h-4', nodeType.color)} />
                      {nodeType.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Duration (minutes)
            </Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDuration(Math.max(1, duration - 1))}
                className="h-10 w-10"
              >
                -
              </Button>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-background text-center w-20"
                min={1}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDuration(duration + 1)}
                className="h-10 w-10"
              >
                +
              </Button>
            </div>
          </div>

          {/* Emotional Tone */}
          <div className="space-y-2">
            <Label>Emotional Tone</Label>
            <div className="grid grid-cols-5 gap-2">
              {emotionalTones.map((tone) => (
                <button
                  key={tone.value}
                  onClick={() => setEmotionalTone(tone.value as ConversationNode['emotionalTone'])}
                  className={cn(
                    'flex flex-col items-center gap-1 p-2 rounded-lg border transition-all',
                    emotionalTone === tone.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 bg-card'
                  )}
                >
                  <tone.icon className={cn('w-5 h-5', tone.color)} />
                  <span className="text-xs text-muted-foreground">{tone.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Speaker Notes */}
          <div className="space-y-2">
            <Label htmlFor="speakerNotes">Speaker Notes</Label>
            <Textarea
              id="speakerNotes"
              value={speakerNotes}
              onChange={(e) => setSpeakerNotes(e.target.value)}
              placeholder="Add notes to help you during your presentation..."
              className="bg-background resize-none"
              rows={5}
            />
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            
            <AnimatePresence mode="wait">
              {showDeleteConfirm ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <p className="text-sm text-muted-foreground text-center">
                    Are you sure you want to delete this node?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 gap-2"
                      onClick={handleDelete}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Node
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NodeDetailsPanel;
