import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ConversationNode, ConversationType } from '@/types/conversation';
import { InputMode } from '@/components/builder/InputHub';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface BuilderState {
  nodes: ConversationNode[];
  messages: Message[];
  inputMode: InputMode;
  isProcessing: boolean;
  selectedNodeId: string | null;
  conversationType: ConversationType;
  showEmptyState: boolean;
}

type BuilderAction =
  | { type: 'SET_NODES'; payload: ConversationNode[] }
  | { type: 'ADD_NODE'; payload: { parentId: string; node: ConversationNode } }
  | { type: 'UPDATE_NODE'; payload: { nodeId: string; updates: Partial<ConversationNode> } }
  | { type: 'DELETE_NODE'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_INPUT_MODE'; payload: InputMode }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_SELECTED_NODE'; payload: string | null }
  | { type: 'SET_CONVERSATION_TYPE'; payload: ConversationType }
  | { type: 'HIDE_EMPTY_STATE' }
  | { type: 'RESET' };

const initialState: BuilderState = {
  nodes: [],
  messages: [],
  inputMode: 'chat',
  isProcessing: false,
  selectedNodeId: null,
  conversationType: 'presentation',
  showEmptyState: true,
};

const addNodeToTree = (
  nodes: ConversationNode[],
  parentId: string,
  newNode: ConversationNode
): ConversationNode[] => {
  return nodes.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeToTree(node.children, parentId, newNode),
      };
    }
    return node;
  });
};

const updateNodeInTree = (
  nodes: ConversationNode[],
  nodeId: string,
  updates: Partial<ConversationNode>
): ConversationNode[] => {
  return nodes.map(node => {
    if (node.id === nodeId) {
      return { ...node, ...updates };
    }
    if (node.children) {
      return {
        ...node,
        children: updateNodeInTree(node.children, nodeId, updates),
      };
    }
    return node;
  });
};

const deleteNodeFromTree = (
  nodes: ConversationNode[],
  nodeId: string
): ConversationNode[] => {
  return nodes
    .filter(node => node.id !== nodeId)
    .map(node => ({
      ...node,
      children: node.children ? deleteNodeFromTree(node.children, nodeId) : undefined,
    }));
};

const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'SET_NODES':
      return { 
        ...state, 
        nodes: action.payload,
        showEmptyState: action.payload.length === 0,
      };
    case 'ADD_NODE':
      if (state.nodes.length === 0) {
        return { 
          ...state, 
          nodes: [action.payload.node],
          showEmptyState: false,
        };
      }
      return {
        ...state,
        nodes: addNodeToTree(state.nodes, action.payload.parentId, action.payload.node),
        showEmptyState: false,
      };
    case 'UPDATE_NODE':
      return {
        ...state,
        nodes: updateNodeInTree(state.nodes, action.payload.nodeId, action.payload.updates),
      };
    case 'DELETE_NODE':
      return {
        ...state,
        nodes: deleteNodeFromTree(state.nodes, action.payload),
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_INPUT_MODE':
      return { ...state, inputMode: action.payload };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_SELECTED_NODE':
      return { ...state, selectedNodeId: action.payload };
    case 'SET_CONVERSATION_TYPE':
      return { ...state, conversationType: action.payload };
    case 'HIDE_EMPTY_STATE':
      return { ...state, showEmptyState: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

interface BuilderContextValue {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  // Convenience methods
  addNode: (parentId: string, node: ConversationNode) => void;
  addRootNode: (node: ConversationNode) => void;
  updateNode: (nodeId: string, updates: Partial<ConversationNode>) => void;
  deleteNode: (nodeId: string) => void;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  setInputMode: (mode: InputMode) => void;
  setProcessing: (processing: boolean) => void;
  selectNode: (nodeId: string | null) => void;
}

const BuilderContext = createContext<BuilderContextValue | undefined>(undefined);

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  const value: BuilderContextValue = {
    state,
    dispatch,
    addNode: (parentId, node) => dispatch({ type: 'ADD_NODE', payload: { parentId, node } }),
    addRootNode: (node) => dispatch({ type: 'ADD_NODE', payload: { parentId: '', node } }),
    updateNode: (nodeId, updates) => dispatch({ type: 'UPDATE_NODE', payload: { nodeId, updates } }),
    deleteNode: (nodeId) => dispatch({ type: 'DELETE_NODE', payload: nodeId }),
    addMessage: (role, content) => dispatch({
      type: 'ADD_MESSAGE',
      payload: { id: `msg-${Date.now()}`, role, content, timestamp: new Date() },
    }),
    setInputMode: (mode) => dispatch({ type: 'SET_INPUT_MODE', payload: mode }),
    setProcessing: (processing) => dispatch({ type: 'SET_PROCESSING', payload: processing }),
    selectNode: (nodeId) => dispatch({ type: 'SET_SELECTED_NODE', payload: nodeId }),
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
