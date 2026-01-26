import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Trash2 } from 'lucide-react';
import { StorytellerTactic, TacticCategory, TACTIC_CATEGORIES } from '@/types/tactics';
import { cn } from '@/lib/utils';

interface CreateTacticModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (tactic: StorytellerTactic) => void;
}

const CreateTacticModal = ({ open, onOpenChange, onSave }: CreateTacticModalProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<TacticCategory>('concept');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<string[]>(['']);
  const [whenToUse, setWhenToUse] = useState<string[]>(['']);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');

  const resetForm = () => {
    setName('');
    setCategory('concept');
    setDescription('');
    setSteps(['']);
    setWhenToUse(['']);
    setKeywords([]);
    setKeywordInput('');
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSave = () => {
    if (!name.trim() || !description.trim()) return;

    const tactic: StorytellerTactic = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      category,
      description: description.trim(),
      steps: steps.filter(s => s.trim()),
      whenToUse: whenToUse.filter(w => w.trim()),
      keywords,
      conversationTypes: ['presentation', 'meeting', 'lesson'], // Default to all
    };

    onSave(tactic);
    resetForm();
  };

  const addStep = () => setSteps([...steps, '']);
  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };
  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addWhenToUse = () => setWhenToUse([...whenToUse, '']);
  const removeWhenToUse = (index: number) => {
    if (whenToUse.length > 1) {
      setWhenToUse(whenToUse.filter((_, i) => i !== index));
    }
  };
  const updateWhenToUse = (index: number, value: string) => {
    const newWhenToUse = [...whenToUse];
    newWhenToUse[index] = value;
    setWhenToUse(newWhenToUse);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Own Tactic</DialogTitle>
          <DialogDescription>
            Document a storytelling technique that works well for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name and Category */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Tactic Name *</Label>
              <Input
                id="name"
                placeholder="e.g., The Power Pause"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as TacticCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TACTIC_CATEGORIES.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label} - {cat.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what this tactic does and why it's effective..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* When to Use */}
          <div className="space-y-2">
            <Label>When to Use</Label>
            <div className="space-y-2">
              {whenToUse.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., When you need to emphasize a key point"
                    value={item}
                    onChange={(e) => updateWhenToUse(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeWhenToUse(index)}
                    disabled={whenToUse.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addWhenToUse}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Use Case
              </Button>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <Label>Steps</Label>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-2">
                    {index + 1}
                  </span>
                  <Textarea
                    placeholder={`Step ${index + 1}...`}
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStep(index)}
                    disabled={steps.length === 1}
                    className="mt-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addStep}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Step
              </Button>
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label>Keywords</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a keyword..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addKeyword}>
                Add
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map(keyword => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeKeyword(keyword)}
                  >
                    {keyword}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!name.trim() || !description.trim()}
          >
            Save Tactic
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTacticModal;
