import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  FileText, 
  MessageSquare,
  Loader2,
  Sparkles,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type InputMode = 'chat' | 'paste' | 'voice';

interface InputHubProps {
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
  onSubmit: (content: string, mode: InputMode) => void;
  isProcessing?: boolean;
  placeholder?: string;
}

const InputHub = ({ 
  mode, 
  onModeChange, 
  onSubmit, 
  isProcessing = false,
  placeholder 
}: InputHubProps) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-detect mode based on input
  useEffect(() => {
    if (input.length > 200 && mode === 'chat') {
      onModeChange('paste');
    } else if (input.length < 100 && mode === 'paste') {
      onModeChange('chat');
    }
  }, [input, mode, onModeChange]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const maxHeight = mode === 'paste' ? 300 : 120;
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + 'px';
    }
  }, [input, mode]);

  const handleSubmit = () => {
    if (!input.trim() || isProcessing) return;
    onSubmit(input.trim(), mode);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && mode === 'chat') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording logic here
    } else {
      setIsRecording(true);
      onModeChange('voice');
      // Start recording logic here
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (mode) {
      case 'chat':
        return "What are you presenting about? Tell me about your topic...";
      case 'paste':
        return "Paste your article, notes, or talking points here...";
      case 'voice':
        return "Click the microphone to start speaking...";
      default:
        return "Type a message...";
    }
  };

  return (
    <div className="relative">
      {/* Mode Indicators */}
      <div className="flex items-center gap-2 mb-3">
        <AnimatePresence mode="wait">
          {mode === 'paste' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium"
            >
              <FileText className="w-3 h-3" />
              Content Analysis Mode
              <button 
                onClick={() => {
                  onModeChange('chat');
                  setInput('');
                }}
                className="ml-1 hover:text-purple-300"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-medium"
          >
            <Loader2 className="w-3 h-3 animate-spin" />
            Analyzing...
          </motion.div>
        )}
      </div>

      {/* Main Input Area */}
      <div className={cn(
        'relative rounded-xl border transition-all duration-300',
        'bg-card/50 backdrop-blur-sm',
        mode === 'paste' 
          ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' 
          : 'border-border hover:border-primary/50 focus-within:border-primary',
        isRecording && 'border-red-500/50 shadow-lg shadow-red-500/10'
      )}>
        {/* Voice Recording Indicator */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-center gap-3 p-4 border-b border-red-500/20"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-red-500"
              />
              <span className="text-sm text-red-400">Recording... Speak naturally</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          disabled={isProcessing || isRecording}
          className={cn(
            'w-full resize-none border-0 bg-transparent',
            'focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            'placeholder:text-muted-foreground/60',
            mode === 'paste' ? 'min-h-[150px]' : 'min-h-[60px]'
          )}
          rows={mode === 'paste' ? 6 : 2}
        />

        {/* Actions Bar */}
        <div className="flex items-center justify-between p-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            {/* Mode Toggle Buttons */}
            <Button
              variant={mode === 'chat' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('chat')}
              className="h-8 px-3 text-xs"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Chat
            </Button>
            <Button
              variant={mode === 'paste' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('paste')}
              className="h-8 px-3 text-xs"
            >
              <FileText className="w-3 h-3 mr-1" />
              Paste
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Button */}
            <Button
              variant={isRecording ? 'destructive' : 'ghost'}
              size="icon"
              onClick={toggleRecording}
              className="h-8 w-8"
            >
              {isRecording ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isProcessing}
              size="sm"
              className="h-8 px-4"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-3 h-3 mr-1" />
                  {mode === 'paste' ? 'Analyze' : 'Send'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground mt-2 text-center">
        {mode === 'chat' && "Press Enter to send, Shift+Enter for new line"}
        {mode === 'paste' && "Paste large content and I'll extract the key topics"}
        {mode === 'voice' && "Speak naturally and I'll transcribe your ideas"}
      </p>
    </div>
  );
};

export default InputHub;
