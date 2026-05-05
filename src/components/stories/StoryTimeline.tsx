import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Edit2, Trash2, Bookmark } from 'lucide-react';
import { PersonalStory, STORY_CATEGORIES } from '@/types/stories';
import { format } from 'date-fns';

interface StoryTimelineProps {
  stories: PersonalStory[];
  onEdit: (story: PersonalStory) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  personal: 'bg-blue-500',
  work: 'bg-amber-500',
  presentation: 'bg-purple-500',
  anecdote: 'bg-pink-500',
  'lesson-learned': 'bg-teal-500',
  inspiration: 'bg-orange-500',
};

const StoryTimeline: React.FC<StoryTimelineProps> = ({ stories, onEdit, onDelete }) => {
  // Group stories by month/year
  const grouped = stories.reduce<Record<string, PersonalStory[]>>((acc, story) => {
    const key = format(new Date(story.date), 'MMMM yyyy');
    if (!acc[key]) acc[key] = [];
    acc[key].push(story);
    return acc;
  }, {});

  const sortedMonths = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  if (stories.length === 0) return null;

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-8">
        {sortedMonths.map((month, monthIdx) => (
          <div key={month}>
            {/* Month marker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: monthIdx * 0.1 }}
              className="relative flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{month}</h3>
            </motion.div>

            {/* Stories in this month */}
            <div className="space-y-4 ml-6 pl-10 border-l border-transparent">
              {grouped[month].map((story, storyIdx) => {
                const catColor = CATEGORY_COLORS[story.category] || 'bg-muted';
                const categoryInfo = STORY_CATEGORIES.find(c => c.value === story.category);

                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: monthIdx * 0.1 + storyIdx * 0.05 }}
                    className="relative group"
                  >
                    {/* Connector dot */}
                    <div className={`absolute -left-[2.85rem] top-4 w-3 h-3 rounded-full ${catColor} ring-2 ring-background z-10`} />

                    {/* Story card */}
                    <div className="rounded-lg border bg-card p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground truncate">{story.title}</h4>
                            {categoryInfo && (
                              <Badge variant="outline" className="text-xs shrink-0">
                                {categoryInfo.label}
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(story.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(story)}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onDelete(story.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {story.story}
                      </p>

                      {story.keyMoments.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Bookmark className="h-3 w-3" />
                          <span>{story.keyMoments.length} key moment{story.keyMoments.length !== 1 ? 's' : ''}</span>
                        </div>
                      )}

                      {story.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {story.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryTimeline;