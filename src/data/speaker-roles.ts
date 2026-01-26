// Speaker Roles for ConvoFlow - Based on Public Speaking 101 Guide

import { IconName } from '@/components/ui/dynamic-icon';

export interface SpeakerRole {
  id: string;
  name: string;
  description: string;
  skills: string[];
  challenges: string[];
  practiceScenarios: string[];
  iconName: IconName;
  color: string;
}

export const SPEAKER_ROLES: SpeakerRole[] = [
  {
    id: 'speaker',
    name: 'Speaker',
    description: 'A keynote or main presenter whose primary aim is to convey a message to the audience in an engaging manner.',
    skills: [
      'Clear message delivery',
      'Audience engagement',
      'Stage presence',
      'Storytelling',
    ],
    challenges: [
      'Maintaining audience attention',
      'Handling large crowds',
      'Managing time effectively',
      'Dealing with technical issues',
    ],
    practiceScenarios: [
      'Deliver a 10-minute keynote on your expertise',
      'Present your company vision to stakeholders',
      'Give a TED-style talk on an important topic',
      'Share your professional journey',
    ],
    iconName: 'Mic',
    color: 'purple',
  },
  {
    id: 'facilitator',
    name: 'Facilitator',
    description: 'An organizer who puts events together and ensures everything runs smoothly. Acts as a mediator ensuring the group achieves its goals.',
    skills: [
      'Organization and planning',
      'Group management',
      'Conflict resolution',
      'Time management',
    ],
    challenges: [
      'Keeping discussions on track',
      'Managing diverse personalities',
      'Handling unexpected situations',
      'Balancing participation',
    ],
    practiceScenarios: [
      'Run a 30-minute workshop session',
      'Facilitate a brainstorming meeting',
      'Guide a team through problem-solving',
      'Lead a training session',
    ],
    iconName: 'ClipboardList',
    color: 'teal',
  },
  {
    id: 'moderator',
    name: 'Moderator',
    description: 'Enforces rules and ensures balanced discussion. Gives everyone the floor to make their points without overshadowing others.',
    skills: [
      'Neutral facilitation',
      'Time enforcement',
      'Question management',
      'Conflict de-escalation',
    ],
    challenges: [
      'Remaining impartial',
      'Managing heated discussions',
      'Keeping to schedule',
      'Drawing out quiet participants',
    ],
    practiceScenarios: [
      'Moderate a debate between two teams',
      'Lead a panel Q&A session',
      'Facilitate a town hall discussion',
      'Run an open forum meeting',
    ],
    iconName: 'Scale',
    color: 'blue',
  },
  {
    id: 'entertainer',
    name: 'Entertainer',
    description: 'Holds attention with engaging speech and humor. Makes content enjoyable and memorable while delivering value.',
    skills: [
      'Humor and timing',
      'Audience reading',
      'Energy management',
      'Improvisation',
    ],
    challenges: [
      'Balancing entertainment with substance',
      'Reading the room correctly',
      'Handling jokes that don\'t land',
      'Maintaining energy throughout',
    ],
    practiceScenarios: [
      'Tell a funny story with a lesson',
      'Make a dry topic engaging',
      'Warm up an audience before a main event',
      'Add humor to a business presentation',
    ],
    iconName: 'Smile',
    color: 'pink',
  },
  {
    id: 'emcee',
    name: 'Emcee',
    description: 'A charismatic host who guides the audience, introduces speakers, and keeps the event engaging and on track.',
    skills: [
      'Charisma and charm',
      'Quick thinking',
      'Smooth transitions',
      'Crowd engagement',
    ],
    challenges: [
      'Filling unexpected gaps',
      'Managing event timing',
      'Introducing diverse speakers',
      'Keeping energy high',
    ],
    practiceScenarios: [
      'Introduce three speakers at an event',
      'Handle a 5-minute delay smoothly',
      'Welcome an audience and set the tone',
      'Close out an event memorably',
    ],
    iconName: 'PartyPopper',
    color: 'amber',
  },
  {
    id: 'teacher',
    name: 'Teacher',
    description: 'Educates and imparts knowledge. Works to help others understand concepts and develop skills.',
    skills: [
      'Clear explanation',
      'Patience',
      'Adaptability',
      'Knowledge organization',
    ],
    challenges: [
      'Reaching different learning styles',
      'Keeping learners engaged',
      'Simplifying complex topics',
      'Checking understanding',
    ],
    practiceScenarios: [
      'Explain a complex concept simply',
      'Teach a skill step-by-step',
      'Lead a Q&A after a lesson',
      'Guide someone through a process',
    ],
    iconName: 'GraduationCap',
    color: 'green',
  },
  {
    id: 'coach',
    name: 'Coach',
    description: 'A personal guide who helps individuals develop and grow. More focused on personal development than group teaching.',
    skills: [
      'Active listening',
      'Personalized feedback',
      'Encouragement',
      'Goal setting',
    ],
    challenges: [
      'Balancing support with challenge',
      'Tailoring advice to individuals',
      'Building trust quickly',
      'Measuring progress',
    ],
    practiceScenarios: [
      'Give constructive feedback on a practice run',
      'Help someone prepare for a big presentation',
      'Coach through public speaking anxiety',
      'Guide someone setting speaking goals',
    ],
    iconName: 'Dumbbell',
    color: 'orange',
  },
];

export const getSpeakerRoleById = (id: string): SpeakerRole | undefined => {
  return SPEAKER_ROLES.find(role => role.id === id);
};
