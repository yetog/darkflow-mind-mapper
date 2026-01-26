// Speech Analysis Engine for ConvoFlow

import { 
  SpeechAnalysis, 
  SpeechMetrics, 
  PaceMetric, 
  FillerMetric, 
  EnergyMetric,
  PausingMetric,
  ConcisenessMetric,
  ConfidenceMetric,
  Suggestion,
  Highlight,
  FillerWordInstance 
} from '@/types/speech-analysis';
import { countWords, countSentences } from './transcription';

// Common filler words to detect
const FILLER_WORDS = [
  'um', 'uh', 'uhh', 'umm', 'er', 'ah', 'ahh',
  'like', 'you know', 'basically', 'actually', 'literally',
  'so', 'right', 'okay', 'well', 'I mean',
  'kind of', 'sort of', 'stuff', 'things', 'whatever',
];

// Analyze a speech recording and return metrics
export function analyzeSpeech(
  transcript: string,
  durationSeconds: number,
  audioLevel?: number
): SpeechAnalysis {
  const wordCount = countWords(transcript);
  
  const metrics: SpeechMetrics = {
    pace: analyzePace(transcript, durationSeconds),
    fillerWords: analyzeFillerWords(transcript),
    energy: analyzeEnergy(audioLevel),
    pausing: analyzePausing(transcript, durationSeconds),
    conciseness: analyzeConciseness(transcript),
    confidence: analyzeConfidence(transcript, audioLevel),
  };

  const overallScore = calculateOverallScore(metrics);
  const suggestions = generateSuggestions(metrics);
  const highlights = generateHighlights(metrics);

  return {
    id: `analysis-${Date.now()}`,
    recordingId: '',
    duration: durationSeconds,
    transcript,
    wordCount,
    metrics,
    overallScore,
    suggestions,
    highlights,
    createdAt: new Date(),
  };
}

function analyzePace(transcript: string, durationSeconds: number): PaceMetric {
  const wordCount = countWords(transcript);
  const minutes = durationSeconds / 60;
  const wpm = minutes > 0 ? Math.round(wordCount / minutes) : 0;
  
  const idealRange: [number, number] = [120, 150];
  
  let variation: PaceMetric['variation'];
  let score: number;
  
  if (wpm < 100) {
    variation = 'too-slow';
    score = Math.max(0, 50 + (wpm - 60) * 1.25); // 60 WPM = 50, 100 WPM = 100
  } else if (wpm > 180) {
    variation = 'too-fast';
    score = Math.max(0, 100 - (wpm - 180) * 0.5);
  } else if (wpm >= idealRange[0] && wpm <= idealRange[1]) {
    variation = 'good';
    score = 100;
  } else {
    variation = 'good'; // Within acceptable range
    score = 85;
  }

  return { wordsPerMinute: wpm, idealRange, variation, score: Math.round(score) };
}

function analyzeFillerWords(transcript: string): FillerMetric {
  const lowerTranscript = transcript.toLowerCase();
  const wordCount = countWords(transcript);
  
  const words: FillerWordInstance[] = [];
  let totalCount = 0;

  for (const filler of FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = lowerTranscript.match(regex);
    const count = matches?.length || 0;
    
    if (count > 0) {
      words.push({ word: filler, count, timestamps: [] });
      totalCount += count;
    }
  }

  // Sort by count descending
  words.sort((a, b) => b.count - a.count);

  const percentageOfSpeech = wordCount > 0 ? (totalCount / wordCount) * 100 : 0;
  
  // Score: fewer fillers = higher score
  // 0% fillers = 100, 10%+ fillers = 0
  const score = Math.max(0, Math.round(100 - percentageOfSpeech * 10));

  return { count: totalCount, words, percentageOfSpeech, score };
}

function analyzeEnergy(audioLevel?: number): EnergyMetric {
  // Without actual audio analysis, provide estimates
  const level = audioLevel !== undefined ? audioLevel : 0.5;
  
  let energyLevel: EnergyMetric['level'];
  if (level < 0.3) {
    energyLevel = 'low';
  } else if (level < 0.6) {
    energyLevel = 'moderate';
  } else if (level < 0.8) {
    energyLevel = 'high';
  } else {
    energyLevel = 'varied';
  }

  // Score based on having good, moderate energy
  const score = level >= 0.4 && level <= 0.7 ? 90 : level >= 0.3 ? 75 : 50;

  return {
    level: energyLevel,
    averageVolume: level,
    volumeVariation: 0.2, // Placeholder
    score,
  };
}

function analyzePausing(transcript: string, durationSeconds: number): PausingMetric {
  // Estimate pausing from transcript patterns
  const sentences = countSentences(transcript);
  const wordCount = countWords(transcript);
  
  // Assume strategic pauses at sentence breaks
  const strategicPauses = sentences;
  
  // Estimate awkward pauses (would need audio analysis for accuracy)
  const wordsPerSecond = wordCount / durationSeconds;
  const expectedWordsPerSecond = 2.5; // ~150 WPM
  
  // If speaking slower than expected, might have awkward pauses
  const awkwardPauses = wordsPerSecond < expectedWordsPerSecond * 0.7 ? 
    Math.floor((expectedWordsPerSecond - wordsPerSecond) * durationSeconds / 10) : 0;

  const averagePauseDuration = durationSeconds > 0 ? 
    (durationSeconds - (wordCount / 2.5)) / (strategicPauses + awkwardPauses + 1) : 0;

  // Score based on balance of pauses
  const score = awkwardPauses === 0 ? 90 : Math.max(50, 90 - awkwardPauses * 10);

  return {
    strategicPauses,
    awkwardPauses,
    averagePauseDuration: Math.max(0, averagePauseDuration),
    score,
  };
}

function analyzeConciseness(transcript: string): ConcisenessMetric {
  const wordCount = countWords(transcript);
  const sentences = countSentences(transcript);
  const words = transcript.toLowerCase().match(/\b\w+\b/g) || [];
  const uniqueWords = new Set(words).size;
  
  const averageSentenceLength = sentences > 0 ? wordCount / sentences : 0;
  
  // Check for redundant phrases
  const redundantPatterns = [
    /\b(very|really|actually|basically)\s+(very|really)\b/gi,
    /\b(in order to)\b/gi,
    /\b(at this point in time)\b/gi,
    /\b(due to the fact that)\b/gi,
  ];
  
  const redundantPhrases: string[] = [];
  for (const pattern of redundantPatterns) {
    const matches = transcript.match(pattern);
    if (matches) {
      redundantPhrases.push(...matches);
    }
  }

  // Score based on conciseness metrics
  // Ideal sentence length is 15-20 words
  let score = 80;
  if (averageSentenceLength > 25) score -= 15;
  if (averageSentenceLength < 10) score -= 10;
  score -= redundantPhrases.length * 5;
  
  // Vocabulary variety bonus
  const varietyRatio = wordCount > 0 ? uniqueWords / wordCount : 0;
  if (varietyRatio > 0.6) score += 10;

  return {
    wordCount,
    uniqueWords,
    averageSentenceLength: Math.round(averageSentenceLength),
    redundantPhrases,
    score: Math.max(0, Math.min(100, score)),
  };
}

function analyzeConfidence(transcript: string, audioLevel?: number): ConfidenceMetric {
  // Analyze confidence markers in speech
  const lowerTranscript = transcript.toLowerCase();
  
  // Count hedging phrases (indicate low confidence)
  const hedgingPhrases = [
    'i think', 'maybe', 'perhaps', 'i guess', 'kind of', 'sort of',
    'i\'m not sure', 'possibly', 'might be', 'could be',
  ];
  
  let hesitations = 0;
  for (const phrase of hedgingPhrases) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    const matches = lowerTranscript.match(regex);
    hesitations += matches?.length || 0;
  }

  const wordCount = countWords(transcript);
  const hesitationRatio = wordCount > 0 ? hesitations / wordCount : 0;
  
  let assertiveness: ConfidenceMetric['assertiveness'];
  if (hesitationRatio < 0.02) {
    assertiveness = 'high';
  } else if (hesitationRatio < 0.05) {
    assertiveness = 'moderate';
  } else {
    assertiveness = 'low';
  }

  // Voice stability based on audio level (placeholder)
  const voiceStability = audioLevel !== undefined ? 
    Math.min(1, audioLevel + 0.3) : 0.7;

  // Calculate score
  let score = 80;
  score -= hesitations * 3;
  score += voiceStability * 20;
  
  return {
    voiceStability,
    assertiveness,
    hesitations,
    score: Math.max(0, Math.min(100, Math.round(score))),
  };
}

function calculateOverallScore(metrics: SpeechMetrics): number {
  const weights = {
    pace: 0.2,
    fillerWords: 0.2,
    energy: 0.15,
    pausing: 0.1,
    conciseness: 0.15,
    confidence: 0.2,
  };

  let weightedSum = 0;
  for (const [key, weight] of Object.entries(weights)) {
    weightedSum += metrics[key as keyof SpeechMetrics].score * weight;
  }

  return Math.round(weightedSum);
}

function generateSuggestions(metrics: SpeechMetrics): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Pace suggestions
  if (metrics.pace.variation === 'too-fast') {
    suggestions.push({
      metric: 'pace',
      priority: 'high',
      title: 'Slow Down Your Pace',
      description: `You're speaking at ${metrics.pace.wordsPerMinute} WPM. Try to aim for 120-150 WPM for better clarity.`,
      exercise: 'Practice reading a passage while consciously slowing down. Use a metronome app to maintain rhythm.',
    });
  } else if (metrics.pace.variation === 'too-slow') {
    suggestions.push({
      metric: 'pace',
      priority: 'medium',
      title: 'Pick Up the Pace',
      description: `Your pace of ${metrics.pace.wordsPerMinute} WPM might lose audience attention. Aim for 120-150 WPM.`,
      exercise: 'Practice speaking with more energy and enthusiasm. Record yourself and compare.',
    });
  }

  // Filler word suggestions
  if (metrics.fillerWords.count > 5) {
    const topFillers = metrics.fillerWords.words.slice(0, 3).map(w => `"${w.word}"`).join(', ');
    suggestions.push({
      metric: 'fillerWords',
      priority: metrics.fillerWords.count > 10 ? 'high' : 'medium',
      title: 'Reduce Filler Words',
      description: `You used filler words ${metrics.fillerWords.count} times. Most common: ${topFillers}.`,
      exercise: 'Practice pausing silently instead of using filler words. Embrace the pause!',
    });
  }

  // Energy suggestions
  if (metrics.energy.level === 'low') {
    suggestions.push({
      metric: 'energy',
      priority: 'medium',
      title: 'Increase Your Energy',
      description: 'Your energy level seems low. Try to project more enthusiasm in your voice.',
      exercise: 'Before speaking, do some light physical movement. Smile while speaking - it affects your voice!',
    });
  }

  // Confidence suggestions
  if (metrics.confidence.assertiveness === 'low') {
    suggestions.push({
      metric: 'confidence',
      priority: 'high',
      title: 'Speak with More Confidence',
      description: `You used ${metrics.confidence.hesitations} hedging phrases. Be more direct and assertive.`,
      exercise: 'Replace "I think" with "I believe" or simply state facts directly.',
    });
  }

  // Conciseness suggestions
  if (metrics.conciseness.averageSentenceLength > 25) {
    suggestions.push({
      metric: 'conciseness',
      priority: 'medium',
      title: 'Shorten Your Sentences',
      description: 'Your sentences average over 25 words. Shorter sentences are easier to follow.',
      exercise: 'Practice delivering key points in 10-15 word sentences.',
    });
  }

  return suggestions;
}

function generateHighlights(metrics: SpeechMetrics): Highlight[] {
  const highlights: Highlight[] = [];

  // Add strengths
  if (metrics.pace.score >= 85) {
    highlights.push({
      type: 'strength',
      text: `Great pacing at ${metrics.pace.wordsPerMinute} WPM - clear and easy to follow`,
    });
  }

  if (metrics.fillerWords.score >= 90) {
    highlights.push({
      type: 'strength',
      text: 'Excellent control over filler words - very polished delivery',
    });
  }

  if (metrics.confidence.assertiveness === 'high') {
    highlights.push({
      type: 'strength',
      text: 'Strong, confident delivery - you sound authoritative',
    });
  }

  // Add areas for improvement
  if (metrics.fillerWords.words.length > 0) {
    highlights.push({
      type: 'improvement',
      text: `Watch out for "${metrics.fillerWords.words[0].word}" - you used it ${metrics.fillerWords.words[0].count} times`,
    });
  }

  return highlights;
}

// Export utility for getting score color
export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-amber-500';
  return 'text-red-500';
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Great';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 50) return 'Needs Work';
  return 'Keep Practicing';
}
