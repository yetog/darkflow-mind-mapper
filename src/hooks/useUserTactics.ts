import { useState, useEffect, useCallback } from 'react';
import { StorytellerTactic } from '@/types/tactics';

const USER_TACTICS_KEY = 'convoflow_user_tactics';
const FAVORITES_KEY = 'convoflow_favorite_tactics';
const RECENT_KEY = 'convoflow_recent_tactics';
const MAX_RECENT = 10;

export const useUserTactics = () => {
  // User-created tactics
  const [userTactics, setUserTactics] = useState<StorytellerTactic[]>(() => {
    try {
      const stored = localStorage.getItem(USER_TACTICS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Favorite tactic IDs
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed tactic IDs
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist user tactics
  useEffect(() => {
    localStorage.setItem(USER_TACTICS_KEY, JSON.stringify(userTactics));
  }, [userTactics]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Persist recently viewed
  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Add a new user tactic
  const addTactic = useCallback((tactic: StorytellerTactic) => {
    setUserTactics(prev => [...prev, tactic]);
  }, []);

  // Update an existing user tactic
  const updateTactic = useCallback((id: string, updates: Partial<StorytellerTactic>) => {
    setUserTactics(prev => 
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  }, []);

  // Delete a user tactic
  const deleteTactic = useCallback((id: string) => {
    setUserTactics(prev => prev.filter(t => t.id !== id));
    // Also remove from favorites and recent
    setFavorites(prev => prev.filter(fid => fid !== id));
    setRecentlyViewed(prev => prev.filter(rid => rid !== id));
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    );
  }, []);

  // Add to recently viewed
  const addToRecent = useCallback((id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(rid => rid !== id);
      return [id, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  // Check if a tactic is favorited
  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  // Export user tactics as JSON
  const exportTactics = useCallback(() => {
    const data = JSON.stringify(userTactics, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-tactics.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [userTactics]);

  // Import tactics from JSON
  const importTactics = useCallback((jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString) as StorytellerTactic[];
      if (Array.isArray(imported)) {
        // Add new IDs to prevent conflicts
        const withNewIds = imported.map(t => ({
          ...t,
          id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }));
        setUserTactics(prev => [...prev, ...withNewIds]);
        return { success: true, count: withNewIds.length };
      }
      return { success: false, error: 'Invalid format' };
    } catch (e) {
      return { success: false, error: 'Failed to parse JSON' };
    }
  }, []);

  return {
    userTactics,
    favorites,
    recentlyViewed,
    addTactic,
    updateTactic,
    deleteTactic,
    toggleFavorite,
    addToRecent,
    isFavorite,
    exportTactics,
    importTactics,
  };
};
