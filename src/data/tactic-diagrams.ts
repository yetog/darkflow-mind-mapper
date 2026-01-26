// Tactic Diagrams - Visual representations of storytelling structures
// Each diagram defines nodes and edges for React Flow visualization

export type DiagramShape = 'arc' | 'linear' | 'circular' | 'tree' | 'zigzag' | 'parallel' | 'hub';

export interface DiagramNode {
  id: string;
  label: string;
  description?: string;
  position: { x: number; y: number };
  type?: 'start' | 'middle' | 'end' | 'peak' | 'low' | 'branch';
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface TacticDiagram {
  tacticId: string;
  shape: DiagramShape;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export const TACTIC_DIAGRAMS: TacticDiagram[] = [
  // Man in a Hole - U-shaped emotional arc
  {
    tacticId: 'man-in-a-hole',
    shape: 'arc',
    nodes: [
      { id: '1', label: 'Comfort Zone', description: 'Start in a stable situation', position: { x: 0, y: 0 }, type: 'start' },
      { id: '2', label: 'The Fall', description: 'Something goes wrong', position: { x: 150, y: 100 }, type: 'middle' },
      { id: '3', label: 'The Bottom', description: 'Crisis point', position: { x: 300, y: 200 }, type: 'low' },
      { id: '4', label: 'The Climb', description: 'Start to recover', position: { x: 450, y: 100 }, type: 'middle' },
      { id: '5', label: 'Better Place', description: 'Emerge stronger', position: { x: 600, y: 0 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // Five Ts - Linear timeline
  {
    tacticId: 'five-ts',
    shape: 'linear',
    nodes: [
      { id: '1', label: 'Tease', description: 'Hook the audience', position: { x: 0, y: 100 }, type: 'start' },
      { id: '2', label: 'Tension', description: 'Build the conflict', position: { x: 150, y: 100 }, type: 'middle' },
      { id: '3', label: 'Turning Point', description: 'The key moment', position: { x: 300, y: 100 }, type: 'peak' },
      { id: '4', label: 'Takeaway', description: 'The lesson learned', position: { x: 450, y: 100 }, type: 'middle' },
      { id: '5', label: 'To-do', description: 'Action for audience', position: { x: 600, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3', animated: true },
      { id: 'e3-4', source: '3', target: '4', animated: true },
      { id: 'e4-5', source: '4', target: '5', animated: true },
    ],
  },

  // Three Great Conflicts - Branching tree
  {
    tacticId: 'three-great-conflicts',
    shape: 'tree',
    nodes: [
      { id: '1', label: 'Your Story', description: 'Central theme', position: { x: 300, y: 0 }, type: 'start' },
      { id: '2', label: 'Person vs Person', description: 'Interpersonal conflict', position: { x: 100, y: 150 }, type: 'branch' },
      { id: '3', label: 'Person vs Self', description: 'Internal struggle', position: { x: 300, y: 150 }, type: 'branch' },
      { id: '4', label: 'Person vs World', description: 'External forces', position: { x: 500, y: 150 }, type: 'branch' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
    ],
  },

  // Voyage and Return - Circular journey
  {
    tacticId: 'voyage-return',
    shape: 'circular',
    nodes: [
      { id: '1', label: 'Home', description: 'The familiar world', position: { x: 300, y: 0 }, type: 'start' },
      { id: '2', label: 'Departure', description: 'Leave comfort zone', position: { x: 500, y: 100 }, type: 'middle' },
      { id: '3', label: 'Adventure', description: 'Face challenges', position: { x: 500, y: 250 }, type: 'peak' },
      { id: '4', label: 'Crisis', description: 'Darkest moment', position: { x: 300, y: 350 }, type: 'low' },
      { id: '5', label: 'Return', description: 'Journey back', position: { x: 100, y: 250 }, type: 'middle' },
      { id: '6', label: 'Transformation', description: 'Changed perspective', position: { x: 100, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-1', source: '6', target: '1', label: 'New Beginning' },
    ],
  },

  // Rags to Riches - Rising arc
  {
    tacticId: 'rags-to-riches',
    shape: 'arc',
    nodes: [
      { id: '1', label: 'Humble Start', description: 'Begin from nothing', position: { x: 0, y: 200 }, type: 'start' },
      { id: '2', label: 'First Success', description: 'Initial wins', position: { x: 150, y: 150 }, type: 'middle' },
      { id: '3', label: 'Setback', description: 'Temporary defeat', position: { x: 300, y: 175 }, type: 'low' },
      { id: '4', label: 'Breakthrough', description: 'Key realization', position: { x: 450, y: 75 }, type: 'peak' },
      { id: '5', label: 'Triumph', description: 'Achieve the goal', position: { x: 600, y: 0 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // The ABT - Simple three-part
  {
    tacticId: 'abt',
    shape: 'linear',
    nodes: [
      { id: '1', label: 'AND', description: 'Set up the context', position: { x: 0, y: 100 }, type: 'start' },
      { id: '2', label: 'BUT', description: 'Introduce conflict', position: { x: 250, y: 100 }, type: 'peak' },
      { id: '3', label: 'THEREFORE', description: 'Resolution/action', position: { x: 500, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', label: 'Conflict' },
      { id: 'e2-3', source: '2', target: '3', label: 'Resolution' },
    ],
  },

  // Stakes - Parallel structure
  {
    tacticId: 'stakes',
    shape: 'parallel',
    nodes: [
      { id: '1', label: 'If We Succeed', description: 'Positive outcome', position: { x: 0, y: 0 }, type: 'start' },
      { id: '2', label: 'Benefit 1', position: { x: 200, y: 0 }, type: 'middle' },
      { id: '3', label: 'Benefit 2', position: { x: 400, y: 0 }, type: 'middle' },
      { id: '4', label: 'Win', position: { x: 600, y: 0 }, type: 'end' },
      { id: '5', label: 'If We Fail', description: 'Negative outcome', position: { x: 0, y: 150 }, type: 'start' },
      { id: '6', label: 'Risk 1', position: { x: 200, y: 150 }, type: 'low' },
      { id: '7', label: 'Risk 2', position: { x: 400, y: 150 }, type: 'low' },
      { id: '8', label: 'Loss', position: { x: 600, y: 150 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-7', source: '6', target: '7' },
      { id: 'e7-8', source: '7', target: '8' },
    ],
  },

  // The Hook - Hub structure
  {
    tacticId: 'hook',
    shape: 'hub',
    nodes: [
      { id: '1', label: 'The Hook', description: 'Central attention grabber', position: { x: 250, y: 150 }, type: 'peak' },
      { id: '2', label: 'Surprise', description: 'Unexpected element', position: { x: 100, y: 50 }, type: 'branch' },
      { id: '3', label: 'Question', description: 'Intriguing puzzle', position: { x: 400, y: 50 }, type: 'branch' },
      { id: '4', label: 'Promise', description: 'Value proposition', position: { x: 100, y: 250 }, type: 'branch' },
      { id: '5', label: 'Story', description: 'Engaging narrative', position: { x: 400, y: 250 }, type: 'branch' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
    ],
  },

  // Before & After - Zigzag comparison
  {
    tacticId: 'before-after',
    shape: 'zigzag',
    nodes: [
      { id: '1', label: 'Before', description: 'The old way', position: { x: 0, y: 100 }, type: 'start' },
      { id: '2', label: 'Problem', description: 'Pain point', position: { x: 150, y: 50 }, type: 'low' },
      { id: '3', label: 'Transformation', description: 'The change', position: { x: 300, y: 100 }, type: 'peak' },
      { id: '4', label: 'Solution', description: 'The fix', position: { x: 450, y: 50 }, type: 'middle' },
      { id: '5', label: 'After', description: 'The new reality', position: { x: 600, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3', label: 'Change' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // The Quest - Linear journey with milestones
  {
    tacticId: 'quest',
    shape: 'linear',
    nodes: [
      { id: '1', label: 'The Call', description: 'Begin the journey', position: { x: 0, y: 100 }, type: 'start' },
      { id: '2', label: 'Challenges', description: 'Face obstacles', position: { x: 175, y: 100 }, type: 'middle' },
      { id: '3', label: 'Allies', description: 'Find help', position: { x: 350, y: 100 }, type: 'middle' },
      { id: '4', label: 'The Ordeal', description: 'Ultimate test', position: { x: 525, y: 100 }, type: 'peak' },
      { id: '5', label: 'The Reward', description: 'Achieve the goal', position: { x: 700, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // Downfall - Falling/inverted arc (opposite of Rags to Riches)
  {
    tacticId: 'downfall',
    shape: 'arc',
    nodes: [
      { id: '1', label: 'Heights', description: 'Initial success and power', position: { x: 0, y: 0 }, type: 'start' },
      { id: '2', label: 'Pride', description: 'Fatal flaw emerges', position: { x: 150, y: 50 }, type: 'middle' },
      { id: '3', label: 'The Mistake', description: 'Critical error', position: { x: 300, y: 100 }, type: 'peak' },
      { id: '4', label: 'The Fall', description: 'Consequences unfold', position: { x: 450, y: 150 }, type: 'middle' },
      { id: '5', label: 'Rock Bottom', description: 'Final loss', position: { x: 600, y: 200 }, type: 'low' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', label: 'Overconfidence' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5', label: 'Inevitable' },
    ],
  },

  // The Quest - Linear journey with milestone markers
  {
    tacticId: 'the-quest',
    shape: 'linear',
    nodes: [
      { id: '1', label: 'The Call', description: 'Mission emerges', position: { x: 0, y: 100 }, type: 'start' },
      { id: '2', label: 'Journey Begins', description: 'Leave the familiar', position: { x: 150, y: 100 }, type: 'middle' },
      { id: '3', label: 'Challenges & Allies', description: 'Face obstacles, find help', position: { x: 300, y: 100 }, type: 'middle' },
      { id: '4', label: 'The Ordeal', description: 'Ultimate test', position: { x: 450, y: 100 }, type: 'peak' },
      { id: '5', label: 'The Reward', description: 'Achievement or lesson', position: { x: 600, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3', animated: true },
      { id: 'e3-4', source: '3', target: '4', animated: true },
      { id: 'e4-5', source: '4', target: '5', animated: true },
    ],
  },

  // Overcoming The Monster - Hub with central threat
  {
    tacticId: 'overcoming-the-monster',
    shape: 'hub',
    nodes: [
      { id: '1', label: 'The Monster', description: 'The central threat', position: { x: 250, y: 150 }, type: 'low' },
      { id: '2', label: 'The Danger', description: 'What harm it causes', position: { x: 50, y: 50 }, type: 'branch' },
      { id: '3', label: 'The Call', description: 'Why we must fight', position: { x: 450, y: 50 }, type: 'branch' },
      { id: '4', label: 'The Battle', description: 'Strategy and struggle', position: { x: 50, y: 250 }, type: 'branch' },
      { id: '5', label: 'Victory', description: 'Monster defeated', position: { x: 450, y: 250 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e4-5', source: '4', target: '5', label: 'Triumph', animated: true },
    ],
  },

  // Comedy - Rising chaos then falling to resolution (inverted U pattern)
  {
    tacticId: 'comedy',
    shape: 'arc',
    nodes: [
      { id: '1', label: 'Normal World', description: 'Things seem fine', position: { x: 0, y: 150 }, type: 'start' },
      { id: '2', label: 'Confusion', description: 'Misunderstandings begin', position: { x: 150, y: 100 }, type: 'middle' },
      { id: '3', label: 'Escalating Chaos', description: 'Peak of confusion', position: { x: 300, y: 50 }, type: 'peak' },
      { id: '4', label: 'The Reveal', description: 'Truth comes out', position: { x: 450, y: 100 }, type: 'middle' },
      { id: '5', label: 'Resolution', description: 'Everyone laughs', position: { x: 600, y: 150 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3', label: 'Complications' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5', label: 'Happy Ending' },
    ],
  },

  // Tragedy - Descending arc from nobility to fall
  {
    tacticId: 'tragedy',
    shape: 'arc',
    nodes: [
      { id: '1', label: 'Noble Beginning', description: 'Admirable protagonist', position: { x: 0, y: 0 }, type: 'start' },
      { id: '2', label: 'Fatal Flaw', description: 'Weakness revealed', position: { x: 150, y: 40 }, type: 'middle' },
      { id: '3', label: 'Rising Action', description: 'Choices compound', position: { x: 300, y: 80 }, type: 'middle' },
      { id: '4', label: 'Point of No Return', description: 'Fate sealed', position: { x: 450, y: 140 }, type: 'peak' },
      { id: '5', label: 'The Fall', description: 'Loss with meaning', position: { x: 600, y: 200 }, type: 'low' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', label: 'Inevitable' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // Rebirth - V-shape descending into darkness, then rising to light
  {
    tacticId: 'rebirth',
    shape: 'arc',
    nodes: [
      { id: '1', label: 'Under A Shadow', description: 'Trapped in darkness', position: { x: 0, y: 50 }, type: 'start' },
      { id: '2', label: 'Worsening', description: 'Darkness deepens', position: { x: 150, y: 150 }, type: 'middle' },
      { id: '3', label: 'The Catalyst', description: 'Spark of change', position: { x: 300, y: 200 }, type: 'low' },
      { id: '4', label: 'The Struggle', description: 'Fighting to break free', position: { x: 450, y: 100 }, type: 'middle' },
      { id: '5', label: 'Emergence', description: 'Reborn into light', position: { x: 600, y: 0 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3', label: 'Rock Bottom' },
      { id: 'e3-4', source: '3', target: '4', label: 'Transformation' },
      { id: 'e4-5', source: '4', target: '5', animated: true },
    ],
  },

  // BEAT DIAGRAMS - Advanced Storytelling Beats
  
  // Dark Night of the Soul - V-shape with emphasis on the bottom
  {
    tacticId: 'dark-night-of-the-soul',
    shape: 'arc',
    nodes: [
      { id: '1', label: 'Everything Falls', description: 'Stakes become visceral', position: { x: 0, y: 50 }, type: 'start' },
      { id: '2', label: 'Sitting in Despair', description: 'Allow the pain', position: { x: 150, y: 150 }, type: 'middle' },
      { id: '3', label: 'The Lowest Point', description: 'Rock bottom', position: { x: 300, y: 200 }, type: 'low' },
      { id: '4', label: 'The Spark', description: 'Small glimmer of hope', position: { x: 450, y: 150 }, type: 'middle' },
      { id: '5', label: 'Renewed Determination', description: 'Rise with wisdom', position: { x: 600, y: 50 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3', label: 'Descent' },
      { id: 'e3-4', source: '3', target: '4', label: 'Turning Point', animated: true },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // The Mirror Moment - Reflection pattern
  {
    tacticId: 'the-mirror-moment',
    shape: 'hub',
    nodes: [
      { id: '1', label: 'Confrontation', description: 'Face yourself', position: { x: 250, y: 0 }, type: 'start' },
      { id: '2', label: 'Who I\'ve Become', description: 'Recognition', position: { x: 100, y: 120 }, type: 'middle' },
      { id: '3', label: 'The Choice', description: 'Stay or transform', position: { x: 250, y: 150 }, type: 'peak' },
      { id: '4', label: 'Who I Could Be', description: 'Possibility', position: { x: 400, y: 120 }, type: 'middle' },
      { id: '5', label: 'First Step', description: 'New path begins', position: { x: 250, y: 280 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e4-3', source: '4', target: '3' },
      { id: 'e3-5', source: '3', target: '5', label: 'Decision', animated: true },
    ],
  },

  // The Inciting Incident - Disruption visualization
  {
    tacticId: 'the-inciting-incident',
    shape: 'linear',
    nodes: [
      { id: '1', label: 'Ordinary World', description: 'The before', position: { x: 0, y: 100 }, type: 'start' },
      { id: '2', label: 'The Disruption', description: 'Everything changes', position: { x: 200, y: 100 }, type: 'peak' },
      { id: '3', label: 'Immediate Impact', description: 'Nothing stays the same', position: { x: 400, y: 100 }, type: 'middle' },
      { id: '4', label: 'The Urgency', description: 'Why action is needed now', position: { x: 600, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', label: 'DISRUPTION', animated: true },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
    ],
  },

  // Point of No Return - Threshold crossing
  {
    tacticId: 'point-of-no-return',
    shape: 'linear',
    nodes: [
      { id: '1', label: 'What\'s Left Behind', description: 'The old world', position: { x: 0, y: 100 }, type: 'start' },
      { id: '2', label: 'The Threshold', description: 'Crossing point', position: { x: 200, y: 100 }, type: 'peak' },
      { id: '3', label: 'Bridges Burned', description: 'No return possible', position: { x: 400, y: 100 }, type: 'middle' },
      { id: '4', label: 'Facing Forward', description: 'Committed path', position: { x: 600, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3', label: 'NO RETURN', animated: true },
      { id: 'e3-4', source: '3', target: '4' },
    ],
  },

  // All Is Lost - False defeat before victory
  {
    tacticId: 'all-is-lost',
    shape: 'arc',
    nodes: [
      { id: '1', label: 'Final Defeat', description: 'It seems over', position: { x: 0, y: 0 }, type: 'start' },
      { id: '2', label: 'Hopelessness', description: 'Sit in the loss', position: { x: 150, y: 100 }, type: 'middle' },
      { id: '3', label: 'Whiff of Death', description: 'Symbolic ending', position: { x: 300, y: 150 }, type: 'low' },
      { id: '4', label: 'Hidden Resource', description: 'What was overlooked', position: { x: 450, y: 75 }, type: 'peak' },
      { id: '5', label: 'The Final Push', description: 'Rapid transition to action', position: { x: 600, y: 0 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', label: 'But wait...', animated: true },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // Midpoint Shift - Pivot/reversal pattern
  {
    tacticId: 'midpoint-shift',
    shape: 'zigzag',
    nodes: [
      { id: '1', label: 'Obvious Direction', description: 'What seemed true', position: { x: 0, y: 100 }, type: 'start' },
      { id: '2', label: 'New Information', description: 'The revelation', position: { x: 200, y: 50 }, type: 'peak' },
      { id: '3', label: 'Everything Reframes', description: 'New understanding', position: { x: 400, y: 150 }, type: 'middle' },
      { id: '4', label: 'Stakes Raised', description: 'Higher stakes now', position: { x: 600, y: 100 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3', label: 'SHIFT', animated: true },
      { id: 'e3-4', source: '3', target: '4' },
    ],
  },

  // The Final Push - Convergence pattern
  {
    tacticId: 'the-final-push',
    shape: 'tree',
    nodes: [
      { id: '1', label: 'Resources', description: 'What we have', position: { x: 0, y: 0 }, type: 'branch' },
      { id: '2', label: 'Lessons', description: 'What we learned', position: { x: 0, y: 150 }, type: 'branch' },
      { id: '3', label: 'Team', description: 'Who\'s with us', position: { x: 0, y: 300 }, type: 'branch' },
      { id: '4', label: 'Convergence', description: 'Everything together', position: { x: 250, y: 150 }, type: 'peak' },
      { id: '5', label: 'ACTION', description: 'Clear direction', position: { x: 500, y: 150 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5', label: 'GO!', animated: true },
    ],
  },

  // New Equilibrium - Before/After mirror
  {
    tacticId: 'new-equilibrium',
    shape: 'parallel',
    nodes: [
      { id: '1', label: 'Opening Element', description: 'Mirror from beginning', position: { x: 0, y: 0 }, type: 'start' },
      { id: '2', label: 'How It\'s Different', description: 'The transformation', position: { x: 200, y: 0 }, type: 'middle' },
      { id: '3', label: 'Growth Shown', description: 'Character/org development', position: { x: 400, y: 0 }, type: 'middle' },
      { id: '4', label: 'New Possibilities', description: 'What\'s possible now', position: { x: 600, y: 0 }, type: 'end' },
      { id: '5', label: 'Resonance', description: 'Connect to opening', position: { x: 300, y: 150 }, type: 'end' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e1-5', source: '1', target: '5', label: 'Echo' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },
];

// Get diagram for a specific tactic
export const getDiagramForTactic = (tacticId: string): TacticDiagram | undefined => {
  return TACTIC_DIAGRAMS.find(d => d.tacticId === tacticId);
};

// Generate a default diagram based on tactic steps
export const generateDiagramFromSteps = (
  tacticId: string, 
  steps: string[], 
  shape: DiagramShape = 'linear'
): TacticDiagram => {
  const spacing = 150;
  const nodes: DiagramNode[] = steps.map((step, index) => ({
    id: `step-${index + 1}`,
    label: `Step ${index + 1}`,
    description: step,
    position: { 
      x: index * spacing, 
      y: shape === 'zigzag' ? (index % 2 === 0 ? 100 : 50) : 100 
    },
    type: index === 0 ? 'start' : index === steps.length - 1 ? 'end' : 'middle',
  }));

  const edges: DiagramEdge[] = steps.slice(0, -1).map((_, index) => ({
    id: `e${index + 1}-${index + 2}`,
    source: `step-${index + 1}`,
    target: `step-${index + 2}`,
  }));

  return { tacticId, shape, nodes, edges };
};
