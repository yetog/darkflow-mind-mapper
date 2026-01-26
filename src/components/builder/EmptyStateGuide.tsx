import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  FileText, 
  Mic, 
  LayoutTemplate,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateGuideProps {
  onStartChat: () => void;
  onStartPaste: () => void;
  onStartVoice: () => void;
  onStartTemplate: () => void;
}

const options = [
  {
    id: 'chat',
    icon: MessageSquare,
    title: 'Chat with AI',
    description: 'Tell me about your topic and I\'ll help structure it',
    gradient: 'from-primary/20 to-blue-500/20',
    iconColor: 'text-primary',
    action: 'onStartChat',
  },
  {
    id: 'paste',
    icon: FileText,
    title: 'Paste Content',
    description: 'Drop in an article, notes, or talking points',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    action: 'onStartPaste',
  },
  {
    id: 'voice',
    icon: Mic,
    title: 'Speak Your Ideas',
    description: 'Talk through your presentation naturally',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    action: 'onStartVoice',
  },
  {
    id: 'template',
    icon: LayoutTemplate,
    title: 'Start from Template',
    description: 'Use a pre-built structure for your situation',
    gradient: 'from-teal-500/20 to-green-500/20',
    iconColor: 'text-teal-400',
    action: 'onStartTemplate',
  },
];

const EmptyStateGuide = ({ 
  onStartChat, 
  onStartPaste, 
  onStartVoice, 
  onStartTemplate 
}: EmptyStateGuideProps) => {
  const actions = {
    onStartChat,
    onStartPaste,
    onStartVoice,
    onStartTemplate,
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative w-24 h-24 mx-auto mb-6"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 blur-xl" />
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          
          {/* Orbiting dots */}
          <motion.div
            className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-purple-500/80"
            animate={{ 
              rotate: 360,
              x: [0, 10, 0, -10, 0],
              y: [0, -10, 0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -left-2 -bottom-2 w-3 h-3 rounded-full bg-teal-500/80"
            animate={{ 
              rotate: -360,
              x: [0, -8, 0, 8, 0],
              y: [0, 8, 0, -8, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-foreground mb-2"
        >
          Let's build something great together!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8"
        >
          How would you like to start your conversation plan?
        </motion.p>

        {/* Options Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => actions[option.action as keyof typeof actions]()}
              className={cn(
                'group relative p-5 rounded-xl text-left',
                'bg-gradient-to-br backdrop-blur-sm',
                'border border-border/50 hover:border-border',
                'transition-all duration-300',
                option.gradient
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-lg',
                  'bg-background/50 backdrop-blur-sm',
                  'flex items-center justify-center',
                  option.iconColor
                )}>
                  <option.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1 flex items-center gap-2">
                    {option.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmptyStateGuide;
