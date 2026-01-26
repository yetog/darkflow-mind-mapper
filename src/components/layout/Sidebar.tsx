import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  LayoutDashboard,
  Map,
  Clock,
  Layers,
  BookOpen,
  MessageCircle,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ViewMode } from '@/types/conversation';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onOpenTactics: () => void;
  onOpenCoach: () => void;
}

const Sidebar = ({
  isCollapsed,
  onToggle,
  activeView,
  onViewChange,
  onOpenTactics,
  onOpenCoach,
}: SidebarProps) => {
  const viewItems = [
    { id: 'mindmap' as ViewMode, label: 'Mind Map', icon: Map },
    { id: 'timeline' as ViewMode, label: 'Timeline', icon: Clock },
    { id: 'carousel' as ViewMode, label: 'Carousel', icon: Layers },
  ];

  return (
    <div
      className={cn(
        'relative flex flex-col h-full bg-card border-r border-border transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold text-foreground">ConvoFlow</h1>
              <p className="text-xs text-muted-foreground">Plan • Practice • Present</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border border-border bg-background shadow-sm"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      <ScrollArea className="flex-1 py-4">
        {/* New Plan Button */}
        <div className="px-3 mb-4">
          <Button
            className={cn(
              'w-full gap-2',
              isCollapsed && 'px-0'
            )}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && 'New Plan'}
          </Button>
        </div>

        <Separator className="my-4" />

        {/* View Modes */}
        <div className="px-3">
          {!isCollapsed && (
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Views
            </h3>
          )}
          <nav className="space-y-1">
            {viewItems.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  isCollapsed && 'justify-center px-0'
                )}
                onClick={() => onViewChange(item.id)}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </nav>
        </div>

        <Separator className="my-4" />

        {/* Tools */}
        <div className="px-3">
          {!isCollapsed && (
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tools
            </h3>
          )}
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3',
                isCollapsed && 'justify-center px-0'
              )}
              onClick={onOpenTactics}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span>Story Tactics</span>}
            </Button>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3',
                isCollapsed && 'justify-center px-0'
              )}
              onClick={onOpenCoach}
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span>AI Coach</span>}
            </Button>
          </nav>
        </div>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="p-3 border-t border-border">
        <div className={cn(
          'flex items-center gap-2',
          isCollapsed ? 'flex-col' : 'justify-between'
        )}>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
