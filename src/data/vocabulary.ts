// Vocabulary & Talking Points System
// Imported from provided CSV with situational categorization

import { IconName } from '@/components/ui/dynamic-icon';

export type VocabCategory = 'business' | 'casual' | 'persuasion' | 'emotional' | 'humor';
export type VocabSituation = 
  | 'frustration' 
  | 'encouragement' 
  | 'agreement' 
  | 'disagreement' 
  | 'transition' 
  | 'emphasis' 
  | 'casual' 
  | 'professional'
  | 'emotional';

export interface VocabPhrase {
  id: string;
  phrase: string;
  meaning: string;
  example: string;
  situation: VocabSituation;
  category: VocabCategory;
  iconName: IconName;
}

export const VOCAB_CATEGORIES: { id: VocabCategory; label: string; description: string; color: string }[] = [
  { id: 'business', label: 'Business', description: 'Professional workplace phrases', color: 'blue' },
  { id: 'casual', label: 'Casual', description: 'Everyday conversational phrases', color: 'green' },
  { id: 'persuasion', label: 'Persuasion', description: 'Phrases to influence and convince', color: 'purple' },
  { id: 'emotional', label: 'Emotional', description: 'Express feelings and reactions', color: 'rose' },
  { id: 'humor', label: 'Humor', description: 'Light-hearted and witty phrases', color: 'amber' },
];

export const VOCABULARY_PHRASES: VocabPhrase[] = [
  {
    id: 'tear-hair-out',
    phrase: 'Tear my hair out',
    meaning: 'To be extremely frustrated, worried, or anxious about something',
    example: "I've been tearing my hair out trying to figure out this budget problem.",
    situation: 'frustration',
    category: 'emotional',
    iconName: 'Frown',
  },
  {
    id: 'ear-to-the-ground',
    phrase: 'Ear to the ground',
    meaning: 'To pay attention to what is happening around you, especially in business or politics',
    example: "Keep your ear to the ground for any new developments in the market.",
    situation: 'professional',
    category: 'business',
    iconName: 'Ear',
  },
  {
    id: 'put-pin-in-it',
    phrase: 'Put a pin in it',
    meaning: 'To temporarily stop discussing something with the intention of returning to it later',
    example: "Let's put a pin in that idea and come back to it after lunch.",
    situation: 'professional',
    category: 'business',
    iconName: 'Pin',
  },
  {
    id: 'up-to-neck',
    phrase: 'Up to my neck',
    meaning: 'Deeply involved in or overwhelmed by something',
    example: "I'm up to my neck in work this week, can we reschedule?",
    situation: 'frustration',
    category: 'business',
    iconName: 'AlertTriangle',
  },
  {
    id: 'pour-heart-out',
    phrase: 'Pour your heart out',
    meaning: 'To express your deepest feelings or emotions openly',
    example: "She poured her heart out during the presentation about her journey.",
    situation: 'emotional',
    category: 'emotional',
    iconName: 'Heart',
  },
  {
    id: 'keep-chin-up',
    phrase: 'Keep your chin up',
    meaning: 'To remain cheerful in difficult situations; stay positive',
    example: "I know the project failed, but keep your chin up—we learned a lot.",
    situation: 'encouragement',
    category: 'emotional',
    iconName: 'Smile',
  },
  {
    id: 'pity-party',
    phrase: 'Pity party',
    meaning: 'An occasion for expressing self-pity or feeling sorry for oneself',
    example: "Enough with the pity party—let's focus on solutions.",
    situation: 'casual',
    category: 'humor',
    iconName: 'PartyPopper',
  },
  {
    id: 'stab-in-dark',
    phrase: 'A stab in the dark',
    meaning: 'A guess made without much information or certainty',
    example: "This is a stab in the dark, but I think we should try the new approach.",
    situation: 'casual',
    category: 'casual',
    iconName: 'Target',
  },
  {
    id: 'egg-on-face',
    phrase: 'Egg on your face',
    meaning: 'To be embarrassed because of something you did or said',
    example: "He had egg on his face after presenting the wrong data.",
    situation: 'casual',
    category: 'humor',
    iconName: 'Egg',
  },
  {
    id: 'shoot-from-hip',
    phrase: 'Shoot from the hip',
    meaning: 'To speak or act without careful thought or preparation',
    example: "I'm going to shoot from the hip here—I think we need to pivot.",
    situation: 'casual',
    category: 'casual',
    iconName: 'Crosshair',
  },
  {
    id: 'eat-for-breakfast',
    phrase: 'Eat _____ for breakfast',
    meaning: 'To handle something easily because of experience or skill',
    example: "Complex negotiations? I eat those for breakfast.",
    situation: 'emphasis',
    category: 'persuasion',
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'hard-pill-to-swallow',
    phrase: 'A hard pill to swallow',
    meaning: 'Something difficult to accept or deal with',
    example: "The budget cuts are a hard pill to swallow, but necessary.",
    situation: 'disagreement',
    category: 'emotional',
    iconName: 'Pill',
  },
  {
    id: 'once-in-blue-moon',
    phrase: 'Once in a blue moon',
    meaning: 'Very rarely; almost never',
    example: "We only get opportunities like this once in a blue moon.",
    situation: 'emphasis',
    category: 'casual',
    iconName: 'Moon',
  },
  {
    id: 'pig-out',
    phrase: 'Pig out',
    meaning: 'To eat a large amount of food, usually in a greedy way',
    example: "After the presentation, let's pig out at that new restaurant.",
    situation: 'casual',
    category: 'humor',
    iconName: 'Pizza',
  },
  {
    id: 'want-cookie',
    phrase: 'Do you want a cookie?',
    meaning: 'Sarcastic response when someone expects praise for something ordinary',
    example: '"I finished my report on time." "Do you want a cookie?"',
    situation: 'casual',
    category: 'humor',
    iconName: 'Cookie',
  },
  {
    id: 'go-bananas',
    phrase: 'Go bananas',
    meaning: 'To become very excited, crazy, or angry',
    example: "The team went bananas when we hit our quarterly target.",
    situation: 'emotional',
    category: 'casual',
    iconName: 'Banana',
  },
  {
    id: 'chew-the-fat',
    phrase: 'Chew the fat',
    meaning: 'To have a long, friendly conversation',
    example: "We spent an hour just chewing the fat about the industry.",
    situation: 'casual',
    category: 'casual',
    iconName: 'MessageSquare',
  },
  {
    id: 'bend-over-backwards',
    phrase: 'Bend over backwards',
    meaning: 'To make a great effort to do something, especially to help someone',
    example: "We bent over backwards to accommodate their timeline.",
    situation: 'emphasis',
    category: 'business',
    iconName: 'Stretch',
  },
  {
    id: 'jump-on-bandwagon',
    phrase: 'Jump on the bandwagon',
    meaning: 'To join others in doing something that is currently popular or successful',
    example: "Everyone is jumping on the AI bandwagon these days.",
    situation: 'casual',
    category: 'persuasion',
    iconName: 'TrendingUp',
  },
  {
    id: 'cold-shoulder',
    phrase: 'Cold shoulder',
    meaning: 'To deliberately ignore or be unfriendly to someone',
    example: "After the disagreement, he gave me the cold shoulder.",
    situation: 'disagreement',
    category: 'emotional',
    iconName: 'Snowflake',
  },
  {
    id: 'finger-in-every-pie',
    phrase: 'Have a finger in every pie',
    meaning: 'To be involved in many different activities or have influence in many areas',
    example: "She has a finger in every pie—marketing, sales, and operations.",
    situation: 'professional',
    category: 'business',
    iconName: 'Slice',
  },
  {
    id: 'back-to-square-one',
    phrase: 'Back to square one',
    meaning: 'To return to the beginning after a failure',
    example: "The prototype failed, so we're back to square one.",
    situation: 'frustration',
    category: 'business',
    iconName: 'RotateCcw',
  },
  {
    id: 'barking-up-wrong-tree',
    phrase: 'Barking up the wrong tree',
    meaning: 'To pursue a mistaken or misguided approach',
    example: "If you think I approved that budget, you're barking up the wrong tree.",
    situation: 'disagreement',
    category: 'casual',
    iconName: 'TreePine',
  },
  {
    id: 'butterflies-in-stomach',
    phrase: 'Butterflies in my stomach',
    meaning: 'Feeling nervous or anxious, especially before an important event',
    example: "I always get butterflies in my stomach before a big presentation.",
    situation: 'emotional',
    category: 'emotional',
    iconName: 'Bug',
  },
  {
    id: 'cut-to-chase',
    phrase: 'Cut to the chase',
    meaning: 'To get to the point without wasting time',
    example: "Let's cut to the chase—what's the bottom line?",
    situation: 'transition',
    category: 'business',
    iconName: 'Scissors',
  },
  {
    id: 'ball-in-your-court',
    phrase: "The ball is in your court",
    meaning: 'It is now your responsibility to take action or make a decision',
    example: "I've made my offer—the ball is in your court now.",
    situation: 'professional',
    category: 'business',
    iconName: 'Circle',
  },
  {
    id: 'get-ball-rolling',
    phrase: 'Get the ball rolling',
    meaning: 'To start something; to begin a process',
    example: "Let's get the ball rolling on this project today.",
    situation: 'transition',
    category: 'business',
    iconName: 'Play',
  },
  {
    id: 'hit-ground-running',
    phrase: 'Hit the ground running',
    meaning: 'To start something and proceed at a fast pace with enthusiasm',
    example: "The new hire hit the ground running on day one.",
    situation: 'emphasis',
    category: 'business',
    iconName: 'Zap',
  },
  {
    id: 'move-needle',
    phrase: 'Move the needle',
    meaning: 'To make a noticeable difference or progress',
    example: "This campaign really moved the needle on brand awareness.",
    situation: 'emphasis',
    category: 'business',
    iconName: 'TrendingUp',
  },
  {
    id: 'elephant-in-room',
    phrase: 'Elephant in the room',
    meaning: 'An obvious problem that no one wants to discuss',
    example: "We need to address the elephant in the room—our declining sales.",
    situation: 'transition',
    category: 'business',
    iconName: 'AlertCircle',
  },
  {
    id: 'think-outside-box',
    phrase: 'Think outside the box',
    meaning: 'To think creatively or unconventionally',
    example: "We need to think outside the box to solve this challenge.",
    situation: 'encouragement',
    category: 'business',
    iconName: 'Lightbulb',
  },
  {
    id: 'win-win-situation',
    phrase: 'Win-win situation',
    meaning: 'A situation where everyone benefits',
    example: "This partnership creates a win-win situation for both companies.",
    situation: 'agreement',
    category: 'persuasion',
    iconName: 'Trophy',
  },
  {
    id: 'on-same-page',
    phrase: 'On the same page',
    meaning: 'In agreement; having the same understanding',
    example: "Before we proceed, let's make sure we're all on the same page.",
    situation: 'agreement',
    category: 'business',
    iconName: 'FileText',
  },
  {
    id: 'take-with-grain-salt',
    phrase: 'Take it with a grain of salt',
    meaning: 'To view something with skepticism',
    example: "Take those projections with a grain of salt—they're optimistic.",
    situation: 'disagreement',
    category: 'casual',
    iconName: 'FlaskConical',
  },
  {
    id: 'bite-bullet',
    phrase: 'Bite the bullet',
    meaning: 'To endure a painful experience that is unavoidable',
    example: "We need to bite the bullet and have that difficult conversation.",
    situation: 'encouragement',
    category: 'business',
    iconName: 'Shield',
  },
  {
    id: 'break-ice',
    phrase: 'Break the ice',
    meaning: 'To do or say something to relieve tension or get a conversation started',
    example: "Let me break the ice with a quick story about my first day here.",
    situation: 'transition',
    category: 'casual',
    iconName: 'Sparkles',
  },
  {
    id: 'tip-of-iceberg',
    phrase: 'Tip of the iceberg',
    meaning: 'A small visible part of a much larger problem or situation',
    example: "These complaints are just the tip of the iceberg.",
    situation: 'emphasis',
    category: 'business',
    iconName: 'Mountain',
  },
  {
    id: 'hit-nail-on-head',
    phrase: 'Hit the nail on the head',
    meaning: 'To describe exactly what is right or accurate',
    example: "You hit the nail on the head with that analysis.",
    situation: 'agreement',
    category: 'casual',
    iconName: 'Hammer',
  },
];

// Helper functions
export const getVocabByCategory = (category: VocabCategory): VocabPhrase[] => {
  return VOCABULARY_PHRASES.filter(phrase => phrase.category === category);
};

export const getVocabBySituation = (situation: VocabSituation): VocabPhrase[] => {
  return VOCABULARY_PHRASES.filter(phrase => phrase.situation === situation);
};

export const searchVocab = (query: string): VocabPhrase[] => {
  const lowerQuery = query.toLowerCase();
  return VOCABULARY_PHRASES.filter(phrase => 
    phrase.phrase.toLowerCase().includes(lowerQuery) ||
    phrase.meaning.toLowerCase().includes(lowerQuery) ||
    phrase.example.toLowerCase().includes(lowerQuery)
  );
};

export const getRandomPhrase = (): VocabPhrase => {
  return VOCABULARY_PHRASES[Math.floor(Math.random() * VOCABULARY_PHRASES.length)];
};
