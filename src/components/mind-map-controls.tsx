
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface MindMapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onDownload: () => void;
  zoomLevel: number;
}

export function MindMapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onDownload,
  zoomLevel
}: MindMapControlsProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="glass"
        size="sm"
        onClick={onZoomIn}
        disabled={zoomLevel >= 3}
      >
        <ZoomIn className="w-4 h-4" />
        Zoom In
      </Button>
      
      <Button
        variant="glass"
        size="sm"
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.5}
      >
        <ZoomOut className="w-4 h-4" />
        Zoom Out
      </Button>
      
      <Button
        variant="glass"
        size="sm"
        onClick={onReset}
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
      
      <div className="flex-1" />
      
      <Button
        variant="premium"
        size="sm"
        onClick={onDownload}
      >
        <Download className="w-4 h-4" />
        Download PNG
      </Button>
      
      <span className="text-sm text-muted-foreground ml-2">
        Zoom: {Math.round(zoomLevel * 100)}%
      </span>
    </div>
  );
}
