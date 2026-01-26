// Speech Analysis Types for ConvoFlow Speech Coaching

export interface SpeechMetrics {
  pace: PaceMetric;
  fillerWords: FillerMetric;
  energy: EnergyMetric;
  pausing: PausingMetric;
  conciseness: ConcisenessMetric;
  confidence: ConfidenceMetric;
}

export interface PaceMetric {
  wordsPerMinute: number;
  idealRange: [number, number]; // 120-150 WPM is ideal
  variation: 'too-fast' | 'too-slow' | 'good' | 'monotone';
  score: number; // 0-100
}

export interface FillerMetric {
  count: number;
  words: FillerWordInstance[];
  percentageOfSpeech: number;
  score: number; // 0-100
}

export interface FillerWordInstance {
  word: string;
  count: number;
  timestamps: number[];
}

export interface EnergyMetric {
  level: 'low' | 'moderate' | 'high' | 'varied';
  averageVolume: number;
  volumeVariation: number;
  score: number; // 0-100
}

export interface PausingMetric {
  strategicPauses: number;
  awkwardPauses: number;
  averagePauseDuration: number;
  score: number; // 0-100
}

export interface ConcisenessMetric {
  wordCount: number;
  uniqueWords: number;
  averageSentenceLength: number;
  redundantPhrases: string[];
  score: number; // 0-100
}

export interface ConfidenceMetric {
  voiceStability: number;
  assertiveness: 'low' | 'moderate' | 'high';
  hesitations: number;
  score: number; // 0-100
}

export interface SpeechAnalysis {
  id: string;
  recordingId: string;
  duration: number; // seconds
  transcript: string;
  wordCount: number;
  metrics: SpeechMetrics;
  overallScore: number; // 0-100
  suggestions: Suggestion[];
  highlights: Highlight[];
  createdAt: Date;
}

export interface Suggestion {
  metric: keyof SpeechMetrics;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  exercise?: string;
}

export interface Highlight {
  type: 'strength' | 'improvement';
  text: string;
  timestamp?: number;
}

export interface Recording {
  id: string;
  title: string;
  audioBlob?: Blob;
  audioUrl?: string;
  duration: number;
  transcript: string;
  analysis?: SpeechAnalysis;
  createdAt: Date;
}

export type RecordingState = 'idle' | 'recording' | 'paused' | 'processing' | 'complete';

export interface RecordingSession {
  state: RecordingState;
  duration: number;
  transcript: string;
  audioLevel: number;
}
