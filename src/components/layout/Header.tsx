import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Calendar,
  Presentation,
  MessageSquare,
  GraduationCap,
  Save,
  Share2,
  Download,
} from 'lucide-react';
import { ConversationType, CONVERSATION_TYPES } from '@/types/conversation';

interface HeaderProps {
  title: string;
  conversationType: ConversationType;
  onTypeChange: (type: ConversationType) => void;
  onSave?: () => void;
  onShare?: () => void;
  onExport?: () => void;
}

const ICON_MAP = {
  Users,
  Calendar,
  Presentation,
  MessageSquare,
  GraduationCap,
};

const Header = ({
  title,
  conversationType,
  onTypeChange,
  onSave,
  onShare,
  onExport,
}: HeaderProps) => {
  const currentType = CONVERSATION_TYPES.find(t => t.id === conversationType);
  const IconComponent = currentType ? ICON_MAP[currentType.icon as keyof typeof ICON_MAP] : Users;

  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{title || 'Untitled Plan'}</h2>
            <p className="text-xs text-muted-foreground">
              {currentType?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Conversation Type Selector */}
        <Select value={conversationType} onValueChange={(v) => onTypeChange(v as ConversationType)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CONVERSATION_TYPES.map((type) => {
              const Icon = ICON_MAP[type.icon as keyof typeof ICON_MAP];
              return (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="ghost" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
