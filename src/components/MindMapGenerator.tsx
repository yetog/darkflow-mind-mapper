import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Loader2, 
  Globe, 
  Youtube, 
  MessageSquare,
  Sparkles,
  Brain
} from 'lucide-react';

interface NodeDetails {
  id: string;
  label: string;
  description: string;
  children?: string[];
}

interface MindMapData {
  nodes: NodeDetails[];
  mermaidCode: string;
}

const MindMapGenerator = () => {
  const [inputType, setInputType] = useState<'url' | 'youtube' | 'prompt'>('url');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeDetails | null>(null);
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

  const generateMindMap = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a URL, YouTube link, or text prompt.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock API call - replace with actual Langflow API endpoints
      const apiEndpoint = getApiEndpoint();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data
      const mockMindMapData = generateMockMindMap(inputValue);
      setMindMapData(mockMindMapData);

      // Render the Mermaid diagram
      if (mindMapRef.current) {
        mindMapRef.current.innerHTML = `<div class="mermaid">${mockMindMapData.mermaidCode}</div>`;
        await mermaid.run();
        
        // Add click handlers to nodes
        addNodeClickHandlers(mockMindMapData.nodes);
      }

      toast({
        title: "Mind Map Generated!",
        description: "Your interactive mind map is ready to explore.",
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

  const getApiEndpoint = () => {
    const endpoints = {
      url: 'http://127.0.0.1:7860/api/v1/run/1e9960df-6b9d-48eb-81c2-26af9e877f50?stream=false',
      youtube: 'http://127.0.0.1:7860/api/v1/run/13b817f9-1478-4f5a-8775-c6f4de8019e7?stream=false',
      prompt: 'http://127.0.0.1:7860/api/v1/run/f6081c11-6dc9-4941-8598-f21f97d94e4c?stream=false'
    };
    return endpoints[inputType];
  };

  const generateMockMindMap = (input: string): MindMapData => {
    // Generate mock mind map based on input
    const nodes: NodeDetails[] = [
      {
        id: 'A',
        label: 'Central Topic',
        description: `Main concept derived from: ${input.substring(0, 50)}...`,
        children: ['B', 'C', 'D']
      },
      {
        id: 'B',
        label: 'Key Concept 1',
        description: 'First major branch exploring fundamental aspects',
        children: ['E', 'F']
      },
      {
        id: 'C',
        label: 'Key Concept 2',
        description: 'Second major branch diving into important details',
        children: ['G', 'H']
      },
      {
        id: 'D',
        label: 'Key Concept 3',
        description: 'Third major branch covering additional perspectives',
        children: ['I', 'J']
      },
      {
        id: 'E',
        label: 'Sub-topic 1.1',
        description: 'Detailed exploration of the first sub-concept'
      },
      {
        id: 'F',
        label: 'Sub-topic 1.2',
        description: 'Further analysis of related themes'
      },
      {
        id: 'G',
        label: 'Sub-topic 2.1',
        description: 'In-depth examination of secondary concepts'
      },
      {
        id: 'H',
        label: 'Sub-topic 2.2',
        description: 'Additional insights and connections'
      },
      {
        id: 'I',
        label: 'Sub-topic 3.1',
        description: 'Comprehensive analysis of tertiary elements'
      },
      {
        id: 'J',
        label: 'Sub-topic 3.2',
        description: 'Final perspectives and conclusions'
      }
    ];

    const mermaidCode = `
      mindmap
        root((${nodes[0].label}))
          ${nodes[1].label}
            ${nodes[4].label}
            ${nodes[5].label}
          ${nodes[2].label}
            ${nodes[6].label}
            ${nodes[7].label}
          ${nodes[3].label}
            ${nodes[8].label}
            ${nodes[9].label}
    `;

    return { nodes, mermaidCode };
  };

  const addNodeClickHandlers = (nodes: NodeDetails[]) => {
    // Add click event listeners to mind map nodes
    setTimeout(() => {
      const nodeElements = document.querySelectorAll('.mindmap-node');
      nodeElements.forEach((element, index) => {
        element.addEventListener('click', () => {
          if (nodes[index]) {
            setSelectedNode(nodes[index]);
          }
        });
        element.classList.add('mind-map-node');
      });
    }, 500);
  };

  const downloadMindMap = async () => {
    if (!mindMapRef.current) return;

    try {
      const dataUrl = await toPng(mindMapRef.current, {
        backgroundColor: '#0f172a',
        width: mindMapRef.current.scrollWidth,
        height: mindMapRef.current.scrollHeight,
      });

      const link = document.createElement('a');
      link.download = 'mindmap.png';
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

  const getInputIcon = () => {
    switch (inputType) {
      case 'url': return <Globe className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'prompt': return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getInputPlaceholder = () => {
    switch (inputType) {
      case 'url': return 'Enter a URL to analyze...';
      case 'youtube': return 'Enter a YouTube video URL...';
      case 'prompt': return 'Enter your text or question...';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Mind Mapper
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generate interactive mind maps from URLs, YouTube videos, or text prompts using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6 animate-slide-up">
            <Card className="glass-card p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Generate Mind Map</h2>
              </div>

              <Tabs value={inputType} onValueChange={(value) => setInputType(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="youtube" className="flex items-center gap-2">
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </TabsTrigger>
                  <TabsTrigger value="prompt" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Prompt
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={inputType} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      {getInputIcon()}
                      Input
                    </Label>
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={getInputPlaceholder()}
                      className="glass-card"
                    />
                  </div>

                  <Button 
                    onClick={generateMindMap}
                    disabled={isLoading}
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
                </TabsContent>
              </Tabs>
            </Card>

            {/* Node Details */}
            {selectedNode && (
              <Card className="glass-card p-6 space-y-4 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedNode.id}</Badge>
                  <h3 className="font-semibold">{selectedNode.label}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedNode.description}
                </p>
                {selectedNode.children && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Connected to:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.children.map(childId => (
                        <Badge key={childId} variant="outline" className="text-xs">
                          {childId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Mind Map Display */}
          <div className="lg:col-span-2 space-y-6 animate-slide-up">
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Interactive Mind Map</h2>
                {mindMapData && (
                  <Button 
                    onClick={downloadMindMap}
                    variant="glass"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                    Download PNG
                  </Button>
                )}
              </div>

              <div className="min-h-[500px] flex items-center justify-center">
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
                    className="w-full h-full min-h-[500px] flex items-center justify-center"
                    style={{ backgroundColor: 'transparent' }}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindMapGenerator;