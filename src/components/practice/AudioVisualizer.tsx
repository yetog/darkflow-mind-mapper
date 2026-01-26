import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface AudioVisualizerProps {
  isActive: boolean;
  level: number; // 0-1
  className?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  isActive, 
  level,
  className 
}) => {
  const bars = 20;
  
  // Generate bar heights based on audio level
  const barHeights = useMemo(() => {
    if (!isActive) {
      return Array(bars).fill(0.1);
    }

    // Create a wave pattern that responds to audio level
    return Array(bars).fill(0).map((_, i) => {
      const position = i / bars;
      const wave = Math.sin(position * Math.PI * 2 + Date.now() / 200) * 0.3;
      const randomness = Math.random() * 0.2;
      return Math.min(1, Math.max(0.1, level + wave + randomness));
    });
  }, [isActive, level, bars]);

  return (
    <div className={cn("flex items-center justify-center gap-1 h-full", className)}>
      {barHeights.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1.5 rounded-full transition-all duration-75",
            isActive 
              ? "bg-gradient-to-t from-primary to-primary/60" 
              : "bg-muted"
          )}
          style={{
            height: `${height * 100}%`,
            minHeight: '4px',
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
