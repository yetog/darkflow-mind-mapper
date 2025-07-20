
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NodeData } from '@/services/langflow-api';

interface NodeDetailsProps {
  node: NodeData | null;
}

export function NodeDetails({ node }: NodeDetailsProps) {
  if (!node) {
    return (
      <Card className="glass-card p-6">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Click on a node in the mind map to view details</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card p-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{node.id}</Badge>
        <h3 className="font-semibold text-lg">{node.label}</h3>
      </div>
      
      {node.details && (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {node.details}
        </p>
      )}
      
      {node.children && node.children.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Connected to:</p>
          <div className="flex flex-wrap gap-1">
            {node.children.map(childId => (
              <Badge key={childId} variant="outline" className="text-xs">
                {childId}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
