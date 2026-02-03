import { useState, useEffect, useCallback } from 'react';
import { VocabPhrase, VocabCategory } from '@/data/vocabulary';
import { IconName } from '@/components/ui/dynamic-icon';

const STORAGE_KEY = 'convoflow-user-vocabulary';
const COLLECTIONS_KEY = 'convoflow-vocab-collections';

export interface UserVocabPhrase extends Omit<VocabPhrase, 'id'> {
  id: string;
  isUserCreated: boolean;
  createdAt: Date;
}

export interface VocabCollection {
  id: string;
  name: string;
  description?: string;
  phraseIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const useUserVocabulary = () => {
  const [userPhrases, setUserPhrases] = useState<UserVocabPhrase[]>([]);
  const [collections, setCollections] = useState<VocabCollection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedPhrases = localStorage.getItem(STORAGE_KEY);
      const storedCollections = localStorage.getItem(COLLECTIONS_KEY);
      
      if (storedPhrases) {
        const parsed = JSON.parse(storedPhrases);
        setUserPhrases(parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
        })));
      }
      
      if (storedCollections) {
        const parsed = JSON.parse(storedCollections);
        setCollections(parsed.map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        })));
      }
    } catch (error) {
      console.error('Failed to load user vocabulary:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save phrases to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userPhrases));
    }
  }, [userPhrases, isLoaded]);

  // Save collections to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    }
  }, [collections, isLoaded]);

  // Add a new phrase
  const addPhrase = useCallback((phrase: {
    phrase: string;
    meaning: string;
    example: string;
    category: VocabCategory;
    situation: string;
    iconName?: IconName;
  }) => {
    const newPhrase: UserVocabPhrase = {
      id: `user-${Date.now()}`,
      phrase: phrase.phrase,
      meaning: phrase.meaning,
      example: phrase.example,
      category: phrase.category,
      situation: phrase.situation as any, // Allow user-created situations
      iconName: phrase.iconName || 'MessageSquare',
      isUserCreated: true,
      createdAt: new Date(),
    };
    setUserPhrases(prev => [newPhrase, ...prev]);
    return newPhrase;
  }, []);

  // Update a phrase
  const updatePhrase = useCallback((id: string, updates: Partial<UserVocabPhrase>) => {
    setUserPhrases(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  }, []);

  // Delete a phrase
  const deletePhrase = useCallback((id: string) => {
    setUserPhrases(prev => prev.filter(p => p.id !== id));
    // Also remove from all collections
    setCollections(prev => prev.map(c => ({
      ...c,
      phraseIds: c.phraseIds.filter(pId => pId !== id),
      updatedAt: new Date(),
    })));
  }, []);

  // Create a new collection
  const createCollection = useCallback((name: string, description?: string) => {
    const newCollection: VocabCollection = {
      id: `collection-${Date.now()}`,
      name,
      description,
      phraseIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCollections(prev => [newCollection, ...prev]);
    return newCollection;
  }, []);

  // Update a collection
  const updateCollection = useCallback((id: string, updates: Partial<VocabCollection>) => {
    setCollections(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
    ));
  }, []);

  // Delete a collection
  const deleteCollection = useCallback((id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  }, []);

  // Add phrase to collection
  const addPhraseToCollection = useCallback((phraseId: string, collectionId: string) => {
    setCollections(prev => prev.map(c => 
      c.id === collectionId && !c.phraseIds.includes(phraseId)
        ? { ...c, phraseIds: [...c.phraseIds, phraseId], updatedAt: new Date() }
        : c
    ));
  }, []);

  // Remove phrase from collection
  const removePhraseFromCollection = useCallback((phraseId: string, collectionId: string) => {
    setCollections(prev => prev.map(c => 
      c.id === collectionId
        ? { ...c, phraseIds: c.phraseIds.filter(id => id !== phraseId), updatedAt: new Date() }
        : c
    ));
  }, []);

  // Get phrases in a collection
  const getCollectionPhrases = useCallback((collectionId: string, allPhrases: VocabPhrase[]) => {
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) return [];
    
    const combinedPhrases = [...allPhrases, ...userPhrases];
    return collection.phraseIds
      .map(id => combinedPhrases.find(p => p.id === id))
      .filter(Boolean) as VocabPhrase[];
  }, [collections, userPhrases]);

  return {
    userPhrases,
    collections,
    isLoaded,
    addPhrase,
    updatePhrase,
    deletePhrase,
    createCollection,
    updateCollection,
    deleteCollection,
    addPhraseToCollection,
    removePhraseFromCollection,
    getCollectionPhrases,
  };
};
