import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Sparkles,
  Lightbulb,
  HelpCircle,
} from 'lucide-react';
import { ConversationPlan, ConversationType, CONVERSATION_TYPES } from '@/types/conversation';
import { cn } from '@/lib/utils';

interface CoachPanelProps {
  plan: ConversationPlan;
  onClose: () => void;
  onTypeChange?: (type: ConversationType) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  typeRecommendation?: ConversationType;
}

const CoachPanel = ({ plan, onClose, onTypeChange }: CoachPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your conversation coach. I see you're working on "${plan.title}" - a ${plan.type}. How can I help you prepare?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [consultationStep, setConsultationStep] = useState<number | null>(null);
  const [consultationAnswers, setConsultationAnswers] = useState<string[]>([]);

  const quickActions = [
    { label: 'Help me choose a conversation type', icon: HelpCircle },
    { label: 'Suggest an opening hook', icon: Sparkles },
    { label: 'Review my structure', icon: Lightbulb },
    { label: 'Practice Q&A', icon: Bot },
  ];

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    // Handle consultation flow
    if (consultationStep !== null) {
      const newAnswers = [...consultationAnswers, currentInput];
      setConsultationAnswers(newAnswers);
      
      setTimeout(() => {
        const nextStep = consultationStep + 1;
        const consultationResponse = getConsultationResponse(nextStep, newAnswers, onTypeChange);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: consultationResponse.content,
          timestamp: new Date(),
          typeRecommendation: consultationResponse.recommendation,
        };
        setMessages(prev => [...prev, assistantMessage]);
        
        if (consultationResponse.complete) {
          setConsultationStep(null);
          setConsultationAnswers([]);
        } else {
          setConsultationStep(nextStep);
        }
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Check if user wants to start consultation
    if (currentInput.toLowerCase().includes('help me choose') || 
        currentInput.toLowerCase().includes('which type') ||
        currentInput.toLowerCase().includes('what type')) {
      setConsultationStep(0);
      setTimeout(() => {
        const consultationResponse = getConsultationResponse(0, [], onTypeChange);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: consultationResponse.content,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Simulate AI response (will be replaced with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getSimulatedResponse(currentInput, plan),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleApplyRecommendation = (type: ConversationType) => {
    if (onTypeChange) {
      onTypeChange(type);
      const typeConfig = CONVERSATION_TYPES.find(t => t.id === type);
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Great choice! I've set your conversation type to **${typeConfig?.label}**. Now let's make your ${typeConfig?.label.toLowerCase()} shine! What would you like to work on first?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice input will be implemented with ElevenLabs
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // Voice output will be implemented with ElevenLabs
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">AI Coach</h2>
              <p className="text-xs text-muted-foreground">Powered by Lovable AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSpeaking}
              className={cn(isSpeaking && 'text-primary')}
            >
              {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.label)}
              className="gap-2"
            >
              <action.icon className="h-3 w-3" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' && 'flex-row-reverse'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  message.role === 'assistant'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div
                className={cn(
                  'max-w-[80%] rounded-lg p-3',
                  message.role === 'assistant'
                    ? 'bg-muted text-foreground'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.typeRecommendation && (
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => handleApplyRecommendation(message.typeRecommendation!)}
                  >
                    Apply {CONVERSATION_TYPES.find(t => t.id === message.typeRecommendation)?.label} Type
                  </Button>
                )}
                <span className="text-xs opacity-60 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/20 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Context Card */}
      <div className="px-4 py-2 border-t border-border">
        <Card className="p-3 bg-muted/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className={`badge-${plan.type}`}>
              {plan.type}
            </Badge>
            <span>•</span>
            <span>{plan.nodes[0]?.children?.length || 0} segments</span>
            <span>•</span>
            <span>{plan.duration || 0} min</span>
          </div>
        </Card>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={cn(isListening && 'text-red-500 border-red-500')}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            placeholder="Ask your coach anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Consultation flow for choosing conversation type
interface ConsultationResponse {
  content: string;
  complete: boolean;
  recommendation?: ConversationType;
}

const CONSULTATION_QUESTIONS = [
  "Let me help you find the right conversation type! First, tell me: **What's the occasion?** Is it formal (business/professional) or casual (social/informal)?",
  "Got it! **How many people will be involved?**\n• Just 1-2 others\n• A small group (3-10)\n• A larger audience (10+)",
  "**What's your main goal for this conversation?**\n• Build relationships or network\n• Make decisions or align on next steps\n• Inform, present, or persuade\n• Discuss, debate, or share perspectives\n• Teach or train others",
  "Last question: **Are you leading/presenting or participating/collaborating?**",
];

const getConsultationResponse = (
  step: number, 
  answers: string[], 
  onTypeChange?: (type: ConversationType) => void
): ConsultationResponse => {
  if (step < CONSULTATION_QUESTIONS.length) {
    return {
      content: CONSULTATION_QUESTIONS[step],
      complete: false,
    };
  }

  // Analyze answers to recommend type
  const allAnswers = answers.join(' ').toLowerCase();
  let recommendation: ConversationType = 'meeting';
  let reasoning = '';

  if (allAnswers.includes('teach') || allAnswers.includes('train') || allAnswers.includes('workshop')) {
    recommendation = 'lesson';
    reasoning = "Based on your goals of teaching or training, a **Lesson** format would work best. This gives you structure for educational content with clear learning objectives.";
  } else if (allAnswers.includes('present') || allAnswers.includes('persuade') || allAnswers.includes('inform') || allAnswers.includes('leading')) {
    if (allAnswers.includes('larger') || allAnswers.includes('10+')) {
      recommendation = 'presentation';
      reasoning = "You're presenting to a larger group with a persuasive or informative goal. A **Presentation** format will help you structure your narrative arc and key messages.";
    } else {
      recommendation = 'meeting';
      reasoning = "You're leading a focused session with a smaller group. A **Meeting** format gives you flexibility to inform and discuss while driving toward decisions.";
    }
  } else if (allAnswers.includes('discuss') || allAnswers.includes('debate') || allAnswers.includes('perspectives')) {
    recommendation = 'panel';
    reasoning = "You're looking to explore multiple perspectives and facilitate discussion. A **Panel** format helps structure balanced discourse and Q&A.";
  } else if (allAnswers.includes('casual') || allAnswers.includes('network') || allAnswers.includes('relationship')) {
    recommendation = 'gathering';
    reasoning = "This sounds like a social setting focused on connection. A **Gathering** format gives you conversation starters and networking tactics.";
  } else if (allAnswers.includes('decision') || allAnswers.includes('align') || allAnswers.includes('small')) {
    recommendation = 'meeting';
    reasoning = "You're focused on alignment and decisions with a smaller group. A **Meeting** format provides structure for productive collaboration.";
  }

  return {
    content: `${reasoning}\n\n🎯 **My recommendation: ${CONVERSATION_TYPES.find(t => t.id === recommendation)?.label}**\n\nClick the button below to apply this type, or tell me more if you'd like to explore other options.`,
    complete: true,
    recommendation,
  };
};

// Temporary simulated responses
const getSimulatedResponse = (input: string, plan: ConversationPlan): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('opening') || lowerInput.includes('hook')) {
    return `Great question! For a ${plan.type}, I'd suggest starting with one of these hooks:\n\n1. **The Dragon & The City**: "Our Q1 was a battle between where we were and where we needed to be..."\n\n2. **That's Funny**: Start with a surprising statistic or unexpected insight from the quarter.\n\n3. **Story Hook - Question**: Open with a provocative question like "What if everything we thought we knew about our market was wrong?"\n\nWould you like me to help develop any of these approaches?`;
  }
  
  if (lowerInput.includes('structure') || lowerInput.includes('review')) {
    const segments = plan.nodes[0]?.children?.length || 0;
    return `Looking at your ${plan.type} structure with ${segments} segments:\n\n✅ Good: You have a clear opening and closing\n✅ Good: Q&A session at the end\n\n💡 Suggestion: Consider adding a "Man In A Hole" arc - start positive, acknowledge challenges honestly, then build back up to solutions and future vision.\n\n💡 Suggestion: Your emotional journey could be stronger. Try mapping highs and lows using the Emotional Dashboard tactic.\n\nWant me to suggest specific improvements to any segment?`;
  }
  
  if (lowerInput.includes('practice') || lowerInput.includes('q&a')) {
    return `Let's practice Q&A! I'll play the role of a skeptical stakeholder. Here's my first question:\n\n🎯 "The numbers look good, but what's preventing our competitors from achieving the same results next quarter?"\n\nTake your time to respond. I'll give you feedback on your answer using storytelling techniques from the deck.\n\n*Tip: Remember the "Hero & Guide" tactic - position yourself as the guide who has unique expertise to navigate this challenge.*`;
  }
  
  return `I understand you're asking about "${input}". Here are a few ways I can help with your ${plan.type}:\n\n1. **Suggest story tactics** that match your conversation type\n2. **Review your structure** and emotional arc\n3. **Practice Q&A** with simulated tough questions\n4. **Refine specific segments** with storytelling techniques\n\nWhat would be most helpful right now?`;
};

export default CoachPanel;
