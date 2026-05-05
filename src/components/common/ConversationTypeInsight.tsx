import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConversationType } from '@/types/conversation';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TypeGuidance {
  tips: string[];
  structure: string;
}

const GUIDANCE: Record<ConversationType, TypeGuidance> = {
  presentation: {
    tips: [
      'Start with a compelling hook — a stat, question, or bold statement',
      'Follow the rule of 3: limit to three key messages',
      'End with a clear call-to-action your audience can act on immediately',
    ],
    structure: 'Hook → Problem → Solution → Key Points → Call-to-Action',
  },
  meeting: {
    tips: [
      'Set a clear agenda upfront so everyone knows what to expect',
      'Assign time blocks to each topic to stay on track',
      'End with action items and owners — never leave a meeting without next steps',
    ],
    structure: 'Agenda → Discussion Topics → Decisions → Action Items',
  },
  gathering: {
    tips: [
      'Prepare 3-5 conversation starters relevant to the group',
      'Focus on asking open-ended questions to draw people out',
      'Have a graceful exit line ready for when you need to move on',
    ],
    structure: 'Icebreaker → Open Discussion → Shared Activity → Wrap-up',
  },
  panel: {
    tips: [
      'Prepare concise answers (60-90 seconds) for likely questions',
      'Reference other panelists\' points to build a dynamic conversation',
      'Have 2-3 memorable stories or data points ready to stand out',
    ],
    structure: 'Opening Statement → Discussion Rounds → Audience Q&A → Closing Remark',
  },
  lesson: {
    tips: [
      'Start by explaining what learners will be able to do after the lesson',
      'Mix explanation with hands-on exercises every 10-15 minutes',
      'Check for understanding frequently — don\'t assume silence means clarity',
    ],
    structure: 'Learning Objective → Teach → Practice → Review → Assessment',
  },
};

interface ConversationTypeInsightProps {
  type: ConversationType;
}

const ConversationTypeInsight = ({ type }: ConversationTypeInsightProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const guidance = GUIDANCE[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-full left-0 right-0 z-30"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center gap-2 px-6 py-1.5 text-xs transition-colors',
          'bg-primary/5 hover:bg-primary/10 border-b border-border',
          'text-muted-foreground hover:text-foreground'
        )}
      >
        <Lightbulb className="h-3 w-3 text-primary flex-shrink-0" />
        <span className="truncate">
          Suggested flow: {guidance.structure}
        </span>
        {isExpanded ? (
          <ChevronUp className="h-3 w-3 ml-auto flex-shrink-0" />
        ) : (
          <ChevronDown className="h-3 w-3 ml-auto flex-shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-card/95 backdrop-blur-sm border-b border-border"
          >
            <div className="px-6 py-3 space-y-2">
              {guidance.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-primary font-medium mt-0.5">{i + 1}.</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ConversationTypeInsight;