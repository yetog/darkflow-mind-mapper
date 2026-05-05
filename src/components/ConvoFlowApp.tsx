import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar, { AppSection } from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MindMapView from '@/components/views/MindMapView';
import TimelineView from '@/components/views/TimelineView';
import CarouselView from '@/components/views/CarouselView';
import TacticsFullView from '@/components/tactics/TacticsFullView';
import VocabBrowser from '@/components/vocab/VocabBrowser';
import CoachPanel from '@/components/coach/CoachPanel';
import VoiceCoach from '@/components/coach/VoiceCoach';
import WelcomeModal from '@/components/WelcomeModal';
import PracticeMode from '@/components/practice/PracticeMode';
import ProgressDashboard from '@/components/progress/ProgressDashboard';
import LessonsBrowser from '@/components/lessons/LessonsBrowser';
import FearModule from '@/components/lessons/FearModule';
import StoryJournal from '@/components/stories/StoryJournal';
import LessonPlayer from '@/components/lessons/LessonPlayer';
import { useUserProgress } from '@/hooks/useUserProgress';
import { ViewMode, ConversationType, ConversationPlan, ConversationNode } from '@/types/conversation';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { toast } from 'sonner';

const ConvoFlowApp = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<ViewMode>('mindmap');
  const [activeSection, setActiveSection] = useState<AppSection>('plan');
  const [showCoach, setShowCoach] = useState(false);
  const [showVoiceCoach, setShowVoiceCoach] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const { progress, addSession } = useUserProgress();

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

  const handleOpenCoach = () => {
    setShowWelcome(false);
    setShowCoach(true);
  };

  const handleOpenFearModule = () => {
    setActiveSection('fear-module');
  };

  const handleSectionChange = (section: AppSection) => {
    setActiveSection(section);
  };

  const handleApplyTacticToMindMap = (nodes: ConversationNode[]) => {
    // Merge tactic steps as children of the existing root node
    setCurrentPlan(prev => {
      const existingRoot = prev.nodes[0];
      if (!existingRoot) {
        return { ...prev, nodes, updatedAt: new Date() };
      }
      const tacticChildren = nodes[0]?.children || [];
      const updatedRoot: ConversationNode = {
        ...existingRoot,
        children: [...(existingRoot.children || []), ...tacticChildren],
      };
      return { ...prev, nodes: [updatedRoot, ...prev.nodes.slice(1)], updatedAt: new Date() };
    });
    setActiveSection('plan');
  };

  const handleStartLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveSection('active-lesson');
  };

  const handleSave = () => {
    try {
      localStorage.setItem('convoflow-current-plan', JSON.stringify(currentPlan));
      toast.success('Plan saved successfully');
    } catch {
      toast.error('Failed to save plan');
    }
  };

  const handleExport = () => {
    try {
      const blob = new Blob([JSON.stringify(currentPlan, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentPlan.title.replace(/\s+/g, '-').toLowerCase()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Plan exported');
    } catch {
      toast.error('Failed to export plan');
    }
  };

  const handleShare = () => {
    const children = currentPlan.nodes[0]?.children || [];
    const outline = children.map((n, i) => `${i + 1}. ${n.label}${n.description ? ` — ${n.description}` : ''}`).join('\n');
    const text = `${currentPlan.title}\nType: ${currentPlan.type}\n\n${outline}`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Plan outline copied to clipboard');
    }).catch(() => {
      toast.error('Failed to copy to clipboard');
    });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <ProgressDashboard
            onStartPractice={() => setActiveSection('practice')}
            onOpenLessons={() => setActiveSection('lessons')}
            onOpenTactics={() => setActiveSection('tactics')}
            progress={progress}
          />
        );
      case 'practice':
        return <PracticeMode onSessionComplete={addSession} />;
      case 'lessons':
        return <LessonsBrowser onOpenFearModule={handleOpenFearModule} onStartLesson={handleStartLesson} />;
      case 'active-lesson':
        return activeLessonId ? (
          <LessonPlayer
            lessonId={activeLessonId}
            onClose={() => setActiveSection('lessons')}
            onStartPractice={() => setActiveSection('practice')}
          />
        ) : null;
      case 'fear-module':
        return <FearModule />;
      case 'tactics':
        return (
          <TacticsFullView 
            conversationType={currentPlan.type}
            onApplyToMindMap={handleApplyTacticToMindMap}
            onStartPractice={() => setActiveSection('practice')}
          />
        );
      case 'vocabulary':
        return <VocabBrowser />;
      case 'stories':
        return <StoryJournal />;
      case 'plan':
      default:
        return renderActiveView();
    }
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

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Dashboard';
      case 'practice':
        return 'Practice Mode';
      case 'lessons':
      case 'active-lesson':
        return 'Lessons';
      case 'fear-module':
        return 'Overcome Fear';
      case 'tactics':
        return 'Story Tactics';
      case 'vocabulary':
        return 'Vocabulary & Phrases';
      case 'stories':
        return 'My Stories';
      case 'plan':
      default:
        return currentPlan.title;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Welcome Modal */}
      <WelcomeModal
        open={showWelcome}
        onOpenChange={setShowWelcome}
        onSelectType={handleSelectType}
        onOpenCoach={handleOpenCoach}
      />

      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={activeView}
        onViewChange={setActiveView}
        onOpenTactics={() => setActiveSection('tactics')}
        onOpenCoach={() => setShowCoach(true)}
        onNewPlan={handleNewPlan}
        currentType={currentPlan.type}
        onTypeChange={handleTypeChange}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={getSectionTitle()}
          conversationType={activeSection === 'plan' ? currentPlan.type : undefined}
          onTypeChange={activeSection === 'plan' ? handleTypeChange : undefined}
          onSave={activeSection === 'plan' ? handleSave : undefined}
          onShare={activeSection === 'plan' ? handleShare : undefined}
          onExport={activeSection === 'plan' ? handleExport : undefined}
        />

        {/* View Area with Page Transitions */}
        <main className="flex-1 overflow-hidden relative">
          {activeSection === 'plan' && (
            <div className="absolute inset-0 gradient-glow pointer-events-none" />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection + activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>


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
