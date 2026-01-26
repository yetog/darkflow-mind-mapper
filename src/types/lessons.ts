// Lesson Types for ConvoFlow Speech Coaching

import { SpeechMetrics } from './speech-analysis';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: LessonDifficulty;
  duration: number; // minutes
  exercises: Exercise[];
  targetMetrics: (keyof SpeechMetrics)[];
  prerequisites?: string[];
  icon: string;
  color: string;
}

export type LessonCategory = 
  | 'confidence'
  | 'clarity'
  | 'pace'
  | 'engagement'
  | 'structure'
  | 'filler-words'
  | 'energy';

export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  instruction: string;
  prompt?: string;
  targetDuration?: number; // seconds
  evaluationCriteria?: string[];
  tips?: string[];
}

export type ExerciseType = 
  | 'prompt'           // Speak on a given topic
  | 'repeat-after'     // Listen and repeat
  | 'timed-speech'     // Speak for exact duration
  | 'impromptu'        // Random topic, think fast
  | 'reading'          // Read a passage
  | 'breathing'        // Breathing exercise (no speech)
  | 'articulation';    // Tongue twisters, pronunciation

export interface LessonCourse {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  lessons: Lesson[];
  estimatedDuration: number; // total minutes
  icon: string;
}

export interface DailyChallenge {
  id: string;
  date: Date;
  title: string;
  exercise: Exercise;
  reward: {
    xp: number;
    badge?: string;
  };
}

export const LESSON_CATEGORIES: Record<LessonCategory, { label: string; description: string; color: string }> = {
  confidence: {
    label: 'Confidence',
    description: 'Build vocal presence and assertiveness',
    color: 'amber',
  },
  clarity: {
    label: 'Clarity',
    description: 'Speak with precision and purpose',
    color: 'blue',
  },
  pace: {
    label: 'Pace Control',
    description: 'Master speed and rhythm',
    color: 'purple',
  },
  engagement: {
    label: 'Engagement',
    description: 'Captivate your audience',
    color: 'pink',
  },
  structure: {
    label: 'Structure',
    description: 'Organize thoughts effectively',
    color: 'teal',
  },
  'filler-words': {
    label: 'Filler Words',
    description: 'Eliminate ums and ahs',
    color: 'red',
  },
  energy: {
    label: 'Energy',
    description: 'Project enthusiasm and passion',
    color: 'orange',
  },
};
