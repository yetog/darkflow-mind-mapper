import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConversationNode } from '@/types/conversation';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Plus,
  Maximize2,
} from 'lucide-react';

interface MindMapViewProps {
  nodes: ConversationNode[];
  onNodesUpdate: (nodes: ConversationNode[]) => void;
}

const MindMapView = ({ nodes, onNodesUpdate }: MindMapViewProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize Mermaid with theme
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: 'hsl(226, 70%, 55%)',
        primaryTextColor: 'hsl(210, 40%, 96%)',
        primaryBorderColor: 'hsl(222, 47%, 20%)',
        lineColor: 'hsl(222, 47%, 30%)',
        secondaryColor: 'hsl(222, 47%, 14%)',
        tertiaryColor: 'hsl(222, 47%, 10%)',
        background: 'hsl(222, 47%, 8%)',
        mainBkg: 'hsl(222, 47%, 12%)',
        nodeBorder: 'hsl(226, 70%, 55%)',
        clusterBkg: 'hsl(222, 47%, 10%)',
        titleColor: 'hsl(210, 40%, 96%)',
        edgeLabelBackground: 'hsl(222, 47%, 10%)',
      },
      flowchart: {
        curve: 'basis',
        padding: 20,
        nodeSpacing: 50,
        rankSpacing: 60,
        htmlLabels: true,
      },
    });
  }, []);

  // Generate and render Mermaid diagram
  useEffect(() => {
    const generateDiagram = async () => {
      if (!mapRef.current || nodes.length === 0) return;

      const mermaidCode = generateMermaidCode(nodes);
      
      try {
        mapRef.current.innerHTML = '';
        const { svg } = await mermaid.render('mind-map-diagram', mermaidCode);
        mapRef.current.innerHTML = svg;
        
        // Add click handlers
        addNodeClickHandlers();
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    };

    generateDiagram();
  }, [nodes]);

  const generateMermaidCode = (nodes: ConversationNode[]): string => {
    let code = 'flowchart TB\n';
    
    const processNode = (node: ConversationNode, parentId?: string) => {
      const nodeShape = getNodeShape(node.type);
      const label = node.label.replace(/"/g, "'");
      code += `    ${node.id}${nodeShape[0]}"${label}"${nodeShape[1]}:::${node.type}\n`;
      
      if (parentId) {
        code += `    ${parentId} --> ${node.id}\n`;
      }
      
      if (node.children) {
        node.children.forEach(child => processNode(child, node.id));
      }
    };

    nodes.forEach(node => processNode(node));
    
    // Add styling with hex colors (Mermaid doesn't support hsl() in classDef)
    code += '\n    classDef topic fill:#4169E1,stroke:#2B4B9B,color:#fff\n';
    code += '    classDef question fill:#9B59B6,stroke:#7B2D9E,color:#fff\n';
    code += '    classDef transition fill:#2BC0A8,stroke:#1F9080,color:#fff\n';
    code += '    classDef activity fill:#F5A623,stroke:#C4841C,color:#000\n';
    code += '    classDef milestone fill:#27AE60,stroke:#1E8449,color:#fff\n';
    
    return code;
  };

  const getNodeShape = (type: ConversationNode['type']): [string, string] => {
    switch (type) {
      case 'question': return ['{{', '}}'];
      case 'transition': return ['([', '])'];
      case 'activity': return ['[[', ']]'];
      case 'milestone': return ['((', '))'];
      default: return ['[', ']'];
    }
  };

  const addNodeClickHandlers = () => {
    setTimeout(() => {
      const nodeElements = mapRef.current?.querySelectorAll('.node');
      nodeElements?.forEach((element) => {
        element.addEventListener('click', (e) => {
          const nodeId = element.id?.replace('flowchart-', '').split('-')[0];
          if (nodeId) {
            setSelectedNodeId(nodeId);
          }
        });
        (element as HTMLElement).style.cursor = 'pointer';
      });
    }, 100);
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.15, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.15, 0.3));
  const resetZoom = () => setZoomLevel(1);

  return (
    <div className="h-full flex flex-col p-6" ref={containerRef}>
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {nodes.length > 0 && nodes[0].children?.length || 0} nodes
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-card p-1">
            <Button variant="ghost" size="icon" onClick={zoomOut} className="h-8 w-8">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="px-3 text-sm font-medium min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button variant="ghost" size="icon" onClick={zoomIn} className="h-8 w-8">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={resetZoom} className="h-8 w-8">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mind Map Container */}
      <Card className="flex-1 glass-card overflow-hidden">
        <div 
          className="w-full h-full overflow-auto flex items-center justify-center custom-scrollbar p-8"
          style={{
            background: 'radial-gradient(circle at center, hsl(222 47% 10%) 0%, hsl(222 47% 6%) 100%)',
          }}
        >
          {nodes.length === 0 ? (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <Plus className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Start Your Conversation Plan
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Add topics, questions, and transitions to build out your conversation structure
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add First Topic
              </Button>
            </div>
          ) : (
            <div 
              ref={mapRef}
              className="transition-transform duration-200"
              style={{ 
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default MindMapView;
