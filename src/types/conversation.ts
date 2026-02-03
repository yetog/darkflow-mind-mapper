// Conversation Types
export type ConversationType = 'gathering' | 'meeting' | 'presentation' | 'panel' | 'lesson';

export interface ConversationTypeConfig {
  id: ConversationType;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export const CONVERSATION_TYPES: ConversationTypeConfig[] = [
  {
    id: 'gathering',
    label: 'Gathering',
    description: 'Social events, networking, casual conversations',
    icon: 'Users',
    color: 'amber',
  },
  {
    id: 'meeting',
    label: 'Meeting',
    description: 'Business meetings, 1:1s, standups, team syncs',
    icon: 'Calendar',
    color: 'blue',
  },
  {
    id: 'presentation',
    label: 'Presentation',
    description: 'Keynotes, pitches, demos, talks',
    icon: 'Presentation',
    color: 'purple',
  },
  {
    id: 'panel',
    label: 'Panel',
    description: 'Discussions, Q&A sessions, debates',
    icon: 'MessageSquare',
    color: 'teal',
  },
  {
    id: 'lesson',
    label: 'Lesson',
    description: 'Training, workshops, tutorials, teaching',
    icon: 'GraduationCap',
    color: 'green',
  },
];

// Visualization Modes
export type ViewMode = 'mindmap' | 'timeline' | 'carousel';

// Conversation Plan Structure
export interface ConversationNode {
  id: string;
  label: string;
  description?: string;
  duration?: number; // in minutes
  type: 'topic' | 'question' | 'transition' | 'activity' | 'milestone';
  emotionalTone?: 'positive' | 'neutral' | 'negative' | 'building' | 'resolving';
  color?: 'blue' | 'purple' | 'teal' | 'amber' | 'green' | 'rose' | 'slate';
  tacticIds?: string[];
  speakerNotes?: string;
  children?: ConversationNode[];
}

export interface ConversationPlan {
  id: string;
  title: string;
  type: ConversationType;
  description?: string;
  audience?: AudienceProfile;
  goals?: string[];
  duration?: number; // total minutes
  nodes: ConversationNode[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AudienceProfile {
  size: 'individual' | 'small' | 'medium' | 'large';
  expertise: 'novice' | 'intermediate' | 'expert' | 'mixed';
  relationship: 'new' | 'familiar' | 'established';
  expectations?: string[];
  mood?: 'skeptical' | 'neutral' | 'enthusiastic';
  decisionMakers?: boolean;
}

// Node for the visual representations
export interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  level: number;
  parentId?: string;
  children: MindMapNode[];
}

export interface TimelineSegment {
  id: string;
  title: string;
  description?: string;
  startTime: number; // minutes from start
  duration: number;
  type: ConversationNode['type'];
  emotionalLevel?: number; // -1 to 1 for emotional arc
}

export interface CarouselSlide {
  id: string;
  title: string;
  content: string;
  speakerNotes?: string;
  duration?: number;
  tacticIds?: string[];
}
