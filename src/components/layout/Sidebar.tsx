import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
  Users,
  Calendar,
  Presentation,
  GraduationCap,
  Mic,
  BarChart3,
} from 'lucide-react';
import { ViewMode, ConversationType, CONVERSATION_TYPES } from '@/types/conversation';

export type AppSection = 'plan' | 'practice' | 'lessons' | 'dashboard' | 'fear-module';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onOpenTactics: () => void;
  onOpenCoach: () => void;
  onNewPlan?: () => void;
  currentType?: ConversationType;
  onTypeChange?: (type: ConversationType) => void;
  activeSection?: AppSection;
  onSectionChange?: (section: AppSection) => void;
}

const TYPE_ICON_MAP = {
  Users,
  Calendar,
  Presentation,
  MessageSquare: MessageCircle,
  GraduationCap,
};

const TYPE_COLORS: Record<ConversationType, string> = {
  gathering: 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30',
  meeting: 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30',
  presentation: 'bg-purple-500/20 text-purple-500 hover:bg-purple-500/30',
  panel: 'bg-teal-500/20 text-teal-500 hover:bg-teal-500/30',
  lesson: 'bg-green-500/20 text-green-500 hover:bg-green-500/30',
};

const TYPE_ACTIVE_COLORS: Record<ConversationType, string> = {
  gathering: 'bg-amber-500 text-white',
  meeting: 'bg-blue-500 text-white',
  presentation: 'bg-purple-500 text-white',
  panel: 'bg-teal-500 text-white',
  lesson: 'bg-green-500 text-white',
};

const Sidebar = ({
  isCollapsed,
  onToggle,
  activeView,
  onViewChange,
  onOpenTactics,
  onOpenCoach,
  onNewPlan,
  currentType,
  onTypeChange,
  activeSection = 'plan',
  onSectionChange,
}: SidebarProps) => {
  const viewItems = [
    { id: 'mindmap' as ViewMode, label: 'Mind Map', icon: Map },
    { id: 'timeline' as ViewMode, label: 'Timeline', icon: Clock },
    { id: 'carousel' as ViewMode, label: 'Carousel', icon: Layers },
  ];

  // Removed fear-module from here - it's now under Lessons
  const sectionItems = [
    { id: 'dashboard' as AppSection, label: 'Dashboard', icon: BarChart3 },
    { id: 'practice' as AppSection, label: 'Practice', icon: Mic },
    { id: 'lessons' as AppSection, label: 'Lessons', icon: GraduationCap },
    { id: 'plan' as AppSection, label: 'Plan', icon: Map },
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
            onClick={onNewPlan}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && 'New Plan'}
          </Button>
        </div>

        <Separator className="my-4" />

        {/* Main Sections */}
        <div className="px-3">
          {!isCollapsed && (
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Sections
            </h3>
          )}
          <nav className="space-y-1">
            {sectionItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  isCollapsed && 'justify-center px-0',
                  item.id === 'practice' && 'text-primary'
                )}
                onClick={() => onSectionChange?.(item.id)}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </nav>
        </div>

        {/* Conversation Types Quick Switch - only show when in Plan section */}
        {activeSection === 'plan' && !isCollapsed && currentType && onTypeChange && (
          <>
            <Separator className="my-4" />
            <div className="px-3">
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Conversation Type
              </h3>
              <TooltipProvider>
                <div className="flex flex-wrap gap-1.5 px-2">
                  {CONVERSATION_TYPES.map((type) => {
                    const Icon = TYPE_ICON_MAP[type.icon as keyof typeof TYPE_ICON_MAP];
                    const isActive = currentType === type.id;
                    
                    return (
                      <Tooltip key={type.id}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => onTypeChange(type.id)}
                            className={cn(
                              'p-2 rounded-lg transition-all',
                              isActive 
                                ? TYPE_ACTIVE_COLORS[type.id]
                                : TYPE_COLORS[type.id]
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p className="font-medium">{type.label}</p>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          </>
        )}
        
        {/* Collapsed view - just show active type icon - only show when in Plan section */}
        {activeSection === 'plan' && isCollapsed && currentType && onTypeChange && (
          <>
            <Separator className="my-4" />
            <div className="px-3 flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      'p-2 rounded-lg',
                      TYPE_ACTIVE_COLORS[currentType]
                    )}>
                      {(() => {
                        const typeConfig = CONVERSATION_TYPES.find(t => t.id === currentType);
                        const Icon = typeConfig ? TYPE_ICON_MAP[typeConfig.icon as keyof typeof TYPE_ICON_MAP] : Users;
                        return <Icon className="h-4 w-4" />;
                      })()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="font-medium">
                      {CONVERSATION_TYPES.find(t => t.id === currentType)?.label}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </>
        )}

        {/* View Modes - only show when in Plan section */}
        {activeSection === 'plan' && (
          <>
            <Separator className="my-4" />
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
          </>
        )}

        {/* Tools */}
        <Separator className="my-4" />
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
