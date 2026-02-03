// Storyteller Tactics Types
export type TacticCategory = 
  | 'concept' 
  | 'explore' 
  | 'character' 
  | 'function' 
  | 'structure' 
  | 'style' 
  | 'organize' 
  | 'recipe'
  | 'beat';

export interface FrameworkSection {
  label: string;
  description: string;
}

export interface TacticFramework {
  name: string;
  sections: FrameworkSection[];
}

export interface TacticExampleStory {
  title: string;
  story: string;
}

export interface StorytellerTactic {
  id: string;
  name: string;
  category: TacticCategory;
  description: string;
  whenToUse: string[];
  steps: string[];
  examples?: string[];
  relatedTactics?: string[];
  keywords: string[];
  conversationTypes: string[]; // Which event types this works for
  icon?: string;
  framework?: TacticFramework;
  exampleStory?: TacticExampleStory;
}

export interface TacticCategoryInfo {
  id: TacticCategory;
  label: string;
  description: string;
  color: string;
}

export const TACTIC_CATEGORIES: TacticCategoryInfo[] = [
  {
    id: 'concept',
    label: 'Concept',
    description: 'Frame your work as an epic adventure',
    color: 'indigo',
  },
  {
    id: 'explore',
    label: 'Explore',
    description: 'Make a map for your way ahead',
    color: 'cyan',
  },
  {
    id: 'character',
    label: 'Character',
    description: 'Show us why we can trust you',
    color: 'amber',
  },
  {
    id: 'function',
    label: 'Function',
    description: 'Put your stories to work',
    color: 'green',
  },
  {
    id: 'structure',
    label: 'Structure',
    description: 'Make your ideas flow in a story-ish way',
    color: 'purple',
  },
  {
    id: 'style',
    label: 'Style',
    description: 'Make sure people remember your story',
    color: 'rose',
  },
  {
    id: 'organize',
    label: 'Organize',
    description: 'Plan how you should tell your story',
    color: 'orange',
  },
  {
    id: 'recipe',
    label: 'Recipe',
    description: 'Combine tactics to solve common problems',
    color: 'teal',
  },
  {
    id: 'beat',
    label: 'Beats',
    description: 'Critical turning points that transform your narrative',
    color: 'slate',
  },
];
