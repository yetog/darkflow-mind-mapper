import { useState, useCallback, useEffect } from 'react';
import { StorytellerTactic } from '@/types/tactics';

interface ComparisonState {
  leftTactic: StorytellerTactic | null;
  rightTactic: StorytellerTactic | null;
}

const STORAGE_KEY = 'convoflow-tactic-comparison';

export function useTacticComparison() {
  const [comparison, setComparison] = useState<ComparisonState>({
    leftTactic: null,
    rightTactic: null,
  });
  const [isCompareMode, setIsCompareMode] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setComparison(parsed);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(comparison));
    } catch {
      // Ignore storage errors
    }
  }, [comparison]);

  const addToComparison = useCallback((tactic: StorytellerTactic) => {
    setComparison(prev => {
      // If it's already in comparison, don't add again
      if (prev.leftTactic?.id === tactic.id || prev.rightTactic?.id === tactic.id) {
        return prev;
      }
      
      // Fill empty left slot first, then right
      if (!prev.leftTactic) {
        return { ...prev, leftTactic: tactic };
      } else if (!prev.rightTactic) {
        return { ...prev, rightTactic: tactic };
      } else {
        // Both full - replace right
        return { ...prev, rightTactic: tactic };
      }
    });
  }, []);

  const removeFromComparison = useCallback((side: 'left' | 'right') => {
    setComparison(prev => ({
      ...prev,
      [side === 'left' ? 'leftTactic' : 'rightTactic']: null,
    }));
  }, []);

  const setLeftTactic = useCallback((tactic: StorytellerTactic | null) => {
    setComparison(prev => ({ ...prev, leftTactic: tactic }));
  }, []);

  const setRightTactic = useCallback((tactic: StorytellerTactic | null) => {
    setComparison(prev => ({ ...prev, rightTactic: tactic }));
  }, []);

  const swapTactics = useCallback(() => {
    setComparison(prev => ({
      leftTactic: prev.rightTactic,
      rightTactic: prev.leftTactic,
    }));
  }, []);

  const clearComparison = useCallback(() => {
    setComparison({ leftTactic: null, rightTactic: null });
    setIsCompareMode(false);
  }, []);

  const isInComparison = useCallback((tacticId: string) => {
    return comparison.leftTactic?.id === tacticId || comparison.rightTactic?.id === tacticId;
  }, [comparison]);

  const comparisonCount = (comparison.leftTactic ? 1 : 0) + (comparison.rightTactic ? 1 : 0);
  const canCompare = comparisonCount === 2;

  return {
    leftTactic: comparison.leftTactic,
    rightTactic: comparison.rightTactic,
    isCompareMode,
    setIsCompareMode,
    addToComparison,
    removeFromComparison,
    setLeftTactic,
    setRightTactic,
    swapTactics,
    clearComparison,
    isInComparison,
    comparisonCount,
    canCompare,
  };
}
