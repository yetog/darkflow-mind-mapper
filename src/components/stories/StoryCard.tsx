import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Trash2, Edit2, Bookmark } from 'lucide-react';
import { PersonalStory } from '@/types/stories';
import { STORYTELLER_TACTICS } from '@/data/storyteller-tactics';
import { format } from 'date-fns';

interface StoryCardProps {
  story: PersonalStory;
  onEdit: (story: PersonalStory) => void;
  onDelete: (id: string) => void;
}

const StoryCard = ({ story, onEdit, onDelete }: StoryCardProps) => {
  const linkedTactic = story.linkedTacticId
    ? STORYTELLER_TACTICS.find(t => t.id === story.linkedTacticId)
    : null;

  return (
    <Card className="p-5 hover:border-primary/30 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{story.title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(story.date), 'MMM d, yyyy')}</span>
          </div>
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

      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
        {story.story}
      </p>

      {story.keyMoments.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
            <Bookmark className="h-3 w-3" />
            Key Moments
          </p>
          <ul className="text-xs text-foreground/80 space-y-1">
            {story.keyMoments.slice(0, 3).map((moment, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-primary mt-0.5">--</span>
                <span>{moment}</span>
              </li>
            ))}
            {story.keyMoments.length > 3 && (
              <li className="text-muted-foreground">+{story.keyMoments.length - 3} more</li>
            )}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {story.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {linkedTactic && (
          <Badge variant="outline" className="text-xs">
            {linkedTactic.name}
          </Badge>
        )}
      </div>
    </Card>
  );
};

export default StoryCard;