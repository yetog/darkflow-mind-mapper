import React from 'react';
import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';
import { motion } from 'framer-motion';

const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  return (
    <>
      {/* Background glow */}
      <path
        d={edgePath}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={6}
        strokeOpacity={0.1}
        style={{
          filter: 'blur(4px)',
        }}
      />
      
      {/* Main edge with animation */}
      <motion.path
        id={id}
        d={edgePath}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={2}
        strokeOpacity={0.6}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          ease: 'easeOut',
          delay: 0.2 
        }}
        style={style}
        markerEnd={markerEnd}
      />

      {/* Animated dot traveling along the edge */}
      <motion.circle
        r={3}
        fill="hsl(var(--primary))"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay: 1,
        }}
        style={{
          offsetPath: `path('${edgePath}')`,
        }}
        opacity={0.8}
      />
    </>
  );
};

export default AnimatedEdge;
