import React, { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import MindMapNode, { MindMapNodeData } from './MindMapNode';
import AnimatedEdge from './AnimatedEdge';
import { ConversationNode } from '@/types/conversation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download,
  Maximize2,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReactFlowMindMapProps {
  nodes: ConversationNode[];
  onNodesUpdate: (nodes: ConversationNode[]) => void;
  onNodeSelect?: (nodeId: string | null) => void;
  className?: string;
}

const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

// Convert ConversationNode tree to ReactFlow nodes/edges
const convertToFlowElements = (
  conversationNodes: ConversationNode[],
  callbacks: {
    onAddChild: (nodeId: string) => void;
    onDelete: (nodeId: string) => void;
    onEdit: (nodeId: string) => void;
  }
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  const processNode = (
    node: ConversationNode, 
    parentId: string | null, 
    level: number, 
    index: number,
    siblingCount: number
  ) => {
    const xSpacing = 250;
    const ySpacing = 120;
    
    // Calculate horizontal position based on sibling index
    const xOffset = (index - (siblingCount - 1) / 2) * xSpacing;
    
    const flowNode: Node = {
      id: node.id,
      type: 'mindmap',
      position: { 
        x: parentId ? xOffset : 0, 
        y: level * ySpacing 
      },
      data: {
        label: node.label,
        description: node.description,
        type: node.type,
        duration: node.duration,
        emotionalTone: node.emotionalTone,
        isRoot: !parentId,
        onAddChild: callbacks.onAddChild,
        onDelete: callbacks.onDelete,
        onEdit: callbacks.onEdit,
      } as MindMapNodeData,
    };
    
    nodes.push(flowNode);
    
    if (parentId) {
      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        type: 'animated',
        animated: true,
      });
    }
    
    if (node.children) {
      node.children.forEach((child, childIndex) => {
        processNode(child, node.id, level + 1, childIndex, node.children!.length);
      });
    }
  };
  
  conversationNodes.forEach((node, index) => {
    processNode(node, null, 0, index, conversationNodes.length);
  });
  
  return { nodes, edges };
};

const ReactFlowMindMap = ({ 
  nodes: conversationNodes, 
  onNodesUpdate,
  onNodeSelect,
  className 
}: ReactFlowMindMapProps) => {
  const [showMinimap, setShowMinimap] = useState(true);
  
  const callbacks = useMemo(() => ({
    onAddChild: (nodeId: string) => {
      const newNodeId = `node-${Date.now()}`;
      const addChildToNode = (nodes: ConversationNode[]): ConversationNode[] => {
        return nodes.map(node => {
          if (node.id === nodeId) {
            return {
              ...node,
              children: [
                ...(node.children || []),
                {
                  id: newNodeId,
                  label: 'New Topic',
                  type: 'topic' as const,
                  children: [],
                }
              ]
            };
          }
          if (node.children) {
            return { ...node, children: addChildToNode(node.children) };
          }
          return node;
        });
      };
      onNodesUpdate(addChildToNode(conversationNodes));
    },
    onDelete: (nodeId: string) => {
      const removeNode = (nodes: ConversationNode[]): ConversationNode[] => {
        return nodes
          .filter(node => node.id !== nodeId)
          .map(node => ({
            ...node,
            children: node.children ? removeNode(node.children) : undefined
          }));
      };
      onNodesUpdate(removeNode(conversationNodes));
    },
    onEdit: (nodeId: string) => {
      onNodeSelect?.(nodeId);
    },
  }), [conversationNodes, onNodesUpdate, onNodeSelect]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertToFlowElements(conversationNodes, callbacks),
    [conversationNodes, callbacks]
  );

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update flow nodes when conversation nodes change
  React.useEffect(() => {
    const { nodes, edges } = convertToFlowElements(conversationNodes, callbacks);
    setFlowNodes(nodes);
    setFlowEdges(edges);
  }, [conversationNodes, callbacks, setFlowNodes, setFlowEdges]);

  const onConnect = useCallback(
    (params: Connection) => setFlowEdges((eds) => addEdge({ ...params, type: 'animated' }, eds)),
    [setFlowEdges]
  );

  const nodeCount = useMemo(() => {
    const countNodes = (nodes: ConversationNode[]): number => {
      return nodes.reduce((acc, node) => {
        return acc + 1 + (node.children ? countNodes(node.children) : 0);
      }, 0);
    };
    return countNodes(conversationNodes);
  }, [conversationNodes]);

  return (
    <div className={cn('w-full h-full relative', className)}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'animated' }}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        className="touch-none"
      >
        {/* Custom Background */}
        <Background 
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="hsl(var(--muted-foreground))"
          className="opacity-20"
        />
        
        {/* Top Panel - Node Count */}
        <Panel position="top-left" className="!m-4">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {nodeCount} nodes
          </Badge>
        </Panel>

        {/* Top Right Controls */}
        <Panel position="top-right" className="!m-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowMinimap(!showMinimap)}
            >
              <Layers className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </Panel>

        {/* Custom Controls */}
        <Controls 
          showZoom={true}
          showFitView={true}
          showInteractive={false}
          position="bottom-right"
          className="!bg-background/80 !backdrop-blur-sm !border-border !rounded-lg !shadow-lg"
        />

        {/* Mini Map */}
        <AnimatePresence>
          {showMinimap && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-4 left-4"
            >
              <MiniMap
                nodeColor={(node) => {
                  const data = node.data as MindMapNodeData;
                  switch (data.type) {
                    case 'topic': return 'hsl(var(--primary))';
                    case 'question': return 'hsl(270 70% 50%)';
                    case 'transition': return 'hsl(170 70% 45%)';
                    case 'activity': return 'hsl(40 90% 50%)';
                    case 'milestone': return 'hsl(140 70% 45%)';
                    default: return 'hsl(var(--muted))';
                  }
                }}
                maskColor="hsl(var(--background) / 0.8)"
                className="!bg-background/80 !backdrop-blur-sm !border-border !rounded-lg"
                style={{ width: 160, height: 100 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ReactFlow>
    </div>
  );
};

export default ReactFlowMindMap;
