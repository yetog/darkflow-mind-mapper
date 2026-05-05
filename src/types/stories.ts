export interface PersonalStory {
  id: string;
  title: string;
  story: string;
  date: string; // ISO date string
  category: string;
  tags: string[];
  keyMoments: string[];
  linkedTacticId?: string;
  createdAt: string;
  updatedAt: string;
}

export const STORY_CATEGORIES = [
  { value: 'personal', label: 'Personal', color: 'blue' },
  { value: 'work', label: 'Work', color: 'amber' },
  { value: 'presentation', label: 'Presentation', color: 'purple' },
  { value: 'anecdote', label: 'Anecdote', color: 'pink' },
  { value: 'lesson-learned', label: 'Lesson Learned', color: 'teal' },
  { value: 'inspiration', label: 'Inspiration', color: 'orange' },
] as const;