import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MindMapView from '@/components/views/MindMapView';
import TimelineView from '@/components/views/TimelineView';
import CarouselView from '@/components/views/CarouselView';
import TacticsBrowser from '@/components/tactics/TacticsBrowser';
import CoachPanel from '@/components/coach/CoachPanel';
import WelcomeModal from '@/components/WelcomeModal';
import { ViewMode, ConversationType, ConversationPlan, ConversationNode } from '@/types/conversation';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const ConvoFlowApp = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<ViewMode>('mindmap');
  const [showTactics, setShowTactics] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  
  // Current plan state
  const [currentPlan, setCurrentPlan] = useState<ConversationPlan>({
    id: 'demo-plan',
    title: 'Quarterly Strategy Review',
    type: 'presentation',
    description: 'Q1 2024 strategy presentation to leadership team',
    duration: 45,
    nodes: [
      {
        id: 'root',
        label: 'Q1 Strategy Review',
        type: 'topic',
        children: [
          {
            id: 'opening',
            label: 'Opening Hook',
            description: 'Start with key achievement',
            duration: 3,
            type: 'topic',
            emotionalTone: 'positive',
          },
          {
            id: 'challenges',
            label: 'Challenges Faced',
            description: 'Honest look at obstacles',
            duration: 8,
            type: 'topic',
            emotionalTone: 'negative',
          },
          {
            id: 'solutions',
            label: 'Solutions & Wins',
            description: 'How we overcame them',
            duration: 12,
            type: 'topic',
            emotionalTone: 'building',
          },
          {
            id: 'q2-plan',
            label: 'Q2 Roadmap',
            description: 'Looking ahead',
            duration: 10,
            type: 'topic',
            emotionalTone: 'positive',
          },
          {
            id: 'qa',
            label: 'Q&A Session',
            description: 'Open discussion',
            duration: 12,
            type: 'question',
            emotionalTone: 'neutral',
          },
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleTypeChange = (type: ConversationType) => {
    setCurrentPlan(prev => ({ ...prev, type }));
  };

  const handleNodesUpdate = (nodes: ConversationNode[]) => {
    setCurrentPlan(prev => ({ ...prev, nodes, updatedAt: new Date() }));
  };

  const handleNewPlan = () => {
    setShowWelcome(true);
  };

  const handleSelectType = (type: ConversationType) => {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    setCurrentPlan({
      id: `plan-${Date.now()}`,
      title: `New ${typeLabel}`,
      type,
      description: '',
      duration: 30,
      nodes: [
        {
          id: 'root',
          label: `New ${typeLabel}`,
          type: 'topic',
          children: [],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'mindmap':
        return (
          <MindMapView 
            nodes={currentPlan.nodes} 
            onNodesUpdate={handleNodesUpdate}
          />
        );
      case 'timeline':
        return (
          <TimelineView 
            nodes={currentPlan.nodes}
            totalDuration={currentPlan.duration || 60}
            onNodesUpdate={handleNodesUpdate}
          />
        );
      case 'carousel':
        return (
          <CarouselView 
            nodes={currentPlan.nodes}
            onNodesUpdate={handleNodesUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Welcome Modal */}
      <WelcomeModal
        open={showWelcome}
        onOpenChange={setShowWelcome}
        onSelectType={handleSelectType}
      />

      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={activeView}
        onViewChange={setActiveView}
        onOpenTactics={() => setShowTactics(true)}
        onOpenCoach={() => setShowCoach(true)}
        onNewPlan={handleNewPlan}
        currentType={currentPlan.type}
        onTypeChange={handleTypeChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={currentPlan.title}
          conversationType={currentPlan.type}
          onTypeChange={handleTypeChange}
        />

        {/* View Area */}
        <main className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 gradient-glow pointer-events-none" />
          {renderActiveView()}
        </main>
      </div>

      {/* Tactics Browser Sheet */}
      <Sheet open={showTactics} onOpenChange={setShowTactics}>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0">
          <TacticsBrowser 
            conversationType={currentPlan.type}
            onClose={() => setShowTactics(false)}
          />
        </SheetContent>
      </Sheet>

      {/* AI Coach Panel Sheet */}
      <Sheet open={showCoach} onOpenChange={setShowCoach}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <CoachPanel 
            plan={currentPlan}
            onClose={() => setShowCoach(false)}
            onTypeChange={handleTypeChange}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ConvoFlowApp;
