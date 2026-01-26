import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  index?: number;
  className?: string;
  hoverScale?: boolean;
  hoverLift?: boolean;
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: (delay: number) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.4,
      delay: delay * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }),
};

export const AnimatedCard = ({ 
  children, 
  delay = 0, 
  index = 0,
  className,
  hoverScale = true,
  hoverLift = true,
}: AnimatedCardProps) => {
  const actualDelay = index || delay;
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={actualDelay}
      whileHover={hoverScale || hoverLift ? {
        scale: hoverScale ? 1.02 : 1,
        y: hoverLift ? -4 : 0,
        transition: { duration: 0.2 }
      } : undefined}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
};

// Staggered container for lists of animated cards
interface StaggeredContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const StaggeredContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className,
}: StaggeredContainerProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated number counter
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ value, duration = 1, className }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    const startValue = displayValue;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (value - startValue) * easeOut);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
};

// Animated progress bar
interface AnimatedProgressProps {
  value: number;
  className?: string;
  barClassName?: string;
  delay?: number;
}

export const AnimatedProgress = ({ value, className, barClassName, delay = 0 }: AnimatedProgressProps) => {
  return (
    <div className={cn('h-2 bg-muted rounded-full overflow-hidden', className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={cn('h-full bg-primary rounded-full', barClassName)}
      />
    </div>
  );
};

// Fade in section wrapper
interface FadeInSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const FadeInSection = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  className,
}: FadeInSectionProps) => {
  const directionOffsets = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionOffsets[direction]
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Pulsing element (for buttons, badges)
interface PulsingElementProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}

export const PulsingElement = ({ children, className, enabled = true }: PulsingElementProps) => {
  if (!enabled) return <div className={className}>{children}</div>;
  
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [1, 0.9, 1]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
