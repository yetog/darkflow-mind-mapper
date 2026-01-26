import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  Position,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TacticDiagram as TacticDiagramType, getDiagramForTactic, generateDiagramFromSteps, DiagramNode } from '@/data/tactic-diagrams';
import { StorytellerTactic } from '@/types/tactics';
import { cn } from '@/lib/utils';

interface TacticDiagramProps {
  tactic: StorytellerTactic;
  className?: string;
  interactive?: boolean;
}

const nodeColorsByType = {
  start: 'bg-green-500/20 border-green-500/50 text-green-400',
  end: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
  peak: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
  low: 'bg-rose-500/20 border-rose-500/50 text-rose-400',
  middle: 'bg-secondary border-border text-foreground',
  branch: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
};

const CustomNode = ({ data }: { data: { label: string; description?: string; nodeType?: string } }) => {
  const colorClass = nodeColorsByType[data.nodeType as keyof typeof nodeColorsByType] || nodeColorsByType.middle;
  
  return (
    <div className={cn(
      "px-4 py-3 rounded-lg border-2 min-w-[120px] text-center",
      colorClass
    )}>
      <div className="font-medium text-sm">{data.label}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1 max-w-[150px]">
          {data.description}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const TacticDiagram = ({ tactic, className, interactive = true }: TacticDiagramProps) => {
  const { nodes, edges } = useMemo(() => {
    // Try to get predefined diagram, or generate from steps
    let diagram = getDiagramForTactic(tactic.id);
    
    if (!diagram) {
      // Generate a diagram from the tactic's steps
      const shape = getShapeForCategory(tactic.category);
      diagram = generateDiagramFromSteps(tactic.id, tactic.steps, shape);
    }

    // Convert to React Flow format
    const flowNodes: Node[] = diagram.nodes.map((node) => ({
      id: node.id,
      type: 'custom',
      position: node.position,
      data: { 
        label: node.label, 
        description: node.description,
        nodeType: node.type,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    }));

    const flowEdges: Edge[] = diagram.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: edge.animated,
      type: 'smoothstep',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'hsl(var(--primary))',
      },
      style: {
        stroke: 'hsl(var(--primary) / 0.5)',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: 'hsl(var(--muted-foreground))',
        fontSize: 10,
      },
    }));

    return { nodes: flowNodes, edges: flowEdges };
  }, [tactic]);

  // Calculate bounds for fitView
  const fitViewOptions = useMemo(() => ({
    padding: 0.3,
    maxZoom: 1.2,
  }), []);

  return (
    <div className={cn("w-full h-[300px] rounded-lg overflow-hidden bg-card/50 border border-border", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        nodesDraggable={interactive}
        nodesConnectable={false}
        elementsSelectable={interactive}
        panOnDrag={interactive}
        zoomOnScroll={interactive}
        preventScrolling={!interactive}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="hsl(var(--border))" gap={20} />
        {interactive && <Controls showInteractive={false} />}
      </ReactFlow>
    </div>
  );
};

// Helper to determine diagram shape based on tactic category
function getShapeForCategory(category: string): 'arc' | 'linear' | 'circular' | 'tree' | 'zigzag' | 'parallel' | 'hub' {
  switch (category) {
    case 'structure':
      return 'arc';
    case 'concept':
      return 'tree';
    case 'explore':
      return 'circular';
    case 'character':
      return 'hub';
    case 'function':
    case 'recipe':
      return 'linear';
    case 'style':
      return 'zigzag';
    case 'organize':
      return 'parallel';
    default:
      return 'linear';
  }
}

export default TacticDiagram;
