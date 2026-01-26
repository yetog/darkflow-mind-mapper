import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  mode?: 'fade' | 'slide' | 'scale';
  duration?: number;
}

const pageVariants: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }
};

export const PageTransition = ({ 
  children, 
  className,
  mode = 'slide',
  duration = 0.3
}: PageTransitionProps) => {
  const variants = pageVariants[mode];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn('w-full h-full', className)}
    >
      {children}
    </motion.div>
  );
};

// Wrapper for AnimatePresence with keyed children
interface AnimatedSwitchProps {
  children: React.ReactNode;
  switchKey: string;
  className?: string;
  mode?: 'fade' | 'slide' | 'scale';
}

export const AnimatedSwitch = ({ 
  children, 
  switchKey, 
  className,
  mode = 'slide'
}: AnimatedSwitchProps) => {
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={switchKey} className={className} mode={mode}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
};

// Section transition for internal page sections
interface SectionTransitionProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
}

export const SectionTransition = ({ children, show, className }: SectionTransitionProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
