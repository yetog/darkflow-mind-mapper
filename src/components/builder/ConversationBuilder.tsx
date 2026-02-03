import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from '@/components/ui/resizable';
import ReactFlowMindMap from '@/components/mindmap/ReactFlowMindMap';
import EmptyStateGuide from './EmptyStateGuide';
import InputHub, { InputMode } from './InputHub';
import { ConversationNode } from '@/types/conversation';
import { analyzeContent } from '@/services/content-analyzer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Sparkles, 
  User,
  X,
  Maximize2,
  Minimize2,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ConversationBuilderProps {
  nodes: ConversationNode[];
  onNodesUpdate: (nodes: ConversationNode[]) => void;
}

const ConversationBuilder = ({ nodes, onNodesUpdate }: ConversationBuilderProps) => {
  const [showChat, setShowChat] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const isEmpty = nodes.length === 0 || (nodes.length === 1 && !nodes[0].children?.length);

  const handleStartChat = () => {
    setShowChat(true);
    setInputMode('chat');
    // Add initial AI greeting
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hi! I'm here to help you build your conversation plan. What are you preparing for? A presentation, meeting, or something else?",
          timestamp: new Date(),
        }
      ]);
    }
  };

  const handleStartPaste = () => {
    setShowChat(true);
    setInputMode('paste');
    if (messages.length === 0) {
      setMessages([
        {
          id: 'paste-intro',
          role: 'assistant',
          content: "Great! Paste your article, notes, or talking points below and I'll analyze them to create a structured mind map.",
          timestamp: new Date(),
        }
      ]);
    }
  };

  const handleStartVoice = () => {
    setShowChat(true);
    setInputMode('voice');
    if (messages.length === 0) {
      setMessages([
        {
          id: 'voice-intro',
          role: 'assistant',
          content: "I'm listening! Click the microphone and tell me about your topic. I'll transcribe and organize your thoughts.",
          timestamp: new Date(),
        }
      ]);
    }
  };

  const handleStartTemplate = () => {
    // For now, create a basic template structure
    const templateNode: ConversationNode = {
      id: 'root',
      label: 'Your Presentation',
      type: 'topic',
      children: [
        { id: 'intro', label: 'Introduction', type: 'topic', duration: 2, emotionalTone: 'positive' },
        { id: 'main-1', label: 'Key Point 1', type: 'topic', duration: 5 },
        { id: 'main-2', label: 'Key Point 2', type: 'topic', duration: 5 },
        { id: 'main-3', label: 'Key Point 3', type: 'topic', duration: 5 },
        { id: 'conclusion', label: 'Conclusion', type: 'topic', duration: 2, emotionalTone: 'positive' },
        { id: 'qa', label: 'Q&A', type: 'question', duration: 5 },
      ],
    };
    onNodesUpdate([templateNode]);
    setShowChat(true);
    setMessages([
      {
        id: 'template-intro',
        role: 'assistant',
        content: "I've created a basic presentation template for you. Double-click any node to edit it, or tell me more about your topic to customize it further!",
        timestamp: new Date(),
      }
    ]);
  };

  const handleSubmit = useCallback(async (content: string, mode: InputMode) => {
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    // Process based on mode
    if (mode === 'paste' && content.length > 100) {
      // Use content analyzer for paste mode
      setTimeout(() => {
        const analyzedNodes = analyzeContent(content);
        
        const aiResponse: Message = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `I've analyzed your content and identified ${analyzedNodes.length} key sections. I've added them to your mind map.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);

        if (analyzedNodes.length > 0) {
          if (nodes.length === 0) {
            // Create root with analyzed nodes as children
            const rootNode: ConversationNode = {
              id: 'root',
              label: 'My Plan',
              type: 'topic',
              children: analyzedNodes,
            };
            onNodesUpdate([rootNode]);
          } else {
            // Add analyzed nodes as children to existing root
            const updatedNodes = nodes.map((node, idx) => 
              idx === 0 
                ? { ...node, children: [...(node.children || []), ...analyzedNodes] }
                : node
            );
            onNodesUpdate(updatedNodes);
          }
        }

        setIsProcessing(false);
      }, 800);
    } else {
      // Regular chat mode
      setTimeout(() => {
        const aiResponse: Message = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: "Great! Let me help you structure that. I'll add some key points to your plan.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);

        // Mock adding nodes based on input
        if (nodes.length === 0) {
          const newRootNode: ConversationNode = {
            id: 'root',
            label: content.split(' ').slice(0, 4).join(' '),
            type: 'topic',
            description: content.slice(0, 100),
            children: [
              { id: `child-${Date.now()}`, label: 'Key Point 1', type: 'topic' },
              { id: `child-${Date.now() + 1}`, label: 'Key Point 2', type: 'topic' },
            ],
          };
          onNodesUpdate([newRootNode]);
        } else {
          // Add to existing root
          const newChild: ConversationNode = {
            id: `child-${Date.now()}`,
            label: content.split(' ').slice(0, 4).join(' '),
            type: 'topic',
          };
          const updatedNodes = nodes.map(node => ({
            ...node,
            children: [...(node.children || []), newChild],
          }));
          onNodesUpdate(updatedNodes);
        }

        setIsProcessing(false);
      }, 1000);
    }
  }, [nodes, onNodesUpdate]);

  const handleNodeSelect = (nodeId: string | null) => {
    setSelectedNodeId(nodeId);
  };

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        {isEmpty && !showChat ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <EmptyStateGuide
              onStartChat={handleStartChat}
              onStartPaste={handleStartPaste}
              onStartVoice={handleStartVoice}
              onStartTemplate={handleStartTemplate}
            />
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Mind Map Panel */}
              <ResizablePanel defaultSize={showChat ? 60 : 100} minSize={40}>
                <div className="h-full relative">
                  <ReactFlowMindMap
                    nodes={nodes}
                    onNodesUpdate={onNodesUpdate}
                    onNodeSelect={handleNodeSelect}
                  />
                  
                  {/* Show chat toggle if hidden */}
                  {!showChat && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute bottom-4 right-4"
                    >
                      <Button
                        onClick={handleStartChat}
                        className="shadow-lg"
                      >
                        <Bot className="w-4 h-4 mr-2" />
                        Open AI Assistant
                      </Button>
                    </motion.div>
                  )}
                </div>
              </ResizablePanel>

              {/* Chat Panel */}
              {showChat && (
                <>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={40} minSize={25} maxSize={50}>
                    <div className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-l border-border">
                      {/* Chat Header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">AI Builder</h3>
                            <p className="text-xs text-muted-foreground">Building your plan together</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
                          >
                            {isPanelExpanded ? (
                              <Minimize2 className="h-4 w-4" />
                            ) : (
                              <Maximize2 className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setShowChat(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Messages Area */}
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          <AnimatePresence>
                            {messages.map((message) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={cn(
                                  'flex gap-3',
                                  message.role === 'user' && 'flex-row-reverse'
                                )}
                              >
                                <div className={cn(
                                  'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                                  message.role === 'assistant' 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-muted text-muted-foreground'
                                )}>
                                  {message.role === 'assistant' ? (
                                    <Bot className="w-4 h-4" />
                                  ) : (
                                    <User className="w-4 h-4" />
                                  )}
                                </div>
                                <div className={cn(
                                  'flex-1 max-w-[85%] px-4 py-3 rounded-xl text-sm',
                                  message.role === 'assistant'
                                    ? 'bg-muted/50'
                                    : 'bg-primary text-primary-foreground'
                                )}>
                                  {message.content}
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>

                          {/* Processing indicator */}
                          {isProcessing && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex gap-3"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 rounded-xl">
                                <motion.div
                                  animate={{ opacity: [0.4, 1, 0.4] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="flex gap-1"
                                >
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </ScrollArea>

                      {/* Input Area */}
                      <div className="p-4 border-t border-border">
                        <InputHub
                          mode={inputMode}
                          onModeChange={setInputMode}
                          onSubmit={handleSubmit}
                          isProcessing={isProcessing}
                        />
                      </div>
                    </div>
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConversationBuilder;
