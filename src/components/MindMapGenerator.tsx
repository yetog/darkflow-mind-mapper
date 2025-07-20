
import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme-toggle';
import { MindMapControls } from '@/components/mind-map-controls';
import { NodeDetails } from '@/components/node-details';
import { 
  Loader2, 
  Sparkles,
  Brain
} from 'lucide-react';
import { determineInputType, getPlaceholder, InputType } from '@/utils/input-detection';
import { generateMindMap, NodeData, MindMapResponse } from '@/services/langflow-api';

const MindMapGenerator = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mindMapData, setMindMapData] = useState<MindMapResponse | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [detectedInputType, setDetectedInputType] = useState<InputType>('PROMPT');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const mindMapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#e5e7eb',
        primaryBorderColor: '#1f2937',
        lineColor: '#374151',
        secondaryColor: '#1f2937',
        tertiaryColor: '#111827',
        background: '#0f172a',
        mainBkg: '#1e293b',
        secondBkg: '#334155',
        tertiaryBkg: '#475569'
      }
    });
  }, []);

  // Auto-detect input type
  useEffect(() => {
    if (input.trim()) {
      const detectedType = determineInputType(input);
      setDetectedInputType(detectedType);
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a URL, YouTube link, or text prompt.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Generating mind map for:', input, 'Type:', detectedInputType);
      
      const data = await generateMindMap(input, detectedInputType);
      setMindMapData(data);

      // Render the Mermaid diagram
      if (mindMapRef.current && data.mermaidSyntax) {
        mindMapRef.current.innerHTML = `<div class="mermaid">${data.mermaidSyntax}</div>`;
        await mermaid.run();
        
        // Add click handlers to nodes
        addNodeClickHandlers(data.nodes);
      }

      toast({
        title: "Success!",
        description: "Mind map generated successfully!",
      });

    } catch (error) {
      console.error('Error generating mind map:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate mind map. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNodeClickHandlers = (nodes: NodeData[]) => {
    setTimeout(() => {
      const nodeElements = mindMapRef.current?.querySelectorAll('[id*="flowchart-"]');
      nodeElements?.forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          const elementId = (element as HTMLElement).id;
          const nodeId = elementId.split('-').slice(-1)[0];
          const clickedNode = nodes.find(node => node.id === nodeId || node.label.includes(nodeId));
          if (clickedNode) {
            setSelectedNode(clickedNode);
            console.log('Node clicked:', clickedNode);
          }
        });
        element.classList.add('mind-map-node');
      });
    }, 1000);
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const resetView = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const downloadImage = async () => {
    if (!mindMapRef.current) return;

    try {
      const dataUrl = await toPng(mindMapRef.current, {
        backgroundColor: '#0f172a',
        width: mindMapRef.current.scrollWidth,
        height: mindMapRef.current.scrollHeight,
      });

      const link = document.createElement('a');
      link.download = `mindmap-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: "Download Complete",
        description: "Mind map saved as PNG image.",
      });
    } catch (error) {
      console.error('Error downloading mind map:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download mind map. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Mind Mapper
              </h1>
              <p className="text-muted-foreground">
                Generate interactive mind maps from URLs, YouTube videos, or text prompts using AI
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6 animate-slide-up">
            <Card className="glass-card p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Generate Mind Map</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Input ({detectedInputType})
                  </Label>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={getPlaceholder(detectedInputType)}
                    className="glass-card"
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  variant="premium"
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Mind Map
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Node Details */}
            <NodeDetails node={selectedNode} />
          </div>

          {/* Mind Map Display */}
          <div className="lg:col-span-3 space-y-6 animate-slide-up">
            <Card className="glass-card p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Interactive Mind Map</h2>
                
                {mindMapData && (
                  <MindMapControls
                    onZoomIn={zoomIn}
                    onZoomOut={zoomOut}
                    onReset={resetView}
                    onDownload={downloadImage}
                    zoomLevel={zoomLevel}
                  />
                )}

                <div className="min-h-[600px] flex items-center justify-center border border-border rounded-md">
                  {!mindMapData ? (
                    <div className="text-center space-y-4">
                      <Brain className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
                      <p className="text-muted-foreground">
                        Your mind map will appear here after generation
                      </p>
                    </div>
                  ) : (
                    <div 
                      ref={mindMapRef}
                      className="w-full h-full min-h-[600px] flex items-center justify-center overflow-auto"
                      style={{ 
                        backgroundColor: 'transparent',
                        transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                        transformOrigin: 'center'
                      }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindMapGenerator;
