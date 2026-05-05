import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, BookText, Filter, LayoutGrid, Clock, Network } from 'lucide-react';
import { useStoryJournal } from '@/hooks/useStoryJournal';
import { PersonalStory } from '@/types/stories';
import { STORY_CATEGORIES } from '@/types/stories';
import StoryCard from './StoryCard';
import StoryEditor from './StoryEditor';
import StoryTimeline from './StoryTimeline';
import StoryMap from './StoryMap';

type StoryView = 'cards' | 'timeline' | 'map';

const StoryJournal = () => {
  const { stories, addStory, updateStory, deleteStory, getAllTags } = useStoryJournal();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<PersonalStory | null>(null);
  const [activeView, setActiveView] = useState<StoryView>('cards');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allTags = useMemo(() => getAllTags(), [getAllTags]);

  const filtered = useMemo(() => {
    let result = stories;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.story.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedTag) {
      result = result.filter(s => s.tags.includes(selectedTag));
    }
    if (selectedCategory) {
      result = result.filter(s => s.category === selectedCategory);
    }
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [stories, searchQuery, selectedTag, selectedCategory]);

  const handleSave = (data: Omit<PersonalStory, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingStory) {
      updateStory(editingStory.id, data);
    } else {
      addStory(data);
    }
    setEditingStory(null);
  };

  const handleEdit = (story: PersonalStory) => {
    setEditingStory(story);
    setEditorOpen(true);
  };

  const handleNew = () => {
    setEditingStory(null);
    setEditorOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookText className="h-6 w-6 text-primary" />
              My Stories
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Capture, date, and curate your personal stories for conversations and presentations
            </p>
          </div>
          <Button onClick={handleNew}>
            <Plus className="h-4 w-4 mr-2" />
            Log Story
          </Button>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <Button
              variant={activeView === 'cards' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none px-3"
              onClick={() => setActiveView('cards')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === 'timeline' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none px-3"
              onClick={() => setActiveView('timeline')}
            >
              <Clock className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === 'map' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none px-3"
              onClick={() => setActiveView('map')}
            >
              <Network className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {/* Category filters */}
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className="cursor-pointer text-xs"
            onClick={() => setSelectedCategory(null)}
          >
            <Filter className="h-3 w-3 mr-1" />
            All
          </Badge>
          {STORY_CATEGORIES.map(cat => (
            <Badge
              key={cat.value}
              variant={selectedCategory === cat.value ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedCategory(selectedCategory === cat.value ? null : cat.value)}
            >
              {cat.label}
            </Badge>
          ))}

          {/* Tag filters */}
          {allTags.length > 0 && (
            <>
              <div className="w-px h-5 bg-border mx-1 self-center" />
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <BookText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {stories.length === 0 ? 'Start Your Story Journal' : 'No stories match your search'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                {stories.length === 0
                  ? 'Log personal stories, anecdotes, and experiences that you can draw from in conversations and presentations.'
                  : 'Try adjusting your search or filter criteria.'}
              </p>
              {stories.length === 0 && (
                <Button onClick={handleNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Log Your First Story
                </Button>
              )}
            </motion.div>
          ) : activeView === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <StoryCard
                    story={story}
                    onEdit={handleEdit}
                    onDelete={deleteStory}
                  />
                </motion.div>
              ))}
            </div>
          ) : activeView === 'timeline' ? (
            <StoryTimeline stories={filtered} onEdit={handleEdit} onDelete={deleteStory} />
          ) : (
            <StoryMap stories={filtered} onEdit={handleEdit} />
          )}
        </div>
      </ScrollArea>

      <StoryEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        story={editingStory}
        onSave={handleSave}
      />
    </div>
  );
};

export default StoryJournal;

export default StoryJournal;