// Progress Tracking Types for ConvoFlow Speech Coaching

import { SpeechMetrics, SpeechAnalysis } from './speech-analysis';

export interface UserProgress {
  userId: string;
  totalPracticeTime: number; // minutes
  speechesAnalyzed: number;
  currentStreak: number; // days
  longestStreak: number;
  lastPracticeDate: Date | null;
  metricHistory: MetricSnapshot[];
  lessonProgress: LessonProgress[];
  achievements: Achievement[];
  level: UserLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricSnapshot {
  date: Date;
  overallScore: number;
  metrics: Partial<Record<keyof SpeechMetrics, number>>;
  speechId: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  score?: number;
  attempts: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: AchievementCategory;
}

export type AchievementCategory = 
  | 'streak'
  | 'practice'
  | 'improvement'
  | 'milestone'
  | 'mastery';

export interface UserLevel {
  current: number;
  title: string;
  xp: number;
  xpToNextLevel: number;
}

export const USER_LEVELS = [
  { level: 1, title: 'Novice Speaker', xpRequired: 0 },
  { level: 2, title: 'Emerging Voice', xpRequired: 100 },
  { level: 3, title: 'Confident Communicator', xpRequired: 300 },
  { level: 4, title: 'Skilled Presenter', xpRequired: 600 },
  { level: 5, title: 'Dynamic Orator', xpRequired: 1000 },
  { level: 6, title: 'Master Speaker', xpRequired: 1500 },
  { level: 7, title: 'Public Speaking Pro', xpRequired: 2500 },
  { level: 8, title: 'Communication Expert', xpRequired: 4000 },
  { level: 9, title: 'Legendary Presenter', xpRequired: 6000 },
  { level: 10, title: 'Speech Virtuoso', xpRequired: 10000 },
] as const;

export interface ProgressInsight {
  type: 'improvement' | 'streak' | 'tip' | 'milestone';
  title: string;
  description: string;
  metric?: keyof SpeechMetrics;
  percentageChange?: number;
}

export interface DailyGoal {
  practiceMinutes: number;
  targetMinutes: number;
  lessonsCompleted: number;
  targetLessons: number;
  completed: boolean;
}
