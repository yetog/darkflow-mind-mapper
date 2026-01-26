import { icons, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Use string type to avoid strict type checking issues with icon names
export type IconName = string;

interface DynamicIconProps {
  name: IconName;
  className?: string;
  size?: number;
}

/**
 * DynamicIcon renders a Lucide icon by name.
 * Use this when the icon name comes from data (like from a database or config).
 * For static icons, prefer direct imports like: import { Target } from 'lucide-react'
 */
export const DynamicIcon = ({ name, className, size = 16 }: DynamicIconProps) => {
  const LucideIconComponent = icons[name] as LucideIcon;
  
  if (!LucideIconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }
  
  return <LucideIconComponent className={cn(className)} size={size} />;
};

// Common icon mapping for data files
export const ICON_MAP = {
  // Fear/Anxiety
  anxiety: 'AlertTriangle',
  worry: 'AlertTriangle',
  panic: 'Skull',
  shaking: 'Activity',
  bloodPressure: 'HeartPulse',
  vertigo: 'CircleDashed',
  chest: 'Heart',
  focus: 'Eye',
  ears: 'Ear',
  dryMouth: 'Droplet',
  
  // Actions
  practice: 'RefreshCw',
  research: 'BookOpen',
  breathing: 'Wind',
  organize: 'ClipboardList',
  visualize: 'Star',
  target: 'Target',
  timing: 'Clock',
  peers: 'Users',
  
  // Speaking
  speaker: 'Mic',
  audience: 'Users',
  structure: 'Layout',
  virtual: 'Monitor',
  balance: 'Scale',
  entertainment: 'Smile',
  complete: 'Check',
  idea: 'Lightbulb',
  
  // Categories
  business: 'Briefcase',
  casual: 'Coffee',
  persuasion: 'Target',
  emotional: 'Heart',
  humor: 'Smile',
  
  // Misc
  trophy: 'Trophy',
  brain: 'Brain',
  message: 'MessageCircle',
  hand: 'Hand',
  sparkles: 'Sparkles',
  file: 'FileText',
  
  // Fear causes
  crowd: 'Users',
  dna: 'Dna',
  chart: 'BarChart3',
  globe: 'Globe',
  standing: 'PersonStanding',
  stadium: 'Building2',
  shield: 'Shield',
  eyes: 'ScanEye',
} as const;

export default DynamicIcon;
