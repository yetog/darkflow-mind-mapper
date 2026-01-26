import React, { useState, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  X,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface VoiceCoachProps {
  onClose?: () => void;
  onAddNode?: (label: string, description?: string) => void;
  onApplyTactic?: (tacticId: string) => void;
}

interface TranscriptMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

const VoiceCoach = ({ onClose, onAddNode, onApplyTactic }: VoiceCoachProps) => {
  const [agentId, setAgentId] = useState<string>(() => 
    localStorage.getItem('elevenlabs_agent_id') || ''
  );
  const [showSettings, setShowSettings] = useState(!agentId);
  const [isMuted, setIsMuted] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptMessage[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs agent');
      setIsConnecting(false);
    },
    onDisconnect: () => {
      console.log('Disconnected from agent');
    },
    onMessage: (message: any) => {
      const messageType = message?.type;
      if (messageType === 'user_transcript') {
        const userTranscript = message?.user_transcription_event?.user_transcript;
        if (userTranscript) {
          setTranscripts(prev => [...prev, {
            id: `user-${Date.now()}`,
            role: 'user',
            text: userTranscript,
            timestamp: new Date(),
          }]);
        }
      } else if (messageType === 'agent_response') {
        const agentResponse = message?.agent_response_event?.agent_response;
        if (agentResponse) {
          setTranscripts(prev => [...prev, {
            id: `agent-${Date.now()}`,
            role: 'agent',
            text: agentResponse,
            timestamp: new Date(),
          }]);
        }
      }
    },
    onError: (error) => {
      console.error('Voice agent error:', error);
      setIsConnecting(false);
    },
  });

  const startConversation = useCallback(async () => {
    if (!agentId) {
      setShowSettings(true);
      return;
    }

    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Use agentId for public agents (no token required)
      await (conversation as any).startSession({
        agentId: agentId,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setIsConnecting(false);
    }
  }, [conversation, agentId]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setTranscripts([]);
  }, [conversation]);

  const toggleMute = useCallback(async () => {
    if (isMuted) {
      await conversation.setVolume({ volume: 1 });
    } else {
      await conversation.setVolume({ volume: 0 });
    }
    setIsMuted(!isMuted);
  }, [conversation, isMuted]);

  const saveAgentId = () => {
    localStorage.setItem('elevenlabs_agent_id', agentId);
    setShowSettings(false);
  };

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-3 h-3 rounded-full",
            isConnected ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
          )} />
          <div>
            <h3 className="font-semibold text-foreground">Voice Coach</h3>
            <p className="text-xs text-muted-foreground">
              {isConnected 
                ? isSpeaking ? 'Speaking...' : 'Listening...'
                : 'Disconnected'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Transcript Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {transcripts.length === 0 && !isConnected && (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">
                Start a voice conversation to get coaching advice
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Ask about storytelling tactics, presentation tips, or get feedback
              </p>
            </div>
          )}
          
          <AnimatePresence mode="popLayout">
            {transcripts.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isConnected && isSpeaking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-secondary rounded-lg px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-muted-foreground">Speaking...</span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Controls */}
      <div className="p-6 border-t border-border">
        <div className="flex flex-col items-center gap-4">
          {/* Main Mic Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isConnected ? stopConversation : startConversation}
            disabled={isConnecting}
            className={cn(
              "relative w-20 h-20 rounded-full flex items-center justify-center transition-all",
              isConnected
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90",
              isConnecting && "opacity-50 cursor-not-allowed"
            )}
          >
            {isConnecting ? (
              <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
            ) : isConnected ? (
              <MicOff className="h-8 w-8 text-primary-foreground" />
            ) : (
              <Mic className="h-8 w-8 text-primary-foreground" />
            )}
            
            {/* Pulse animation when connected */}
            {isConnected && !isSpeaking && (
              <span className="absolute inset-0 rounded-full bg-destructive animate-ping opacity-25" />
            )}
          </motion.button>

          <p className="text-sm text-muted-foreground">
            {isConnecting
              ? 'Connecting...'
              : isConnected
                ? 'Tap to end conversation'
                : 'Tap to start voice coaching'}
          </p>

          {/* Volume Control */}
          {isConnected && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="gap-2"
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Mute</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Voice Coach Settings</DialogTitle>
            <DialogDescription>
              Enter your ElevenLabs Agent ID to enable voice coaching.
              Create a public agent at{' '}
              <a 
                href="https://elevenlabs.io/conversational-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ElevenLabs Conversational AI
              </a>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Agent ID</label>
              <Input
                placeholder="Enter your ElevenLabs Agent ID"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Make sure your agent is set to "Public" in the ElevenLabs dashboard
              </p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Recommended Agent Prompt</h4>
              <p className="text-xs text-muted-foreground">
                "You are a presentation and storytelling coach. Help users structure their talks, 
                suggest storytelling tactics, and provide feedback on their ideas. Be encouraging, 
                practical, and concise."
              </p>
            </div>

            <Button onClick={saveAgentId} className="w-full" disabled={!agentId}>
              Save & Connect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VoiceCoach;
