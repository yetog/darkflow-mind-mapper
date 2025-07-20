
import { API_ENDPOINTS, InputType } from '@/utils/input-detection';

export interface NodeData {
  id: string;
  label: string;
  details?: string;
  children?: string[];
}

export interface MindMapResponse {
  nodes: NodeData[];
  mermaidSyntax: string;
}

export async function generateMindMap(input: string, inputType: InputType): Promise<MindMapResponse> {
  const endpoint = API_ENDPOINTS[inputType];
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        input_value: input 
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed, using mock data:', error);
    
    // Fallback to mock data for development
    return generateMockMindMap(input);
  }
}

function generateMockMindMap(input: string): MindMapResponse {
  const nodes: NodeData[] = [
    {
      id: 'root',
      label: 'Central Topic',
      details: `Main concept derived from: ${input.substring(0, 50)}...`,
      children: ['branch1', 'branch2', 'branch3']
    },
    {
      id: 'branch1',
      label: 'Key Concept 1',
      details: 'First major branch exploring fundamental aspects',
      children: ['sub1', 'sub2']
    },
    {
      id: 'branch2',
      label: 'Key Concept 2',
      details: 'Second major branch diving into important details',
      children: ['sub3', 'sub4']
    },
    {
      id: 'branch3',
      label: 'Key Concept 3',
      details: 'Third major branch covering additional perspectives',
      children: ['sub5', 'sub6']
    },
    {
      id: 'sub1',
      label: 'Sub-topic 1.1',
      details: 'Detailed exploration of the first sub-concept'
    },
    {
      id: 'sub2',
      label: 'Sub-topic 1.2',
      details: 'Further analysis of related themes'
    },
    {
      id: 'sub3',
      label: 'Sub-topic 2.1',
      details: 'In-depth examination of secondary concepts'
    },
    {
      id: 'sub4',
      label: 'Sub-topic 2.2',
      details: 'Additional insights and connections'
    },
    {
      id: 'sub5',
      label: 'Sub-topic 3.1',
      details: 'Comprehensive analysis of tertiary elements'
    },
    {
      id: 'sub6',
      label: 'Sub-topic 3.2',
      details: 'Final perspectives and conclusions'
    }
  ];

  const mermaidSyntax = `
    flowchart LR
      root[${nodes[0].label}] --> branch1[${nodes[1].label}]
      root --> branch2[${nodes[2].label}]
      root --> branch3[${nodes[3].label}]
      branch1 --> sub1[${nodes[4].label}]
      branch1 --> sub2[${nodes[5].label}]
      branch2 --> sub3[${nodes[6].label}]
      branch2 --> sub4[${nodes[7].label}]
      branch3 --> sub5[${nodes[8].label}]
      branch3 --> sub6[${nodes[9].label}]
  `;

  return { nodes, mermaidSyntax };
}
