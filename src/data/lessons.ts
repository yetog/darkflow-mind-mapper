// Lesson Data for ConvoFlow Speech Coaching

import { IconName } from '@/components/ui/dynamic-icon';
import { Lesson, LessonCourse, DailyChallenge, Exercise } from '@/types/lessons';

export const LESSONS: Lesson[] = [
  // Confidence Lessons
  {
    id: 'confidence-101',
    title: 'Find Your Power Voice',
    description: 'Learn to project confidence through your voice',
    category: 'confidence',
    difficulty: 'beginner',
    duration: 5,
    iconName: 'Shield',
    color: 'amber',
    targetMetrics: ['confidence', 'energy'],
    exercises: [
      {
        id: 'power-stance',
        type: 'breathing',
        title: 'Power Stance Breathing',
        instruction: 'Stand tall with feet shoulder-width apart. Take 3 deep breaths, breathing in through your nose for 4 counts, holding for 4, and exhaling through your mouth for 6.',
        tips: ['Keep your shoulders back', 'Imagine a string pulling you up from the top of your head'],
      },
      {
        id: 'strong-statement',
        type: 'prompt',
        title: 'Strong Opening Statement',
        instruction: 'Introduce yourself as if you were the keynote speaker at a major conference. State your name, your expertise, and one bold claim.',
        prompt: 'Introduce yourself as a confident expert',
        targetDuration: 30,
        evaluationCriteria: ['Clear projection', 'No hedging phrases', 'Strong eye contact'],
      },
    ],
  },
  {
    id: 'confidence-102',
    title: 'Eliminate Hedging',
    description: 'Replace "I think" and "maybe" with assertive language',
    category: 'confidence',
    difficulty: 'intermediate',
    duration: 7,
    iconName: 'Target',
    color: 'amber',
    targetMetrics: ['confidence'],
    exercises: [
      {
        id: 'hedging-awareness',
        type: 'reading',
        title: 'Spot the Hedges',
        instruction: 'Read this paragraph and identify all hedging phrases: "I think maybe we should consider possibly looking at this opportunity. It could be interesting, I guess. Perhaps we might want to explore it further."',
        evaluationCriteria: ['Identify all hedging words'],
      },
      {
        id: 'assertive-reframe',
        type: 'prompt',
        title: 'Assertive Reframe',
        instruction: 'Now restate the same message without any hedging. Be direct and confident.',
        prompt: 'We should seize this opportunity. It\'s exciting and worth exploring immediately.',
        targetDuration: 20,
        evaluationCriteria: ['No "I think", "maybe", "perhaps"', 'Direct statements'],
      },
    ],
  },

  // Filler Words Lessons
  {
    id: 'filler-101',
    title: 'Embrace the Pause',
    description: 'Replace filler words with powerful silence',
    category: 'filler-words',
    difficulty: 'beginner',
    duration: 5,
    iconName: 'VolumeX',
    color: 'red',
    targetMetrics: ['fillerWords', 'pausing'],
    exercises: [
      {
        id: 'count-fillers',
        type: 'prompt',
        title: 'Filler Awareness',
        instruction: 'Speak about your morning routine for 60 seconds. Focus on noticing every time you say "um", "uh", or "like".',
        prompt: 'Describe your morning routine',
        targetDuration: 60,
        evaluationCriteria: ['Self-awareness of filler words'],
      },
      {
        id: 'silent-pause',
        type: 'timed-speech',
        title: 'The Silent Pause',
        instruction: 'Repeat the same topic, but this time, whenever you feel the urge to use a filler word, pause silently for 2 seconds instead.',
        targetDuration: 60,
        evaluationCriteria: ['Replace fillers with pauses', 'Maintain composure during silence'],
      },
    ],
  },

  // Pace Lessons
  {
    id: 'pace-101',
    title: 'Find Your Rhythm',
    description: 'Master the ideal speaking pace of 120-150 WPM',
    category: 'pace',
    difficulty: 'beginner',
    duration: 6,
    iconName: 'Clock',
    color: 'purple',
    targetMetrics: ['pace'],
    exercises: [
      {
        id: 'pace-awareness',
        type: 'reading',
        title: 'Pace Check',
        instruction: 'Read the following passage at your natural pace: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet, making it a perfect tool for practicing your pace and pronunciation."',
        targetDuration: 10,
        evaluationCriteria: ['Natural delivery', 'Clear pronunciation'],
      },
      {
        id: 'slow-down',
        type: 'reading',
        title: 'Deliberate Slowdown',
        instruction: 'Read the same passage again, but 30% slower. Emphasize key words and let each word breathe.',
        targetDuration: 13,
        evaluationCriteria: ['Slower pace', 'Emphasis on key words'],
      },
    ],
  },

  // Engagement Lessons
  {
    id: 'engagement-101',
    title: 'Hook Your Audience',
    description: 'Learn opening techniques that grab attention',
    category: 'engagement',
    difficulty: 'beginner',
    duration: 8,
    iconName: 'Anchor',
    color: 'pink',
    targetMetrics: ['energy', 'confidence'],
    exercises: [
      {
        id: 'question-hook',
        type: 'prompt',
        title: 'The Question Hook',
        instruction: 'Open a presentation about climate change with a provocative question that makes your audience think.',
        prompt: 'Create a question-based opening',
        targetDuration: 20,
        evaluationCriteria: ['Thought-provoking question', 'Pause for effect', 'Strong follow-up'],
      },
      {
        id: 'story-hook',
        type: 'prompt',
        title: 'The Story Hook',
        instruction: 'Open the same presentation with a personal anecdote or story that connects emotionally.',
        prompt: 'Create a story-based opening',
        targetDuration: 45,
        evaluationCriteria: ['Personal connection', 'Vivid details', 'Clear transition to main topic'],
      },
    ],
  },

  // Structure Lessons
  {
    id: 'structure-101',
    title: 'The Power of Three',
    description: 'Organize your message into three memorable points',
    category: 'structure',
    difficulty: 'beginner',
    duration: 7,
    iconName: 'Layout',
    color: 'teal',
    targetMetrics: ['conciseness'],
    exercises: [
      {
        id: 'three-points',
        type: 'prompt',
        title: 'Three Key Points',
        instruction: 'Explain why exercise is important using exactly three key points. Signal each point clearly: "First... Second... Third..."',
        prompt: 'Explain the importance of exercise in three points',
        targetDuration: 60,
        evaluationCriteria: ['Clear structure', 'Signposted transitions', 'Memorable points'],
      },
    ],
  },

  // Energy Lessons
  {
    id: 'energy-101',
    title: 'Project Enthusiasm',
    description: 'Energize your delivery without sounding fake',
    category: 'energy',
    difficulty: 'beginner',
    duration: 5,
    iconName: 'Zap',
    color: 'orange',
    targetMetrics: ['energy'],
    exercises: [
      {
        id: 'monotone-awareness',
        type: 'reading',
        title: 'Monotone Check',
        instruction: 'Read this exciting news: "We just won the biggest contract in company history! This will transform our business and create 100 new jobs!"',
        evaluationCriteria: ['Appropriate energy for content'],
      },
      {
        id: 'energy-boost',
        type: 'reading',
        title: 'Energy Boost',
        instruction: 'Read the same news again, but smile while speaking and vary your pitch. Let your genuine excitement show!',
        evaluationCriteria: ['Varied pitch', 'Genuine enthusiasm', 'Appropriate volume'],
      },
    ],
  },

  // Impromptu Speaking
  {
    id: 'impromptu-101',
    title: 'Think on Your Feet',
    description: 'Handle unexpected questions with grace',
    category: 'structure',
    difficulty: 'intermediate',
    duration: 10,
    iconName: 'Brain',
    color: 'teal',
    targetMetrics: ['confidence', 'conciseness'],
    exercises: [
      {
        id: 'random-topic-1',
        type: 'impromptu',
        title: 'Random Topic 1',
        instruction: 'You have 5 seconds to think, then speak for 30 seconds on: "The best advice you ever received"',
        targetDuration: 30,
        evaluationCriteria: ['Clear point', 'Organized thoughts', 'Confident delivery'],
      },
      {
        id: 'random-topic-2',
        type: 'impromptu',
        title: 'Random Topic 2',
        instruction: 'You have 5 seconds to think, then speak for 30 seconds on: "Why failure is important"',
        targetDuration: 30,
        evaluationCriteria: ['Clear point', 'Organized thoughts', 'Confident delivery'],
      },
    ],
  },
];

export const LESSON_COURSES: LessonCourse[] = [
  {
    id: 'confidence-course',
    title: 'Build Unshakeable Confidence',
    description: 'Transform from nervous to natural in your speaking',
    category: 'confidence',
    lessons: LESSONS.filter(l => l.category === 'confidence'),
    estimatedDuration: 30,
    iconName: 'Shield',
  },
  {
    id: 'filler-words-course',
    title: 'Eliminate Filler Words',
    description: 'Clean up your speech and sound more polished',
    category: 'filler-words',
    lessons: LESSONS.filter(l => l.category === 'filler-words'),
    estimatedDuration: 20,
    iconName: 'VolumeX',
  },
  {
    id: 'pace-course',
    title: 'Master Your Pace',
    description: 'Control your speed for maximum impact',
    category: 'pace',
    lessons: LESSONS.filter(l => l.category === 'pace'),
    estimatedDuration: 25,
    iconName: 'Clock',
  },
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'daily-1',
    date: new Date(),
    title: 'Elevator Pitch',
    exercise: {
      id: 'elevator-pitch',
      type: 'timed-speech',
      title: '60-Second Pitch',
      instruction: 'Describe what you do in exactly 60 seconds. Make it memorable and compelling.',
      targetDuration: 60,
      evaluationCriteria: ['Clear value proposition', 'Engaging delivery', 'Perfect timing'],
    },
    reward: {
      xp: 50,
      badge: 'Daily Champion',
    },
  },
];

// Get a random impromptu topic
export function getRandomImpromptuTopic(): string {
  const topics = [
    'The most important skill in life',
    'Why curiosity matters',
    'A lesson from a mistake',
    'The value of patience',
    'What success means to you',
    'The power of listening',
    'Why diversity is strength',
    'A book that changed you',
    'The best investment you can make',
    'What makes a great leader',
  ];
  return topics[Math.floor(Math.random() * topics.length)];
}

// Get lessons by category
export function getLessonsByCategory(category: string): Lesson[] {
  return LESSONS.filter(l => l.category === category);
}

// Get lesson by ID
export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find(l => l.id === id);
}
