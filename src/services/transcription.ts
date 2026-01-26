// Speech-to-Text Transcription Service for ConvoFlow

// Type declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionInterface extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInterface;
    webkitSpeechRecognition: new () => SpeechRecognitionInterface;
  }
}

export interface TranscriptionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface TranscriptionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (result: TranscriptionResult) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

// Web Speech API wrapper for real-time transcription
export class SpeechTranscriber {
  private recognition: SpeechRecognitionInterface | null = null;
  private options: TranscriptionOptions;
  private fullTranscript: string = '';
  private isRunning: boolean = false;

  constructor(options: TranscriptionOptions = {}) {
    this.options = {
      language: 'en-US',
      continuous: true,
      interimResults: true,
      ...options,
    };
  }

  start(): void {
    if (!this.isSupported()) {
      this.options.onError?.('Speech recognition is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.recognition.lang = this.options.language || 'en-US';
    this.recognition.continuous = this.options.continuous ?? true;
    this.recognition.interimResults = this.options.interimResults ?? true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcript + ' ';
          this.fullTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        this.options.onResult?.({
          transcript: finalTranscript.trim(),
          confidence: event.results[event.results.length - 1][0].confidence,
          isFinal: true,
        });
      } else if (interimTranscript) {
        this.options.onResult?.({
          transcript: interimTranscript,
          confidence: 0,
          isFinal: false,
        });
      }
    };

    this.recognition.onerror = (event) => {
      // Ignore "no-speech" errors during continuous listening
      if (event.error !== 'no-speech') {
        this.options.onError?.(event.error);
      }
    };

    this.recognition.onend = () => {
      // Auto-restart if still supposed to be running (for continuous mode)
      if (this.isRunning && this.options.continuous) {
        try {
          this.recognition?.start();
        } catch (e) {
          // Ignore if already started
        }
      } else {
        this.options.onEnd?.();
      }
    };

    this.isRunning = true;
    this.fullTranscript = '';
    this.recognition.start();
  }

  stop(): string {
    this.isRunning = false;
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
    return this.fullTranscript.trim();
  }

  getTranscript(): string {
    return this.fullTranscript.trim();
  }

  isSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
}

// Check if speech recognition is supported
export function isTranscriptionSupported(): boolean {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Utility to count words in transcript
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Utility to count sentences
export function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
}
