export interface PersonalStory {
  id: string;
  title: string;
  story: string;
  date: string; // ISO date string
  tags: string[];
  keyMoments: string[];
  linkedTacticId?: string;
  createdAt: string;
  updatedAt: string;
}