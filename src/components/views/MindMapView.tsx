import React from 'react';
import ConversationBuilder from '@/components/builder/ConversationBuilder';
import { ConversationNode } from '@/types/conversation';

interface MindMapViewProps {
  nodes: ConversationNode[];
  onNodesUpdate: (nodes: ConversationNode[]) => void;
}

const MindMapView = ({ nodes, onNodesUpdate }: MindMapViewProps) => {
  return (
    <div className="h-full">
      <ConversationBuilder 
        nodes={nodes} 
        onNodesUpdate={onNodesUpdate}
      />
    </div>
  );
};

export default MindMapView;
