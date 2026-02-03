import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { VocabCategory, VOCAB_CATEGORIES } from '@/data/vocabulary';
import { cn } from '@/lib/utils';

interface CreatePhraseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePhrase: (phrase: {
    phrase: string;
    meaning: string;
    example: string;
    category: VocabCategory;
    situation: string;
  }) => void;
}

const SITUATION_SUGGESTIONS = [
  'Opening',
  'Closing',
  'Transition',
  'Emphasis',
  'Persuasion',
  'Clarification',
  'Agreement',
  'Disagreement',
  'Question',
  'Summary',
];

const CreatePhraseModal = ({ open, onOpenChange, onCreatePhrase }: CreatePhraseModalProps) => {
  const [phrase, setPhrase] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');
  const [category, setCategory] = useState<VocabCategory>('business');
  const [situation, setSituation] = useState('professional');

  const handleSubmit = () => {
    if (!phrase.trim() || !meaning.trim()) return;
    
    onCreatePhrase({
      phrase: phrase.trim(),
      meaning: meaning.trim(),
      example: example.trim(),
      category,
      situation,
    });

    // Reset form
    setPhrase('');
    setMeaning('');
    setExample('');
    setCategory('business');
    setSituation('professional');
    onOpenChange(false);
  };

  const getCategoryColor = (cat: VocabCategory) => {
    switch (cat) {
      case 'business': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'casual': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'persuasion': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'emotional': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'humor': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Custom Phrase</DialogTitle>
          <DialogDescription>
            Add a new phrase to your vocabulary collection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Phrase */}
          <div className="space-y-2">
            <Label htmlFor="phrase">Phrase *</Label>
            <Input
              id="phrase"
              placeholder="e.g., Let me put this into perspective..."
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
          </div>

          {/* Meaning */}
          <div className="space-y-2">
            <Label htmlFor="meaning">Meaning / Definition *</Label>
            <Textarea
              id="meaning"
              placeholder="What does this phrase mean or accomplish?"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              rows={2}
            />
          </div>

          {/* Example */}
          <div className="space-y-2">
            <Label htmlFor="example">Example Usage</Label>
            <Textarea
              id="example"
              placeholder="An example sentence using this phrase..."
              value={example}
              onChange={(e) => setExample(e.target.value)}
              rows={2}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as VocabCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VOCAB_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      <span>{cat.label}</span>
                      <span className="text-xs text-muted-foreground">- {cat.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Situation */}
          <div className="space-y-2">
            <Label>Situation (when to use)</Label>
            <Select value={situation} onValueChange={setSituation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SITUATION_SUGGESTIONS.map((sit) => (
                  <SelectItem key={sit} value={sit.toLowerCase()}>
                    {sit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!phrase.trim() || !meaning.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Phrase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePhraseModal;
