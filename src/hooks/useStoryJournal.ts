import { useState, useEffect, useCallback } from 'react';
import { PersonalStory } from '@/types/stories';

const STORAGE_KEY = 'convoflow-story-journal';

export const useStoryJournal = () => {
  const [stories, setStories] = useState<PersonalStory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setStories(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load story journal:', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    }
  }, [stories, isLoaded]);

  const addStory = useCallback((story: Omit<PersonalStory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newStory: PersonalStory = {
      ...story,
      id: `story-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setStories(prev => [newStory, ...prev]);
    return newStory;
  }, []);

  const updateStory = useCallback((id: string, updates: Partial<PersonalStory>) => {
    setStories(prev => prev.map(s =>
      s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
    ));
  }, []);

  const deleteStory = useCallback((id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
  }, []);

  const getStoriesByTag = useCallback((tag: string) => {
    return stories.filter(s => s.tags.includes(tag));
  }, [stories]);

  const getAllTags = useCallback(() => {
    const tags = new Set<string>();
    stories.forEach(s => s.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [stories]);

  return {
    stories,
    isLoaded,
    addStory,
    updateStory,
    deleteStory,
    getStoriesByTag,
    getAllTags,
  };
};