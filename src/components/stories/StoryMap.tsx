import React, { useMemo, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { PersonalStory, STORY_CATEGORIES } from '@/types/stories';

interface StoryMapProps {
  stories: PersonalStory[];
  onEdit: (story: PersonalStory) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  personal: '#3b82f6',
  work: '#f59e0b',
  presentation: '#a855f7',
  anecdote: '#ec4899',
  'lesson-learned': '#14b8a6',
  inspiration: '#f97316',
};

const StoryMap: React.FC<StoryMapProps> = ({ stories, onEdit }) => {
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const tagMap = new Map<string, string[]>(); // tag -> story IDs

    // Position stories in a circle layout
    const radius = Math.max(200, stories.length * 60);
    const centerX = 400;
    const centerY = 300;

    stories.forEach((story, i) => {
      const angle = (2 * Math.PI * i) / stories.length - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const color = CATEGORY_COLORS[story.category] || '#6b7280';
      const categoryInfo = STORY_CATEGORIES.find(c => c.value === story.category);

      nodes.push({
        id: story.id,
        position: { x, y },
        data: {
          label: (
            <div
              className="cursor-pointer"
              onDoubleClick={() => onEdit(story)}
            >
              <div className="font-medium text-sm truncate max-w-[140px]">{story.title}</div>
              {categoryInfo && (
                <div className="text-[10px] opacity-70 mt-0.5">{categoryInfo.label}</div>
              )}
              <div className="text-[10px] opacity-50 mt-0.5">
                {story.tags.slice(0, 3).join(', ')}
              </div>
            </div>
          ),
        },
        style: {
          background: `${color}20`,
          border: `2px solid ${color}`,
          borderRadius: '12px',
          padding: '10px 14px',
          minWidth: '120px',
        },
      });

      // Track tags
      story.tags.forEach(tag => {
        if (!tagMap.has(tag)) tagMap.set(tag, []);
        tagMap.get(tag)!.push(story.id);
      });
    });

    // Create edges between stories sharing tags
    const edgeSet = new Set<string>();
    tagMap.forEach((storyIds, tag) => {
      for (let i = 0; i < storyIds.length; i++) {
        for (let j = i + 1; j < storyIds.length; j++) {
          const edgeKey = [storyIds[i], storyIds[j]].sort().join('--');
          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            edges.push({
              id: edgeKey,
              source: storyIds[i],
              target: storyIds[j],
              animated: true,
              style: { stroke: 'hsl(var(--primary))', strokeWidth: 1, opacity: 0.4 },
              label: tag,
              labelStyle: { fontSize: 10, fill: 'hsl(var(--muted-foreground))' },
              labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.8 },
            });
          }
        }
      }
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [stories, onEdit]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edgesState, , onEdgesChange] = useEdgesState(initialEdges);

  if (stories.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] text-muted-foreground text-sm">
        Add stories to see them visualized as a connected map
      </div>
    );
  }

  return (
    <div className="h-[600px] rounded-lg border bg-background/50 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="hsl(var(--muted-foreground) / 0.15)" />
        <Controls className="!bg-card !border-border !shadow-lg [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground" />
        <MiniMap
          nodeColor={(node) => {
            const style = node.style as Record<string, string> | undefined;
            return style?.border?.replace('2px solid ', '') || '#6b7280';
          }}
          className="!bg-card !border-border"
        />
      </ReactFlow>
    </div>
  );
};

export default StoryMap;