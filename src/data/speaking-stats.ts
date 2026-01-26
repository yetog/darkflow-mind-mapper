// Motivating Statistics for ConvoFlow - From Public Speaking 101 Guide

import { IconName } from '@/components/ui/dynamic-icon';

export interface SpeakingStat {
  id: string;
  value: string;
  label: string;
  description: string;
  source?: string;
  iconName: IconName;
  color: string;
}

export const SPEAKING_STATS: SpeakingStat[] = [
  {
    id: 'fear-percentage',
    value: '73%',
    label: 'Fear Public Speaking',
    description: 'Over 73% of people experience fear of public speaking (glossophobia)',
    source: 'Research studies',
    iconName: 'AlertTriangle',
    color: 'amber',
  },
  {
    id: 'fear-rank',
    value: '#1',
    label: 'Top Fear',
    description: 'Public speaking ranks as the #1 fear worldwide, ahead of death and spiders',
    iconName: 'Trophy',
    color: 'red',
  },
  {
    id: 'visual-retention',
    value: '65%',
    label: 'Visual + Verbal Retention',
    description: 'People remember 65% of verbal AND visual data vs only 10% of verbal alone after 3 days',
    iconName: 'Brain',
    color: 'blue',
  },
  {
    id: 'verbal-only',
    value: '10%',
    label: 'Verbal Only Retention',
    description: 'Without visuals, audiences only remember 10% of what you say after 3 days',
    iconName: 'MessageCircle',
    color: 'gray',
  },
  {
    id: 'nonverbal',
    value: '80%',
    label: 'Nonverbal Communication',
    description: 'Your nonverbal communication conveys 80% of your message',
    source: 'Sylvie di Giusto',
    iconName: 'Hand',
    color: 'purple',
  },
  {
    id: 'audience-memory',
    value: '20%',
    label: 'Audience Memory',
    description: 'Your audience will only remember 20% of what you say - make it the right 20%',
    source: 'Richard Foster-Fletcher',
    iconName: 'Target',
    color: 'teal',
  },
  {
    id: 'soft-skill',
    value: '#1',
    label: 'Most Wanted Skill',
    description: 'Communication is the #1 soft skill employers want according to LinkedIn',
    source: 'LinkedIn Study',
    iconName: 'Briefcase',
    color: 'green',
  },
  {
    id: 'grace-period',
    value: '30-60s',
    label: 'Grace Period',
    description: 'The audience gives you a 30-60 second grace period at the start - use it wisely',
    source: 'Pamela Slim',
    iconName: 'Timer',
    color: 'orange',
  },
  {
    id: 'practice-runs',
    value: '3+',
    label: 'Practice Runs Needed',
    description: 'Run through your speech at least 3 times before going on stage',
    iconName: 'RefreshCw',
    color: 'indigo',
  },
  {
    id: 'rule-of-three',
    value: '3',
    label: 'Rule of Three',
    description: 'Stick to 3 main points for maximum impact and audience retention',
    source: 'Alison Hadden',
    iconName: 'Sparkles',
    color: 'pink',
  },
];

export const getRandomStat = (): SpeakingStat => {
  const randomIndex = Math.floor(Math.random() * SPEAKING_STATS.length);
  return SPEAKING_STATS[randomIndex];
};

export const getStatById = (id: string): SpeakingStat | undefined => {
  return SPEAKING_STATS.find(stat => stat.id === id);
};

// Motivational quotes for the app
export const MOTIVATIONAL_QUOTES = [
  {
    quote: "The greatest speakers don't try to 'convince' their audience. They put their audience in a position to convince themselves.",
    author: 'Marcus Sheridan',
  },
  {
    quote: "Be Interested, Not Interesting. If YOU are interested in your topic and your audience, they'll be interested in you.",
    author: 'Tamsen Webster',
  },
  {
    quote: "You don't need to rehearse to be yourself.",
    author: 'Nikki Greenberg',
  },
  {
    quote: "Your greatest obstacles will be your greatest opportunity to grow.",
    author: 'Tony Horton',
  },
  {
    quote: "No matter what the message is: Don't be boring!",
    author: 'Nir Eyal',
  },
  {
    quote: "What you need for success is already in you. It's a matter of believing in yourself, having the will to work hard, and never giving up.",
    author: 'Akwasi Frimpong',
  },
  {
    quote: "Think of your audience as your friends or fans, not your adversaries. They want you to do well. No one wants you to succeed more than they do.",
    author: 'John Basedow',
  },
  {
    quote: "Leave your audience with a meaningful, memorable message.",
    author: 'Robert Begley',
  },
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[randomIndex];
};
