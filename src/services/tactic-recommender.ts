// Tactic Recommendation Engine
// Scores and recommends tactics based on conversation type, audience, and goals

import { StorytellerTactic } from '@/types/tactics';
import { ConversationType, AudienceProfile } from '@/types/conversation';
import { STORYTELLER_TACTICS } from '@/data/storyteller-tactics';

export interface RecommendationInput {
  conversationType: ConversationType;
  audience?: AudienceProfile;
  goals?: string[];
  duration?: number; // in minutes
}

export interface ScoredTactic {
  tactic: StorytellerTactic;
  score: number;
  matchReasons: string[];
}

// Tactic scoring weights for different conversation types
const CONVERSATION_TYPE_WEIGHTS: Record<ConversationType, Record<string, number>> = {
  gathering: {
    concept: 0.3, explore: 0.4, character: 0.9, function: 0.7,
    structure: 0.3, style: 0.5, organize: 0.2, recipe: 0.4, beat: 0.3,
  },
  meeting: {
    concept: 0.6, explore: 0.8, character: 0.5, function: 0.9,
    structure: 0.7, style: 0.4, organize: 0.8, recipe: 0.6, beat: 0.5,
  },
  presentation: {
    concept: 0.9, explore: 0.5, character: 0.7, function: 0.8,
    structure: 0.95, style: 0.9, organize: 0.7, recipe: 0.8, beat: 0.9,
  },
  panel: {
    concept: 0.7, explore: 0.6, character: 0.8, function: 0.6,
    structure: 0.6, style: 0.7, organize: 0.5, recipe: 0.5, beat: 0.6,
  },
  lesson: {
    concept: 0.6, explore: 0.9, character: 0.7, function: 0.7,
    structure: 0.8, style: 0.6, organize: 0.6, recipe: 0.9, beat: 0.7,
  },
};

// Audience size preferences (which categories work better)
const AUDIENCE_SIZE_WEIGHTS: Record<string, Record<string, number>> = {
  individual: {
    concept: 0.4, explore: 0.9, character: 0.8, function: 0.7,
    structure: 0.5, style: 0.4, organize: 0.6, recipe: 0.6, beat: 0.5,
  },
  small: {
    concept: 0.6, explore: 0.7, character: 0.7, function: 0.8,
    structure: 0.7, style: 0.6, organize: 0.7, recipe: 0.7, beat: 0.6,
  },
  medium: {
    concept: 0.8, explore: 0.5, character: 0.6, function: 0.7,
    structure: 0.8, style: 0.8, organize: 0.6, recipe: 0.7, beat: 0.8,
  },
  large: {
    concept: 0.9, explore: 0.4, character: 0.5, function: 0.6,
    structure: 0.9, style: 0.9, organize: 0.5, recipe: 0.6, beat: 0.9,
  },
};

// Goal-based keyword matching
const GOAL_KEYWORDS: Record<string, string[]> = {
  persuade: ['pitch', 'sales', 'convince', 'trust', 'credibility', 'persuasion'],
  inform: ['data', 'research', 'evidence', 'clarity', 'explanation', 'teach'],
  inspire: ['vision', 'goals', 'epic', 'motivation', 'change', 'transformation'],
  connect: ['empathy', 'connection', 'shared', 'universal', 'icebreaker'],
  entertain: ['humor', 'story', 'narrative', 'engaging', 'memorable'],
  teach: ['lesson', 'learning', 'steps', 'guide', 'workshop'],
};

// Expertise level weights
const EXPERTISE_WEIGHTS: Record<string, Record<string, number>> = {
  novice: {
    concept: 0.5, explore: 0.6, character: 0.7, function: 0.8,
    structure: 0.9, style: 0.5, organize: 0.7, recipe: 0.9, beat: 0.6,
  },
  intermediate: {
    concept: 0.7, explore: 0.7, character: 0.6, function: 0.7,
    structure: 0.7, style: 0.7, organize: 0.7, recipe: 0.7, beat: 0.7,
  },
  expert: {
    concept: 0.9, explore: 0.8, character: 0.5, function: 0.6,
    structure: 0.6, style: 0.8, organize: 0.5, recipe: 0.5, beat: 0.8,
  },
  mixed: {
    concept: 0.7, explore: 0.7, character: 0.6, function: 0.7,
    structure: 0.8, style: 0.6, organize: 0.7, recipe: 0.8, beat: 0.7,
  },
};

// Duration recommendations (short favors simple, long favors complex)
function getDurationWeight(tactic: StorytellerTactic, duration?: number): number {
  if (!duration) return 1;
  
  const stepCount = tactic.steps.length;
  
  if (duration <= 5) {
    // Very short: favor simple tactics (1-3 steps)
    return stepCount <= 3 ? 1 : Math.max(0.5, 1 - (stepCount - 3) * 0.1);
  } else if (duration <= 15) {
    // Medium: balanced
    return stepCount <= 5 ? 1 : 0.9;
  } else {
    // Long: can handle complex tactics
    return stepCount >= 4 ? 1 : 0.8;
  }
}

// Calculate goal match score
function getGoalScore(tactic: StorytellerTactic, goals?: string[]): { score: number; reasons: string[] } {
  if (!goals || goals.length === 0) return { score: 1, reasons: [] };
  
  const reasons: string[] = [];
  let totalScore = 0;
  
  for (const goal of goals) {
    const goalLower = goal.toLowerCase();
    const keywords = GOAL_KEYWORDS[goalLower] || [goalLower];
    
    const matchedKeywords = tactic.keywords.filter(kw => 
      keywords.some(gk => kw.toLowerCase().includes(gk) || gk.includes(kw.toLowerCase()))
    );
    
    if (matchedKeywords.length > 0) {
      totalScore += matchedKeywords.length / keywords.length;
      reasons.push(`Matches "${goal}" goal`);
    }
  }
  
  return { 
    score: goals.length > 0 ? totalScore / goals.length : 1,
    reasons 
  };
}

export function getRecommendedTactics(
  input: RecommendationInput,
  allTactics: StorytellerTactic[] = STORYTELLER_TACTICS,
  limit: number = 10
): ScoredTactic[] {
  const { conversationType, audience, goals, duration } = input;
  
  const scoredTactics: ScoredTactic[] = allTactics.map(tactic => {
    const matchReasons: string[] = [];
    
    // 1. Conversation type match (30% weight)
    const typeWeight = CONVERSATION_TYPE_WEIGHTS[conversationType]?.[tactic.category] || 0.5;
    const typeScore = typeWeight * 0.3;
    
    // Check if tactic explicitly supports this conversation type
    if (tactic.conversationTypes.includes(conversationType)) {
      matchReasons.push(`Designed for ${conversationType}s`);
    }
    
    // 2. Audience match (25% weight)
    let audienceScore = 0.25;
    if (audience) {
      const sizeWeight = AUDIENCE_SIZE_WEIGHTS[audience.size]?.[tactic.category] || 0.5;
      const expertiseWeight = EXPERTISE_WEIGHTS[audience.expertise]?.[tactic.category] || 0.5;
      audienceScore = ((sizeWeight + expertiseWeight) / 2) * 0.25;
      
      if (sizeWeight > 0.7) {
        matchReasons.push(`Great for ${audience.size} groups`);
      }
      if (audience.mood === 'skeptical' && tactic.keywords.some(k => 
        ['trust', 'credibility', 'evidence', 'proof'].includes(k.toLowerCase())
      )) {
        audienceScore += 0.05;
        matchReasons.push('Builds trust with skeptical audiences');
      }
    }
    
    // 3. Goal alignment (25% weight)
    const goalResult = getGoalScore(tactic, goals);
    const goalScore = goalResult.score * 0.25;
    matchReasons.push(...goalResult.reasons);
    
    // 4. Duration appropriateness (20% weight)
    const durationWeight = getDurationWeight(tactic, duration);
    const durationScore = durationWeight * 0.2;
    if (durationWeight === 1 && duration) {
      matchReasons.push(`Fits ${duration}-minute format`);
    }
    
    const totalScore = typeScore + audienceScore + goalScore + durationScore;
    
    return {
      tactic,
      score: Math.round(totalScore * 100),
      matchReasons: matchReasons.slice(0, 3), // Top 3 reasons
    };
  });
  
  // Sort by score descending and return top results
  return scoredTactics
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Get quick recommendations based on just conversation type
export function getQuickRecommendations(
  conversationType: ConversationType,
  limit: number = 6
): StorytellerTactic[] {
  return getRecommendedTactics({ conversationType }, STORYTELLER_TACTICS, limit)
    .map(st => st.tactic);
}

// Get tactic comparison data
export function compareTactics(tactic1: StorytellerTactic, tactic2: StorytellerTactic) {
  return {
    stepDifference: tactic1.steps.length - tactic2.steps.length,
    sharedKeywords: tactic1.keywords.filter(k => tactic2.keywords.includes(k)),
    sharedConversationTypes: tactic1.conversationTypes.filter(t => 
      tactic2.conversationTypes.includes(t)
    ),
    categorySame: tactic1.category === tactic2.category,
  };
}
