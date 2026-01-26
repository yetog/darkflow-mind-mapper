// Speech Types for ConvoFlow - Based on Public Speaking 101 Guide

export interface SpeechType {
  id: string;
  name: string;
  description: string;
  whenToUse: string[];
  keyTechniques: string[];
  examplePrompts: string[];
  icon: string;
  color: string;
}

export const SPEECH_TYPES: SpeechType[] = [
  {
    id: 'informative',
    name: 'Informative Speech',
    description: 'Educate your audience with facts, data, and relevant information. Present complicated ideas in simpler forms.',
    whenToUse: [
      'Academic lectures or presentations',
      'Training sessions',
      'Conference talks',
      'Technical briefings',
    ],
    keyTechniques: [
      'Focus on facts and statistics, not opinions',
      'Present complex ideas simply',
      'Use clear structure and organization',
      'Incorporate relevant examples',
    ],
    examplePrompts: [
      'Explain climate change causes in 2 minutes',
      'Describe how machine learning works',
      'Present quarterly sales data analysis',
      'Explain a new company policy',
    ],
    icon: '📊',
    color: 'blue',
  },
  {
    id: 'persuasive',
    name: 'Persuasive Speech',
    description: 'Convince your audience using charisma, storytelling, and emotional connection. Appeal to both logic and feelings.',
    whenToUse: [
      'Sales pitches',
      'Investment presentations',
      'Change advocacy',
      'Political speeches',
    ],
    keyTechniques: [
      'Connect emotionally with your audience',
      'Use compelling stories',
      'Back claims with credible evidence',
      'Include a clear call to action',
    ],
    examplePrompts: [
      'Pitch why your company should go remote',
      'Convince stakeholders to fund your project',
      'Advocate for a new initiative',
      'Persuade the team to adopt a new tool',
    ],
    icon: '🎯',
    color: 'purple',
  },
  {
    id: 'ceremonial',
    name: 'Ceremonial Speech',
    description: 'Formal addresses for commemorating important events. Brief, respectful, and straight to the point.',
    whenToUse: [
      'Graduation ceremonies',
      'Award ceremonies',
      'Tributes and eulogies',
      'Formal introductions',
    ],
    keyTechniques: [
      'Keep it brief and focused',
      'Use formal, respectful tone',
      'Honor the occasion appropriately',
      'End with meaningful reflection',
    ],
    examplePrompts: [
      'Give a graduation ceremony opening',
      'Present an award acceptance speech',
      'Deliver a tribute to a retiring colleague',
      'Introduce a keynote speaker',
    ],
    icon: '🎓',
    color: 'amber',
  },
  {
    id: 'demonstrative',
    name: 'Demonstrative Speech',
    description: 'Teach your audience something new through practical demonstration. Answer how-to questions clearly.',
    whenToUse: [
      'Product launches',
      'Training workshops',
      'Technical tutorials',
      'Process explanations',
    ],
    keyTechniques: [
      'Use visual aids effectively',
      'Break down steps clearly',
      'Demonstrate while explaining',
      'Allow for questions',
    ],
    examplePrompts: [
      'Demo a new product feature',
      'Explain how to use a software tool',
      'Walk through a process step-by-step',
      'Teach a new skill to the team',
    ],
    icon: '🔧',
    color: 'teal',
  },
  {
    id: 'motivational',
    name: 'Motivational Speech',
    description: 'Energize and inspire your audience. Cut to the soul and make them feel they can achieve anything.',
    whenToUse: [
      'Pre-game pep talks',
      'Team kickoffs',
      'Company all-hands',
      'Personal development events',
    ],
    keyTechniques: [
      'Speak from the heart',
      'Share personal stories of triumph',
      'Use powerful, emotional language',
      'End with an inspiring call to action',
    ],
    examplePrompts: [
      'Give a pre-game pep talk to your team',
      'Motivate the team before a big deadline',
      'Inspire employees at the start of the year',
      'Encourage students before exams',
    ],
    icon: '🔥',
    color: 'orange',
  },
  {
    id: 'impromptu',
    name: 'Impromptu Speech',
    description: 'Think on your feet and speak without preparation. A test of quick thinking and composure.',
    whenToUse: [
      'Unexpected speaking requests',
      'Q&A sessions',
      'Networking events',
      'Emergency presentations',
    ],
    keyTechniques: [
      'Stay calm and composed',
      'Use a simple structure (PREP: Point, Reason, Example, Point)',
      'Draw on relevant experience',
      'Keep it concise',
    ],
    examplePrompts: [
      'Share your thoughts on [random topic] for 60 seconds',
      'Introduce yourself unexpectedly',
      'Respond to a challenging question',
      'Give an update without notes',
    ],
    icon: '⚡',
    color: 'yellow',
  },
  {
    id: 'debate',
    name: 'Debate Speech',
    description: 'Defend a position with facts and logic. Anticipate counterarguments and respond effectively.',
    whenToUse: [
      'Formal debates',
      'Policy discussions',
      'Strategy meetings',
      'Decision-making sessions',
    ],
    keyTechniques: [
      'Research both sides thoroughly',
      'Anticipate counterarguments',
      'Use evidence-based reasoning',
      'Stay composed under pressure',
    ],
    examplePrompts: [
      'Argue for remote work vs office work',
      'Defend your proposed solution',
      'Debate a strategic direction',
      'Respond to criticism of your idea',
    ],
    icon: '⚖️',
    color: 'indigo',
  },
  {
    id: 'forensic',
    name: 'Forensic Speech',
    description: 'Competitive speaking practice. Study, rehearse, and present structured arguments.',
    whenToUse: [
      'Speech competitions',
      'Mock trials',
      'Academic presentations',
      'Formal examinations',
    ],
    keyTechniques: [
      'Memorize structure, not word-for-word',
      'Practice delivery repeatedly',
      'Master timing perfectly',
      'Project confidence and authority',
    ],
    examplePrompts: [
      'Present a formal argument on a topic',
      'Deliver a rehearsed competitive speech',
      'Give a structured 5-minute presentation',
      'Practice your thesis defense',
    ],
    icon: '🏆',
    color: 'rose',
  },
  {
    id: 'special-occasion',
    name: 'Special Occasion Speech',
    description: 'Mark noteworthy events with appropriate remarks. Keep it short, memorable, and fitting.',
    whenToUse: [
      'Weddings and parties',
      'Retirement celebrations',
      'Office parties',
      'Birthday celebrations',
    ],
    keyTechniques: [
      'Keep it brief and focused',
      'Match the tone to the occasion',
      'Include personal touches',
      'End on a warm note',
    ],
    examplePrompts: [
      'Give a best man/maid of honor speech',
      'Toast at a retirement party',
      'Welcome remarks at a celebration',
      'Share memories at a birthday party',
    ],
    icon: '🎉',
    color: 'pink',
  },
];

export const getSpeechTypeById = (id: string): SpeechType | undefined => {
  return SPEECH_TYPES.find(type => type.id === id);
};

export const getSpeechTypesByColor = (color: string): SpeechType[] => {
  return SPEECH_TYPES.filter(type => type.color === color);
};
