import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  FileText, 
  MessageSquare,
  Loader2,
  Sparkles,
  X,
  Upload,
  File,
  Image as ImageIcon,
  FileType
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { SpeechTranscriber, isTranscriptionSupported } from '@/services/transcription';

export type InputMode = 'chat' | 'paste' | 'voice' | 'file';

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
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const transcriberRef = useRef<SpeechTranscriber | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Auto-detect mode based on input
  useEffect(() => {
    if (input.length > 200 && mode === 'chat') {
      onModeChange('paste');
    } else if (input.length < 100 && mode === 'paste' && uploadedFiles.length === 0) {
      onModeChange('chat');
    }
  }, [input, mode, onModeChange, uploadedFiles.length]);

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
    setUploadedFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && mode === 'chat') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Voice recording with Web Speech API
  const startRecording = useCallback(() => {
    if (!isTranscriptionSupported()) {
      console.warn('Speech recognition not supported');
      return;
    }

    transcriberRef.current = new SpeechTranscriber({
      onResult: (result) => {
        if (result.isFinal) {
          setInput(prev => prev + result.transcript + ' ');
        }
      },
      onError: (error) => {
        console.warn('Transcription error:', error);
        setIsRecording(false);
      },
      onEnd: () => {
        // Handled by stop
      }
    });

    transcriberRef.current.start();
    setIsRecording(true);
    onModeChange('voice');
  }, [onModeChange]);

  const stopRecording = useCallback(() => {
    if (transcriberRef.current) {
      const transcript = transcriberRef.current.stop();
      if (transcript) {
        setInput(prev => prev + transcript);
      }
      transcriberRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // File upload handling
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/png',
        'image/jpeg',
        'image/gif'
      ];
      return validTypes.includes(file.type) || file.name.endsWith('.txt') || file.name.endsWith('.md');
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      onModeChange('file');
      
      // For text files, try to read content
      validFiles.forEach(file => {
        if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;
            if (content) {
              setInput(prev => prev + content);
              onModeChange('paste');
            }
          };
          reader.readAsText(file);
        }
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length <= 1) {
      onModeChange('chat');
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return ImageIcon;
    if (file.type === 'application/pdf') return FileType;
    return File;
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (mode) {
      case 'chat':
        return "What are you presenting about? Tell me about your topic...";
      case 'paste':
        return "Paste your article, notes, or talking points here...";
      case 'voice':
        return "Listening... Speak naturally and I'll transcribe your ideas";
      case 'file':
        return "Files uploaded! Add any additional context...";
      default:
        return "Type a message...";
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transcriberRef.current) {
        transcriberRef.current.stop();
      }
    };
  }, []);

  return (
    <div 
      className="relative"
      ref={dropZoneRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 rounded-xl border-2 border-dashed border-primary bg-primary/10 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <Upload className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-primary">Drop files here</p>
              <p className="text-xs text-muted-foreground">PDF, TXT, DOC, or images</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Indicators */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
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
                  setUploadedFiles([]);
                }}
                className="ml-1 hover:text-purple-300"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
          
          {mode === 'voice' && isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500"
              />
              Recording...
            </motion.div>
          )}

          {mode === 'file' && uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium"
            >
              <Upload className="w-3 h-3" />
              {uploadedFiles.length} file(s) uploaded
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

      {/* Uploaded Files Preview */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mb-3"
          >
            {uploadedFiles.map((file, index) => {
              const FileIcon = getFileIcon(file);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border text-sm"
                >
                  <FileIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Area */}
      <div className={cn(
        'relative rounded-xl border transition-all duration-300',
        'bg-card/50 backdrop-blur-sm',
        mode === 'paste' 
          ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' 
          : 'border-border hover:border-primary/50 focus-within:border-primary',
        isRecording && 'border-red-500/50 shadow-lg shadow-red-500/10',
        mode === 'file' && 'border-blue-500/50'
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
              
              {/* Audio waveform visualization */}
              <div className="flex items-center gap-0.5 h-4">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [4, 16, 4],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    className="w-1 bg-red-500 rounded-full"
                  />
                ))}
              </div>
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
          disabled={isProcessing}
          className={cn(
            'w-full resize-none border-0 bg-transparent',
            'focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            'placeholder:text-muted-foreground/60',
            mode === 'paste' || mode === 'file' ? 'min-h-[150px]' : 'min-h-[60px]'
          )}
          rows={mode === 'paste' || mode === 'file' ? 6 : 2}
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
            
            {/* File Upload Button */}
            <label>
              <input
                type="file"
                multiple
                accept=".pdf,.txt,.doc,.docx,.md,image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button
                variant={mode === 'file' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-8 px-3 text-xs cursor-pointer"
                asChild
              >
                <span>
                  <Upload className="w-3 h-3 mr-1" />
                  Upload
                </span>
              </Button>
            </label>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Button */}
            {isTranscriptionSupported() && (
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
            )}

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
                  {mode === 'paste' || mode === 'file' ? 'Analyze' : 'Send'}
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
        {mode === 'voice' && (isRecording ? "Click the mic again to stop" : "Click the mic to start voice input")}
        {mode === 'file' && "Drop files or click Upload to add documents"}
      </p>
    </div>
  );
};

export default InputHub;
