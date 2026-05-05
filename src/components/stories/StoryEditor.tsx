import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';
import { PersonalStory } from '@/types/stories';
import { STORYTELLER_TACTICS } from '@/data/storyteller-tactics';
import VoiceMemoRecorder from './VoiceMemoRecorder';

interface StoryEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  story?: PersonalStory | null;
  onSave: (story: Omit<PersonalStory, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const StoryEditor = ({ open, onOpenChange, story, onSave }: StoryEditorProps) => {
  const [title, setTitle] = useState('');
  const [storyText, setStoryText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState('personal');
  const [keyMoments, setKeyMoments] = useState<string[]>([]);
  const [momentInput, setMomentInput] = useState('');
  const [linkedTacticId, setLinkedTacticId] = useState<string>('');

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setStoryText(story.story);
      setDate(story.date);
      setCategory(story.category || 'personal');
      setTags(story.tags);
      setKeyMoments(story.keyMoments);
      setLinkedTacticId(story.linkedTacticId || '');
    } else {
      setTitle('');
      setStoryText('');      
      setCategory('personal');
      setDate(new Date().toISOString().split('T')[0]);
      setTags([]);
      setKeyMoments([]);
      setLinkedTacticId('');
    }
  }, [story, open]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags(prev => [...prev, t]);
      setTagInput('');
    }
  };

  const addMoment = () => {
    const m = momentInput.trim();
    if (m) {
      setKeyMoments(prev => [...prev, m]);
      setMomentInput('');
    }
  };

  const handleTranscriptReady = (transcript: string) => {
    setStoryText(prev => prev ? prev + '\n\n' + transcript : transcript);
  };

  const handleSave = () => {
    if (!title.trim() || !storyText.trim()) return;
    onSave({
      title: title.trim(),
      story: storyText.trim(),
      date,
      category,
      tags,
      keyMoments,
      linkedTacticId: linkedTacticId || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{story ? 'Edit Story' : 'Log a New Story'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Give your story a name" />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {STORY_CATEGORIES.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="story">Your Story</Label>
              <VoiceMemoRecorder onTranscriptReady={handleTranscriptReady} />
            </div>
            <Textarea id="story" value={storyText} onChange={e => setStoryText(e.target.value)} placeholder="Write about what happened, or use the voice memo button above..." rows={6} />
            <p className="text-xs text-muted-foreground mt-1">
              Type your story or record a voice memo. Voice transcriptions appear here for editing.
            </p>
          </div>
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mt-1">
              <Input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add a tag" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-1" />
              <Button type="button" size="sm" variant="outline" onClick={addTag}><Plus className="h-4 w-4" /></Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setTags(prev => prev.filter(t => t !== tag))} />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div>
            <Label>Key Moments / Takeaways</Label>
            <div className="flex gap-2 mt-1">
              <Input value={momentInput} onChange={e => setMomentInput(e.target.value)} placeholder="Add a key moment" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addMoment())} className="flex-1" />
              <Button type="button" size="sm" variant="outline" onClick={addMoment}><Plus className="h-4 w-4" /></Button>
            </div>
            {keyMoments.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm">
                {keyMoments.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/80">
                    <span className="text-primary mt-0.5">--</span>
                    <span className="flex-1">{m}</span>
                    <X className="h-3 w-3 cursor-pointer text-muted-foreground mt-1" onClick={() => setKeyMoments(prev => prev.filter((_, idx) => idx !== i))} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <Label>Link to a Tactic (optional)</Label>
            <Select value={linkedTacticId} onValueChange={setLinkedTacticId}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {STORYTELLER_TACTICS.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!title.trim() || !storyText.trim()}>
              {story ? 'Update Story' : 'Save Story'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryEditor;
