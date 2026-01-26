// Fear of Public Speaking Content for ConvoFlow

export interface FearSymptom {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface FearCause {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface FearSolution {
  id: string;
  name: string;
  description: string;
  steps: string[];
  icon: string;
}

export const FEAR_SYMPTOMS: FearSymptom[] = [
  {
    id: 'anxiety',
    name: 'Anxiety',
    description: 'Overwhelming nervousness and worry before or during speaking',
    icon: '😰',
  },
  {
    id: 'dry-mouth',
    name: 'Dry Mouth & Lips',
    description: 'Difficulty speaking due to lack of saliva',
    icon: '👄',
  },
  {
    id: 'panic',
    name: 'Panic Attacks',
    description: 'Feeling your throat isn\'t working and overwhelming fear',
    icon: '😱',
  },
  {
    id: 'shaking',
    name: 'Intense Shaking',
    description: 'Uncontrollable shaking of body, especially legs',
    icon: '🫨',
  },
  {
    id: 'blood-pressure',
    name: 'Elevated Blood Pressure',
    description: 'Racing heart and increased blood pressure',
    icon: '❤️‍🔥',
  },
  {
    id: 'vertigo',
    name: 'Vertigo',
    description: 'Dizziness and feeling like the world is spinning',
    icon: '😵‍💫',
  },
  {
    id: 'chest',
    name: 'Chest Contractions',
    description: 'Tightness or pain in the chest area',
    icon: '💔',
  },
  {
    id: 'focus',
    name: 'Difficulty Focusing',
    description: 'Unable to focus your eyes or concentrate',
    icon: '👁️',
  },
  {
    id: 'ears',
    name: 'Humming in Ears',
    description: 'Ringing or buzzing sounds in your ears',
    icon: '👂',
  },
];

export const FEAR_CAUSES: FearCause[] = [
  {
    id: 'losing-crowd',
    name: 'Fear of Losing the Crowd',
    description: 'Low confidence and constant worry about what people think. Believing you\'ll lose the audience\'s interest creates a self-fulfilling prophecy.',
    icon: '👥',
  },
  {
    id: 'somatic',
    name: 'Somatic Response',
    description: 'Your body triggers fight-or-flight response when viewing speaking as a threat. Anxiety kicks in, hormones release, and this affects your senses.',
    icon: '🧬',
  },
  {
    id: 'skill-mismatch',
    name: 'Mis-Matched Skill Levels',
    description: 'Speaking to your team doesn\'t guarantee you\'re ready for strangers. Speaking to 100 people doesn\'t prepare you for 1000. We all have limits.',
    icon: '📊',
  },
  {
    id: 'alien-context',
    name: 'Alien Contexts',
    description: 'Fear increases in unfamiliar rooms, buildings, or countries. When you don\'t know what people will laugh at or how equipment works, anxiety grows.',
    icon: '🌍',
  },
];

export const FEAR_SOLUTIONS: FearSolution[] = [
  {
    id: 'practice',
    name: 'Practice, Practice, Practice',
    description: 'Drastically increase performance by practicing and planning ahead. Run through your speech at least 3 times before going on stage.',
    steps: [
      'Write down key bullet points',
      'Walk through your slide deck multiple times',
      'Record yourself and review the transcript',
      'Practice again after identifying improvements',
      'Run through at least 3 complete rehearsals',
    ],
    icon: '🔄',
  },
  {
    id: 'research',
    name: 'Research Your Topic',
    description: 'Study your topic thoroughly before preparing your speech. Know the supporting evidence, criticisms, and alternative perspectives.',
    steps: [
      'Deep dive into your core topic',
      'Learn the supporting evidence',
      'Understand criticisms and counterarguments',
      'Be ready to answer challenging questions',
      'Know more than you\'ll present',
    ],
    icon: '📚',
  },
  {
    id: 'breathing',
    name: 'Practice Deep Breathing',
    description: 'Combat difficulty breathing by practicing slow, deep breaths. This calms you down and reduces public speaking anxiety.',
    steps: [
      'Find a quiet, comfortable position',
      'Breathe in slowly through your nose for 4 seconds',
      'Hold your breath for 4 seconds',
      'Exhale slowly through your mouth for 6 seconds',
      'Repeat 5-10 times before speaking',
    ],
    icon: '🧘',
  },
  {
    id: 'organize',
    name: 'Get Organized',
    description: 'Don\'t go on stage without a clear plan. Write a script and organize every aspect of your speech. It\'s easier to improvise with structure.',
    steps: [
      'Create a detailed outline',
      'Write a complete script if needed',
      'Plan your opening hook',
      'Structure your key points',
      'Prepare a memorable closing',
    ],
    icon: '📋',
  },
  {
    id: 'visualize',
    name: 'Visualize Success',
    description: 'Don\'t imagine things going wrong. Focus on how good your speech will be. Visualize the crowd smiling and engaged.',
    steps: [
      'Close your eyes and relax',
      'Picture yourself walking on stage confidently',
      'Visualize the audience smiling and nodding',
      'Imagine delivering your key points smoothly',
      'See yourself receiving applause',
    ],
    icon: '🌟',
  },
  {
    id: 'focus-message',
    name: 'Focus on Your Message',
    description: 'Many speakers focus on the audience and forget content. Focus on your core messages. An audience forgives much if you\'re honest and true.',
    steps: [
      'Identify your 2-3 key messages',
      'Write them down clearly',
      'Focus on delivering these, not on style',
      'Think about what the audience needs to know',
      'Stay committed to your message',
    ],
    icon: '🎯',
  },
  {
    id: 'timing',
    name: 'Master Timing and Pausing',
    description: 'Pausing for a couple of seconds isn\'t bad. The silence may seem eternal to you, but the audience won\'t notice. Allow yourself time to breathe.',
    steps: [
      'Practice strategic pauses',
      'Breathe in, breathe out during pauses',
      'Use pauses after key points',
      'Don\'t rush through content',
      'Remember: silence feels longer to you than them',
    ],
    icon: '⏱️',
  },
  {
    id: 'peers',
    name: 'Get Help from Peers',
    description: 'There\'s always someone better. Use that to your advantage. Take up activities that require speaking and ask for feedback. We\'re stronger together.',
    steps: [
      'Find a speaking buddy or group',
      'Join Toastmasters or similar clubs',
      'Ask for honest feedback after practice',
      'Learn from experienced speakers',
      'Support others on their journey too',
    ],
    icon: '🤝',
  },
];

export const BERKUN_FEAR_TRIGGERS = [
  {
    id: 'standing-alone',
    name: 'Standing Alone',
    description: 'Feeling exposed and vulnerable when alone on stage',
    icon: '🧍',
  },
  {
    id: 'open-space',
    name: 'Open Space',
    description: 'Nowhere to hide makes you feel unsafe',
    icon: '🏟️',
  },
  {
    id: 'no-weapon',
    name: 'No Weapon',
    description: 'Feeling defenseless triggers primal fear',
    icon: '🛡️',
  },
  {
    id: 'big-audience',
    name: 'Big Audience Staring',
    description: 'Scrutiny and pressure from many eyes intensify anxiety',
    icon: '👀',
  },
];

export const GLOSSOPHOBIA_STATS = {
  percentage: 73,
  rank: 1,
  estimatedAffected: '75%',
  rankDescription: 'Ranks #1 on the list of common fears, ahead of spiders, death, and cockroaches',
};
